// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {PanelContent, Button} from '@imp_pat/ui-kit/components';

import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {getCurrentUserId} from '@imp_pat/ui-kit/models/users';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';


import PerspectiveEdit from '../Edit';
import PerspectiveCommentsCreate from '../PerspectiveComments/Create';
import PerspectiveCommentListItem from '../PerspectiveComments/ListItem';

export class ShowPerspective extends PureComponent {
	state: {
		editing: boolean;
	};
	constructor(props: Object){
		super(props);
		this.state = {
			editing: false
		};
		// $FlowFixMe
		this.toggleEdit = this.toggleEdit.bind(this);
	}
	render(){
		const {perspective, perspectiveCommentIds, perspectiveId, currentUserId, loggedIn} = this.props;
		const {editing} = this.state;
		const mine = perspective.get('userId') === currentUserId;
		return <PanelContent title={perspective.get('title')}>
		{mine && <Button iconName='pencil' onClick={this.toggleEdit} />}
		<ul>
			<li>
				{
					editing ? <PerspectiveEdit 
						id={perspectiveId}
						content={perspective.get('content')}
						title={perspective.get('title')}
						toggleEdit={this.toggleEdit}
					/>
							:
					<p>
						{perspective.get('content')}
					</p>
				}
			</li>
			{
				perspectiveCommentIds.map(
					perspectiveCommentId=><PerspectiveCommentListItem
						perspectiveId={perspective.get('id')}
						perspectiveCommentId={perspectiveCommentId}
						key={`perspective-comment-${perspectiveCommentId}`}
					/> 
				)
			}
			{
				loggedIn &&
				<li>
					<PerspectiveCommentsCreate perspectiveId={perspectiveId} />
				</li>
			}
		</ul>
		</PanelContent>
	}
	toggleEdit(){
		this.setState({
			editing: !this.state.editing
		})
	}
}

const getPerspectiveId = getQuery('perspectiveId');

const mapStateToProps = createStructuredSelector({
	perspectiveId: getPerspectiveId,
	perspective: findEntity(getPerspectiveId, 'perspectives'),
	perspectiveCommentIds: getRelatedEntityIds(getPerspectiveId, 'perspectives', 'perspectiveComments'),
	currentUserId: getCurrentUserId,
	loggedIn: isLoggedIn,
})

export default connect(mapStateToProps)(ShowPerspective);