import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { Transition } from 'react-spring'
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

class FileList extends React.Component {

	static defaultProps = {
		files:{}
	}

	static propTypes = {
		files:object
	}

	didChangeValues(video) {
		this.props.updateFile(video);
	}

	didSelectShowInFolder(hash) {
		const { path } = this.props.files[hash];
		this.props.showInFolder(path);
	}

	didSelectRemove(hash) {
		const file = this.props.files[hash];
		this.props.removeFile(file);
	}

	render() {

		const keys = Object.keys(this.props.files);
		const data = keys.map((key) => {
			return this.props.files[key];
		});

		return (
			<div style={{flex:"10 5",...this.props.style,padding:"0.2% 0px",overflowX:"hidden",overflowY:"auto"}}>
				<Transition keys={keys} from={{opacity:0,height:0}} enter={{opacity:1,height:40}} leave={{opacity:0,height:0,pointerEvents:'none'}}>
					{data.map(asset => styles =>
						<FileListItem
							style={styles}
							key={asset.hash}
							onShow={this.didSelectShowInFolder.bind(this)}
							onChange={this.didChangeValues.bind(this)}
							onRemove={this.didSelectRemove.bind(this)}
							hash={asset.hash}
							label={asset.label}
							name={asset.name}
							path={asset.path}
							directory={asset.directory}
							type={asset.type}
							output={asset.output}
							format={asset.format}
							complete={asset.complete}
							progress={asset.progress}
						/>
					)}
				</Transition>
			</div>
		)
	}
}

export default connect(mapStateToProps, {updateFile,convertFiles,removeFile,removeAllFiles,showInFolder})(FileList);