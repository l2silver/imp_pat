//@flow
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {get} from 'lodash';
import {createSelector} from 'reselect';
import {Button, Container, MainNav, Panel} from '@imp_pat/ui-kit/components'
import panelRoutes from './panelRoutes';
import {close} from './actions';
class PanelContainer extends Component {
	render(){
		const {panelLocation, panelParams, panelOpen, onClose} = this.props;
		return <Container>
			<Panel closed={!panelOpen} onClose={onClose}>
				{panelRoutes(panelLocation, panelParams)}
			</Panel>
		</Container>
	}
}

const mapStateToProps = createSelector(
	[
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelLocation'),
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelParams'),
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelOpen'),
	],
	(panelLocation, panelParams, panelOpen)=>({
		panelLocation,
		panelParams,
		panelOpen
	})
);

function mapDispatchToProps(dispatch){
	return {
		onClose(){
			dispatch(close())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelContainer);