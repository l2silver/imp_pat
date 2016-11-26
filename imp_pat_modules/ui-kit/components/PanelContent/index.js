//@flow
import React, {PureComponent} from 'react';

export class PanelContent extends PureComponent {
	render(){
		const {title, children} = this.props;
		return 	<div>
			<h1>{title}</h1>
			{children}
		</div>
	}
}