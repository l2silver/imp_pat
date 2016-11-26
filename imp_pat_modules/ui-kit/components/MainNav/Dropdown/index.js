//@flow
import React, {PureComponent} from 'react';
import {MainNavItem} from '../Item';
import {Icon} from '../../Icon';
import {container, ul} from './style.pcss';
export class MainNavDropdown extends PureComponent {
	render(){
		const {title} = this.props;
		return <MainNavItem className={container}>
			<div>{title} <Icon name='caret-down' /></div>
			<ul className={ul}>
				{this.props.children}
			</ul>
		</MainNavItem>
	}
}