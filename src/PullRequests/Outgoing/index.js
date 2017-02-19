// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils';

import {outgoingId, outgoingTableName, showOutgoingLocation} from '@imp_pat/ui-kit/models/pullRequests';

import PullRequestListItem from '../ListItem';

export class OutgoingPullRequestsPanel extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {outgoingPullRequestIds, goToPullRequest} = this.props;
		return <Container>
			<h1>Outgoing Pull Requests</h1>
			{
				outgoingPullRequestIds.map(
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
			outgoingTableName,
			{
				id: outgoingId
			},
			{
				serviceName: 'pullRequests',
				serviceRestType: 'getOutgoing',
			}
		);
		return [getIncoming];
	}
}
const getOutgoingPullRequestsId = ()=>outgoingId;

const mapStateToProps = createStructuredSelector({
	outgoingPullRequestIds: getRelatedEntityIds(getOutgoingPullRequestsId, outgoingTableName, 'pullRequests'),
})

function mapDispatchToProps(dispatch){
	return {
		goToPullRequest(pullRequest){
			dispatch(queryPush({
				panelLocation: showOutgoingLocation,
				panelOpen: true,
				pullRequestId: pullRequest.get('id'),
			}));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingPullRequestsPanel);