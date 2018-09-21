import React from 'react';
import { connect } from 'react-redux';
// Actions
import {
	removeAllFiles,
	convertFiles
} from '../actions/FileActions';

function mapStateToProps({ files }) {
	return { files };
}

class ConversionView extends React.Component {

	didSelectClear(event) {
		event.preventDefault();
		this.props.removeAllFiles();
	}

	didSelectConvert(event) {
		event.preventDefault();
		const files = Object.keys(this.props.files).map((hash) => {
			return this.props.files[hash];
		});
		this.props.convertFiles(files);
	}

	render() {
		return (
			<div style={{...this.props.style}}>
				<button onClick={this.didSelectClear.bind(this)}>Cancel</button>
				<button onClick={this.didSelectConvert.bind(this)}>Convert</button>
			</div>
		)
	}
}

export default connect(mapStateToProps, {removeAllFiles,convertFiles})(ConversionView);