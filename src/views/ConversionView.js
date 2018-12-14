import React from 'react';
import { connect } from 'react-redux';
// Actions
import {
	removeAllFiles
} from '../actions/FileActions';

import {
	startTasks,
	resetTasks
} from '../actions/TaskActions';

function mapStateToProps({ files, tasks }) {
	return { tasks };
}

const mapDispatchToProps = {
	startTasks,
	removeAllFiles
}

class ConversionView extends React.Component {

	didSelectClear(event) {
		event.preventDefault();
		this.props.resetTasks();
		this.props.removeAllFiles();
	}

	render() {

		const hasContent = Object.keys(this.props.tasks).length>0;

		return (
			<div style={{...this.props.style,margin:"0.5%",background:"-webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 80%,rgba(255,255,255,1) 100%)"}}>
				<button onClick={this.props.removeAllFiles} disabled={true} style={{margin:"0.5%"}}>Apply to all</button>
				<button onClick={this.props.removeAllFiles} disabled={!hasContent} style={{margin:"0.5%"}}>Reset</button>
				<button onClick={event => this.props.startTasks(this.props.tasks)} disabled={!hasContent} style={{margin:"0.5%"}}>Convert</button>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversionView);