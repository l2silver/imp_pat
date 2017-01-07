import {currentSessionId} from '@imp_pat/ui-kit/models/sessions';
import {sendMessagesFrontend, sendMessages, deleteMessage, getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {LOGOUT} from './actionHandlers';

export function logout(){
	return (dispatch)=>sendMessagesFrontend(
		dispatch,
		[
			deleteMessage(
				'sessions',
				{
					id: currentSessionId
				},
				{
					customType: LOGOUT
				}
			)
		]
	);
}

export function search(searchText){
	return (dispatch)=>sendMessages(
		dispatch, 
		[
			getMessage(
				'search',
				{
					id: currentSessionId,
					searchText,
				},
				{
					serviceRestType: 'search',
					serviceName: 'publications',
				}
			)
		]
	);
}