// @flow
import {locationPush} from '../../utils/routerUtils';

export const practiceTypes  = {
	micro: 1,
	best: 2,
}

export const statusTypes  = {
	draft: 1,
	published: 2,
}



export function goToPublication(id: number): Function{
	return dispatch=>{
		dispatch(locationPush(`/publications/${id}`))
	}
}

export function goToEditPublication(id: number) : Function{
	return dispatch=>{
		dispatch(locationPush(`/publications/${id}/edit`))
	}
}