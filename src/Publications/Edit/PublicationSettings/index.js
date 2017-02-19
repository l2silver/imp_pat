//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Label, TextInput, Button, PanelContent} from '@imp_pat/ui-kit/components';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import {statusTypes} from '@imp_pat/ui-kit/models/publications';

import * as actions from './actions';

class PublishSettings extends PureComponent {
	render(){
		const {updatePublication, publication, pullRequest} = this.props;
		const publicationId = publication.get('id');
		const forked = publication.get('forked');
		const updatePublicationWithId = updatePublication.bind(null, publicationId);
		const published = this.isPublished();
		const readonly = pullRequest.get('active');
		return <PanelContent title='Settings'>
			<TextInput readonly={readonly} label='Title' type='text' name='title' value={publication.get('title')} onChange={updatePublicationWithId}/>
			<TextInput  readonly={readonly} label='Subtitle' type='text' name='subtitle' value={publication.get('subtitle')} onChange={updatePublicationWithId}/>
			{
				forked ? this.renderForkedSubmit()
				:
				<Button confirmationMessage='Are you sure you want to publish' onClick={this.publish}>{published ? 'Re-Publish' : 'Publish'}</Button>
			}
		</PanelContent>
	}
	renderForkedSubmit = () => {
		 const {pullRequestId, pullRequest, submitPullRequest, publicationId, updatePullRequest, deactivatePullRequest} = this.props
		 if(pullRequest.get('active')){
			 return <div>
			 	<p>Your pull request has been locked and submitted.</p>
				<Button children='Unlock Pull Request' onClick={()=>deactivatePullRequest(pullRequestId)} />
			</div>

		 }
		 const props = {
			confirmationMessage: 'Are you sure you want to submit this pull request',
			onClick: ()=>submitPullRequest(publicationId),
			children: 'Submit Pull Request'
		 } 
		 if(pullRequestId){
			 props.confirmationMessage = 'Are you sure you want to resubmit this pull request';
			 props.onClick = ()=>updatePullRequest(publicationId);
			 props.children = 'Resubmit Pull Request';
		 }
		 return <Button {...props} />
	}
	publish = () => {
		const {publish, publication, submitPullRequest} = this.props;
		const publicationId = publication.get('id');
		const published = this.isPublished();
		const publishFunc = published ? submitPullRequest : publish;
		return publishFunc(publicationId);
	}
	isPublished = () => {
		const {publication} = this.props;
		return publication.get('status') === statusTypes.published;
	}
}

const getPublicationId = getIdParam(0)

const getPullRequestId = getRelatedEntityIds(getPublicationId, 'publications', 'notAcceptedPullRequest')

const mapStateToProps = createStructuredSelector({
	publicationId: getPublicationId,
	publication: findEntity(getPublicationId, 'publications'),
	pullRequestId: getPullRequestId,
	pullRequest: findEntity(getPullRequestId, 'pullRequests'),
})

function mapDispatchToProps(dispatch){
	return {
		updatePublication(id, {name, value}){
			return dispatch(actions.updatePublication(id, {[name]: value}));
		},
		updateType(id, newValues){
			return dispatch(actions.updatePublication(id, newValues))
		},
		publish(id){
			return dispatch(actions.publish(id));
		},
		submitPullRequest(id){
			return dispatch(actions.submitPullRequest(id));
		},
		updatePullRequest(id){
			return dispatch(actions.submitPullRequest(id));
		},
		deactivatePullRequest(id){
			return dispatch(actions.unlockPullRequest(id))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishSettings)