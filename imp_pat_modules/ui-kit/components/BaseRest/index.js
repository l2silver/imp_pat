//@flow
import React, {PureComponent, PropTypes} from 'react';
import type {$Message} from '../../utils/messageUtils';

type $context = {
	getMessages: Function;
};

export class BaseRest extends PureComponent {
	context: $context;
	static contextTypes = {
		getMessages: PropTypes.func,
	};
	constructor(props: Object, context: $context){
		super(props);
		context.getMessages(this.baseRestMessages());
	}
	baseRestMessages() : $Message[]{
		return [];
	}
}