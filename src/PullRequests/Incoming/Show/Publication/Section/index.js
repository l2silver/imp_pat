// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';

import {Icon} from '@imp_pat/ui-kit/components';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

import {
	ordinal,
	folderId,
	name,
	deleted,
	notDeleted
} from '../style.pcss';
export class ShowOutgoingPullRequestSection extends PureComponent {
	render(){
		const {section, sectionChanges, cloneSectionId}, goToSection = this.props;
		return <li className={classnames(
			{
				[ordinal]:    sectionChanges.get('ordinal'),
				[folderId]:   sectionChanges.get('folderId'),
				[deleted]: 	  sectionChanges.get('deleted'),
				[notDeleted]: sectionChanges.get('notDeleted'),
			}
		)}>
		
			<p className={
				classnames(
					{
						[name]: sectionChanges.get('name')
					}
				)
			}>
				{
					section.get('name')
				}
				{
					sectionChanges.get('content') &&	<Icon name="exclamation" />
				}
			</p>
		</li>;
	}
}

const getSectionId = (state, props)=>props.id;

function mapStateToPropsFactory(){
	return createStructuredSelector({
		section: findEntity(getSectionId, 'publishedSections'),
		sectionChanges: findEntity(getSectionId, 'sectionChanges'),
		originalSectionId: getRelatedEntity(getSectionId, 'publishedSections', 'originalId')
	})
}

function mapDispatchToProps(dispatch){
	return {
		goToSection(cloneSectionId){
			dispatch(locationPush(`publications/${publicationId}/pullRequestReview/folders/${folderId}/sections/${cloneSectionId}`))
		}
	}
}

export default connect(mapStateToPropsFactory)(ShowOutgoingPullRequestSection);