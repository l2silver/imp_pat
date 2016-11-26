//@flow
import React, {PureComponent} from 'react';
import {container, menuList} from './style.pcss';
class MainNav extends PureComponent {
	render(){
		const {brandName, children} = this.props;
		return <nav className={container}>
            <div className={menuList}>
            	{children}
            </div>
	    </nav>
	}
}


export {MainNav};