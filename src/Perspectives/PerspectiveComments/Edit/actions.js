// @flow

import {sendMessages, updateMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function submit(perspectiveComment: Object) : Function{
	const message = updateMessage(
		'perspectiveComments',
		perspectiveComment,
	)
	return dispatch => sendMessages(dispatch, [message]);
}