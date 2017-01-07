// @flow

import {sendMessages, createChildMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function submit(newPerspectiveComment: Object) : Function{
	const message = createChildMessage(
		'perspectiveComments',
		newPerspectiveComment,
		{
			parentName: 'perspectives',
			parentId: newPerspectiveComment.perspectiveId,
		},
	)
	return dispatch => sendMessages(dispatch, [message]);
}