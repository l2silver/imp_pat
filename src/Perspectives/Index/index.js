// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector, createSelector} from 'reselect';

import {PanelContent, Button} from '@imp_pat/ui-kit/components';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {types, goToCreate} from '@imp_pat/ui-kit/models/perspectives';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';

import PerspectiveListItem from '../ListItem'

export class IndexPerspective extends PureComponent {
	render(){
		const {sectionPerspectiveIds, folderPerspectiveIds, type, entityId, goToCreatePerspective, loggedIn, publicationId} = this.props;
		const isFromFolder = Number(type) === types.folder
		const perpsectiveIds = isFromFolder ? folderPerspectiveIds : sectionPerspectiveIds;
		return <PanelContent title={'Perspectives'}>
			{loggedIn && <Button onClick={()=>goToCreatePerspective(entityId, type, publicationId)}>New Perspective</Button>}
			<ul>
			{
					perpsectiveIds.map(perspectiveId=><PerspectiveListItem
						perspectiveId={perspectiveId}
						key={`perspective-${perspectiveId}`}
					/>)
			}
			</ul>
		</PanelContent>
	}
}

const getSectionId = getIdParam(2);
const getFolderId = getIdParam(1);
const getPublicationId = getIdParam(0);

const getEntityAttributes = createSelector(
	[
		getSectionId,
		getFolderId,
		getPublicationId,
		getRelatedEntityIds(getPublicationId, 'publishedPublications','folder'),
	],
	(sectionId, folderId, publicationId, publicationFolderId)=>{
		if(sectionId){
			return {
				id: sectionId,
				type: types.section,
			};
		}
		if(folderId){
			return {
				id: folderId,
				type: types.folder,
			};
		}
		return {
			id: publicationFolderId,
			type: types.folder,
			publicationId,
		};
	}
);

const getEntityId = createSelector(
	[
		getEntityAttributes,
	],
	({id})=>{
		return id;
	}
);

const getType = createSelector(
	[
		getEntityAttributes,
	],
	({type})=>{
		return type;
	}
);

const publication = createSelector(
	[
		getEntityAttributes
	],
	({publicationId})=>{
		return publicationId;
	}
);

const mapStateToProps = createStructuredSelector({
	entityId: getEntityId,
	type: 	  getType,
	publicationId: publication,
	sectionPerspectiveIds: getRelatedEntityIds(getEntityId, 'publishedSections', 'perspectives'),
	folderPerspectiveIds:  getRelatedEntityIds(getEntityId, 'publishedFolders', 'perspectives'),
	loggedIn: isLoggedIn,
})

function mapDispatchToProps(dispatch){
	return {
		goToCreatePerspective(entityId, type, publicationId){
			dispatch(goToCreate(entityId, type, publicationId))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPerspective);