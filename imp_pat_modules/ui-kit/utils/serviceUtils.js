//@flow
import axios from 'axios';

export function post(url: string, post: *){
	const token = localStorage.getItem('token');
	const config = {
  		headers: {'x-access-token': token}
	};
	return axios.post(url, post, config).then(({data})=>data);
}