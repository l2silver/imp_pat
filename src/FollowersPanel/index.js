// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {followersPanelId} from './constants';
import UserListItem from '../Users/ListItem'
export class FollowersPanel extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {userIds} = this.props;
		return <Container>
			<h1>Followers</h1>
			{
				userIds.map(
					userId=><UserListItem
						key={`followersPanel-user-${userId}`}
						userId={userId} 
					/>
				)
			}
		</Container>
	}
	baseRestMessages(){
		const getFeed = getMessage(
			'followersPanel',
			{
				id: followersPanelId
			},
			{
				serviceName: 'follows',
				serviceRestType: 'getMyFollowers',
			}
		);
		return [getFeed];
	}
}
const getFollowersPanelId = ()=>followersPanelId;

const mapStateToProps = createStructuredSelector({
	userIds: getRelatedEntityIds(getFollowersPanelId, 'followersPanel', 'users'),
})

export default connect(mapStateToProps)(FollowersPanel);