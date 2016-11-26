//@flow
import {setCustomActionHandlers} from '@imp_pat/ui-kit/utils/actionUtils';
export const REGISTER = 'REGISTER';
export const CHECK_EMAIL = 'checkEmail';
const actionHandlers = {
	[REGISTER]: (state, action)=>{
		const {entity, session: {token}} = action;
		localStorage.setItem('token', token);
		return state.deleteIn(['entities', 'users', `${entity.id}`, 'password']);
	}
}

setCustomActionHandlers(actionHandlers);
