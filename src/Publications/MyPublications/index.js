//@flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {PanelContent, BaseRest} from '@imp_pat/ui-kit/components';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getMessage} from '@imp_pat/ui-kit/utils/messageUtils';

import {getCurrentUserId} from '@imp_pat/ui-kit/models/users';

import Item from './Item'
import * as actions from './actions';



class MyPublications extends BaseRest {
	render(){
		const {publicationIds} = this.props;
		return <PanelContent title='My Publications'>
			<ul>
				{publicationIds.map(publicationId=><Item key={`myPublications-publication-${publicationId}`}publicationId={publicationId} />)}
			</ul>
		</PanelContent>
	}
	baseRestMessages(){
		return [getMessage('users', {}, {serviceName: 'publications', serviceRestType: 'myPublications'})];
	}
}

const mapStateToProps = createStructuredSelector({
	publicationIds: getRelatedEntityIds(getCurrentUserId, 'users', 'myPublications'),
})

function mapDispatchToProps(dispatch){
	return {
		updatePublication(id, {name, value}){
			return dispatch(actions.updatePublication(id, {[name]: value}));
		},
		updateType(id, newValues){
			return dispatch(actions.updatePublication(id, newValues))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPublications)