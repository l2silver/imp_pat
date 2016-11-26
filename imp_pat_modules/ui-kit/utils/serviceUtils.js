//@flow
import axios from 'axios';

export function post(url: string, post: *){
	return axios.post(url, post).then(({data})=>data);
}