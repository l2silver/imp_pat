// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {
	ordinal,
	folderId,
	name,
	deleted,
	notDeleted
} from '../style.pcss';
import Section from '../Section';

export class ShowOutgoingPullRequestFolder extends PureComponent {
	render(){
		const {folder, folderIds, sectionIds, folderChanges} = this.props;
		return <li className={classnames(
			{
				[ordinal]:    folderChanges.get('ordinal'),
				[folderId]:   folderChanges.get('folderId'),
				[deleted]: 	  folderChanges.get('deleted'),
				[notDeleted]: folderChanges.get('notDeleted'),
			}
		)}>
			<p className={classnames(
					{
						[name]: folderChanges.get('name')
					}
			)}>
				{
					folder.get('name')
				}
			</p>
			<ul>
				{
					folderIds.map(folderId=><ShowOutgoingPullRequestFolder id={folderId} />)
				}
			</ul>
			<ul>
				{
					sectionIds.map(sectionId=><Section id={sectionId} />)
				}
			</ul>
		</li>;
	}
}

const getFolderId = (state, props)=>props.id;

function mapStateToPropsFactory(){
	return createStructuredSelector({
		folder: findEntity(getFolderId, 'publishedFolders'),
		folderIds: getRelatedEntityIds(getFolderId, 'publishedFolders', 'folders'),
		sectionIds: getRelatedEntityIds(getFolderId, 'publishedFolders', 'sections'),
		folderChanges: findEntity(getFolderId, 'folderChanges'),
	})
}

export default connect(mapStateToPropsFactory)(ShowOutgoingPullRequestFolder);