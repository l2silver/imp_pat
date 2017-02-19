//@flow
import React from 'react';

import EditPublication from './Edit'
import EditContentsTable from './Edit/ContentsTable'
import EditSection from './Edit/Section'

import ShowPublication from './Show'
import ShowContentsTable from './Show/ContentsTable'
import ShowMainContentsTable from './Show/ContentsTable/Main'
import ShowSection from './Show/Section'

import ReviewPublication from './PullRequestReview'
import ReviewContentsTable from './PullRequestReview/ContentsTable'
import ReviewSection from './PullRequestReview/Section'
import ReviewMainContentsTable from './PullRequestReview/ContentsTable/Main'

import {Route, IndexRoute} from 'react-router';

export default [
	<Route path='publications/'>
		<Route path=':publicationId/edit' component={EditPublication}>
			<IndexRoute component={EditContentsTable} />
		</Route>
		<Route path=':publicationId/edit/' component={EditPublication}>
			<Route path='folders/:folderId' component={EditContentsTable} />
			<Route path='folders/:folderId/sections/:sectionId' component={EditSection} />
		</Route>

		<Route path=':publicationId' component={ShowPublication}>
			<IndexRoute component={ShowMainContentsTable} />
		</Route>
		<Route path=':publicationId/' component={ShowPublication}>
			<Route path='folders/:folderId' component={ShowContentsTable} />
			<Route path='folders/:folderId/sections/:sectionId' component={ShowSection} />
		</Route>
		<Route path=':publicationId/pullRequestReview' component={ReviewPublication}>
			<IndexRoute component={ReviewMainContentsTable} />
		</Route>
		<Route path=':publicationId/pullRequestReview/' component={ReviewPublication}>
			<Route path='folders/:folderId' component={ReviewContentsTable} />
			<Route path='folders/:folderId/sections/:sectionId' component={ReviewSection} />
		</Route>
	</Route>
];