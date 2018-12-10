import React from 'react';
import { connect } from 'react-redux';
// Components
import Dropzone from 'react-dropzone';
// Actions
import {
	addFiles,
	loadLibrary
} from '../actions/FileActions';

const ACCEPTED_FORMATS = ['video/mp4','video/x-m4v','.mkv','video/*'].join(',');

const containerStyle = {
	height:"100%",
	fontSize:"3vmax",
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-around",
	alignItems:"center",
	textAlign:"center"
}

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
			return <div style={containerStyle}><span>Go ahead...<br/>drop it!</span><span>Click me to select<br/>files image</span></div>
		} else if (isDragReject) {
			return <div style={containerStyle}><span>Oops... We can't accept that file!</span><span>Click me to select<br/>files image</span></div>
		} else {
			return <div style={containerStyle}><span>Drag and drop,<br/>or click to select<br/>files to get started</span><span>Click me to select<br/>files image</span></div>
		}
	}

	render() {
		return (
			<div style={{...this.props.style,padding:"3vmin"}}>
				<Dropzone multiple accept={ACCEPTED_FORMATS} onDrop={this.didDropFiles.bind(this)} style={{height:"100%",backgroundColor:"transparent",border:"2px dashed rgba(0,0,0,0.1)",borderRadius:"4vmin",color:"rgba(0,0,0,0.25)"}}>{this.renderDropLabel}</Dropzone>
			</div>
		)
	}
}

export default connect(null, {addFiles,loadLibrary})(VideoView);