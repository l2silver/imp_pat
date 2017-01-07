//@flow
import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import {TextInput} from '../TextInput';
import {shallowToJS} from '../../utils/formUtils';

export class LinkedTextInput extends PureComponent {
	props: {
		field: Map<string, any>
	}
	render(){
		const {field, ...otherProps} = this.props;
		const {name, onChange, label, value, errors} = shallowToJS(field);
		const combinedProps = {name, onChange, label, value, errors, ...otherProps};
		return <TextInput {...combinedProps}/>
	}

}