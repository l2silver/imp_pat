// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {PanelContent, Button} from '@imp_pat/ui-kit/components';

import {getQuery, getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {types, goToCreatePerspective} from '@imp_pat/ui-kit/models/perspectives';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';

import PerspectiveListItem from '../ListItem'

export class IndexPerspective extends PureComponent {
	render(){
		const {sectionPerspectiveIds, folderPerspectiveIds, folderId, sectionId, goToCreate, loggedIn} = this.props;
		const type = sectionId ? types.section : types.folder;
		const isFromFolder = Number(type) === types.folder
		const entityId = isFromFolder ? folderId : sectionId;
		const perpsectiveIds = isFromFolder ? folderPerspectiveIds : sectionPerspectiveIds;
		return <PanelContent title={'Perspectives'}>
			{loggedIn && <Button onClick={()=>goToCreate(entityId, type)}>New Perspective</Button>}
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

const getEntityId = getQuery('perspectiveEntityId');

const mapStateToProps = createStructuredSelector({
	entityId: getEntityId,
	type: 	  getQuery('perspectiveType'),
	sectionId: getIdParam(2),
	folderId: getIdParam(1),
	sectionPerspectiveIds: getRelatedEntityIds(getEntityId, 'publishedSections', 'perspectives'),
	folderPerspectiveIds:  getRelatedEntityIds(getEntityId, 'publishedFolders', 'perspectives'),
	loggedIn: isLoggedIn,
})

function mapDispatchToProps(dispatch){
	return {
		goToCreate(entityId, type){
			dispatch(goToCreatePerspective(entityId, type))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPerspective);