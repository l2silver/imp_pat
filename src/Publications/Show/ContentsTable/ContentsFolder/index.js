// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Button} from '@imp_pat/ui-kit/components';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {goToIndexPerspective, types} from '@imp_pat/ui-kit/models/perspectives';

import ContentsSection from './ContentsSection';
import {ul} from './style.pcss';

class ContentsFolder extends PureComponent {
	render(){
		const {sectionIds, folderIds, folder, indexPerspective, name} = this.props;
		return <li>
			{
				name || (folder.get('name') || 'Untitled')
			}
			<Button iconName='comment-o' onClick={indexPerspective}/>
			<ul className={ul}>
				{
					sectionIds.toArray()
					.map(
						(sectionId)=><ContentsSection key={`contents-folder-${sectionId}`} folderId={folder.get('id')} sectionId={sectionId}/>
					)
				}
			</ul>

			<ul className={ul}>{folderIds.toArray().map((folderId)=>{
				return <ConnectedContentsFolder key={`contents-folder-${folderId}`} folderId={folderId} />
			})}</ul>			
		</li>
	}
}

const getFolderId = (state, props)=>props.folderId;

const mapStateToProps = createStructuredSelector({
	folder: findEntity(getFolderId, 'publishedFolders'),
	folderIds: getRelatedEntityIds(getFolderId, 'publishedFolders', 'folders'),
	sectionIds: getRelatedEntityIds(getFolderId, 'publishedFolders', 'sections')
})

function mapDispatchToProps(dispatch, {folderId}){
	return {
		indexPerspective(){
			dispatch(goToIndexPerspective(folderId, types.folder));
		}
	};
}

const ConnectedContentsFolder = connect(mapStateToProps, mapDispatchToProps)(ContentsFolder);

export default ConnectedContentsFolder;