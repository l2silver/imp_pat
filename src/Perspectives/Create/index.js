// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {form} from '@imp_pat/ui-kit/hoc';
import {PanelContent, LinkedTextInput, LinkedCodeMirror, Button, Icon} from '@imp_pat/ui-kit/components';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';

import {types} from '@imp_pat/ui-kit/models/perspectives';

import * as actions from './actions';

export class CreatePerspective extends PureComponent {
	render(){
		const {actions, fields, type, isValid, folder, section, fromPublication, publication} = this.props;
		const isFolderType = Number(type) === types.folder;
		return <PanelContent title={'Create Perspective'}>
			<h4>
				{
					isFolderType ? 
					<span><Icon name={fromPublication? 'book' : 'folder'} />{fromPublication ? publication.get('title') : folder.get('name')}</span> :
					<span><Icon name='file-o' />{section.get('name')}</span>
				}
			</h4>
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

const getEntityId = getQuery('perspectiveEntityId');
const getPublicationId = getQuery('perspectiveFromPublication');

const mapStateToProps = createStructuredSelector({
	entityId: getEntityId,
	type: 	  getQuery('perspectiveType'),
	folder: findEntity(getEntityId, 'publishedFolders'),
	section: findEntity(getEntityId, 'publishedSections'),
	fromPublication: getPublicationId,
	publication: findEntity(getPublicationId, 'publishedPublications'),
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