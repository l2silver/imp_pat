// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {flow} from 'lodash';
import {DropTarget, DragSource} from 'react-dnd';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

import * as actions from './actions';

class ContentsSection extends PureComponent {
	render(){
		const {section, publicationId, goToSection, connectDropTarget, connectDragSource} = this.props;
		return connectDragSource(connectDropTarget(<li>
			{
				<div onClick={()=>goToSection(publicationId)}>
					{section.get('name')}
				</div>
			}
		</li>))
	}
}

const getSectionId = (state, props)=>props.sectionId;

const mapStateToProps = createStructuredSelector({
	section: findEntity(getSectionId, 'sections'),
	publicationId: getIdParam(0),
})

function mapDispatchToProps(dispatch, {sectionId, index, parentId}){
	return {
		goToSection(publicationId){
			dispatch(locationPush(`/publications/${publicationId}/edit/folders/${parentId}/sections/${sectionId}`))
		},
		onDrop({id}){
			dispatch(actions.reorder(id, index, parentId));
		}
	};
}

const sectionTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

const sectionSource = {
	beginDrag({sectionId}) {
		return {
			id: sectionId,
		};
	},
	canDrag({readonly}){
		return !readonly
	}
};

const getType = (props)=>`contents-section-${props.parentId}`;

const ConnectedContentsSection = connect(mapStateToProps, mapDispatchToProps)(flow([
	DropTarget(getType, sectionTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})),
	DragSource(getType, sectionSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
])(ContentsSection));

export default ConnectedContentsSection;