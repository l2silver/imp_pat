// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';

import {goToPublication} from '@imp_pat/ui-kit/models/publications';

export class YourPublicationItem extends PureComponent {
	render(){
		const {publication, goTo} = this.props;
		return <li onClick={goTo}>
			{publication.get('title')}
		</li>
	}
}

function mapStateToPropsFactory(){
	const getPublicationId = (state, props)=>props.publicationId;
	return createStructuredSelector({
		publication:   findEntity(getPublicationId, 'publications'),
	});
}

function mapDispatchToProps(dispatch, {publicationId}){
	return {
		goTo(){
			dispatch(goToPublication(publicationId))
		}
	};
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(YourPublicationItem)