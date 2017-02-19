// @flow
import {sendMessages, updateMessage, createMessage, createChildMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {statusTypes} from '@imp_pat/ui-kit/models/publications';

export function updatePublication(id: number, newValues: Object) : Function {
	return dispatch => {
		return sendMessages(dispatch, [updateMessage('publications', {id, ...newValues})])
	}
}

export function publish(id: number) : Function{
	const message = updateMessage('publications', {id, status: statusTypes.published}, {serviceRestType: 'publish'})
	return dispatch => {
		return sendMessages(dispatch, [message])
	}
}

export function submitPullRequest(publicationId: number) : Function {
	const message = createChildMessage('pullRequests', {publicationId}, {parentName: 'publications', parentId: publicationId, alias: 'notAcceptedPullRequest'})
	return dispatch => {
		return sendMessages(dispatch, [message]);
	}	
}

export function updatePullRequest(publicationId: number) : Function {
	const message = updateMessage('pullRequests', {publicationId}, {serviceRestType: 'create'})
	return dispatch => {
		return sendMessages(dispatch, [message]);
	}
}

export function unlockPullRequest(id: number) : Function {
	const message = updateMessage('pullRequests', {id}, {serviceRestType: 'deactivate'})
	return dispatch => {
		return sendMessages(dispatch, [message]);
	}
}