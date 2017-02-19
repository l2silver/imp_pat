// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import Folder from './Folder';
import Section from './Section';

export class ShowOutgoingPullRequestPublication extends PureComponent {
	render(){
		const {publication, folderIds, sectionIds} = this.props;
		return <div>
			<p>
				{
					publication.get('title')
				}
			</p>
			<ul>
				{
					folderIds.map(folderId=><Folder id={folderId} />)
				}
			</ul>
			<ul>
				{
					sectionIds.map(sectionId=><Section id={sectionId} />)
				}
			</ul>
		</div>;
	}
}

const getPublicationId = (state, props)=>props.id;
const getFolderId = getRelatedEntityIds(getPublicationId, 'publishedPublications', 'folder');
function mapStateToPropsFactory(){
	return createStructuredSelector({
		folderId: 	 getFolderId,
		publication: findEntity(getPublicationId, 'publishedPublications'),
		folderIds:   getRelatedEntityIds(getFolderId, 'publishedFolders', 'folders'),
		sectionIds:  getRelatedEntityIds(getFolderId, 'publishedFolders', 'sections'),
	})
}

export default connect(mapStateToPropsFactory)(ShowOutgoingPullRequestPublication);