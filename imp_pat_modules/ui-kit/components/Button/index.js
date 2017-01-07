//@flow
import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {Icon} from '../Icon';
type $propTypes = {
	onClick: Function;
	styleType?: string;
	children?: string;
	confirmationMessage?: string;
	iconName?: string
};

export class Button extends PureComponent {
	props: $propTypes;
	render(){
		return this.generateContent(this.props);
	}
	generateContent(properties: $propTypes){
		const {styleType = 'default', children, confirmationMessage, onClick: originalOnClick, iconName, ...props} = properties;
		let className;
		let Tag;
		if(iconName){
			className = '';
			Tag = Icon;
		}else{
			className = classnames('btn', `btn-${styleType}`);
			Tag = 'button';
		}
		
		let onClick = originalOnClick;
		if(confirmationMessage){
			onClick = (event)=>{
				event.preventDefault();
				const r = confirm(confirmationMessage);
				if(r){
					originalOnClick(event);
				}
			}
		}
		return <Tag className={className}
			onClick={onClick}
			name={iconName}
			{...props}
		>
			{children}
		</Tag>
	}

}