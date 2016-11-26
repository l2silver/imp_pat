//@flow
import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {container, closePanel, closed} from './style.pcss';


export class Panel extends PureComponent {
	render(){
		const {children, onClose} = this.props;
		return <div className={classnames(container, {[closed]: this.props.closed})}>
			<span onClick={onClose} className={closePanel}>x</span>
			{children}
		</div>
	}
}