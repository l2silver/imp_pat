//@flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {DropTarget} from 'react-dnd';

import {Container, BaseRest, Icon} from '@imp_pat/ui-kit/components';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getIdParam, queryPush, locationPush} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {outgoingId, outgoingTableName, showOutgoingLocation} from '@imp_pat/ui-kit/models/pullRequests';

import {SIDEBAR} from './types';
import {container, sidebar, mainContent} from './style.pcss';
import CascadingMenu from './CascadingMenu';

class EditPublication extends BaseRest {
	constructor(props, context){
		super(props, context)
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {publicationId, dispatch, connectDropTarget, notAcceptedPullRequestId, goToPullRequest} = this.props;
		return <Container>
			{
				connectDropTarget(<div className={container}>
					<div className={sidebar}>
						<Icon name='cog' onClick={()=>dispatch(queryPush({panelLocation: 'publicationSettings', panelOpen: true, panelPublicationId: publicationId}))} />
						<Icon name='list' onClick={()=>dispatch(locationPush(`/publications/${publicationId}/edit`))} />
						{
							notAcceptedPullRequestId &&	<Icon name='plug' onClick={()=>goToPullRequest(notAcceptedPullRequestId)} />
						}
						<CascadingMenu editing />
					</div>
					<div />
					<div className={mainContent}>
						{this.props.children}
					</div>
				</div>)
			}
		</Container>
	}
	baseRestMessages(){
		return [
			getMessage('publications', {id: this.props.publicationId}, {serviceName: 'pullRequests', serviceRestType: 'findNotAcceptedByClone'}),
			getMessage('publications', {id: this.props.publicationId}),
		];
	}
}

const getPublicationId = getIdParam(0)

const mapStateToProps = createStructuredSelector({
	publicationId: getPublicationId,
	notAcceptedPullRequestId: getRelatedEntityIds(getPublicationId, 'publications', 'notAcceptedPullRequest')
});

function mapDispatchToProps(dispatch){
	return {
		goToPullRequest(pullRequestId){
			dispatch(queryPush({
				panelLocation: showOutgoingLocation,
				panelOpen: true,
				pullRequestId,
			}));
		},
		dispatch
	}
}

const sidebarTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

const DroppableEditPublication = DropTarget(SIDEBAR, sidebarTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(EditPublication)


export default connect(mapStateToProps, mapDispatchToProps)(DroppableEditPublication);
