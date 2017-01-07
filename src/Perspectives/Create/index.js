// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {form} from '@imp_pat/ui-kit/hoc';
import {PanelContent, LinkedTextInput, LinkedCodeMirror, Button} from '@imp_pat/ui-kit/components';
import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';


import * as actions from './actions';

export class CreatePerspective extends PureComponent {
	render(){
		const {actions, fields, isValid} = this.props;
		return <PanelContent title={'Create Perspective'}>
			<LinkedTextInput type='text' field={fields.get('title')} />
			<LinkedCodeMirror field={fields.get('content')} />
			<Button
				{
					...actions.submit
				}
				disabled={!isValid}
			/>
		</PanelContent>
	}
}

const fields = {
	title: {
		verify: ['required'],
		isValid: false,

	},
	content: {
		verify: ['required']
	},
	entityId: {
		verify: ['required'],
		label: '',
		isValid: true
	},
	type: {
		verify: ['required'],
		label: '',
		isValid: true
	},

}

const config = {
	isValid: false
};

const mapStateToProps = createStructuredSelector({
	entityId: getQuery('perspectiveEntityId'),
	type: 	  getQuery('perspectiveType'),
})

function mapDispatchToProps(dispatch){
	return {
		actions: {
			submit(newPerspective){
				return dispatch(actions.submit(newPerspective))
			}
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(form({fields, config}, CreatePerspective));