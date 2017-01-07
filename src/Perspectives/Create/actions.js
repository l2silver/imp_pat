// @flow
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {sendMessages, createChildMessage} from '@imp_pat/ui-kit/utils/messageUtils';

import {indexLocation, types} from '@imp_pat/ui-kit/models/perspectives';

export function submit(newPerspective: Object) : Function{
	const isFolderPerspective = Number(newPerspective.type) === types.folder;
	const message = createChildMessage(
		'perspectives',
		newPerspective,
		{
			parentName: isFolderPerspective ? 'publishedFolders' : 'publishedSections',
			parentId: newPerspective.entityId,
		},
	)
	return dispatch => sendMessages(dispatch, [message]).then(()=>{
		return dispatch(queryPush({panelLocation: indexLocation}))
	});
}