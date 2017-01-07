//@flow
import {createMessage, sendMessages} from '@imp_pat/ui-kit/utils/messageUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';
export function create(){
	return (dispatch: Function) => {
		sendMessages(
			dispatch,
			[createMessage('publications', {})]
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