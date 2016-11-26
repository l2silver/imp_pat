//@flow
import React, {PureComponent} from 'react';
import {Container, TextInput} from '@imp_pat/ui-kit/components';
import CascadingMenu from '../CascadingMenu';
export default class EditPublication extends PureComponent {
	render(){
		return <Container>
			<Container sidebar>
				<CascadingMenu />
			</Container>
			<Container mainContent>
				<TextInput multi />
			</Container>
		</Container>
	}
}