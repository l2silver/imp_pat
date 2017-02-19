//@flow
import {createChildMessage, sendMessages} from '@imp_pat/ui-kit/utils/messageUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

export function create(userId: number){
	return (dispatch: Function) => {
		sendMessages(
			dispatch,
			[createChildMessage('publications', {}, {
				parentName: 'users',
				parentId: userId,
				alias: 'myPublications',
			})]
		)
		.then((response)=>{
			const [[{entity}]] = response;
			const {id} = entity;
			const {folder: {sections}} = entity;
			const [{id: sectionId}] = sections;
			dispatch(locationPush(`/publications/${id}/edit/sections/${sectionId}`))
		})
	}
}