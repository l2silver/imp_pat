//@flow
import React, {PureComponent} from 'react';
import {container} from './style.pcss';
export class MainNavDropdownItem extends PureComponent {
	render(){
		return <li className={container}>{this.props.children}</li>;
	}
}