// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import ContentsFolder from './ContentsFolder';
import {ul} from './style.pcss';


class ContentsTable extends PureComponent {
	render(){
		const {publication, folderId, pullRequest} = this.props;
		const readonly = pullRequest.get('active')
		return <div>
			<h1>{publication.get('title')}</h1>
			{
				publication.get('subtitle') && <h2>{publication.get('subtitle')}</h2>
			}
			<ul className={ul}>
				<ContentsFolder readonly={readonly} folderId={folderId} root />
			</ul>
		</div>
	}
}

const getPublicationId = getIdParam(0);

const getPullRequestId = getRelatedEntityIds(getPublicationId, 'publications', 'notAcceptedPullRequest');

const mapStateToProps = createStructuredSelector({
	pullRequestId: getPullRequestId,
	pullRequest: findEntity(getPullRequestId, 'pullRequests'),
	publication: findEntity(getPublicationId, 'publications'),
	folderId:    getRelatedEntityIds(getPublicationId, 'publications', 'folder'),

});

export default connect(mapStateToProps)(ContentsTable);