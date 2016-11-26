import {get} from 'lodash';
import {queryPush} from '@imp_pat/ui-kit/utils/routerUtils';

export function close(){
	return (dispatch, getState)=>{
		dispatch(queryPush({panelOpen: ''}));
	}
}