import React from 'react';
import { connect } from 'react-redux';
// Actions
import {
	removeAllFiles,
	convertFiles
} from '../actions/FileActions';

class ConversionView extends React.Component {

	didSelectClear(event) {
		event.preventDefault();
		this.props.removeAllFiles();
	}

	didSelectConvert(event) {
		event.preventDefault();
		const videos = Object.keys(this.props.videos).map((key, idx) => {
			return this.props.videos[key];
		});
		this.props.convertFiles(videos);
	}

	render() {
		return (
			<div style={{flex:"none"}}>
				<button onClick={this.didSelectClear.bind(this)}>Cancel</button>
				<button onClick={this.didSelectConvert.bind(this)}>Convert</button>
			</div>
		)
	}
}

export default connect(null, {removeAllFiles,convertFiles})(ConversionView);