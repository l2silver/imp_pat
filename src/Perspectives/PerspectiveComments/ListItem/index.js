// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Button} from '@imp_pat/ui-kit/components';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getCurrentUserId} from '@imp_pat/ui-kit/models/users';

import EditPerspectiveListItem from '../Edit';
export class PerspectiveListItem extends PureComponent {
	state:  {
		editing: boolean;
	};
	constructor(props){
		super(props);
		this.state = {
			editing: false,
		}
		this.toggleEdit = this.toggleEdit.bind(this);
	}
	render(){
		const {perspectiveComment, perspectiveCommentId, currentUserId} = this.props;
		const {editing} = this.state;
		const {toggleEdit} = this;
		const mine = currentUserId === perspectiveComment.get('userId');
		return <li>
			{mine && <Button iconName='pencil' onClick={toggleEdit} />}
			{
				editing ?  <EditPerspectiveListItem id={perspectiveCommentId} content={perspectiveComment.get('content')}  toggleEdit={toggleEdit}/> :
				perspectiveComment.get('content')
			}
		</li>
	}
	toggleEdit(){
		this.setState({
			editing: !this.state.editing,
		})
	}
}

function mapStateToPropsFactory(){
	const getPerspectiveCommentId = (state, props)=>props.perspectiveCommentId
	return createStructuredSelector({
		perspectiveComment: findEntity(getPerspectiveCommentId, 'perspectiveComments'),
		currentUserId: getCurrentUserId,
	});
}

export default connect(mapStateToPropsFactory)(PerspectiveListItem)