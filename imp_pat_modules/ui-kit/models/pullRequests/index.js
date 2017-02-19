// @flow
import {schemaTypes} from '../../utils/constantUtils';
export const incomingTableName = 'incomingPullRequests';
export const outgoingTableName = 'outgoingPullRequests';
export const incomingId = 'incomingPullRequestsId';
export const outgoingId = 'outgoingPullRequestsId';
export const pullRequestRelationshipSchemas = {
	[incomingTableName]: [
		{
			name: 'pullRequests',
		},
	],
	[outgoingTableName]: [
		{
			name: 'pullRequests',
		},
	],
	pullRequests: [
		{
			name: 'publishedPublications',
			alias: 'publication',
			type: schemaTypes.ONE,
		},
		{
			name: 'folderConflicts',
		},
		{
			name: 'sectionConflicts',
		},
		{
			name: 'publishedPublications',
			alias: 'publication',
			type: schemaTypes.ONE,
		},
		{
			name: 'publications',
			alias: 'newPublication',
			type: schemaTypes.ONE,
		},
		{
			name: 'folderChanges',
		},
		{
			name: 'sectionChanges',
		},
	],
	folderConflicts: [],
	sectionConflicts: [],
	sectionChanges: [],
	folderChanges: [],
};

export const incomingLocation = 'incomingPullRequests';
export const outgoingLocation = 'outgoingPullRequests';
export const showOutgoingLocation = 'showOutgoingPullRequest';
export const showIncomingLocation = 'showIncomingPullRequest';