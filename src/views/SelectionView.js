import React from 'react';
import { connect } from 'react-redux';
// Components
import Dropzone from 'react-dropzone';
// CSS
import '../styles/SelectionView.css';
// Actions
import {
	addFiles
} from '../actions/FileActions';

const ACCEPTED_FORMATS = ['video/mp4','video/x-m4v','.mkv','video/*'].join(',');

const mapDispatchToProps = {
	addFiles
}

class VideoView extends React.Component {

	didDropFiles(acceptedFiles, rejectedFiles) {
		const paths = acceptedFiles.map(({ path }) => path);
		if (paths.length <= 0) return;
		this.props.addFiles(paths);
	}

	renderDropLabel({ isDragActive, isDragReject }) {
		// Yeah wow!
		// What is this shit...?
		if (isDragActive) {
			return <div className="container"><span>Go ahead...<br/>drop it!</span><span>Click me to select<br/>files image</span></div>
		} else if (isDragReject) {
			return <div className="container"><span>Oops... We can't accept that file!</span><span>Click me to select<br/>files image</span></div>
		} else {
			return <div className="container"><span>Drag and drop,<br/>or click to select<br/>files to get started</span><span>Click me to select<br/>files image</span></div>
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

export default connect(null, mapDispatchToProps)(VideoView);