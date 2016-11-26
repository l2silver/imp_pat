//@flow
import React, {Component, PropTypes} from 'react';
import {bindMethods} from '../../utils/classUtils';
import {sendMessages} from '../../utils/messageUtils';
import type {$Message} from '../../utils/messageUtils';
export class BaseRestProvider extends Component {
	messageCopies: {
		[key: string]: number;
	};
	messages: $Message[];
	dispatch: Function;
	static childContextTypes = {
		getMessages: PropTypes.func,
	};
	constructor(props: Object){
		super(props);
		this.messageCopies = {}
		this.messages = [];
		this.dispatch = props.dispatch;
		bindMethods(this, 'getMessages', 'sendAndRefreshMessages');
	}
	getChildContext() {
		const {getMessages} = this;
		return {
			getMessages,
		};
	}
	getMessages(newMessages: $Message[]){
		const currentTime = Date.now();
		const {messages, messageCopies} = this;
		newMessages.forEach(message=>{
			const stringMessage = JSON.stringify(message);
			const lastTime = messageCopies[stringMessage];
			if(!lastTime && lastTime - currentTime > 5000){
				messageCopies[stringMessage] = currentTime;
				messages.push(message);
			}
		});
	}
	componentWillMount(){
		this.sendAndRefreshMessages()
	}
	componentWillUpdate(){
		this.sendAndRefreshMessages()
	}
	sendAndRefreshMessages(){
		let {messages, dispatch} = this;
		if(messages.length > 0){
			sendMessages(dispatch, messages.slice(0))
			messages = [];	
		}
	}
}