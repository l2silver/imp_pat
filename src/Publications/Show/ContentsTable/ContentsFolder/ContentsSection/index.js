// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

class ContentsSection extends PureComponent {
	render(){
		const {section, publicationId, goToSection} = this.props;
		return <li>
			{
				<div onClick={()=>goToSection(publicationId)}>
					{section.get('name')}
				</div>
			}
		</li>
	}
}

const getSectionId = (state, props)=>props.sectionId;

const mapStateToProps = createStructuredSelector({
	section: findEntity(getSectionId, 'publishedSections'),
	publicationId: getIdParam(0),
})

function mapDispatchToProps(dispatch, {sectionId, folderId, pullRequestReview}){
	return {
		goToSection(publicationId){
			dispatch(locationPush(`/publications/${publicationId}${pullRequestReview ? '/pullRequestReview' : ''}/folders/${folderId}/sections/${sectionId}`))
		},
	};
}

const ConnectedContentsSection = connect(mapStateToProps, mapDispatchToProps)(ContentsSection);

export default ConnectedContentsSection;