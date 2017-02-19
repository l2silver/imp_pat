//@flow
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {Container, BaseRest} from '@imp_pat/ui-kit/components';

import {getMessage, indexMessage} from '@imp_pat/ui-kit/utils/messageUtils';
import {bindMethods} from '@imp_pat/ui-kit/utils/classUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import {getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';

import SidebarHeading from './SidebarHeading';
import {container, sidebar, mainContent} from '../Show/style.pcss';

import CascadingMenu from '../Show/CascadingMenu';

class ReviewPublication extends BaseRest {
	constructor(props, context){
		super(props, context);
		bindMethods(this, 'baseRestMessages')
	}
	render(){
		const {publicationId} = this.props;
		return <Container>
			{
				<div className={container}>
					{
						<div className={sidebar}>
							<SidebarHeading publicationId={publicationId}/>
							<CascadingMenu pullRequestReview />
						</div>	
					}
					<div />
					<div className={mainContent}>
						{this.props.children}
					</div>
				</div>
			}
		</Container>
	}
	baseRestMessages(){
		const {publicationId} = this.props;
		const getPublicationMessage = getMessage('publishedPublications', {id: publicationId}, {serviceName: 'pullRequests', serviceRestType: 'getPublicationUnderReview'})
		return [
			getPublicationMessage,
		];
	}
}

const mapStateToProps = createStructuredSelector({
	publicationId: getIdParam(0),
});

export default connect(mapStateToProps)(ReviewPublication);
