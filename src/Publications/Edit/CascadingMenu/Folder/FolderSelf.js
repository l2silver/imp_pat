// @flow
import React, {PureComponent} from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import classnames from 'classnames';
import {flow} from 'lodash'
import {Map} from 'immutable'
import {Button} from '@imp_pat/ui-kit/components';

import {SECTION} from './dndTypes';
import {caret, droppable, textInput} from './style.pcss';
class FolderSelf extends PureComponent {
	render(){
		const {
			open,
			clicked,
			interact,
			update,
			connectDropTarget,
			connectDragSource,
			deleteFolder,
			createFolder,
			createSection,
			folder,
			isOver,
			canDrop
		} = this.props;
		const klass = classnames({[droppable]: isOver && canDrop})
		return connectDragSource(connectDropTarget(
			clicked ? <div className={klass}>
				<Button iconName='trash' onClick={deleteFolder} confirmationMessage='Are you sure you want to delete this folder?' />
				<Button iconName='plus' onClick={createFolder} />
				<Button iconName='plus-square' onClick={createSection} />
				<Button iconName='cog' onClick={()=>{interact({clicked: false})}}/>	
			</div> :
			<div className={klass}>
				<Button iconName='cog'  onClick={()=>{interact({clicked: true})}}/>
				<Button iconName='folder' />
				<Button iconName={`caret-${open ? 'down' : 'right'}`} onClick={()=>interact({open: !open})} className={caret} />
				<input className={textInput} type='text' value={folder.get('name')} placeholder='Untitled' onChange={update}/>
			</div>
		))
	}
}

const folderTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
  canDrop(props, monitor){
  	return props.canDrop(monitor.getItem());
  }
};

const sectionSource = {
	beginDrag({folderId, parentId}) {
		return {
			originalParentId: parentId,
			entity: Map({id: folderId}),
			name: 'folders', 
		};
	}
};

export default flow([
	DropTarget(SECTION, folderTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})),
	DragSource(SECTION, sectionSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
])(FolderSelf);