//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {Icon} from '@imp_pat/ui-kit/components';

class CascadingMenuSection extends PureComponent {
	render(){
		const {section} = this.props;
		return <li><Icon name='file-text-o' />{section.get('name') || 'Untitled'}</li>
	}
}

const getSectionId = (state, {sectionId})=>sectionId;

const mapStateToProps = createStructuredSelector({
	section: findEntity(getSectionId, 'sections'),
})

export default connect(mapStateToProps)(CascadingMenuSection);