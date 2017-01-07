//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {form} from '@imp_pat/ui-kit/hoc';
import {currentSessionId} from '@imp_pat/ui-kit/models/sessions';
import {LinkedTextInput, Button, PanelContent} from '@imp_pat/ui-kit/components';
import {createMessage, sendMessages} from '@imp_pat/ui-kit/utils/messageUtils';
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils';

import {LOGIN} from './actionHandlers';

class Login extends PureComponent {
	render(){
		const {fields, actions} = this.props;
		return <PanelContent title={'Login'}>
			<LinkedTextInput type='email' field={fields.get('email')} />
			<LinkedTextInput type='password' field={fields.get('password')} />
			<Button 
				{
					...actions.submit
				}
			/>
		</PanelContent>
	}
}

const fields = {
	email: {
		verify: ['email', 'required'],
		isValid: false,

	},
	password: {
		verify: ['required', 'minLength:6']
	},
}

const config = {
	isValid: false
};

function mapDispatchToProps(dispatch){
	return {
		actions: {
			submit(user){
				const createUser = createMessage('sessions', {...user, id: currentSessionId}, {customType: LOGIN});
				return sendMessages(dispatch, [createUser])
				.then(()=>dispatch(queryPush({panelOpen: ''})));
			}
		},
	}
}

export default connect(null, mapDispatchToProps)(form({fields, config}, Login));