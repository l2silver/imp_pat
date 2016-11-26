//@flow
import {baseRestConstants} from './constantUtils';
import {Map, fromJS, List} from 'immutable';

const {BASE_REST, CREATE, UPDATE, DELETE, LINK, UNLINK, REORDER} = baseRestConstants;

export function actionGenerator(type: string, restType: string, name: string) {
	return (payload: *)=>{
		if(payload instanceof Error){
			return {
				type,
				restType,
				name,
				payload,
				error: true
			}
		}
		return {
			type,
			restType,
			name,
			payload,
		}
	}
}

export function createAction(name: string, entity: any){
	return actionGenerator(BASE_REST, CREATE, name)({name, entity});
}

export function baseRestActionHandlers(state: * = new Map(), action: *){
	return baseCustomActionHandlers(
		baseSubactionHandlers(
			baseActionHandlers(
				state,
				action
			),
			action
		),
		action
	)
}

function baseActionHandlers(state: Map<string, Map<string, any>>, action: *){
	switch(action.type){
	case BASE_REST:
		return restActionHandlers(state, action);
	default:
		return state
	}
}

function baseSubactionHandlers(state: Map<string, Map<string, any>>, action: *){
	switch(action.type){
	case BASE_REST:
		return restSubactionHandlers(state, action);
	default:
		return state
	}
}

function baseCustomActionHandlers(state: Map<string, Map<string, any>>, action: *){
	switch(action.type){
	case BASE_REST:
		return restCustomActionHandlers(state, action);
	default:
		return state
	}
}

function restActionHandlers(state, action){
	switch(action.restType){
	case CREATE:
		return createActionHandler(state, action);
	case DELETE:
		return deleteActionHandler(state, action);
	case UPDATE:
		return updateActionHandler(state, action);
	case LINK:
		return linkActionHandler(state, action);
	case UNLINK:
		return unlinkActionHandler(state, action);
	case REORDER:
		return reorderActionHandler(state, action);
	default:
		return state;
	}
}

function restSubactionHandlers(state, action){
	switch(action.subType){
	case LINK:
		return linkActionHandler(state, action);
	case UNLINK:
		return unlinkActionHandler(state, action);
	default:
		return state;
	}
}

const customActionHandlers = {};

export function setCustomActionHandlers(newCustomActionHandlers: Object){
	Object.keys(newCustomActionHandlers).forEach(key=>{
		customActionHandlers[key] = newCustomActionHandlers[key];
	});
}

function restCustomActionHandlers(state, action){
	const customActionHandler = customActionHandlers[action.customType];
	return customActionHandler ? customActionHandler(state, action) : state;
}

function createActionHandler(state, action){
	const {name, entity} = action;
	return state.setIn(
		[
			'entities',
			name,
			`${entity.id}`
		],
		fromJS(entity)
	);
}

function deleteActionHandler(state, action){
	const {name, entity} = action;
	return state.deleteIn(
		[
			'entities',
			name,
			`${entity.id}`
		]
	);
}

function updateActionHandler(state, action){
	const {name, entity} = action;
	return state.mergeIn(
		[
			'entities',
			name,
			`${entity.id}`
		],
		fromJS(entity)
	);
}

function linkActionHandler(state, action){
	const {name, entity} = action;
	return state.updateIn(
		[
			'relationships',
			entity.parentName,
			name,
			`${entity.parentId}`,
		],
		(childIds)=>{
			if(childIds){
				return childIds.add(entity.id)
			}
			return new List([entity.id]);
		}
	);
}

function unlinkActionHandler(state, action){
	const {name, entity} = action;
	return state.updateIn(
		[
			'relationships',
			entity.parentName,
			name,
			`${entity.parentId}`,
		],
		(childIds)=>{
			return childIds.filterNot(id=>id===entity.id)
		}
	);
}

function reorderActionHandler(state, action){
	const {name, entity} = action;
	return state.updateIn(
		[
			'relationships',
			entity.parentName,
			name,
			`${entity.parentId}`,
		],
		(childIds)=>{
			return childIds.delete(entity.id)
		}
	);
}