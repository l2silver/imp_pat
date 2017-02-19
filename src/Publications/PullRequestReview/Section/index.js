//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector, createSelector} from 'reselect';
import {diffWords} from 'diff';

import {Button, Icon} from '@imp_pat/ui-kit/components';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import {types} from '@imp_pat/ui-kit/models/perspectives';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';
import {green, red} from './style.pcss'
import Next from '../../Show/Next';

class ShowSection extends PureComponent {
	render(){
		const {section, indexPerspective, sectionId, folderId, originalSection} = this.props;
		console.log('section', section.toJS())
		console.log('originalSection', originalSection)
		// const diff = section.get('content') && diffWords(section.get('content') || '', originalSection.get('content' || ''))
		console.log('diff', section.get('content'), originalSection.get('content'))
		const diff = section.get('content') ? diffWords('spa this is a new' || '', originalSection.get('content') || '') : []
		console.log('diff', diff)
		return <div>
			<h1>{section.get('name')}</h1>
			<p>
			{
				diff.map(part => {
					if(part.added){
						return <span className={green}>{part.value}</span>
					}
					if(part.removed){
						return <span className={red}>{part.value}</span>
					}
					return part.value
				})
			}
			</p>
			<Next sectionId={sectionId} parentFolderId={folderId} />
		</div>
	}
}

function mapDispatchToProps(){
	return {}; 
}

const getFolderId = getIdParam(1);
const getSectionId = getIdParam(2);
const getSection = findEntity(getSectionId, 'publishedSections');
const getOriginalSectionId = createSelector(
	[
		getSection
	],
	(section) => section.get('originalId')
)

const mapStateToProps = createStructuredSelector({
	folderId: getFolderId,
	sectionId: getSectionId,
	section: getSection,
	originalSection: findEntity(getOriginalSectionId, 'publishedSections')
})

function mapDispatchToProps(dispatch){
	return {
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSection);