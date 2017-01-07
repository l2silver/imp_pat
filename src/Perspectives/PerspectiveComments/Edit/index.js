// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';


import {Button, LinkedCodeMirror} from '@imp_pat/ui-kit/components'
import {form} from '@imp_pat/ui-kit/hoc';

import * as actions from './actions';

export class EditPerspectiveComment extends PureComponent {
	render(){
		const {fields, actions} = this.props;
		return <div>
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
	id: {
		verify: ['required'],
		label: '',
		isValid: true
	},
}

const config = {
	isValid: true
};

function mapDispatchToProps(dispatch, {toggleEdit}){
	return {
		actions: {
			submit(newPerspective){
				return dispatch(actions.submit(newPerspective)).then(toggleEdit)
			}
		},
	}
}

export default connect(null, mapDispatchToProps)(form({fields, config}, EditPerspectiveComment));