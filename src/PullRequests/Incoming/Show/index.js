// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';

import Publication from './Publication';

export class ShowIncomingPullRequest extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {pullRequest, publicationId} = this.props;
		return <Container>
			<h1>{`Pull Request: ${pullRequest.get('id')}`}</h1>
			<Publication id={publicationId}/>
		</Container>
	}
	baseRestMessages(){
		const {id} = this.props;
		const getIncoming = getMessage(
			'pullRequests',
			{
				id,
			},
			{
				serviceRestType: 'findIncoming'
			}
		);
		return [getIncoming];
	}
}
const getPullRequestId = getQuery('pullRequestId');

const mapStateToProps = createStructuredSelector({
	id: getPullRequestId,
	pullRequest: findEntity(getPullRequestId, 'pullRequests'),
	publicationId: getRelatedEntityIds(getPullRequestId, 'pullRequests', 'publication'),
})



export default connect(mapStateToProps)(ShowIncomingPullRequest);