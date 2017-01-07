// @flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {BaseRest, PanelContent} from '@imp_pat/ui-kit/components';

import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {getCurrentSessionId} from '@imp_pat/ui-kit/models/sessions';

import SearchItem from './Item';

export class SearchPanel extends BaseRest {
	render(){
		const {publicationIds} = this.props;
		return <PanelContent title={'Search'}>
			<ul>
				{publicationIds.map(publicationId=><SearchItem key={`searchPanel-publication-${publicationId}`} publicationId={publicationId} />)}
			</ul>
		</PanelContent>
	}
	sendMessages(){
		return [];
	}
}

const mapStateToProps = createStructuredSelector(
	{
		publicationIds: getRelatedEntityIds(getCurrentSessionId, 'search', 'publications')	
	}
)

export default connect(mapStateToProps)(SearchPanel)