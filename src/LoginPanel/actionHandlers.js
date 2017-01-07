//@flow
import {setCustomActionHandlers} from '@imp_pat/ui-kit/utils/actionUtils';
export const LOGIN = 'LOGIN';
const actionHandlers = {
	[LOGIN]: (state, action)=>{
		const {entity: {token}} = action;
		localStorage.setItem('token', token);
		return state;
	}
}

setCustomActionHandlers(actionHandlers);
