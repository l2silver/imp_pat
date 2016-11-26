//@flow
import {Map, List} from 'immutable';
import validatejs from 'validate.js';
import type {$field} from '../hoc/form';
const constraints = {
	required: ()=>({
		presence: true,
	}),
	email: ()=>({
		email: true,
	}),
	minLength: (amount)=>{
		return ({
		length: {
	      minimum: Number(amount),
	    }
	})}
};

function generateConstraintForField(rawConstraintName, fieldName){
	const [constraintName, ...args] = rawConstraintName.split(':');
	return {
		[fieldName]: constraints[constraintName](...args),
	}
}

export function validate(constraintName: string, field: $field, errors: List<string>){
	if(errors.size){
		return errors;
	}
	const name = field.get('name');
	const value = field.get('value');
	const nextErrors = 
		validatejs(
			{[name]: value},
			generateConstraintForField(
				constraintName,
				name
			),
			{
				format: 'flat',
			}
		);
	return errors.concat(nextErrors || []);
}

export function shallowToJS(map: Map<string, *>){
	return map.entrySeq().reduce((shallowToJsResult: {}, [key, value])=>{
		shallowToJsResult[key] = value;
		return shallowToJsResult;
	}, {})
}