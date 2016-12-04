//@flow
import {Map, fromJS, List} from 'immutable';
import {baseRestConstants} from './constantUtils';
import {fullSchema, schemaTypes} from './schemaUtils';

const {BASE_REST, GET, INDEX, CREATE, UPDATE, DELETE, LINK, UNLINK, REORDER} = baseRestConstants;

import type {$relationship} from './messageUtils';

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

export function baseRestActionHandlers(state: * = new Map({
	entities: new Map(),
	relationships: new Map(),
}), action: *){
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
	case GET:
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

function cleanEntity(name, entity, fullSchema, entities, relationships) {
	const schema = fullSchema[name];
	if(!schema){
		throw new TypeError(`schema missing ${name}`);
	}
	const nextEntities = {};
	schema.forEach(({name: nextName, alias, type})=>{
		const finalName = alias || nextName;
		const relatedEntities = entity[finalName];
		if(!relatedEntities){
			return nextEntities;
		};
		nextEntities[nextName] = relatedEntities;
		if(!relationships[name]){
			relationships[name] = {};
		}
		
		const relatedEntityIds = type === schemaTypes.ONE ? relatedEntities.id : relatedEntities.map(({id})=>id);
		if(!relationships[name][finalName]){
			relationships[name][finalName] = {};
		}
		relationships[name][finalName][entity.id] = relatedEntityIds;
		delete entity[finalName];
	})
	if(!entities[name]){
		entities[name] = {};
	}
	entities[name][entity.id] = entity;
	return nextEntities;
}

export function baseRestParseResponse(name: string, entity: Object, fullSchema: Object, entities: Object={}, relationships: Object={}){
	const nextEntities = cleanEntity(name, entity, fullSchema, entities, relationships);
	Object.keys(nextEntities).forEach((nextName)=>{
		Array.isArray(nextEntities[nextName]) ? 
			nextEntities[nextName].forEach((nextEntity)=>{
				baseRestParseResponse(nextName, nextEntity, fullSchema, entities, relationships);
			})
		:
			baseRestParseResponse(nextName, nextEntities[nextName], fullSchema, entities, relationships);
	})
}

export function baseRestParseResponseWrapper(name: string, entity: Object, fullSchema: Object){
	const relationships = {};
	const entities = {};
	baseRestParseResponse(name, entity, fullSchema, entities, relationships);
	return {relationships, entities};
}

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
	const entitiesAndRelationships = baseRestParseResponseWrapper(name, entity, fullSchema);
	return state.mergeDeep(entitiesAndRelationships);
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

function linkActionHandler(
	state,
	action: {
		name: string;
		entity: {
			id: number;
		};
		relationship: $relationship;
	}
){
	const {
		name,
		entity: {
			id
		},
		relationship: {
			parentName,
			alias,
			parentId
		}
	} = action;
	return state.updateIn(
		[
			'relationships',
			parentName,
			alias || name,
			`${parentId}`,
		],
		(childIds)=>{
			if(childIds){
				return childIds.push(
					id
				);
			}
			return new List([id]);
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