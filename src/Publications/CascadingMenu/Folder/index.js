//@flow
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';
import {Icon} from '@imp_pat/ui-kit/components';
import {interactivate} from '@imp_pat/ui-kit/utils/interactionUtils';
import {findEntity, getRelatedEntityIds} from '@imp_pat/ui-kit/utils/selectorUtils';
import * as actions from './actions';
import CascadingMenuSection from '../Section';
import {container, caret, hide} from './style.pcss';

const getFolderId = (state, {folderId})=>folderId;

export default class CascadingMenuFolder extends PureComponent {
	CascadingMenuFolder: any;
	constructor(props){
		super(props);
		const folder = findEntity(getFolderId, 'folders');
		const folders = getRelatedEntityIds(getFolderId, 'folders', 'folders');
		const sections = getRelatedEntityIds(getFolderId, 'folders', 'sections');
		const mapStateToProps = createStructuredSelector({
			folder,
			folders,
			sections,
			interactionIdentity: getFolderId,
		});

		function mapDispatchToProps(dispatch, {folderId}){
			return {
				createFolder(){
					dispatch(
						actions.create(
							folderId
						)
					)
				},
				createSection(){
					dispatch(
						actions.createSection(
							folderId
						)
					)
				}
			};
		}

		const InteractiveCascadingMenuFolder = interactivate('CascadingMenuFolder')(CascadingMenuFolder)
		this.CascadingMenuFolder = connect(mapStateToProps, mapDispatchToProps)(InteractiveCascadingMenuFolder);
	}
	render(){
		const {CascadingMenuFolder} = this;
		const {folder, folders, sections, interactions, interact, createFolder, createSection} = this.props;
		const open = interactions.get('open');
		return <li>
			<div><Icon name='folder' />{folder.get('name') || 'Untitled'}<Icon onClick={()=>interact({open: !open})} className={caret} name={`caret-${open ? 'down' : 'right'}`} /> </div>
			<ul className={container} className={classnames({[hide]: !open})}>
				{
					folders.map(folderId=><CascadingMenuFolder folderId={folderId} key={`cascading-menu-folder-${folderId}`}/>)
				}
				{
					sections.map(sectionId=><CascadingMenuSection sectionId={sectionId} key={`cascading-menu-section-${sectionId}`} />)
				}
			</ul>
			<div>
				<div><Icon name='plus' onClick={()=>createFolder()}/></div>
				<div><Icon name='plus-square' onClick={()=>createSection()}/></div>
			</div>
		</li>
	}
}