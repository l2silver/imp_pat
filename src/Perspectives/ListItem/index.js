import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
import {goToShow} from '@imp_pat/ui-kit/models/perspectives';

export class PerspectiveListItem extends PureComponent {
	render(){
		const {perspective, goToShowPerspective} = this.props;
		return <li onClick={goToShowPerspective}>
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
		goToShowPerspective(){
			dispatch(goToShow(perspectiveId))
		}
	}
}

export default connect(mapStateToPropsFactory, mapDispatchToProps)(PerspectiveListItem)