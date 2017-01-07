//@flow
import {setCustomActionHandlers} from '@imp_pat/ui-kit/utils/actionUtils';
export const LOGOUT = 'LOGOUT';

const actionHandlers = {
	[LOGOUT]: (state)=>{
		localStorage.removeItem('token');
		return state;
	}
}

setCustomActionHandlers(actionHandlers);