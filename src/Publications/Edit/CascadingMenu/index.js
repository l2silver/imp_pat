//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds, findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {sendMessages, updateMessage} from '@imp_pat/ui-kit/utils/messageUtils';

import {create as createFolder, createSection, changeParent} from './Folder/actions';
import CascadingMenuFolder from './Folder';
import {container} from './style.pcss';


class CascadingMenu extends PureComponent {
	render(){
		const {publication, folderId, folders, sections, interactions, interact, dispatch, editing, pullRequest} = this.props;
		const readonly = pullRequest.get('active')
		return <ul className={container}>	
			<CascadingMenuFolder
				readonly={readonly}
				editing={editing}
				connectDropTarget={(any)=>any}
				folderId={folderId}
				folder={publication}
				folders={folders}
				sections={sections}
				interactions={interactions}
				interact={interact}
				createFolder={()=>dispatch(createFolder(folderId))}
				createSection={()=>dispatch(createSection(folderId))}
				update={
					(event)=>{
						const {value} = event.target;
						sendMessages(dispatch, [updateMessage('publications', {id: publication.get('id'), title: value})])
					}
				}
				onDrop={
					(item)=>{
						return dispatch(
							changeParent(
								item.name,
								folderId,
								item.entity.get('id'),
								item.originalParentId
							)
						)
					}
				}
				canDrop={(item)=>{
					return !(item.name === 'folders' && item.entity.get('id') === folderId);
				}}
			/>
		</ul>
	}
}

const getPublicationId = getIdParam(0);

const prePublication = findEntity(getPublicationId, 'publications');
const publication = createSelector([
		prePublication
	],
	(publication)=>publication.set('name', publication.get('title'))
);
const folderId = getRelatedEntityIds(getPublicationId, 'publications', 'folder');
const folder = findEntity(folderId, 'folders');
const folders = getRelatedEntityIds(folderId, 'folders', 'folders');
const sections = getRelatedEntityIds(folderId, 'folders', 'sections');
const getPullRequestId = getRelatedEntityIds(getPublicationId, 'publications', 'notAcceptedPullRequest');
const pullRequest = findEntity(getPullRequestId, 'pullRequests');

const mapStateToProps = createStructuredSelector({
	publication,
	folder,
	folders,
	sections,
	folderId,
	pullRequest,
	interactionIdentity: folderId,
});

const InteractiveCascadingMenu = interactivate('CascadingMenuFolder', {open: true})(CascadingMenu)

export default connect(mapStateToProps)(InteractiveCascadingMenu);
