//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {DragSource} from 'react-dnd';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {Icon, Button} from '@imp_pat/ui-kit/components';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {getIdParam, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

import {SECTION} from '../Folder/dndTypes';
import {textInput} from './style.pcss'
import * as actions from './actions';

class CascadingMenuSection extends PureComponent {
	render(){
		const {section, deleteSection, updateSection, connectDragSource, goToSection, publicationId} = this.props;
		return connectDragSource(<li>	
			<Icon name='file-text-o' />
			<Button onClick={()=>goToSection(publicationId)} iconName='arrow-right' />
			<input className={textInput} type='text' onChange={updateSection} value={section.get('name')} placeholder='Untitled' />
			<Button onClick={deleteSection} iconName='trash' confirmationMessage='Are you sure you want to delete this section?'/>
		</li>);
	}
}

const getSectionId = (state, {sectionId})=>sectionId;

const mapStateToProps = createStructuredSelector({
	publicationId: getIdParam(0),
	section: findEntity(getSectionId, 'sections'),
	interactionIdentity: getSectionId,
})

function mapDispatchToProps(dispatch, {sectionId, folderId}){
	return {
		deleteSection(){
			return dispatch(actions.deleteSection(sectionId));
		},
		updateSection(event){
			const {value} = event.target;
			return dispatch(actions.updateSection(sectionId, value));
		},
		goToSection(publicationId){
			return dispatch(
				locationPush(`/publications/${publicationId}/edit/folders/${folderId}/sections/${sectionId}`)
			);
		}
	};
}

const sectionSource = {
	beginDrag({section, folderId}) {
		return {
			originalParentId: folderId,
			entity: section,
			name: 'sections', 
		};
	}
};

const DraggableCascadingMenuSection = DragSource(SECTION, sectionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(CascadingMenuSection)


const interactiveCascadingMenuSection = interactivate('CascadingMenuSection')(DraggableCascadingMenuSection)

export default connect(mapStateToProps, mapDispatchToProps)(interactiveCascadingMenuSection);