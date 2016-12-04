//@flow
import {post} from './serviceUtils';
import {batchActions} from 'redux-batched-actions';
import deepExtend from 'deep-extend';
import {baseRestConstants} from './constantUtils';
import {decamelizeKeys, camelizeKeys} from 'humps';
import pluralize from 'pluralize';
const url = 'http://localhost:8080';

const {BASE_REST, CREATE, UPDATE, DELETE, GET, INDEX, LINK} = baseRestConstants;

export type $Message = {
	name: string;
	restType: string;
	entity: *;
	subtype?: string;
	customType?: string;	
};

export type $relationship = {
	parentId: number;
	parentName: string;
	alias?: string;
};

export function generateMessage(type: string, restType: string, name: string, entity: *, options: * = {}) : $Message{
	const message = {
		type,
		name,
		restType,
		entity,
		...options
	}
	return message;
}

export function generateBaseRestMessage(restType: string, name: string, entity: *, options: * = {}){
	return generateMessage(BASE_REST, restType, name, entity, options);
}

type $messagePackages = $Message[];

function stripMessagesForPosting(messagePackages: $messagePackages[]){
	return messagePackages.map(
		messagePackage=>messagePackage.map(
			({restType, entity, name})=>({restType, entity: decamelizeKeys(entity), name})
		)
	);
}

export function sendMessages(dispatch: Function, ...messagePackages: $messagePackages[]){
	return post(`${url}/graphQL`, {graphQL: stripMessagesForPosting(messagePackages)})
	.then((responses)=>{
		if(typeof responses  === 'object' && responses.errors){
			throw responses.errors
		}
		const finalActions = messagePackages.map((messagePackage, i)=>{
			return messagePackage.map((message, ii)=>{
				const messageResponse = camelizeKeys(responses[i][ii]);
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
		return responses;
	});
}

export function createMessage(name: string, entity: *, options: *){
	return generateBaseRestMessage(CREATE, name, entity, options);
}

export function createChildMessage(name: string, entity: *, relationship: $relationship, options: *){
	const optionsWithRelationship = {
		...options,
		relationship,
		subType: LINK,
	};

	const entityWithParentId = {
		...entity,
		[`${pluralize(relationship.parentName, 1)}Id`]: relationship.parentId,
	};
	return generateBaseRestMessage(CREATE, name, entityWithParentId, optionsWithRelationship);
}

export function updateMessage(name: string, entity: *, options: *){
	return generateBaseRestMessage(UPDATE, name, entity, options);
}

export function deleteMessage(name: string, entity: *, options: *){
	return generateBaseRestMessage(DELETE, name, entity, options);
}

export function getMessage(name: string, entity: *, options: *){
	return generateBaseRestMessage(GET, name, entity, options);
}

export function indexMessage(name: string, entity: *, options: *){
	return generateBaseRestMessage(INDEX, name, entity, options);
}

export function customMessage(type: string, name: string, entity: *, options: *){
	return generateBaseRestMessage(type, name, entity, options);
}