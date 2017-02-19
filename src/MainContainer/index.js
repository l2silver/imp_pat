//@flow
import React from 'react'
import {Container, MainNav, MainNavItem, MainNavDropdown, MainNavDropdownItem, BaseRest, TextInput} from '@imp_pat/ui-kit/components'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {queryPush, locationPush} from '@imp_pat/ui-kit/utils/routerUtils'
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils'
import {indexInteractionMessage} from '@imp_pat/ui-kit/utils/interactionUtils'
import {getRelatedEntity} from '@imp_pat/ui-kit/utils/selectorUtils'
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';

import {currentSessionId} from '@imp_pat/ui-kit/models/sessions';
import {incomingLocation, outgoingLocation} from '@imp_pat/ui-kit/models/pullRequests';

import PanelContainer from '../PanelContainer';
import {location as loginLocation} from '../LoginPanel/routes';
import {location as signupLocation} from '../SignupPanel/routes';
import {location as searchLocation} from '../SearchPanel/routes';
import {location as starsLocation} from '../StarsPanel/routes';
import {location as followingLocation} from '../FollowingPanel/routes';
import {location as followersLocation} from '../FollowersPanel/routes';
import {location as myPublicationsLocation} from '../Publications/MyPublications/routes';



import {create as createPublication} from '../Publications/actions';
import {logout, search} from './actions';

class MainContainer extends BaseRest {
	constructor(props, context){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {
			goToFollowersPanel,
			goToFollowingPanel,
			onStars,
			goHome,
			onSignup,
			onLogin,
			onCreatePublication,
			user,
			onLogout,
			onMyPublications,
			onSearch,
			onClickSearch,
			goToIncomingPullRequestsPanel,
			goToOutgoingPullRequestsPanel,
		} = this.props;
		const loggedIn = user.size > 0;
		return <Container>
			<Container menubar>
				<MainNav brandName={<div onClick={goHome}>Practices</div>}>
					{
						!loggedIn &&
						<MainNavItem>
							<div>
								<div onClick={onSignup}>Signup</div>
							</div>

						</MainNavItem>
					}
					{
						!loggedIn &&
						<MainNavItem>
							<div onClick={onLogin}>Login</div>
						</MainNavItem>
					}
					{
						loggedIn && <MainNavDropdown title={user.get('email')}>
							<MainNavDropdownItem>
								<div onClick={onLogout}>Logout</div>
							</MainNavDropdownItem>
							<MainNavDropdownItem>
								<div onClick={goToFollowingPanel}>Following</div>
							</MainNavDropdownItem>
							<MainNavDropdownItem>
								<div onClick={goToFollowersPanel}>Followers</div>
							</MainNavDropdownItem>
						</MainNavDropdown>
					}
				
					{
						loggedIn && 	<MainNavDropdown title='Publications'>
								{
									<MainNavDropdownItem>
										<div onClick={()=>onCreatePublication(user.get('id'))}>Create</div>
									</MainNavDropdownItem>
								}
								{
									<MainNavDropdownItem>
										<div onClick={onMyPublications}>My</div>
									</MainNavDropdownItem>
								}
								{
									<MainNavDropdownItem>
										<div onClick={onStars}>Starred</div>
									</MainNavDropdownItem>
								}
						</MainNavDropdown>

					}
					{
						loggedIn && 	<MainNavDropdown title='Pull Requests'>
							<MainNavDropdownItem>
								<div onClick={goToIncomingPullRequestsPanel}>Incoming</div>
							</MainNavDropdownItem>
							<MainNavDropdownItem>
								<div onClick={goToOutgoingPullRequestsPanel}>Outgoing</div>
							</MainNavDropdownItem>
						</MainNavDropdown>

					}
					<MainNavItem>
						<div>
							<TextInput onClick={onClickSearch} onChange={onSearch} />
						</div>
					</MainNavItem>
				</MainNav>
			</Container>
			<Container>
				{this.props.children}
				<PanelContainer />
			</Container>
		</Container>
	}
	baseRestMessages(){
		const getSessionMessage = getMessage('sessions', {id: currentSessionId})
		return [indexInteractionMessage(), getSessionMessage];
	}
}

const mapStateToProps = createStructuredSelector({
	user: getRelatedEntity(()=>currentSessionId, 'sessions', 'user')
})

function mapDispatchToProps(dispatch){
	return {
		onSignup(){
			dispatch(
				queryPush({panelOpen: true, panelLocation: signupLocation})
			)
		},
		onLogin(){
			dispatch(
				queryPush({panelOpen: true, panelLocation: loginLocation})
			)
		},
		onCreatePublication(){
			dispatch(createPublication())
		},
		onMyPublications(){
			dispatch(
				queryPush(
					{panelOpen: true, panelLocation: myPublicationsLocation}
				)
			)
		},
		onLogout(){
			dispatch(logout())
		},
		onSearch({value}){
			dispatch(search(value))
		},
		onClickSearch(){
			dispatch(
				queryPush({
					panelLocation: searchLocation,
					panelOpen: true
				})
			);
		},
		goHome(){
			dispatch(locationPush('/'));
		},
		onStars(){
			dispatch(
				queryPush({
					panelLocation: starsLocation,
					panelOpen: true
				})
			);
		},
		goToFollowingPanel(){
			dispatch(
				queryPush({
					panelLocation: followingLocation,
					panelOpen: true
				})
			);	
		},
		goToFollowersPanel(){
			dispatch(
				queryPush({
					panelLocation: followersLocation,
					panelOpen: true,
				})
			);
		},
		goToIncomingPullRequestsPanel(){
			dispatch(
				queryPush({
					panelLocation: incomingLocation,
					panelOpen: true,
				})
			)
		},
		goToOutgoingPullRequestsPanel(){
			dispatch(
				queryPush({
					panelLocation: outgoingLocation,
					panelOpen: true,
				})
			)
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);