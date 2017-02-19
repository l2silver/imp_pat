// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';

import {Icon} from '@imp_pat/ui-kit/components';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {
	ordinal,
	folderId,
	name,
	deleted,
	notDeleted
} from '../style.pcss';
export class ShowOutgoingPullRequestSection extends PureComponent {
	render(){
		const {section, sectionConflicts} = this.props;
		return <li className={classnames(
			{
				[ordinal]:    sectionConflicts.get('ordinal'),
				[folderId]:   sectionConflicts.get('folderId'),
				[deleted]: 	  sectionConflicts.get('deleted'),
				[notDeleted]: sectionConflicts.get('notDeleted'),
			}
		)}>
		
			<p className={
				classnames(
					{
						[name]: sectionConflicts.get('name')
					}
				)
			}>
				{
					section.get('name')
				}
				{
					sectionConflicts.get('content') &&	<Icon name="exclamation" />
				}
			</p>
		</li>;
	}
}

const getSectionId = (state, props)=>props.id;

function mapStateToPropsFactory(){
	return createStructuredSelector({
		section: findEntity(getSectionId, 'publishedSections'),
		sectionConflicts: findEntity(getSectionId, 'sectionConflicts'),
	})
}

export default connect(mapStateToPropsFactory)(ShowOutgoingPullRequestSection);