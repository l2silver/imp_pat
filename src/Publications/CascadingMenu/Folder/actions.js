//@flow
import {createChildMessage, sendMessages} from '@imp_pat/ui-kit/utils/messageUtils';
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