//@flow
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

const INTERACTION = 'interaction';

function interactionActionHandler(state: *, action: *){
	return state.mergeIn([action.location, action.identity], action.interactions);
}

export function interactionReducer(state: Map<string, any> = new Map(), action: *){
	switch(action.type){
	case INTERACTION:
		return interactionActionHandler(state, action);
	default:
		return state;
	}
}

function interactionGenerator(location: string, identity: string, interactions: Object) {
	return {
		type: INTERACTION,
		location,
		identity,
		interactions,
	}
}

export function interact(location: string, defaultValues?: Object){
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

		function mapDispatchToProps(dispatch, {interactionIdentity}){
			return {
				interact(interactions){
					dispatch(interactionGenerator(location, interactionIdentity, interactions))
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




