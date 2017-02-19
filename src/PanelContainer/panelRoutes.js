//@flow
import React from 'react';
import * as signupPanel from '../SignupPanel/routes';
import * as loginPanel from '../LoginPanel/routes';
import * as starsPanel from '../StarsPanel/routes';

import * as followingPanel from '../FollowingPanel/routes';
import * as followersPanel from '../FollowersPanel/routes';

import * as indexPerspective from '../Perspectives/Index/routes';
import * as createPerspective from '../Perspectives/Create/routes';
import * as showPerspective from '../Perspectives/Show/routes';

import * as incomingPullRequests from '../PullRequests/Incoming/routes';
import * as outgoingPullRequests from '../PullRequests/Outgoing/routes';
import * as showIncomingPullRequest from '../PullRequests/Incoming/Show/routes';
import * as showOutgoingPullRequest from '../PullRequests/Outgoing/Show/routes';

import * as publicationSettings from '../Publications/Edit/PublicationSettings/routes';
import * as myPublications from '../Publications/MyPublications/routes';
import * as yourPublications from '../Publications/YourPublications/routes';
import * as search from '../SearchPanel/routes';

const routes = [
	signupPanel,
	loginPanel,
	publicationSettings,
	myPublications,
	search,
	yourPublications,
	starsPanel,
	followingPanel,
	followersPanel,
	indexPerspective,
	createPerspective,
	showPerspective,
	incomingPullRequests,
	outgoingPullRequests,
	showIncomingPullRequest,
	showOutgoingPullRequest
].reduce((routes, {location, component, conditionalLocation})=>{
	routes[location] = [component, conditionalLocation];
	return routes;
}, {});

export default function(panelLocation: string){
	if(routes[panelLocation]){
		const [Route] = routes[panelLocation];
		return {
			Route: Route ? <Route /> : null,
			conditionalLocation: routes[panelLocation][1]
		}
	}
	return {
		Route: null,
	}
	
}