//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {CodeMirror} from '@imp_pat/ui-kit/components';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';

import './style.pcss'

import {update} from './actions';

class EditSection extends PureComponent {
	render(){
		const {section, handleChange} = this.props;
		return section.get('id') ? <CodeMirror
					name={'content'}
					value={section.get('content')}
			        onChange={handleChange.bind(null, section.get('id'))}
			        height={window.innerHeight - 150}
				/> : null;
	}
}

function mapDispatchToProps(dispatch){
	return {
		handleChange(sectionId, {value}){
			return update(dispatch, sectionId, value);
		} 
	}
}

const getSectionId = getIdParam(2);

const mapStateToProps = createStructuredSelector({
	section: findEntity(getSectionId, 'sections'),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditSection);