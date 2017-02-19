// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush, queryPush} from '@imp_pat/ui-kit/utils/routerUtils';

import {incomingId, incomingTableName, showIncomingLocation} from '@imp_pat/ui-kit/models/pullRequests';

import PullRequestListItem from '../ListItem';

export class IncomingPullRequestsPanel extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {incomingPullRequestIds, goToPullRequest} = this.props;
		return <Container>
			<h1>Incoming Pull Requests</h1>
			{
				incomingPullRequestIds.map(
					pullRequestId=><PullRequestListItem
						key={`pull-request-${pullRequestId}`}
						onClick={goToPullRequest}
						id={pullRequestId}
					/>
				)
			}
		</Container>
	}
	baseRestMessages(){
		const getIncoming = getMessage(
			incomingTableName,
			{
				id: incomingId
			},
			{
				serviceName: 'pullRequests',
				serviceRestType: 'getIncoming',
			}
		);
		return [getIncoming];
	}
}
const getIncomingPullRequestsId = ()=>incomingId;

const mapStateToProps = createStructuredSelector({
	incomingPullRequestIds: getRelatedEntityIds(getIncomingPullRequestsId, incomingTableName, 'pullRequests'),
})

function mapDispatchToProps(dispatch){
	return {
		goToPullRequest(pullRequest){
			dispatch(queryPush({
				panelLocation: showIncomingLocation,
				panelOpen: true,
				pullRequestId: pullRequest.get('id'),
			}));
			dispatch(locationPush(`/publications/${pullRequest.get('cloneId')}/pullRequestReview`));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingPullRequestsPanel);