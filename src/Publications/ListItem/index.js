import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

class PublicationItem extends PureComponent {
	render(){
		const {publication, goTo} = this.props;
		return <li onClick={goTo}>
			{publication.get('title')}
		</li>
	}
}

function mapStateToPropsFactory(){
	const getpublicationId = (state, props)=>props.publicationId;
	return createStructuredSelector({
		publication: findEntity(getpublicationId, 'publishedPublications'),
	});
}

function mapDispatchToProps(dispatch, {publicationId}){
	return {
		goTo(){
			dispatch(locationPush(`/publications/${publicationId}`));
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(PublicationItem);