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

export function goToIndexPerspective(perspectiveEntityId: number, perspectiveType: number): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: indexLocation,
			perspectiveType,
			perspectiveEntityId,
		}))
	}
}

export function goToCreatePerspective(perspectiveEntityId: number, perspectiveType: number): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: createLocation,
			perspectiveType,
			perspectiveEntityId,
		}))
	}
}

export function goToShowPerspective(perspectiveId: number): Function{
	return dispatch=>{
		dispatch(queryPush({
			panelOpen: true,
			panelLocation: showLocation,
			perspectiveId,
		}))
	}
}