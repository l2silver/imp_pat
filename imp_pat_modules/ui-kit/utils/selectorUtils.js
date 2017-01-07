//@flow
import {Map, List} from 'immutable';
import {createSelector} from 'reselect';
import {fullSchema, schemaTypes} from './schemaUtils';

const {relationshipsSchema} = fullSchema
export function getEntity(entityName: string){
	return (state: Object)=>state.baseRest.getIn(['entities', entityName], new Map());
}

export function getRelationship(entityName: string, relationshipName: string){
	return (state: Object)=>state.baseRest.getIn(['relationships', entityName, relationshipName], new Map());
}

export function getRelatedEntity(idSelector: Function, entityName: string, relationshipName: string){
	const schemas = relationshipsSchema[entityName];
	if(!schemas){
		throw `${entityName} missing relationshipsSchema`;
	}
	const relationship = schemas.find(({alias, name})=>alias === relationshipName || name === relationshipName);
	return createSelector(
		[
			idSelector,
			getEntity(relationship.name),
			getRelationship(entityName, relationship.alias || relationship.name),
		],
		(entityId, relatedEntity, relationshipToEntity)=>{
			if(relationship.type === schemaTypes.ONE){
				const id = relationshipToEntity.get(`${entityId}`);
				return relatedEntity.get(`${id}`, new Map());
			}
			return relationshipToEntity.get(`${entityId}`, new List()).map(id=>relatedEntity.get(`${id}`));	
		}

	)
}

export function getRelatedEntityIds(idSelector: Function, entityName: string, relationshipName: string){
	const schemas = relationshipsSchema[entityName];
	if(!schemas){
		throw `${entityName} missing relationshipsSchema`;
	}
	const relationship = schemas.find(({alias, name})=>alias === relationshipName || name === relationshipName);
	return createSelector(
		[
			idSelector,
			getEntity(relationship.name),
			getRelationship(entityName, relationship.alias || relationship.name),
		],
		(entityId, relatedEntity, relationshipToEntity)=>{
			if(relationship.type === schemaTypes.ONE){
				return relationshipToEntity.get(`${entityId}`);
			}
			return relationshipToEntity.get(`${entityId}`, new List());	
		}

	)
}

export function findEntity(idSelector: Function, entityName: string){
	return createSelector([
			idSelector,
			getEntity(entityName),
		],
		(id, entity)=>{
			return entity.get(`${id}`, new Map())
		}
	)
}