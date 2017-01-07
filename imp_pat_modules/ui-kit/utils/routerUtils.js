//@flow
import {createSelector} from 'reselect';
import {push} from 'react-router-redux';
import {get} from 'lodash';

const parameterizeURL = createSelector(
	[
		(state)=>state.routing.locationBeforeTransitions.pathname
	],
	(pathName)=>{
		const ids = pathName.split('/').reduce((ids, partialPath)=>{
			if(partialPath && !isNaN(partialPath)){
				ids.push(partialPath)
			}
			return ids
		}, []);
		return ids;
	}
);

export const getIdParam = (i: number) => {
	return createSelector(
		[
			parameterizeURL
		],
		(ids)=>ids[i]
	);
};

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

export function getQuery(name: string) : Function {
	return (state)=>get(state, `routing.locationBeforeTransitions.query.${name}`);
}