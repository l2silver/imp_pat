//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {Icon} from '@imp_pat/ui-kit/components';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {getIdParam, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

class CascadingMenuSection extends PureComponent {
	render(){
		const {section, goToSection, publicationId} = this.props;
		return <li onClick={()=>goToSection(publicationId)}>
			<Icon name='file-text-o' />
			{section.get('name')}
		</li>;
	}
}

const getSectionId = (state, {sectionId})=>sectionId;

const mapStateToProps = createStructuredSelector({
	publicationId: getIdParam(0),
	section: findEntity(getSectionId, 'publishedSections'),
	interactionIdentity: getSectionId,
})

function mapDispatchToProps(dispatch, {sectionId, folderId}){
	return {
		goToSection(publicationId){
			return dispatch(
				locationPush(`/publications/${publicationId}/folders/${folderId}/sections/${sectionId}`)
			);
		}
	};
}

const interactiveCascadingMenuSection = interactivate('CascadingMenuSectionShow')(CascadingMenuSection)

export default connect(mapStateToProps, mapDispatchToProps)(interactiveCascadingMenuSection);