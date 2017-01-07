// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';


import {Button, LinkedCodeMirror} from '@imp_pat/ui-kit/components'
import {form} from '@imp_pat/ui-kit/hoc';

import * as actions from './actions';

export class CreatePerspectiveComment extends PureComponent {
	render(){
		const {fields, actions} = this.props;
		return <div>
			<h3>Create Perspective Comment</h3>
			<LinkedCodeMirror
				field={fields.get('content')}
			/>
			<Button
				{...actions.submit}
			/>
		</div>
	}
}

const fields = {
	content: {
		verify: ['required']
	},
	perspectiveId: {
		verify: ['required'],
		label: '',
		isValid: true
	},
}

const config = {
	isValid: false
};

function mapDispatchToProps(dispatch){
	return {
		actions: {
			submit(newPerspective){
				return dispatch(actions.submit(newPerspective))
			}
		},
	}
}

export default connect(null, mapDispatchToProps)(form({fields, config}, CreatePerspectiveComment));