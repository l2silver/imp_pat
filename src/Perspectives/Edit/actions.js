// @flow

import {sendMessages, updateMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function submit(newPerspective: Object) : Function{
	const message = updateMessage(
		'perspectives',
		newPerspective,
	)
	return dispatch => sendMessages(dispatch, [message]);
}