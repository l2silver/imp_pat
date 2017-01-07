// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {mainFeedId} from './constants';
import PublicationListItem from '../Publications/ListItem'
export class MainFeed extends BaseRest {
	constructor(props: Object, context: Object){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {publicationIds} = this.props;
		return <Container>
			<h1>Main Feed</h1>
			{publicationIds.map(publicationId=><PublicationListItem key={`mainFeed-publication-${publicationId}`}publicationId={publicationId} />)}
		</Container>
	}
	baseRestMessages(){
		const getFeed = getMessage('mainFeed', {id: mainFeedId}, {serviceName: 'publications', serviceRestType: 'getMainFeed'});
		return [getFeed];
	}
}
const getMainFeedId = ()=>mainFeedId;

const mapStateToProps = createStructuredSelector({
	publicationIds: getRelatedEntityIds(getMainFeedId, 'mainFeed', 'publications'),
})

export default connect(mapStateToProps)(MainFeed);