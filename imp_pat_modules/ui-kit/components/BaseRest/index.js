//@flow
import {Component, PropTypes} from 'react';
import type {$Message} from '../../utils/messageUtils';

type $context = {
	getMessages: Function;
	forceRefresh: Function;
};

export class BaseRest extends Component {
	context: $context;
	static contextTypes = {
		getMessages: PropTypes.func,
		forceRefresh: PropTypes.func,
		parent: PropTypes.any,
	};
	forceRefresh: Function;
	constructor(props: Object, context: $context){
		super(props);
		context.getMessages(this.baseRestMessages());
		const parent = context.parent;
		this.forceRefresh = context.forceRefresh.bind(parent);
	}
	componentDidMount(){
		this.forceRefresh();
	}
	baseRestMessages() : $Message[]{
		return [];
	}
}