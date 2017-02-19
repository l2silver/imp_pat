//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ReactMarkdown from 'react-markdown';

import {CodeMirror} from '@imp_pat/ui-kit/components';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import './style.pcss'

import {update} from './actions';

class EditSection extends PureComponent {
	render(){
		const {section, handleChange, pullRequest} = this.props;
		const readonly = pullRequest.get('active');
		if(readonly){
			return <ReactMarkdown source={section.get('content')} />
		}
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
const getPublicationId = getIdParam(0);
const getPullRequestId = getRelatedEntityIds(getPublicationId, 'publications', 'notAcceptedPullRequest')

const mapStateToProps = createStructuredSelector({
	section: findEntity(getSectionId, 'sections'),
	pullRequest: findEntity(getPullRequestId, 'pullRequests')
})
export default connect(mapStateToProps, mapDispatchToProps)(EditSection);