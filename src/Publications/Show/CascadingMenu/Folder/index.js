//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';

import {Icon} from '@imp_pat/ui-kit/components';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush, getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import CascadingMenuSection from '../Section';

import {container, hide, caret} from './style.pcss';


const getFolderId = (state, {folderId})=>folderId;

export default class CascadingMenuFolder extends PureComponent {
	CascadingMenuFolder: any;
	constructor(props){
		super(props);
		const folder = findEntity(getFolderId, 'publishedFolders');
		const folders = getRelatedEntityIds(getFolderId, 'publishedFolders', 'folders');
		const sections = getRelatedEntityIds(getFolderId, 'publishedFolders', 'sections');
		const mapStateToProps = createStructuredSelector({
			folder,
			folders,
			sections,
			interactionIdentity: getFolderId,
			publicationId: getIdParam(0),
		});
		function mapDispatchToProps(dispatch: Function){
			return {
				goToFolder(publicationId, folderId){
					dispatch(locationPush(`/publications/${publicationId}/folders/${folderId}`))
				}
			};
		}
	

		const InteractiveCascadingMenuFolder = interactivate('CascadingMenuFolderShow')(CascadingMenuFolder)
		this.CascadingMenuFolder = connect(mapStateToProps, mapDispatchToProps)(InteractiveCascadingMenuFolder);
	}
	render(){
		const {CascadingMenuFolder} = this;
		const {goToRootFolder, folder, folders, sections, interactions, interact, folderId, goToFolder, publicationId} = this.props;
		const open = interactions.get('open');
		return <li>
			<div>
				<Icon name='folder' />
				<Icon onClick={()=>interact({open: !open})} className={caret} name={`caret-${open ? 'down' : 'right'}`} />
				<span onClick={goToRootFolder ? ()=>goToRootFolder(publicationId) : ()=>goToFolder(publicationId, folderId)}>{folder.get('name')}</span>
			</div>
			<ul className={classnames(container, {[hide]: !open})}>
				{
					sections.map(sectionId=><CascadingMenuSection sectionId={sectionId} folderId={folderId} key={`cascading-menu-section-${sectionId}`} />)
				}
				{
					folders.map(nextFolderId=><CascadingMenuFolder folderId={nextFolderId} parentId={folderId} key={`cascading-menu-folder-${nextFolderId}`}/>)
				}

			</ul>
		</li>
	}
}