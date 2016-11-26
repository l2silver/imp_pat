//@flow
import {createSelector} from 'reselect';
import {push} from 'react-router-redux';
export const getIdParam = createSelector(
	[
		(state)=>state.routing.locationBeforeTransitions.pathname
	],
	(pathName)=>{
		return pathName.split('/').reduce((id, partialPath)=>{
			if(partialPath && !isNaN(partialPath)){
				return partialPath
			}
			return id;
		}, null)
	}
);

export function queryPush(nextQuery: Object){
	return (dispatch: Function, getState: Function)=>{
		const {query, pathname } = getState().routing.locationBeforeTransitions; 
		dispatch(
			push({
				pathname,
				query: {...query, ...nextQuery}
			})
		);
	}
}

export function locationPush(nextLocation: string){
	return (dispatch: Function, getState: Function)=>{
		const {query } = getState().routing.locationBeforeTransitions; 
		dispatch(
			push({
				query,
				pathname: nextLocation,
			})
		);
	}
}