// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import ContentsFolder from '../../../Show/ContentsTable/ContentsFolder';
import Next from '../../../Show/Next';
import {ul} from '../../../Show/ContentsTable/style.pcss';

class ContentsTable extends PureComponent {
	render(){
		const {folderId, publication} = this.props;
		return <div>
			<ul className={ul}>
				<ContentsFolder pullRequestReview folderId={folderId} name={publication.get('title')} />
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