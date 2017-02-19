// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {DropTarget, DragSource} from 'react-dnd';
import {flow} from 'lodash';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import ContentsSection from './ContentsSection';
import * as actions from './actions';
import {ul} from './style.pcss';

class ContentsFolder extends PureComponent {
	render(){
		const {root, sectionIds, folderIds, folder, connectDragSource, connectDropTarget, readonly} = this.props;
		return <li>
			{
				!root && connectDragSource(connectDropTarget(<div>
					{folder.get('name')}
				</div>))
			}
			{
				<ul className={ul}>{sectionIds.toArray().map((sectionId, i)=><ContentsSection key={`contents-folder-${sectionId}`} readonly={readonly} sectionId={sectionId} parentId={folder.get('id')} index={i} />)}</ul>
			}
			{
				<ul className={ul}>{folderIds.toArray().map((folderId, i)=>{
					return <ConnectedContentsFolder key={`contents-folder-${folderId}`} readonly={readonly} folderId={folderId} parentId={folder.get('id')} index={i} />
				})}</ul>
			}
		</li>
	}
}

const getFolderId = (state, props)=>props.folderId;

const mapStateToProps = createStructuredSelector({
	folder: findEntity(getFolderId, 'folders'),
	folderIds: getRelatedEntityIds(getFolderId, 'folders', 'folders'),
	sectionIds: getRelatedEntityIds(getFolderId, 'folders', 'sections')
})

function mapDispatchToProps(dispatch, {parentId, index}){
	return {
		onDrop({id}){
			dispatch(actions.reorder(id, index, parentId));
		}
	}
}


const folderTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

const folderSource = {
	beginDrag({folderId}) {
		return {
			id: folderId,
		};
	},
	canDrag(props){
		return !props.readonly
	}
};

const getType = (props)=>`contents-folder-${props.parentId}`;

const ConnectedContentsFolder = connect(mapStateToProps, mapDispatchToProps)(flow([
	DropTarget(getType, folderTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	})),
	DragSource(getType, folderSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
])(ContentsFolder));

export default ConnectedContentsFolder;