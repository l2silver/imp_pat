// @flow
import React, {PureComponent} from 'react';
import {Map, List} from 'immutable';
import titleCaseUtil from 'title-case';
import {bindMethods} from '../../utils/classUtils';
import {validate} from '../../utils/formUtils';

type $fieldProperties = {
	label: string;
	placeholder: string;
	name: string;
	errors: List<string>;
	value: *;
	initialValue: *;
	isDirty: boolean;
	isValid: boolean;
	verify: List<any>;
};

export type $field = Map<$Keys<$fieldProperties>,*>;

export type $fields = Map<string, $field>;

function genFieldFromString(key) : $Exact<$fieldProperties> {
	const titleCase = titleCaseUtil(key);
	return {
		name: key,
		label: titleCase,
		placeholder: titleCase,
		errors: new List(),
		isValid: false,
		value: null,
		initialValue: null,
		isDirty: false,
		verify: new List(),
	}
}

function genFieldConfig(fields, key, initialValue){
	const field = fields[key];
	if(typeof field !== 'object'){
		return genFieldFromString(key);
	}
	return {...genFieldFromString(key), ...field, value: initialValue};
}

export function form({fields, actions, onChange, config}: *, WrappedComponent: *){
	return class Form extends PureComponent {
		state: {
			fields: Map<
				string,
				$field
			>,
			isValid: boolean;
		};
		actions: {
			submit: {onClick: ()=>Promise<*>};
			cancel: {onClick: ()=>void};
		};
		constructor(props: *){
			super(props);
			bindMethods(this, 'validityCheck', 'getField', 'submit', 'jsonifyFields', 'handleErrors', 'onChange');
			const {submit, cancel} = actions || props.actions
			const onChangeCBs = onChange || props.onChange || {};

			this.state = {
				fields: Object.keys(fields).reduce((allFields, key)=>{
					const onChangeCB = onChangeCBs[key];
					return allFields.set(
						key,
						new Map(
							genFieldConfig(fields, key, props[key])
						).set(
							'onChange',
							onChangeCB ? (fieldNameValueObject)=>this.onChange(onChangeCB, fieldNameValueObject) 
							: (fieldNameValueObject)=>this.onChange(props.update, fieldNameValueObject)
						)
					);
				}, new Map()),
				isValid: false,
				...config,
			};
			this.actions = {
				submit: {
					onClick: this.submit.bind(this, submit),
					children: 'Submit',
					styleType: 'primary',
				},
				cancel: {
					onClick: cancel,
					children: 'Cancel',
					styleType: 'default'
				},
			};
		}
		render(){
			return <WrappedComponent {...this.props} fields={this.state.fields} actions={this.actions} isValid={this.state.isValid} />
		}
		getField(fieldName: string){
			return this.state.fields.get(fieldName);
		}
		validityCheck(field: $field) : {fields: $fields}{
			const errors = field.get('verify').reduce(
				(errors, verification)=>{
					if(typeof verification === 'string'){
						return validate(verification, field, errors);
					}
					return verification(field, errors);
				},
				new List()
			);
			const fields = this.state.fields.set(
				field.get('name'),
				field.merge({
					errors,
					isValid: errors.size === 0,
				})
			);
			const isValid = fields.toKeyedSeq().reduce((valid, field)=>{
				if(valid){
					return field.get('isValid');
				}
				return valid;
			}, true);
			return {
				fields,
				isValid,
			}
		}
		onChange(updateCallback: ()=>Promise<any>, {name, value}: {name: string; value: *}){
			const field = this.state.fields.get(name);
			const newField = field.merge({
				isDirty: true,
				value,
			});
			
			this.setState(
				this.validityCheck(newField)
			)
			if(updateCallback){
				updateCallback(newField, this.jsonifyFields())
				.catch(this.handleErrors);
			}
		}

		submit(submitCallback: ()=>Promise<{[key: string]: string}>){
			return submitCallback(this.jsonifyFields())
			.catch(this.handleErrors);
		}

		handleErrors(errors: Object){
			const nextFields = Object.keys(errors).reduce((fields, key)=>{
				return fields.updateIn([key, 'errors'], (errorsList)=>{
					if(errorsList){
						return errorsList.concat(errors[key]);	
					}
					return new List();
				})
				.setIn([key, 'isValid'], false);
			}, this.state.fields);

			this.setState({
				fields: nextFields,
			});
		}
		jsonifyFields(){
			const jsonFields = this.state.fields.toJS()
			return Object.keys(jsonFields).reduce((jsonifiedFields, key)=>{
				jsonifiedFields[key] = jsonFields[key].value;
				return jsonifiedFields;
			}, {})
		}
	}
}