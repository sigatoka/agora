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
// CSS
import '../styles/ConversionView.css';

function mapStateToProps({ files, tasks }) {
	return { tasks };
}

const mapDispatchToProps = {
	startTasks,
	resetTasks,
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
			<section className="conversion">
				<button onClick={this.props.removeAllFiles} disabled={true}>Apply to all</button>
				<button onClick={this.props.removeAllFiles} disabled={!hasContent}>Reset</button>
				<button onClick={event => this.props.startTasks(this.props.tasks)} disabled={!hasContent}>Convert</button>
			</section>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversionView);