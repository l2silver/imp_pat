// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {followingPanelId} from './constants';
import UserListItem from '../Users/ListItem'
export class FollowingPanel extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {userIds} = this.props;
		return <Container>
			<h1>Following</h1>
			{
				userIds.map(
					userId=><UserListItem
						key={`followingPanel-user-${userId}`}
						userId={userId} 
					/>
				)
			}
		</Container>
	}
	baseRestMessages(){
		const getFeed = getMessage(
			'followingPanel',
			{
				id: followingPanelId
			},
			{
				serviceName: 'follows',
				serviceRestType: 'getMyFollowing',
			}
		);
		return [getFeed];
	}
}
const getFollowingPanelId = ()=>followingPanelId;

const mapStateToProps = createStructuredSelector({
	userIds: getRelatedEntityIds(getFollowingPanelId, 'followingPanel', 'users'),
})

export default connect(mapStateToProps)(FollowingPanel);