// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';

import {locationPush} from '@imp_pat/ui-kit/utils/routerUtils';



export class SearchPanel extends PureComponent {
	render(){
		const {publication, goTo} = this.props;
		return <li onClick={goTo}>
			{publication.get('title')}
		</li>
	}
}

const getPublicationId = (state, props)=>props.publicationId;

function mapStateToPropsFactory(){
	return createStructuredSelector(
		{
			publication: findEntity(getPublicationId, 'publishedPublications')	
		}
	)
}

function mapDispatchToProps(dispatch, {publicationId}){
	return {
		goTo(){
			dispatch(locationPush(`/publications/${publicationId}`))
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(SearchPanel)