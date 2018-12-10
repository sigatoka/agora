import React from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { Transition } from 'react-spring'
// Components
import TaskListItem from '../components/TaskListItem';
// Actions
import {
	updateFile,
	convertFiles,
	removeFile,
	removeAllFiles,
	showInFolder
} from '../actions/FileActions';

function mapStateToProps({ files }) {
	return { files };
}

export interface TaskProps {
	hash: string;
	name: string;
	label: string;
	format: string;
	output: string;
	progress: number;
	onChange(e: MouseEvent<HTMLElement>): void;
	didSelectShow: typeof Function;
	didSelectRemove: typeof Function;
}

class TaskList extends React.Component<TaskProps> {

	static defaultProps = {

	}

	didChangeValues(fileHash, nextValues) {
		let file = this.props.files[fileHash];
		if (!file) return;
		Object.keys(nextValues).forEach(key => file[key] = nextValues[key]);
		this.props.updateFile(file);
	}

	didSelectShowInFolder(hash) {
		const { path } = this.props.files[hash];
		this.props.showInFolder(path);
	}

	didSelectRemove(hash) {
		const file = this.props.files[hash];
		this.props.removeFile(file);
	}

	render() {

		const keys = Object.keys(this.props.files);
		const data = keys.map((key) => {
			return this.props.files[key];
		});

		return (
			<div style={{flex:"10 5",...this.props.style,padding:"0px 3vmin",overflowX:"hidden",overflowY:"auto"}}>
				<Transition keys={keys} from={{opacity:0,height:0,padding:0}} enter={{opacity:1,height:60,padding:10}} leave={{opacity:0,height:0,pointerEvents:'none',padding:0}}>
					{data.map(asset => styles =>
						<TaskListItem
							style={styles}
							key={asset.hash}
							onShow={this.didSelectShowInFolder.bind(this)}
							onChange={this.didChangeValues.bind(this)}
							onRemove={this.didSelectRemove.bind(this)}
							hash={asset.hash}
							label={asset.label}
							name={asset.name}
							path={asset.path}
							directory={asset.directory}
							type={asset.type}
							output={asset.output}
							format={asset.format}
							complete={asset.complete}
							progress={asset.progress}
						/>
					)}
				</Transition>
			</div>
		)
	}
}

export default connect(mapStateToProps, {updateFile,convertFiles,removeFile,removeAllFiles,showInFolder})(TaskList);