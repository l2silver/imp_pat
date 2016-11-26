//@flow
import React, {Component} from 'react'
import {Button, Container, MainNav, Panel, MainNavItem, MainNavDropdown, MainNavDropdownItem} from '@imp_pat/ui-kit/components'
import {connect} from 'react-redux';
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils'
import PanelContainer from '../PanelContainer';
import {create as createPublication} from '../Publications/actions';
import {Link} from 'react-router'


class MainContainer extends Component {
	render(){
		const {onSignup, onCreatePublication} = this.props;
		return <Container>
			<Container menubar>
				<MainNav brandName='Preskribed'>
					<MainNavItem>
						<div onClick={onSignup}>Signup</div>
					</MainNavItem>
					<MainNavDropdown title='Publications'>
						<MainNavDropdownItem>
							<div onClick={onCreatePublication}>Create</div>
						</MainNavDropdownItem>
					</MainNavDropdown>
				</MainNav>
			</Container>
			<Container mainContent>
				{this.props.children}
				<PanelContainer />
			</Container>
		</Container>
	}
}


function mapDispatchToProps(dispatch){
	return {
		onSignup(){
			dispatch(
				queryPush({panelOpen: true, panelLocation: 'signup'})
			)
		},
		onCreatePublication(){
			dispatch(createPublication())
		}
	}
}

export default connect(null, mapDispatchToProps)(MainContainer);