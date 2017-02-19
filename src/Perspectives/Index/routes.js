// @flow

import IndexPerspective from './'
export {indexLocation as location} from '@imp_pat/ui-kit/models/perspectives';

export const component = IndexPerspective;

export function conditionalLocation(query: Object, pathname: string) : boolean {
	if(pathname.includes(`publications`)){
		return false;
	}
	return true;
}