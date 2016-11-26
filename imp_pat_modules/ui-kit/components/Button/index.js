//@flow
import React, {PureComponent} from 'react';
import classnames from 'classnames';

type $propTypes = {
	styleType?: string;
	children: string;
};

export class Button extends PureComponent {
	props: $propTypes;
	render(){
		return this.generateContent(this.props);
	}
	generateContent(properties: $propTypes){
		const {styleType = 'default', children, ...props} = properties;
		const className = classnames('btn', `btn-${styleType}`);
		return <button className={className}
			{...props}
		>
			{children}
		</button>
	}

}