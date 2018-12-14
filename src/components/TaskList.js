import React from 'react';
import { shape, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { Transition } from 'react-spring'
import _ from 'lodash';
// Components
import TaskListItem, { PropTypes as FileProps } from '../components/TaskListItem';
// Actions
import {
	updateFile,
	removeFile,
	removeAllFiles,
	showInFolder
} from '../actions/FileActions';

import {
	addTask,
	removeTask
} from '../actions/TaskActions';

function mapStateToProps({ files, tasks }) {
	return { files, tasks };
}

const mapDispatchToProps = {
	updateFile,
	removeFile,
	removeAllFiles,
	showInFolder,
	addTask,
	removeTask
}

class TaskList extends React.Component<FileProps> {

	didChangeFormat(atKey, toFormat) {

		let file = this.props.files[atKey];
		if (!file) return;
		if (!(file.outputs instanceof Array)) file.outputs = [];
		const outputPath = file.path.replace(file.format, toFormat);
		// Modify output array
		if (file.outputs.indexOf(outputPath) < 0) {
			file.outputs.push(outputPath);
			this.props.addTask({
				_id: outputPath,
				name: file.title,
				source: atKey,
				input: file.path,
				output: file.path.replace(file.format,toFormat),
				format: toFormat,
				progress: 0,
				complete: false
			});
		} else {
			file.outputs.splice(file.outputs.indexOf(outputPath), 1);
			this.props.removeTask(outputPath);
		}

		this.props.updateFile(file);
	}

	didSelectShowInFolder(atKey) {
		const { path } = this.props.files[atKey];
		if ('string' === typeof path && path !== "")
			this.props.showInFolder(path);
	}

	didSelectReset(atKey) {
		let file = this.props.files[atKey];
		(file.outputs||[]).forEach(task => this.props.removeTask(task));
		file.outputs = [];
		this.props.updateFile(file);
	}

	didSelectRemove(atKey) {
		const file = this.props.files[atKey];
		(file.outputs||[]).forEach(task => this.props.removeTask(task));
		this.props.removeFile(file);
	}

	render() {

		const keys = Object.keys(this.props.files);
		const data = keys.map(atKey => {
			// Hacked this mapping together, requires a much better implementation!
			return { ...this.props.files[atKey], outputs:Object.values(this.props.tasks).filter(task => { return (this.props.files[atKey].outputs||[]).indexOf(task._id) >= 0} ) };
		});

		return (
			<div style={{flex:"10 5",...this.props.style,padding:"0px 3vmin",overflowX:"hidden",overflowY:"auto"}}>
				<Transition keys={keys} from={{opacity:0,height:0,padding:0}} enter={{opacity:1,height:60,padding:10}} leave={{opacity:0,height:0,pointerEvents:'none',padding:0}}>
					{data.map(asset => styles =>
						<TaskListItem
							style={styles}
							hash={asset._id}
							onShow={this.didSelectShowInFolder.bind(this)}
							onChange={this.didChangeFormat.bind(this)}
							onReset={this.didSelectReset.bind(this)}
							onRemove={this.didSelectRemove.bind(this)}
							id={asset._id}
							title={asset.title}
							name={asset.name}
							outputs={asset.outputs||[]}
							format={asset.format}
						/>
					)}
				</Transition>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);