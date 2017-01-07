// @flow
import React from 'react';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';

import {BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';

import {getName} from '@imp_pat/ui-kit/models/users';

import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import Item from './Item';
export class YourPublications extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages');
	}
	render(){
		const {user, publicationIds} = this.props;
		return <div>
			<h1>{getName(user)}</h1>
			<ul>
				{
					publicationIds.map(publicationId => <Item key={`yourPublication-publication-${publicationId}`} publicationId={publicationId} />)
				}
			</ul>
		</div>
	}
	baseRestMessages(){
		const {userId} = this.props;
		const getPublications = getMessage(
			'users',
			{
				id: userId, 
			},
			{
				serviceName: 'publications',
				serviceRestType: 'yourPublications',
			}
		);
		return [getPublications];
	}
}

function mapStateToPropsFactory(){
	const getUserId = getQuery('panelUserId')
	return createStructuredSelector({
		userId: getUserId,
		user:   findEntity(getUserId, 'users'),
		publicationIds: getRelatedEntityIds(getUserId, 'users', 'yourPublications'),
	});
}


export default connect(mapStateToPropsFactory)(YourPublications)