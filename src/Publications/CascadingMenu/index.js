//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds, findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {create as createFolder, createSection} from './Folder/actions';
import CascadingMenuFolder from './Folder';
import {container} from './style.pcss';

class CascadingMenu extends PureComponent {
	render(){
		const {publication, folderId, folders, sections, interactions, interact, dispatch} = this.props;
		return <ul className={container}>	
			<CascadingMenuFolder
				folder={publication}
				folders={folders}
				sections={sections}
				interactions={interactions}
				interact={interact}
				createFolder={()=>dispatch(createFolder(folderId))}
				createSection={()=>dispatch(createSection(folderId))}
			/>
		</ul>
	}
}

const prePublication = findEntity(getIdParam, 'publications');
const publication = createSelector([
		prePublication
	],
	(publication)=>publication.set('name', publication.get('title'))
);
const folderId = getRelatedEntityIds(getIdParam, 'publications', 'folder');
const folder = findEntity(folderId, 'folders');
const folders = getRelatedEntityIds(folderId, 'folders', 'folders');
const sections = getRelatedEntityIds(folderId, 'folders', 'sections');

const mapStateToProps = createStructuredSelector({
	publication,
	folder,
	folders,
	sections,
	folderId,
	interactionIdentity: folderId,
});


const InteractiveCascadingMenu = interactivate('CascadingMenuFolder', {open: true})(CascadingMenu)

export default connect(mapStateToProps)(InteractiveCascadingMenu);
