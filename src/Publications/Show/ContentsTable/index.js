// @flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import ContentsFolder from './ContentsFolder';
import {ul} from './style.pcss';
import Next from '../Next';

class ContentsTable extends PureComponent {
	render(){
		const {folderId} = this.props;
		return <div>
			<ul className={ul}>
				<ContentsFolder folderId={folderId} root />
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