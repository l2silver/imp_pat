//@flow
import React, {PureComponent} from 'react';
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import {Icon} from '@imp_pat/ui-kit/components';
import {interact} from '@imp_pat/ui-kit/utils/interactionUtils';
import {getIdParam} from '@imp_pat/ui-kit/utils/routerUtils';
import CascadingMenuFolder from './Folder';
import CascadingMenuSection from './Section';
import {container, caret} from './style.pcss';

class CascadingMenu extends PureComponent {
	constructor(props){
		super(props);
	}
	render(){
		const {publication, folders, sections, interactions, interact} = this.props;
		const open = interactions.get('open');
		return <ul className={container}>	
			<li>
				<div>{publication.get('name')}<Icon onClick={()=>interact({open: !open})} className={caret} name={`caret-${open ? 'down' : 'up'}`} /></div>
				<ul className={container}>
					{
						folders.map(folder=><CascadingMenuFolder folderId={folder.id} />)
					}
					{
						sections.map(section=><CascadingMenuSection sectionId={section.id} />)
					}
				</ul>
				<div>
					<div><Icon name='plus' /></div>
					<div></div>
				</div>
			</li>
		</ul>
	}
}

const getPublicationId = getIdParam;

const publication = createSelector(
	[
		getPublicationId,
		(state, props)=>{},
	],
	(publicationId, publications)=>{
		return new Map({name: 'First Publication'});
		return publications.get(`${publicationId}`);
	}
)

const folders = createSelector(
	[
		getPublicationId,
		(state, props)=>{},
		(state, props)=>{},
	],
	(publicationId, foldersByPublication, folders)=>{
		return new List();
		return foldersByPublication.get(`${publicationId}`).map(id=>folders.get(`${id}`));
	}
)

const sections = createSelector(
	[
		getPublicationId,
		(state, props)=>{},
		(state, props)=>{},
	],
	(publicationId, sectionsByPublication, sections)=>{
		return new List();
		return sectionsByPublication.get(`${publicationId}`).map(id=>sections.get(`${id}`));
	}
)

const mapStateToProps = createStructuredSelector({
	publication,
	folders,
	sections,
	interactionIdentity: getPublicationId,
});

const InteractiveCascadingMenu = interact('CascadingMenu', {open: true})(CascadingMenu)
export default connect(mapStateToProps)(InteractiveCascadingMenu);
