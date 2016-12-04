//@flow
import React from 'react';
import {Container, TextInput, BaseRest} from '@imp_pat/ui-kit/components';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CascadingMenu from '../CascadingMenu';
class EditPublication extends BaseRest {
	constructor(props, context){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
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
	baseRestMessages(){
		return [getMessage('publications', {id: this.props.publicationId})];
	}
}

const mapStateToProps = createStructuredSelector({
	publicationId: getIdParam,
});

export default connect(mapStateToProps)(EditPublication);