//@flow
import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import {bindMethods} from '../../utils/classUtils';

type $propTypes = {
	name: string;
	label?: string;
	errors?: Map<string, string>;
	onChange: ()=>void;
	multi?: boolean;
};

class TextInput extends PureComponent {
	props: $propTypes;
	constructor(props: $propTypes){
		super(props);
		bindMethods(this, 'onChange', 'generateContent')
	}
	render(){
		return this.generateContent(this.props);
	}
	generateContent(combinedProps: $propTypes){
		const {label, errors, onChange, multi, readonly, ...props} = combinedProps
		return <div>
			{label && <label>{label}</label>}
			{multi ? 
				<textarea disabled={readonly} className='form-control' onChange={this.onChange.bind(null, props.name, onChange)} {...props} /> 
				:
				<input disabled={readonly} type='text' className='form-control' onChange={this.onChange.bind(null, props.name, onChange)} {...props} /> 
			}
			{errors && errors.size > 0 && <span className='label label-danger'>{errors.first()}</span>}
		</div>	
	}
	onChange(name: string, onChange: ()=>void, event: {target: {value: *}}){
		const {value} = event.target;
		onChange({value, name})
	}
}

export {TextInput}