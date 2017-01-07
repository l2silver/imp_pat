//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {TextInput, Button, PanelContent} from '@imp_pat/ui-kit/components';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import {practiceTypes, statusTypes} from '@imp_pat/ui-kit/models/publications';

import * as actions from './actions';



class PublishSettings extends PureComponent {
	render(){
		const {updatePublication, updateType, publication, publish} = this.props;
		const publicationId = publication.get('id');
		const updatePublicationWithId = updatePublication.bind(null, publicationId);
		const updateTypeWithId = updateType.bind(null, publicationId);
		const published = publication.get('status') === statusTypes.published;
		return <PanelContent title='Settings'>
			<TextInput label='Title' type='text' name='title' value={publication.get('title')} onChange={updatePublicationWithId}/>
			<TextInput label='Subtitle' type='text' name='subtitle' value={publication.get('subtitle')} onChange={updatePublicationWithId}/>
			{
				// <Button styleType={publication.get('practice') === practiceTypes.micro && 'success'} onClick={()=>updateTypeWithId({practice: practiceTypes.micro})}>Micro Practice</Button>
				// <Button styleType={publication.get('practice') !== practiceTypes.micro && 'success'} onClick={()=>updateTypeWithId({practice: practiceTypes.best})}>Best Practice</Button>	
			}
			
			{
				<Button confirmationMessage='Are you sure you want to publish' onClick={()=>publish(publicationId)}>{published ? 'Re-Publish' : 'Publish'}</Button>
			}
		</PanelContent>
	}
}

const mapStateToProps = createStructuredSelector({
	publication: findEntity(getIdParam(0), 'publications'),
})

function mapDispatchToProps(dispatch){
	return {
		updatePublication(id, {name, value}){
			return dispatch(actions.updatePublication(id, {[name]: value}));
		},
		updateType(id, newValues){
			return dispatch(actions.updatePublication(id, newValues))
		},
		publish(id){
			return dispatch(actions.publish(id));
		},

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishSettings)