// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils'
import Folder from './Folder';
import Section from './Section';

export class ShowIncomingPullRequestPublication extends PureComponent {
	render(){
		const {publication, folderIds, sectionIds, goToPullRequestReview, clonePublicationId} = this.props;
		return <div>
			<p onClick={()=>goToPullRequestReview(clonePublicationId)}>
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
		clonePublicationId: getRelatedEntityIds(getPublicationId, 'publishedPublications', 'originalId')
	})
}
function mapDispatchToProps(dispatch){
	return {
		goToPullRequestReview(clonePublicationId){
			dispatch(locationPush(`/publications/${clonePublicationId}/pullRequestReview`))
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(ShowIncomingPullRequestPublication);