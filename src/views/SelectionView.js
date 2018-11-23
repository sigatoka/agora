import React from 'react';
import { connect } from 'react-redux';
// Components
import Dropzone from 'react-dropzone';
// Actions
import {
	addFiles,
	loadLibrary
} from '../actions/FileActions';

const ACCEPTED_FORMATS = ['video/mp4','video/x-m4v','.mkv','video/*'];

class VideoView extends React.Component {

	didDropFiles(acceptedFiles, rejectedFiles) {

		const files = acceptedFiles.map(({ name, path, size, type }, idx) => {

			const parts = name.match(/\.(\w*)/gi);
			const format = parts[parts.length-1].replace(/\./,'');
			type = type.split(/\//gi)[0];
			
			return { name, path, size, format, type };
		});

		if (files.length <= 0) return;
		this.props.addFiles(files);
	}

	renderDropLabel({ isDragActive, isDragReject }) {
		if (isDragActive) {
			return <h4>Drop files to get started</h4>
		} else if (isDragReject) {
			return <h4>Oops... We can't accept that file!</h4>
		} else {
			return <h4>Drag and drop,<br/>or click and select<br/>files to get started</h4>
		}
	}

	render() {
		return (
			<div style={{...this.props.style,padding:"3vw 2vw",textAlign:"center"}}>
				<Dropzone multiple accept={ACCEPTED_FORMATS.join(',')} onDrop={this.didDropFiles.bind(this)} style={{width:"100%",maxHeight:"500px",backgroundColor:"transparent",border:"2px dashed rgba(0,0,0,0.1)",borderRadius:"12px",color:"rgba(0,0,0,0.25)"}}>{this.renderDropLabel}</Dropzone>
			</div>
		)
	}
}

export default connect(null, {addFiles,loadLibrary})(VideoView);