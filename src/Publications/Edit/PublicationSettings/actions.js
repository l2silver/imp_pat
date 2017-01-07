import {sendMessages, updateMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {statusTypes} from '@imp_pat/ui-kit/models/publications';

export function updatePublication(id, newValues){
	return dispatch => {
		return sendMessages(dispatch, [updateMessage('publications', {id, ...newValues})])
	}
}

export function publish(id){
	const message = updateMessage('publications', {id, status: statusTypes.published}, {serviceRestType: 'publish'})
	return dispatch => {
		return sendMessages(dispatch, [message])
	}
}