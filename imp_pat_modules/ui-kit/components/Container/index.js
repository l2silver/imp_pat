//@flow
import React, {PureComponent} from 'react';
import {container, sidebar, mainContent, menubar} from './style.pcss';
import classnames from 'classnames';
class Container extends PureComponent {
	render(){
		const klass = classnames(
			container,
			{
				[sidebar]: this.props.sidebar,
				[mainContent]: this.props.mainContent,
				[menubar]: this.props.menubar,
				[this.props.className]: this.props.className
			}
		);
		return <div className={klass}>
			{this.props.children}
		</div>
	}
}

export {Container}