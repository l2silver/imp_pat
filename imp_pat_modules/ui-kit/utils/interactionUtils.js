//@flow
import {Map, fromJS} from 'immutable';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {generateMessage, sendMessages} from './messageUtils';
import {baseRestConstants} from './constantUtils';

const {GET, CREATE, INDEX} = baseRestConstants;
export const INTERACTION = 'interaction';


export function generateInteractionMessage(restType: string, entity: *, options: * = {}){
	return generateMessage(INTERACTION, restType, 'interactions', entity, options);
}

export function getInteractionMessage(entity: Object){
	return generateInteractionMessage(GET, entity)
}

export function createInteractionMessage(entity: Object){
	return generateInteractionMessage(CREATE, entity)
}

export function indexInteractionMessage(){
	return generateInteractionMessage(INDEX, [])
}

function createInteractionActionHandler(state, action){
	const {location, identity, value} = action.entity;
	return state.mergeIn([location, `${identity}`], value);
}

function indexInteractionActionHandler(state, action){
	const interactions = action.entity;
	return interactions.reduce((state, {location, identity, name, value})=>{
		return state.setIn([location, `${identity}`, name], fromJS(value));
	}, state);
}

function interactionActionHandler(state: *, action: *){
	switch(action.restType){
	case CREATE:
		return createInteractionActionHandler(state, action);
	case INDEX:
		return indexInteractionActionHandler(state, action);
	default:
		return state;	
	}	
}

export function interactionReducer(state: Map<string, any> = new Map(), action: *){
	switch(action.type){
	case INTERACTION:
		return interactionActionHandler(state, action);
	default:
		return state;
	}
}

export function interactivate(location: string, defaultValues?: Object){
	return (WrappedComponent: any) => {	
		const mapStateToProps = createSelector(
			[
				(state, {interactionIdentity})=>interactionIdentity,
				(state)=>state.interactions.get(location, new Map()),
			],
			(identity, interactions)=>{
				return ({interactions: interactions.get(`${identity}`) || new Map(defaultValues)});
			}
		);

		function mapDispatchToProps(dispatch, {interactionIdentity: identity}){
			return {
				interact(value){
					sendMessages(dispatch, [createInteractionMessage({location, identity, value})])
				}
			};
		}

		return connect(mapStateToProps, mapDispatchToProps)(
			class Interaction extends PureComponent {
				render(){
					return <WrappedComponent {...this.props} />
				}
			}
		);
	}
}