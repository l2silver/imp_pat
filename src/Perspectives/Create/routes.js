// @flow

import CreatePerspective from './'
export {createLocation as location} from '@imp_pat/ui-kit/models/perspectives';

export const component = CreatePerspective;

export function conditionalLocation(query: Object, pathname: string) : boolean {
	if(pathname.includes(`publications`)){
		return false;
	}
	return true;
}