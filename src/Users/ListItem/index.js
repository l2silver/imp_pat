// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';

import {getName, goToUser} from '@imp_pat/ui-kit/models/users';


export class UserListItem extends PureComponent {
	render(){
		const {user, goTo} = this.props;
		return <li onClick={goTo}>
			{getName(user)}
		</li>
	}
}

function mapStateToPropsFactory(){
	const getUserId = (state, props)=>props.userId;
	return createStructuredSelector({
		user: findEntity(getUserId, 'users')
	})
}

function mapDispatchToProps(dispatch, {userId}){
	return {
		goTo(){
			dispatch(goToUser(userId))
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(UserListItem);