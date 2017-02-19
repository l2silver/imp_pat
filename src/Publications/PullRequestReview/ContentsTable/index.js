// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import ContentsFolder from '../../Show/ContentsTable/ContentsFolder';
import Next from '../../Show/Next';
import {ul} from '../../Show/ContentsTable/style.pcss';


class ContentsTable extends PureComponent {
	render(){
		const {folderId} = this.props;
		return <div>
			<ul className={ul}>
				<ContentsFolder pullRequestReview folderId={folderId} root />
			</ul>
			<Next folderId={folderId} />
		</div>
	}
}

const getFolderId = getIdParam(1);

const mapStateToProps = createStructuredSelector({
	folderId: getFolderId,
});

export default connect(mapStateToProps)(ContentsTable);