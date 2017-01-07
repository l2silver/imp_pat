// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {form} from '@imp_pat/ui-kit/hoc';
import {LinkedTextInput, Button, LinkedCodeMirror} from '@imp_pat/ui-kit/components';
import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';


import * as actions from './actions';

export class EditPerspective extends PureComponent {
	render(){
		const {actions, fields, isValid} = this.props;
		return <div>
			<LinkedTextInput type='text' field={fields.get('title')} />
			<LinkedCodeMirror field={fields.get('content')} />
			<Button
				{
					...actions.submit
				}
				disabled={!isValid}
			/>
		</div>
	}
}

const fields = {
	title: {
		verify: ['required'],
		isValid: false,

	},
	content: {
		verify: ['required'],
		isValid: true,
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

const mapStateToProps = createStructuredSelector({
	entityId: getQuery('perspectiveEntityId'),
	type: 	  getQuery('perspectiveType'),
})

function mapDispatchToProps(dispatch, {toggleEdit}){
	return {
		actions: {
			submit(newPerspective){
				return dispatch(actions.submit(newPerspective)).then(toggleEdit)
			}
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(form({fields, config}, EditPerspective));