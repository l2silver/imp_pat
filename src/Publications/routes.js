//@flow
import React from 'react';
import EditPublication from './Edit'
import {Route} from 'react-router';

export default [
	<Route path='publications/'>
		<Route path=':publicationId/edit' component={EditPublication} />
	</Route>
];