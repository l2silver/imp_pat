//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';

import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import * as actions from './actions';
import CascadingMenuSection from '../Section';
import FolderSelf from './FolderSelf';
import {container, hide} from './style.pcss';


const getFolderId = (state, {folderId})=>folderId;

export default class CascadingMenuFolder extends PureComponent {
	CascadingMenuFolder: any;
	constructor(props){
		super(props);
		const folder = findEntity(getFolderId, 'folders');
		const folders = getRelatedEntityIds(getFolderId, 'folders', 'folders');
		const sections = getRelatedEntityIds(getFolderId, 'folders', 'sections');
		const mapStateToProps = createStructuredSelector({
			folder,
			folders,
			sections,
			interactionIdentity: getFolderId,
		});

		function mapDispatchToProps(dispatch, {folderId}){
			return {
				createFolder(){
					dispatch(
						actions.create(
							folderId
						)
					)
				},
				createSection(){
					dispatch(
						actions.createSection(
							folderId
						)
					)
				},
				update(event){
					const {value} = event.target;
					dispatch(
						actions.updateFolder(
							folderId, value
						)
					)
				},
				deleteFolder(){
					dispatch(
						actions.deleteFolder(
							folderId
						)
					)
				},
				onDrop(item){
					dispatch(
						actions.changeParent(
							item.name,
							folderId,
							item.entity.get('id'),
							item.originalParentId
						)
					)	
				},
				canDrop(item){
					const result = !(item.name === 'folders' && item.entity.get('id') === folderId);
					return result;
				}
			};
		}

		const InteractiveCascadingMenuFolder = interactivate('CascadingMenuFolder')(CascadingMenuFolder)
		this.CascadingMenuFolder = connect(mapStateToProps, mapDispatchToProps)(InteractiveCascadingMenuFolder);
	}
	render(){
		const {CascadingMenuFolder} = this;
		const {folder, folders, sections, interactions, interact, createFolder, createSection, update, deleteFolder, onDrop, folderId, canDrop, parentId, readonly} = this.props;
		const open = interactions.get('open');
		const clicked = !!interactions.get('clicked');
		return <li>
			<FolderSelf
				{...{
					folder,
					interact,
					createFolder,
					createSection,
					update,
					deleteFolder,
					clicked,
					open,
					onDrop,
					canDrop,
					folderId,
					parentId,
					readonly,
				}}
			/>
			<ul className={classnames(container, {[hide]: !open})}>
				{
					sections.map(sectionId=><CascadingMenuSection sectionId={sectionId} readonly={readonly} folderId={folderId} key={`cascading-menu-section-${sectionId}`} />)
				}
				{
					folders.map(nextFolderId=><CascadingMenuFolder folderId={nextFolderId} readonly={readonly} parentId={folderId} key={`cascading-menu-folder-${nextFolderId}`}/>)
				}
			</ul>
		</li>
	}
}