//@flow
import React, {PureComponent} from 'react';
import {MainNavItem} from './Item';
import {container, menuList} from './style.pcss';
class MainNav extends PureComponent {
	render(){
		const {brandName, children} = this.props;
		return <nav className={container}>
            <div className={menuList}>
            	<MainNavItem>{brandName}</MainNavItem>
            	{children}
            </div>
	    </nav>
	}
}


export {MainNav};