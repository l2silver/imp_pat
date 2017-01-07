// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import ContentsFolder from './ContentsFolder';
import {ul} from './style.pcss';


class ContentsTable extends PureComponent {
	render(){
		const {publication, folderId} = this.props;
		return <div>
			<h1>{publication.get('title')}</h1>
			{
				publication.get('subtitle') && <h2>{publication.get('subtitle')}</h2>
			}
			<ul className={ul}>
				<ContentsFolder folderId={folderId} root />
			</ul>
		</div>
	}
}

const getPublicationId = getIdParam(0);

const mapStateToProps = createStructuredSelector({
	publication: findEntity(getPublicationId, 'publications'),
	folderId:    getRelatedEntityIds(getPublicationId, 'publications', 'folder'),

});

export default connect(mapStateToProps)(ContentsTable);