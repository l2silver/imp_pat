//@flow

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ReactMarkdown from 'react-markdown';

import {Button, Icon} from '@imp_pat/ui-kit/components';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';

import {goToIndexPerspective, types} from '@imp_pat/ui-kit/models/perspectives';
import {isLoggedIn} from '@imp_pat/ui-kit/models/sessions';

import Next from '../Next';
import * as actions from './actions';


class ShowSection extends PureComponent {
	render(){
		const {section, likeId, removeLike, createLike, indexPerspective, sectionId, loggedIn, folderId} = this.props;
		const likeIcon = !!likeId ? 
							<Icon name={`circle`} onClick={()=>removeLike(likeId)} />
							:
							<Icon name={`circle-o`} onClick={loggedIn ? ()=>createLike(sectionId) : ()=>{}} />;
		return <div>
			<h1>{section.get('name')}</h1>
			<span>
				{likeIcon}
				{Number(section.get('likesCount') || 0) + Number(!!likeId)}
			</span>
			<Button iconName='comment-o' onClick={()=>indexPerspective(sectionId)}/>
			{
				section.get('content') && <ReactMarkdown source={section.get('content')}/>
			}
			<Next sectionId={sectionId} parentFolderId={folderId} />
		</div>
	}
}

function mapDispatchToProps(){
	return {}; 
}

const getFolderId = getIdParam(1);
const getSectionId = getIdParam(2);

const mapStateToProps = createStructuredSelector({
	folderId: getFolderId,
	sectionId: getSectionId,
	section: findEntity(getSectionId, 'publishedSections'),
	likeId: getRelatedEntityIds(getSectionId, 'publishedSections', 'like'),
	loggedIn: isLoggedIn,
})

function mapDispatchToProps(dispatch){
	return {
		removeLike(likeId){
			dispatch(actions.removeLike(likeId))
		},
		createLike(sectionId){
			dispatch(actions.createLike(sectionId))
		},
		indexPerspective(sectionId){
			dispatch(goToIndexPerspective(sectionId, types.section))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSection);