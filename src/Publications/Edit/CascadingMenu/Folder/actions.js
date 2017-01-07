//@flow
import {createChildMessage, sendMessages, updateMessage, deleteMessage, linkMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {baseRestConstants} from '@imp_pat/ui-kit/utils/constantUtils';
const {UNLINK} = baseRestConstants;
export function create(parentId: number){
	return (dispatch: Function) => {
		const message = createChildMessage(
			'folders', 
			{}, 
			{
				parentId,
				parentName: 'folders',
			}
		);
		return sendMessages(dispatch, [message]);
	}	
}
export function createSection(parentId: number){
	return (dispatch: Function) => {
		const message = createChildMessage(
			'sections', 
			{}, 
			{
				parentId,
				parentName: 'folders',
			}
		);
		return sendMessages(dispatch, [message]);
	}	
}

export function updateFolder(id: number, name: string){
	return (dispatch: Function) => {
		const message = updateMessage(
			'folders', 
			{id, name},
		);
		return sendMessages(dispatch, [message]);
	}	
}

export function deleteFolder(id: number){
	return (dispatch: Function) => {
		const message = deleteMessage(
			'folders', 
			{id},
		);
		return sendMessages(dispatch, [message]);
	}	
}

export function changeParent(entityName: string, parentId: number, childId: number, originalParentId: number){
	return (dispatch: Function) => {
		const options = {
			subType: UNLINK,
			xRelationship: {
				parentId: originalParentId,
				parentName: 'folders',
			},
		}
		const message = linkMessage(
			entityName, 
			{
				id: childId,
				folderId: parentId
			},
			{
				parentId,
				parentName: 'folders',
			},
			options,
		);
		return sendMessages(dispatch, [message]);
	}
}