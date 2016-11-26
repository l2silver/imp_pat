//@flow
import React, {PureComponent} from 'react';
import {Icon} from '@imp_pat/ui-kit/components';
import {connect} from 'react-redux';
import CascadingMenuSection from '../Section';
import {container} from './style.pcss';

class CascadingMenuFolder extends PureComponent {
	render(){
		const {publication, folder, CascadingMenu} = this.props;
		const {folders = []} = this.props;
		const {sections = []} = this.props;
		const mainEntity = publication || folder;
		return <li>
			<div>{mainEntity.get('name')}</div>
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
	}
}

const mapStateToProps = (state)=>{
	return {folder: {name: 'one'}}
}

export default connect(mapStateToProps)(CascadingMenuFolder);