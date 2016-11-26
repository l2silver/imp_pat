//@flow
import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {container} from './style.pcss';
export class MainNavItem extends PureComponent {
	render(){
		return <div className={classnames(container, this.props.className)}>{this.props.children}</div>
	}
}