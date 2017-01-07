// @flow
import {Map} from 'immutable';
import {queryPush} from '../../utils/routerUtils';
import {getRelatedEntityIds, getRelatedEntity} from '../../utils/selectorUtils';
import {getCurrentSessionId} from '../sessions';

export const getCurrentUserId = getRelatedEntityIds(getCurrentSessionId, 'sessions', 'user');
export const getCurrentUser = getRelatedEntity(getCurrentSessionId, 'sessions', 'user');
export function getName(user: Map<string, any>){
	return user.get('email')
}

export function goToUser(id: number): Function{
	return dispatch=>dispatch(
		queryPush({
			panelOpen: true,
			panelLocation: 'yourPublications',
			panelUserId: id,
		})
	);
}