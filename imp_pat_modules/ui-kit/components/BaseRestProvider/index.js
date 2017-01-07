//@flow
import {Component, PropTypes} from 'react';

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
		forceRefresh: PropTypes.func,
		parent: PropTypes.any,
	};
	constructor(props: Object){
		super(props);
		this.messageCopies = {}
		this.messages = [];
		this.dispatch = props.dispatch;
		bindMethods(this, 'getMessages', 'sendAndRefreshMessages');
	}
	render(){
		return this.props.children;
	}
	getChildContext() {
		const {getMessages, forceRefresh} = this;
		return {
			getMessages,
			forceRefresh,
			parent: this,
		};
	}
	getMessages(newMessages: $Message[]){
		const currentTime = Date.now();
		const {messages, messageCopies} = this;
		newMessages.forEach(message=>{
			const stringMessage = JSON.stringify(message);
			const lastTime = messageCopies[stringMessage];
			if(!lastTime || lastTime - currentTime > 5000){
				messageCopies[stringMessage] = currentTime;
				messages.push(message);
			}
		});
	}
	componentDidMount(){
		this.sendAndRefreshMessages()
	}
	componentWillUpdate(){
		this.sendAndRefreshMessages()
	}
	forceRefresh(){
		this.forceUpdate();
	}
	sendAndRefreshMessages(){
		let {dispatch} = this;
		if(this.messages.length > 0){
			sendMessages(dispatch, this.messages.slice(0))
			this.messages = [];	
		}
	}
}