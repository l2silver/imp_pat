// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import ContentsFolder from './ContentsFolder';
import Next from '../Next';
import {ul} from './style.pcss';


class ContentsTable extends PureComponent {
	render(){
		const {folderId, publication} = this.props;
		console.log('folderId', folderId)
		return <div>
			<ul className={ul}>
				<ContentsFolder folderId={folderId} name={publication.get('title')} />
			</ul>
			<Next folderId={folderId} />
		</div>
	}
}

const getPublicationId = getIdParam(0);

const mapStateToProps = createStructuredSelector({
	publication: findEntity(getPublicationId, 'publishedPublications'),
	folderId:    getRelatedEntityIds(getPublicationId, 'publishedPublications', 'folder'),

});

export default connect(mapStateToProps)(ContentsTable);