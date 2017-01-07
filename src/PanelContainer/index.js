//@flow
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {get} from 'lodash';
import {createSelector} from 'reselect';

import {Container, Panel} from '@imp_pat/ui-kit/components'

import panelRoutes from './panelRoutes';
import {close} from './actions';

import {container} from './style.pcss'; 

function defaultConditionalLocation(){
	return false;
}

class PanelContainer extends Component {
	render(){
		const {panelLocation, panelParams, panelOpen, onClose, query, pathname} = this.props;
		const {Route, conditionalLocation = defaultConditionalLocation} = panelRoutes(panelLocation, panelParams)

		return <Container className={container}>
			<Panel closed={!panelOpen || conditionalLocation(query, pathname)} onClose={onClose}>
				{Route}
			</Panel>
		</Container>
	}
}

const mapStateToProps = createSelector(
	[
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelLocation'),
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelParams'),
		(state)=>get(state, 'routing.locationBeforeTransitions.query.panelOpen'),
		(state)=>get(state, 'routing.locationBeforeTransitions.query'),
		(state)=>get(state, 'routing.locationBeforeTransitions.pathname'),
	],
	(panelLocation, panelParams, panelOpen, query, pathname)=>({
		panelLocation,
		panelParams,
		panelOpen,
		query,
		pathname,
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