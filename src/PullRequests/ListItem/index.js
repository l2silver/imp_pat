// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {findEntity} from '@imp_pat/ui-kit/utils/selectorUtils';
export class PullRequestListItem extends PureComponent {
	render(){
		const {pullRequest} = this.props;
		const {handleClick} = this;
		return <li onClick={handleClick}>
			{
				pullRequest.get('id')
			}
		</li>
	}
	handleClick = () => {
		const {onClick, pullRequest} = this.props;
		onClick(pullRequest);
	}
}

const getPullRequestId = (state, props)=>props.id

function mapStateToPropsFactory(){
	return createStructuredSelector({
		pullRequest: findEntity(getPullRequestId, 'pullRequests'),
	})
}

export default connect(mapStateToPropsFactory)(PullRequestListItem);