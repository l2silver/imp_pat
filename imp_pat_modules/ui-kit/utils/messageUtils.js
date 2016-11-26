//@flow
import {post} from './serviceUtils';
import {createAction} from './actionUtils';
import {batchActions} from 'redux-batched-actions';
import deepExtend from 'deep-extend';
import {baseRestConstants} from './constantUtils';
const url = 'http://localhost:8080';

const {BASE_REST, CREATE, UPDATE, DELETE, GET, INDEX} = baseRestConstants;

export type $Message = {
	name: string;
	restType: string;
	entity: *;
	subtype?: string;
	customType?: string;
	
};

export function generateMessage(restType: string, name: string, entity: *, options: * = {}) : $Message{
	const message = {
		type: BASE_REST,
		name,
		restType,
		entity,
		...options
	}
	return message;
}

export function sendMessages(dispatch: Function, ...messagePackages: Array<Array<$Message>>){
	return post(`${url}/graphQL`, {graphQL: messagePackages})
	.then((responses)=>{
		if(typeof responses  === 'object' && responses.errors){
			throw responses.errors
		}
		const finalActions = messagePackages.map((messagePackage, i)=>{
			return messagePackage.map((message, ii)=>{
				const messageResponse = responses[i][ii];
				return deepExtend(message, messageResponse);
			});
		});
		dispatch(
			batchActions(
				finalActions.map(
					finalAction => batchActions(finalAction)
				)
			)
		);
		return;
	});
}

export function createMessage(name: string, entity: *, options: *){
	return generateMessage(CREATE, name, entity, options);
}

export function updateMessage(name: string, entity: *, options: *){
	return generateMessage(UPDATE, name, entity, options);
}

export function deleteMessage(name: string, entity: *, options: *){
	return generateMessage(DELETE, name, entity, options);
}

export function getMessage(name: string, entity: *, options: *){
	return generateMessage(GET, name, entity, options);
}

export function indexMessage(name: string, entity: *, options: *){
	return generateMessage(INDEX, name, entity, options);
}

export function customMessage(type: string, name: string, entity: *, options: *){
	return generateMessage(type, name, entity, options);
}