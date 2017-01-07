import {sendMessages, updateMessage, deleteMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function deleteSection(id: number){
	return dispatch=>{
		return sendMessages(dispatch, [deleteMessage('sections', {id})]);
	}
}

export function updateSection(id: number, name: string){
	return dispatch=>{
		return sendMessages(dispatch, [updateMessage('sections', {id, name})]);
	}
}