import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
// Components
import FileListItem from '../components/FileListItem';
// Actions
import {
	updateFile,
	convertFiles,
	removeFile,
	removeAllFiles,
	showInFolder
} from '../actions/FileActions';

function mapStateToProps({ files }) {
	return { files };
}

class FileListView extends React.Component {

	static defaultProps = {
		files:{}
	}

	static propTypes = {
		files:object
	}

	didChangeValues(video) {
		this.props.updateFile(video);
	}

	didSelectShowInFolder({ path }) {
		this.props.showInFolder(path);
	}

	didSelectRemove(video) {
		console.log("remove",video)
		this.props.removeFile(video);
	}

	render() {
		return (
			<div style={{flex:"10 5",...this.props.style,padding:"0.2% 0px",overflowX:"hidden",overflowY:"auto"}}>
				{Object.keys(this.props.files).map((key, idx) => {
					const asset = this.props.files[key];
					return <FileListItem
						key={idx}
						onShow={this.didSelectShowInFolder.bind(this)}
						onChange={this.didChangeValues.bind(this)}
						onRemove={this.didSelectRemove.bind(this)}
						name={asset.name}
						fileName={asset.fileName}
						path={asset.path}
						type={asset.type}
						complete={asset.complete||(idx===1)}
						progress={asset.progress}
					/>
				})}
			</div>
		)
	}
}

export default connect(mapStateToProps, {updateFile,convertFiles,removeFile,removeAllFiles,showInFolder})(FileListView);