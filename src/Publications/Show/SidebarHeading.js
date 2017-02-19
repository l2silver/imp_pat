//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Button, Icon} from '@imp_pat/ui-kit/components';

import {sendMessageOneTime} from '@imp_pat/ui-kit/utils/classUtils';
import {locationPush, queryPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {getName} from '@imp_pat/ui-kit/models/users';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';
import * as perspectiveModel from '@imp_pat/ui-kit/models/perspectives';

import {location as yourUserLocation} from '../YourPublications/routes';
import * as actions from './actions';

const getUser = sendMessageOneTime(
	function (component){
		const {props: {publication}} = component;
		const userId = publication.get('id');
		return userId;
	},
	function (component){
		return component.props.getUser(component.props.publication.get('userId'));
	}
)

class SidebarHeading extends PureComponent {
	render(){
		const {
			userId,
			goToUser,
			publication,
			goToContentsTable,
			createStar,
			starId,
			followId,
			removeStar,
			user,
			createFollow,
			removeFollow,
			loggedIn,
			goToPerspectiveIndex,
			forkPublication,
		} = this.props;
		const publicationTitle = publication.get('title');
		const publicationSubtitle = publication.get('subtitle');
		const starIcon = !!starId ? 
							<Icon name={`star`} onClick={()=>removeStar(starId)} />
							:
							<Icon name={`star-o`} onClick={loggedIn ? createStar : ()=>{}} />;
		const followIcon = !!followId ? 
							<p onClick={()=>removeFollow(followId)}>Unfollow</p>
							:
							<p onClick={()=>createFollow(loggedIn ? user.get('id') : ()=>{})}>Follow</p>
		return <div>
			<h1>{publicationTitle}</h1>
			{!!publicationSubtitle && <h2>{publicationSubtitle}</h2>}
			<div>
				<p onClick={()=>goToUser(userId)}>{getName(user)}</p>
				{followIcon}
			</div>
			<Button iconName='code-fork' onClick={forkPublication}/>
			<Button iconName='comment' onClick={goToPerspectiveIndex}/>
			<Icon name='list' onClick={goToContentsTable} />
			<span>
				{starIcon}
				{Number(publication.get('starsCount') || 0) + Number(!!starId)}
			</span>
		</div>
	}
	componentDidMount(){
		getUser(this);
	}
	componentDidUpdate(){
		getUser(this);
	}
}

const getPublicationId = (state, props)=>props.publicationId;
const getUserId = getRelatedEntityIds(getPublicationId, 'publishedPublications', 'user');
const mapStateToProps = createStructuredSelector({
	
	starId: getRelatedEntityIds(getPublicationId, 'publishedPublications', 'star'),
	publication: findEntity(getPublicationId, 'publishedPublications'),
	userId: getUserId,
	user: findEntity(getUserId, 'users'),
	followId: getRelatedEntityIds(getUserId, 'users', 'follow'),
	loggedIn: isLoggedIn,
});

function mapDispatchToProps(dispatch, {publicationId}){
	return {
		createStar(){
			dispatch(actions.createStar(publicationId))
		},
		removeStar(starId){
			dispatch(actions.removeStar(starId))
		},
		removeFollow(followId){
			dispatch(actions.removeFollow(followId))
		},
		createFollow(userId){
			dispatch(actions.createFollow(userId))
		},
		goToContentsTable(){
			dispatch(locationPush(`/publications/${publicationId}`))
		},
		getUser(id){
			dispatch(actions.getUser(id, publicationId))
		},
		goToUser(id){
			dispatch(queryPush({panelLocation: yourUserLocation, panelOpen: true, panelUserId: id}))
		},
		goToPerspectiveIndex(){
			dispatch(perspectiveModel.goToIndex())
		},
		forkPublication(){
			dispatch(actions.forkPublication(publicationId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeading);
