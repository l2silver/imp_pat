// @flow
import React, {PureComponent} from 'react';
import CodeM from 'react-codemirror';
import {Map} from 'immutable';
import './styleCodeMirror.css'
import {CodeMirrorContainer} from './style.pcss'
import {bindMethods} from '../../utils/classUtils';
type $propTypes = {
	name: string;
	label?: string;
	errors?: Map<string, string>;
	onChange: ()=>void;
	multi?: boolean;
	value: any;
	options?: Object;
	height?: string;
};

export class CodeMirror extends PureComponent {
	props: $propTypes;
	shouldComponentUpdate(nextProps: $propTypes){
		if(nextProps.value){
			return false
		}
		return true;
	}
	constructor(props: $propTypes){
		super(props);
		bindMethods(this, 'onChange')
	}
	render(){
		const {label, errors, onChange, multi, value, height, options={}, ...props} = this.props;
		return <div style={height ? {height: `${height}px`} : {}}>
			{label && <label>{label}</label>}
			<CodeM
				options={{
					lineNumbers: true,
					mode: 'markdown',
					preserveScrollPosition: true,
					...options
				}}
				value={value}
				onChange={this.onChange}
				className={CodeMirrorContainer}
			/>
			{errors && errors.size > 0 && <span className='label label-danger'>{errors.first()}</span>}
		</div>
	}
	onChange(value: string){
		const {onChange, name} = this.props;
		onChange({value, name})
	}
}