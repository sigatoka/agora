import React from 'react';
import { connect } from 'react-redux';
// Components
import Dropzone from 'react-dropzone';
// Actions
import {
	addFiles
} from '../actions/FileActions';

class VideoView extends React.Component {

	didDropFiles(acceptedFiles, rejectedFiles) {

		const videos = acceptedFiles.map(({ name, path, size, type }, idx) => {

			return { fileName:name, path, size, type, completed:(idx>0) };
		});

		if (videos.length <= 0) return;
		this.props.addFiles(videos);
	}

	renderDropLabel({ isDragActive, isDragReject }) {
		if (isDragActive) {
			return <h4>Drop files to get started</h4>
		} else if (isDragReject) {
			return <h4>Oops... We can't accept that file!</h4>
		} else {
			return <h4>Drag and drop, or click and select files to get started</h4>
		}
	}

	render() {
		return (
			<div style={{...this.props.style,padding:"1%",textAlign:"center"}}>
				<Dropzone multiple accept="video/*" onDrop={this.didDropFiles.bind(this)}>{this.renderDropLabel}</Dropzone>
			</div>
		)
	}
}

export default connect(null, {addFiles})(VideoView);