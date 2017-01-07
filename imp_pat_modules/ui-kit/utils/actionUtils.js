//@flow
import {Map, OrderedSet} from 'immutable';
import {baseRestConstants} from './constantUtils';
import {fullSchema, schemaTypes, findRelationshipsSchema} from './schemaUtils';

const {ONE} = schemaTypes;

const {BASE_REST, GET, CREATE, UPDATE, INDEX, DELETE, LINK, UNLINK, REORDER} = baseRestConstants;

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
	case INDEX:
		return indexActionHandler(state, action);
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
	const {relationshipsSchema, entitiesSchema} = fullSchema;
	if(!relationshipsSchema){
		throw new TypeError(`schema missing ${name}`);
	}
	const nextEntities = {};
	relationshipsSchema[name].forEach(({name: nextNameOrFunction, alias, type, inverse, inverseAlias, justRelationship})=>{
		
		const nextName = typeof nextNameOrFunction === 'function' ? nextNameOrFunction(entity) : nextNameOrFunction;
		if(inverse){
			const finalName = alias || nextName;
			const relatedEntities = entity[finalName];
			if(!relatedEntities){
				return nextEntities;
			};
			if(!justRelationship){
				nextEntities[nextName] = relatedEntities;
			}
			
			const inverseName = inverseAlias || name;
			if(!relationships[nextName]){
				relationships[nextName] = {};
			}
			
			const relatedEntityId = justRelationship ? relatedEntities : relatedEntities.id;
			if(!relationships[nextName][inverseName]){
				relationships[nextName][inverseName] = {};
			}
			if(type === ONE){
				relationships[nextName][inverseName][relatedEntityId] = entity.id;
			}else{
				relationships[nextName][inverseName][relatedEntityId] = (relationships[nextName][inverseName][relatedEntityId] || new OrderedSet()).add(entity.id)
			}			
		}else{
			const finalName = alias || nextName;
			const relatedEntities = entity[finalName];
			if(!relatedEntities){
				return nextEntities;
			};
			if(!nextEntities[nextName]){
				nextEntities[nextName] = relatedEntities;
			}else{
				nextEntities[nextName] = nextEntities[nextName].concat(relatedEntities);
			}
			if(!relationships[name]){
				relationships[name] = {};
			}
			
			const relatedEntityIds = type === schemaTypes.ONE ? relatedEntities.id : relatedEntities.map(({id})=>id);
			if(!relationships[name][finalName]){
				relationships[name][finalName] = {};
			}

			const relatedEntityIdsFinalForm = schemaTypes.ONE === type ? relatedEntityIds : new OrderedSet(relatedEntityIds);

			relationships[name][finalName][entity.id] = relatedEntityIdsFinalForm;
		}
	})
	if(!entities[name]){
		entities[name] = {};
	}
	const process = entitiesSchema[name];
	entities[name][entity.id] = process ? process(entity) : entity;
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
	// $FlowFixMe
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

function indexActionHandler(state, action){
	const {name, entity: entityList} = action;
	const relationships = {};
	const entities = {};
	entityList.forEach(entity=>{
		baseRestParseResponse(name, entity, fullSchema, entities, relationships);	
	})
	// $FlowFixMe
	return state.mergeDeep({entities, relationships});
}

function deleteActionHandler(state, action){
	const {name, entity} = action;
	const nextState = state.deleteIn(
		[
			'entities',
			name,
			`${entity.id}`
		]
	);
	const {relationshipsSchema, inverseRelationshipsSchema} = fullSchema;
	const relationships = relationshipsSchema[name];
	const relationshipsState = relationships.reduce((nextState, relationship)=>{
		return nextState.deleteIn(['relationships', name, relationship.alias || relationship.name, `${entity.id}`])
	}, nextState);
	const inverseRelationships = inverseRelationshipsSchema[name] || [];
	return inverseRelationships.reduce(
		(inverseRelationshipsState, [parentName, childName, type])=>{
			const allRelationships = inverseRelationshipsState.getIn(['relationships', parentName, childName])
			return allRelationships.toKeyedSeq().reduce((nextInverseRelationshipsState, relationships, id)=>{
				return nextInverseRelationshipsState.updateIn(
					['relationships', parentName, childName, id],
					(ids)=>{
						if(ids && ids.delete){
							return ids.delete(entity.id);	
						}
						if(type === schemaTypes.ONE){
							if(ids === entity.id){
								return null;
							}
						}
						return ids
					}
				)
			}, inverseRelationshipsState);
		},
	relationshipsState);

}

function updateActionHandler(state, action){
	const {name, entity} = action;
	return state.mergeDeepIn(
		[
			'entities',
			name,
			`${entity.id}`
		],
		entity
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
		findRelationshipsSchema(parentName, name, alias).type === schemaTypes.ONE ?
		()=>{
			return id;	
		}
		:
		(childIds)=>{
			if(childIds){
				return childIds.add(
					id
				);
			}
			return new OrderedSet([id]);
		}
	);
}

function unlinkActionHandler(state, action){
	const {
		name, 
		entity,
		xRelationship: {
			parentName,
			alias,
			parentId
		}} = action;

	return state.updateIn(
		[
			'relationships',
			parentName,
			alias || name,
			`${parentId}`,
		],
		(childIds)=>{
			if(childIds && childIds.filterNot){
				return childIds.filterNot(id=>id===entity.id)
			}
			return null;
		}
	);
}

function reorderActionHandler(state, action){
	const {name, entity: {id, ordinal}, yRelationship: {parentName, parentId, alias}} = action;

	return state.updateIn(
		[
			'relationships',
			parentName,
			alias || name,
			`${parentId}`,
		],
		(childIds)=>{
			const arr = childIds.toArray();
			const originalOrdinal = arr.indexOf(id);
			arr.splice(originalOrdinal, 1)
			arr.splice(ordinal, 0, id);
			return new OrderedSet(arr);
		}
	);
}