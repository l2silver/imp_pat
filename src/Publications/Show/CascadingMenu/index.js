//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';

import {getIdParam, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds, findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';

import CascadingMenuFolder from './Folder';
import {container} from './style.pcss';


class CascadingMenu extends PureComponent {
	render(){
		const {publication, folders, sections, interactions, interact, folderId, goToFolder, goToRootFolder, pullRequestReview} = this.props;
		return <ul className={container}>	
			<CascadingMenuFolder
				folderId={folderId}
				folder={publication}
				folders={folders}
				sections={sections}
				interactions={interactions}
				interact={interact}
				goToFolder={goToFolder}
				goToRootFolder={goToRootFolder}
				publicationId={publication.get('id')}
				pullRequestReview={pullRequestReview}
			/>
		</ul>
	}
}

const getPublicationId = getIdParam(0);

const prePublication = findEntity(getPublicationId, 'publishedPublications');
const publication = createSelector([
		prePublication
	],
	(publication)=>publication.set('name', publication.get('title'))
);
const folderId = getRelatedEntityIds(getPublicationId, 'publishedPublications', 'folder');
const folder = findEntity(folderId, 'publishedFolders');
const folders = getRelatedEntityIds(folderId, 'publishedFolders', 'folders');
const sections = getRelatedEntityIds(folderId, 'publishedFolders', 'sections');

const mapStateToProps = createStructuredSelector({
	publication,
	folder,
	folders,
	sections,
	folderId,
	interactionIdentity: folderId,
});

function mapDispatchToProps(dispatch: Function, {pullRequestReview}){
	const pullRequestReviewAddition = pullRequestReview ? '/pullRequestReview' : ''
	return {
		goToFolder(publicationId, folderId){
			dispatch(locationPush(`/publications/${publicationId}${pullRequestReviewAddition}/folders/${folderId}`))
		},
		goToRootFolder(publicationId){
			dispatch(locationPush(`/publications/${publicationId}${pullRequestReviewAddition}`))
		}
	}
}

const InteractiveCascadingMenu = interactivate('CascadingMenuFolderShow', {open: true})(CascadingMenu)

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveCascadingMenu);
