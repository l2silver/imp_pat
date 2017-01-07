// @flow
import React, {PureComponent} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {Button} from '@imp_pat/ui-kit/components';

import {locationPush, getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import {getEntity, getRelationship} from '@imp_pat/ui-kit/utils/selectorUtils';

import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
export class Next extends PureComponent {
	constructor(props: Object){
		super(props);
		bindMethods(this, 'getLocation', 'getSectionLocation', 'getFolderLocation');
	}
	render(){
		const {goTo} = this.props;
		const location = this.getLocation();
		return location ? <Button
			onClick={()=>goTo(location)}
		>
			Next
		</Button> : null;
	}
	getLocation(){
		const {sectionId, folderId, folderIdFromParams} = this.props;
		if(sectionId){
			return this.getSectionLocation();
		}else{
			return this.getFolderLocation(folderId || folderIdFromParams);
		}
	}
	getSectionLocation(){
		const {sectionId, publicationId, parentFolderId, publishedFoldersSections} = this.props;
		const relatedSectionIds = publishedFoldersSections.get(`${parentFolderId}`);
		if(!relatedSectionIds){
			return false;
		}
		if(relatedSectionIds.last() !== Number(sectionId)){
			const relatedSectionIdsArray = relatedSectionIds.toArray();
			const index = relatedSectionIdsArray.indexOf(Number(sectionId));
			const nextSectionId = relatedSectionIdsArray[index + 1];
			return `/publications/${publicationId}/folders/${parentFolderId}/sections/${nextSectionId}`;
		}
		return this.getFolderLocation(parentFolderId, false);
	}
	getFolderLocation(folderId: number, lookBackSection: boolean = true, lookBackFolder: boolean = true){
		const {publicationId, publishedFolders, publishedFoldersFolders, publishedFoldersSections} = this.props;
		if(lookBackSection){
			const sectionIds = publishedFoldersSections.get(`${folderId}`);
			if(sectionIds && sectionIds.size > 0){
				return `/publications/${publicationId}/folders/${folderId}/sections/${sectionIds.first()}`;
			}
		}
		if(lookBackFolder){
			const folderIds = publishedFoldersFolders.get(`${folderId}`);
			if(folderIds && folderIds.size > 0){
				return `/publications/${publicationId}/folders/${folderIds.first()}`;
			}
		}
		const parentParentFolderId = publishedFolders.getIn([`${folderId}`, 'folderId'])
		if(!parentParentFolderId){
			return false;
		}
		const relatedFolderIds = publishedFoldersFolders.get(`${parentParentFolderId}`);
		const relatedSectionIds = publishedFoldersSections.get(`${parentParentFolderId}`);
		if(relatedSectionIds.last() !== Number(parentParentFolderId)){
			const relatedFolderIdsArray = relatedFolderIds.toArray();
			const index = relatedFolderIdsArray.indexOf(Number(parentParentFolderId));
			const nextFolderId = relatedFolderIdsArray[index + 1];
			return `/publications/${publicationId}/folders/${nextFolderId}`;
		}
		if(relatedSectionIds && relatedSectionIds.size > 0){
			return `/publications/${publicationId}/folders/${parentParentFolderId}/sections/${relatedSectionIds.first()}`;
		}
		return this.getFolderLocation(parentParentFolderId, false, false);
	}
}

const mapStateToProps = createStructuredSelector({
	sectionId: getIdParam(2),
	folderIdFromParams: getIdParam(1),
	publicationId: getIdParam(0),
	publishedPublications: getEntity('publishedPublications'),
	publishedFolders: getEntity('publishedFolders'),
	publishedSections: getEntity('publishedSections'),

	publishedFoldersFolders: getRelationship('publishedFolders', 'folders'),
	publishedFoldersSections: getRelationship('publishedFolders', 'sections'),
})

function mapDispatchToProps(dispatch){
	return {
		goTo(location: string){
			dispatch(locationPush(location))
		} 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Next);