//@flow
import {types as perspectiveTypes} from '../models/perspectives';
import {pullRequestRelationshipSchemas} from '../models/pullRequests'
import {schemaTypes} from './constantUtils';

const {ONE} = schemaTypes;

export const fullSchema = {
	relationshipsSchema:{
		...pullRequestRelationshipSchemas,
		mainFeed: [
			{
				name: 'publishedPublications',
				alias: 'publications',
			}
		],
		starsPanel: [
			{
				name: 'publishedPublications',
				alias: 'publications',
			}
		],
		followingPanel: [
			{
				name: 'users'
			}
		],
		followersPanel: [
			{
				name: 'users'
			}
		],
		search: [
			{
				name: 'publishedPublications',
				alias: 'publications',
			}
		],
		users: [
			{
				name: 'sessions',
				alias: 'session',
				type: ONE,
				inverse: true,
				inverseAlias: 'user',
			},
			{			
				name: 'publications',
				alias: 'myPublications',
			},
			{
				name: 'publications',
				alias: 'yourPublications',
			},
			{
				name: 'follows',
				alias: 'follow',
				type: ONE,
			}

		],
		publications: [
			{
				name: 'folders',
				alias: 'folder',
				type: ONE,
			},
			{
				name: 'pullRequests',
				alias: 'notAcceptedPullRequest',
				type: ONE,
			}
		],
		publishedPublications: [
			{
				name: 'publishedPublications',
				alias: 'originalId',
				type: ONE,
				inverse: true,
				inverseAlias: 'originalId',
				justRelationship: true,
			},
			{
				name: 'publishedFolders',
				alias: 'folder',
				type: ONE,
			},
			{
				name: 'users',
				alias: 'user',
				type: ONE,
			},
			{
				name: 'stars',
				alias: 'star',
				type: ONE,
			},
			{
				name: 'perspectives',
				alias: 'sectionPerspectives',
			},
			{
				name: 'perspectives',
				alias: 'folderPerspectives',
			}

		],
		publishedFolders: [
			{
				name: 'publishedFolders',
				alias: 'originalId',
				type: ONE,
				inverse: true,
				inverseAlias: 'originalId',
				justRelationship: true,
			},
			{
				name: 'publishedFolders',
				alias: 'folders'
			},
			{
				name: 'publishedSections',
				alias: 'sections'
			},
			{
				name: 'perspectives',
			}
		],
		publishedSections: [
			{
				name: 'publishedSections',
				alias: 'originalId',
				type: ONE,
				inverse: true,
				inverseAlias: 'originalId',
				justRelationship: true,
			},
			{
				name: 'likes',
				alias: 'like',
				type: ONE
			},
			{
				name: 'perspectives',
			}
		],

		folders: [
			{
				name: 'folders',
			},
			{
				name: 'sections',
			},
		],
		sections: [
			{
				name: 'likes',
				alias: 'like',
				type: ONE
			}
		],
		sessions: [
			{
				name: 'users',
				alias: 'user',
				type: ONE,
			},
		],
		stars: [
		],
		likes: [
		],
		follows: [
		],
		perspectives: [
			{
				name: (entity)=>{
					return entity.type === perspectiveTypes.folder ? 'publishedFolders' : 'publishedSections'
				},
				alias: 'entityId',
				inverse: true,
				justRelationship: true,
			},
			{
				name: 'perspectiveComments'
			}
		],
		perspectiveComments: [
		]
	},
	entitiesSchema: {
		/* eslint-disable */
		users({password, session, ...user}: Object){
			return user;
		},
		publications({folder, ...pub}: Object){
			return pub;
		},
		folders({folders, ...folder}: Object){
			return folder;
		},
		sessions({user, ...session}: Object){
			return session;
		}
		/* eslint-enable */
	},
	inverseRelationshipsSchema: {}
};

const {relationshipsSchema, inverseRelationshipsSchema} = fullSchema;

Object.keys(relationshipsSchema).forEach(entityName=>{
	const relationshipSchema = relationshipsSchema[entityName];

	relationshipSchema.forEach(relationship=>{
		if(!relationship.inverse){
			if(!inverseRelationshipsSchema[relationship.name]){
				inverseRelationshipsSchema[relationship.name] = [];
			}
			const relationshipName = relationship.alias || relationship.name;
			inverseRelationshipsSchema[relationship.name].push([entityName, relationshipName, relationship.type]);	
		}
	})
});

export function findRelationshipsSchema(parentName: string, name: string, alias?: string){
	return fullSchema.relationshipsSchema[parentName].find(relationship=>(relationship.alias == alias && relationship.name == name));
}
