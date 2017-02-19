// @flow
import {queryPush} from '../../utils/routerUtils';

export const types  = {
	folder: 1,
	section: 2,
}

export const statusTypes  = {
	open: 1,
	closed: 2,
}

export const indexLocation = 'indexPerspective'
export const createLocation = 'createPerspective'
export const showLocation = 'showPerspective'

export function goToIndex(): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: indexLocation,
		}))
	}
}

export function goToCreate(perspectiveEntityId: number, perspectiveType: number, publicationId?: number): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: createLocation,
			perspectiveType,
			perspectiveEntityId,
			perspectiveFromPublication: publicationId,
		}))
	}
}

export function goToShow(perspectiveId: number): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: showLocation,
			perspectiveId,
		}))
	}
}