// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import ContentsSection from './ContentsSection';

import {ul} from './style.pcss';

class ContentsFolder extends PureComponent {
	render(){
		const {sectionIds, folderIds, folder, name, pullRequestReview} = this.props;
		return <li>
			{
				name || (folder.get('name') || 'Untitled')
			}
			<ul className={ul}>
				{
					sectionIds.toArray()
					.map(
						(sectionId)=><ContentsSection pullRequestReview={pullRequestReview} key={`contents-folder-${sectionId}`} folderId={folder.get('id')} sectionId={sectionId}/>
					)
				}
			</ul>

			<ul className={ul}>{folderIds.toArray().map((folderId)=>{
				return <ConnectedContentsFolder pullRequestReview={pullRequestReview} key={`contents-folder-${folderId}`} folderId={folderId} />
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

const ConnectedContentsFolder = connect(mapStateToProps)(ContentsFolder);

export default ConnectedContentsFolder;