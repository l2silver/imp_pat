import {launchMessages, updateMessage} from '@imp_pat/ui-kit/utils/messageUtils';

export function update(dispatch, id, content){
	const message = updateMessage('sections', {id, content});
	launchMessages(dispatch, {debounce: true}, [message])
}