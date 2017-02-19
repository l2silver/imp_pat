import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Icon} from '@imp_pat/ui-kit/components';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';

class MyPublicationsItem extends PureComponent {
	render(){
		const {publication, goTo} = this.props;
		return <li onClick={goTo}>
			{publication.get('title')}
			{publication.get('forked') && <Icon name='code-fork'/>}
		</li>
	}
}

function mapStateToPropsFactory(){
	const getpublicationId = (state, props)=>props.publicationId;
	return createStructuredSelector({
		publication: findEntity(getpublicationId, 'publications'),
	});
}

function mapDispatchToProps(dispatch, {publicationId}){
	return {
		goTo(){
			dispatch(locationPush(`/publications/${publicationId}/edit`));
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(MyPublicationsItem);