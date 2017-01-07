// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import ShowSection from '../Show/Section';
import EditSection from '../Edit/Section';
import ContentsTableEdit from '../Edit/ContentsTable';
import ContentsTableShow from '../Show/ContentsTable';


class PublicationContent extends PureComponent {
	render(){
		const {editing, publicationId, sectionId, folderIdsOfPublicationFolder, sectionIdsOfPublicationFolder} = this.props;
		const SectionType = editing ? EditSection : ShowSection;
		if(sectionId){
			return <SectionType sectionId={sectionId} key={`section-${sectionId}`}/>
		}
		// if(Interaction exists){
		// 	return EditSection
		// }
		if(sectionIdsOfPublicationFolder.size === 1 && folderIdsOfPublicationFolder.size === 0){
			return <SectionType sectionId={sectionIdsOfPublicationFolder.first()} key={`section-${sectionIdsOfPublicationFolder.first()}`} />
		}
		return editing ? <ContentsTableEdit editing={editing} publicationId={publicationId}/> 
		: 
		<ContentsTableShow publicationId={publicationId}/>
	}
}

function getPublicationId(state, props){
	return props.publicationId;
}

const getPublicationFolderId = getRelatedEntityIds(getPublicationId, 'publications', 'folder');

const getFoldersOfPublicationFolder = getRelatedEntityIds(getPublicationFolderId, 'folders', 'folders');

const getSectionsOfPublicationFolder = getRelatedEntityIds(getPublicationFolderId, 'folders', 'sections');

const mapStateToProps = createStructuredSelector({
	sectionId: getIdParam(1),
	folderIdsOfPublicationFolder: getFoldersOfPublicationFolder,
	sectionIdsOfPublicationFolder: getSectionsOfPublicationFolder,
});

export default connect(mapStateToProps)(PublicationContent);
