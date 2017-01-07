// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {PanelContent, Button} from '@imp_pat/ui-kit/components';

import {getQuery} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import {goToCreatePerspective} from '@imp_pat/ui-kit/models/perspectives';

import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';


import PerspectiveCommentListItem from '../ListItem'

export class CreatePerspective extends PureComponent {
	render(){
		const {perspectiveIds, entityId, type, goTo, loggedIn} = this.props;
		return <PanelContent title={'Perspectives'}>
			{loggedIn && <Button onClick={()=>goTo(entityId, type)}>New Perspective</Button>}
			<ul>
			{ 
				perspectiveIds.map(perspectiveId=><PerspectiveCommentListItem perspectiveId={perspectiveId} />)
			}
			</ul>
		</PanelContent>
	}
}

const getEntityId = getQuery('perspectiveEntityId');

const mapStateToProps = createStructuredSelector({
	entityId: getEntityId,
	type: 	  getQuery('perspectiveType'),
	perspectiveIds: getRelatedEntityIds(getEntityId, 'publishedSections', 'perspectives'),
	loggedIn: isLoggedIn
})

function mapDispatchToProps(dispatch){
	return {
		goTo(entityId, type){
			dispatch(goToCreatePerspective(entityId, type))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePerspective);