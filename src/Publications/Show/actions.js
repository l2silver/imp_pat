//@flow
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {sendMessages, createChildMessage, deleteMessage, getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {baseRestConstants} from '@imp_pat/ui-kit/utils/constantUtils';
const {LINK} = baseRestConstants;

export function createStar(publicationId: number){
	const message = createChildMessage(
		'stars',
		{publicationId},
		{
			parentName: 'publishedPublications',
			parentId: publicationId,
			alias: 'star',
		}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function removeStar(id: number){
	const message = deleteMessage(
		'stars',
		{id}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function getUser(id: number, publicationId: number){
	const message = getMessage(
		'users',
		{id},
		{
			subType: LINK,
			relationship: {
				parentName: 'publishedPublications',
				parentId: publicationId,
				alias: 'user',
			}
		}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function createFollow(userId: number) : Function{
	const message = createChildMessage(
		'follows',
		{userId},
		{
			parentName: 'users',
			parentId: userId,
			alias: 'follow',
		}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function removeFollow(id: number) : Function {
	const message = deleteMessage(
		'follows',
		{id}
	)
	return dispatch=>sendMessages(dispatch, [message]);
}

export function forkPublication(id: number, userId: number) : Function {
	return (dispatch: Function) => {
		sendMessages(
			dispatch,
			[createChildMessage('publications', {id}, {
				parentName: 'users',
				parentId: userId,
				alias: 'myPublications',
			}, {
				serviceName: 'publicationVersions',
				serviceRestType: 'forkPublication',
			})]
		)
		.then((response)=>{
			const [[{entity}]] = response;
			const {id} = entity;
			dispatch(locationPush(`/publications/${id}/edit`))
		})
	}
}
