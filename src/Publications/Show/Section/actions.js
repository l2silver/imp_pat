//@flow
import {sendMessages, createChildMessage, deleteMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function createLike(sectionId: number) : Function{
	const message = createChildMessage(
		'likes',
		{sectionId},
		{
			parentName: 'sections',
			parentId: sectionId,
			alias: 'like',
		}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function removeLike(id: number) : Function {
	const message = deleteMessage(
		'likes',
		{id}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}