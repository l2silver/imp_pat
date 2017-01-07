//@flow
import {types as perspectiveTypes} from '../models/perspectives';
export const schemaTypes = {
	ONE:  1,
	MANY: 2,
};

const {ONE} = schemaTypes;

export const fullSchema = {
	relationshipsSchema:{
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
		],
		publishedPublications: [
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
		users({password, session, ...user}: Object){
			return user;
		},
		publications({folder: f, ...folder}: Object){
			return folder;
		},
		folders({folders, ...folder}: Object){
			return folder;
		},
		sessions({user, ...session}: Object){
			return session;
		}	
	},
	inverseRelationshipsSchema: {

	}
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
