// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import Section from '../Section';

export class ShowOutgoingPullRequestFolder extends PureComponent {
	render(){
		const {folder, folderIds, sectionIds} = this.props;
		return <li>
			<p>
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
	})
}

export default connect(mapStateToPropsFactory)(ShowOutgoingPullRequestFolder);