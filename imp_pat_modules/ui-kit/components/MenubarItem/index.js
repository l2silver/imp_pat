//@flow
import React, {PureComponent} from 'react';

export class MenubarItem extends PureComponent {
	render(){
		return <li>
			{this.props.children}
		</li>
	}
}