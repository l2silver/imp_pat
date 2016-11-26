//@flow
import React, {PureComponent} from 'react';
import classnames from 'classnames';
export class Icon extends PureComponent {
	render(){
		const {name, className, ...props} = this.props;
		const klass = classnames('fa', `fa-${name}`, className);
		return <i className={klass} {...props} />
	}
}