//@flow
import React from 'react'
import {Container, MainNav, MainNavItem, MainNavDropdown, MainNavDropdownItem, BaseRest} from '@imp_pat/ui-kit/components'
import {connect} from 'react-redux';

import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils'
import {indexInteractionMessage} from '@imp_pat/ui-kit/utils/interactionUtils'
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';

import PanelContainer from '../PanelContainer';
import {create as createPublication} from '../Publications/actions';

class MainContainer extends BaseRest {
	constructor(props, context){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
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
	baseRestMessages(){
		return [indexInteractionMessage()];
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