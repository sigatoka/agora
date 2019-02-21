import React from 'react';
import { shape, string, array } from 'prop-types';
import { connect } from 'react-redux';
import { Transition } from 'react-spring'
import _ from 'lodash';
// Components
import TaskListItem from '../components/TaskListItem';
// Actions
import {
	updateFile,
	removeFile,
	removeAllFiles,
	showInFolder
} from '../actions/FileActions';

import './TaskList/TaskList.scss';

import {
	addTask,
	startTasks,
	removeTask
} from '../actions/TaskActions';

const mapStateToProps = ({ files, tasks }) => ({
	files,
	tasks
})

const mapDispatchToProps = {
	startTasks,
	updateFile,
	removeFile,
	removeAllFiles,
	showInFolder,
	addTask,
	removeTask
}

class TaskList extends React.Component {

	static propTypes = {
		files:shape({
			_id:string,
			title:string,
			name:string,
			outputs:array,
			format:string
		})
	}

	constructor() {
		super();
		// Bindings
		this.didChangeFormat = this.didChangeFormat.bind(this);
		this.didClick = this.didClick.bind(this);
		this.didSelectShowInFolder = this.didSelectShowInFolder.bind(this);
		this.didSelectReset = this.didSelectReset.bind(this);
		this.didSelectRemove = this.didSelectRemove.bind(this);
	}

	didChangeFormat(atKey, toFormat) {
		let file = this.props.files[atKey];
		if (!file) return;
		if (!(file.outputs instanceof Array)) file.outputs = [];
		const outputPath = file.path.replace(file.format, toFormat);
		const taskID = file._id + outputPath;
		// Modify output array
		if (file.outputs.indexOf(taskID) < 0) {
			file.outputs.push(taskID);
			this.props.addTask({
				_id: taskID,
				name: file.title,
				source: atKey,
				input: file.path,
				output: outputPath,
				format: toFormat,
				progress: 0,
				complete: false
			});
		} else {
			file.outputs.splice(file.outputs.indexOf(taskID), 1);
			this.props.removeTask(taskID);
		}

		this.props.updateFile(file);
	}

	didClick(asset) {
		this.props.startTasks(asset.outputs);
	}

	didSelectShowInFolder(atKey) {
		const { output } = this.props.tasks[atKey];
		if ('string' === typeof output && output !== "")
			this.props.showInFolder(output);
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
		if (keys.length <= 0) return null;
		const data = keys.map(atKey => {
			// Hacked this mapping together, requires a much better implementation!
			return { ...this.props.files[atKey], outputs:Object.values(this.props.tasks).filter(task => { return (this.props.files[atKey].outputs||[]).indexOf(task._id) >= 0} ) };
		});

		return (
			<section className="tasks">
				<Transition keys={keys} from={{opacity:0,height:0,padding:0}} enter={{opacity:1,height:60,padding:10}} leave={{opacity:0,height:0,pointerEvents:'none',padding:0}}>
					{data.map(asset => styles =>
						<TaskListItem
							style={styles}
							hash={asset._id}
							onClick={this.didClick.bind(this, asset)}
							onShow={this.didSelectShowInFolder}
							onChange={this.didChangeFormat}
							onReset={this.didSelectReset}
							onRemove={this.didSelectRemove}
							id={asset._id}
							title={asset.title}
							name={asset.name}
							outputs={asset.outputs||[]}
							format={asset.format}
						/>
					)}
				</Transition>
			</section>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);