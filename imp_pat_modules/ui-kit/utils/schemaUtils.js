//@flow
export const schemaTypes = {
	ONE:  1,
	MANY: 2,
};

const {ONE, MANY} = schemaTypes;

export const fullSchema = {
	users: [],
	publications: [
		{
			name: 'folders',
			alias: 'folder',
			type: ONE,
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
	sections: [],
}