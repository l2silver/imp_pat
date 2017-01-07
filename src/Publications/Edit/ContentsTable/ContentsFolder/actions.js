import {sendMessages, reorderMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function reorder(id, ordinal, parentId){
	return dispatch=>{
		const message = reorderMessage('folders', {id, ordinal}, {parentName: 'folders', parentId, });
		return sendMessages(dispatch, [message])
	}
}
