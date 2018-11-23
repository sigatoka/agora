import React from 'react';
import { connect } from 'react-redux';
// Components
import FileListItem from '../components/FileListItem';
import SelectionView from './SelectionView';
import TaskList from '../components/TaskList';
import ConversionView from './ConversionView';
// Actions
import {
	loadLibrary
} from '../actions/LibraryActions';

function mapStateToProps({ library }) {
	return {library};
}

class LibraryView extends React.Component {

	state = {
		selected:-1
	}

	componentWillMount() {
		this.props.loadLibrary();
	}

	didSelectItem(event) {
		event.preventDefault();
		console.log("Selected item", event.target)
	}

	render() {
		return (
			<div style={{margin:0,padding:0,...this.props.style,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"nowrap",overflow:"hidden"}}>
				<span style={{flex:"6 5",overflowX:"hidden",overflowY:"auto"}}>
					{Object.values(this.props.library).map((item, idx) => (
						<FileListItem key={idx} onclick={this.didSelectItem.bind(this)} hash={item.hash} label={item.label} name={item.name} files={item.files}/>
					))}
				</span>
				<span style={{flex:"4 5"}}>
					<SelectionView style={{flex:"10 5",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:"12px"}}/>
					<TaskList style={{flex:"5 10",minWidth:"500px",transition:"max-height 0.3s ease-out",transition:"max-height 0.3s ease-out"}}/>
					<ConversionView style={{flex:"none"}}/>
				</span>
			</div>
		)
	}
}

export default connect(mapStateToProps, {loadLibrary})(LibraryView);