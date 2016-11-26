//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LinkedTextInput, Button, PanelContent} from '@imp_pat/ui-kit/components';
import {form} from '@imp_pat/ui-kit/hoc';
import {shallowToJS} from '@imp_pat/ui-kit/utils/formUtils';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {createMessage, customMessage, sendMessages} from '@imp_pat/ui-kit/utils/messageUtils';
import {REGISTER, CHECK_EMAIL} from './actionHandlers';

class Signup extends PureComponent {
	render(){
		const {fields, actions} = this.props;
		return <PanelContent title={'Signup'}>
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
			submit(newUser){
				const createUser = createMessage('users', newUser, {customType: REGISTER});
				return sendMessages(dispatch, [createUser]);
			}
		},
		onChange: {
			email(emailField, fields){
				const checkEmail = customMessage(CHECK_EMAIL, 'users', {email: emailField.get('value')});
				return sendMessages(dispatch, [checkEmail]);	
			}
		}
	}
}

export default connect(null, mapDispatchToProps)(form({fields, config}, Signup));