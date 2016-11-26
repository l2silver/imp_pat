import React, {PureComponent} from 'react';
import {container} from './style.pcss';
export class Menubar extends PureComponent {
	render(){
		return <ul className={container}>
			{this.props.children}
		</ul>
	}
}