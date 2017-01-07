import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {goToShowPerspective} from '@imp_pat/ui-kit/models/perspectives';

export class PerspectiveListItem extends PureComponent {
	render(){
		const {perspective, goToShow} = this.props;
		return <li onClick={goToShow}>
			{perspective.get('title')}
		</li>
	}
}

function mapStateToPropsFactory(){
	const getPerspectiveId = (state, props)=>props.perspectiveId
	return createStructuredSelector({
		perspective: findEntity(getPerspectiveId, 'perspectives'),
	});
}

function mapDispatchToProps(dispatch, {perspectiveId}){
	return {
		goToShow(){
			dispatch(goToShowPerspective(perspectiveId))
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(PerspectiveListItem)