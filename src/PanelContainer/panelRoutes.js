//@flow
import React from 'react';
import * as signupPanel from '../SignupPanel/routes';

const routes = {
	[signupPanel.location]: signupPanel.component,
}
export default function(panelLocation: string){
	const Route = routes[panelLocation];
	return Route ? <Route /> : null;
}