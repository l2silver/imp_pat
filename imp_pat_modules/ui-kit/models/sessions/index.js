// @flow
import {createSelector} from 'reselect';
import {getRelatedEntityIds} from '../../utils/selectorUtils';

export const currentSessionId = 'currentSessionId';
export const getCurrentSessionId = ()=>currentSessionId;
export const isLoggedIn = createSelector(
	[
		getRelatedEntityIds(getCurrentSessionId, 'sessions', 'user')
	],
	(id)=>!!id
)