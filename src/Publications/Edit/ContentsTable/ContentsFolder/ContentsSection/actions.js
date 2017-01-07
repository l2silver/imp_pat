import {sendMessages, reorderMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function reorder(id, ordinal, parentId){
	return dispatch=>{
		const message = reorderMessage('sections', {id, ordinal}, {parentName: 'folders', parentId, });
		return sendMessages(dispatch, [message])
	}
}
