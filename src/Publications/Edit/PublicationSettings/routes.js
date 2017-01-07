//@flow
import PublicationSettings from './'

export const location = 'publicationSettings';
export const component = PublicationSettings;
export function conditionalLocation(query: Object, pathname: string) : boolean {
	if(pathname.includes(`publications/${query.panelPublicationId}/edit`)){
		return false;
	}
	return true;
}