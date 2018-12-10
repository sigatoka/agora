// Modules
import React from 'react';
import { string, number } from 'prop-types';
// Components
import TaskListItemState from './TaskListItemState';
import TaskListItemDelete from './TaskListItemDelete';
// Formats
const VIDEO_FORMATS = [
  {value:'avi',label:'AVI'},
  {value:'m4v',label:'M4V raw MPEG-4'},
  {value:'mov',label:'MOV / QuickTime'},
  {value:'mp4',label:'MP4 / QuickTime'},
  {value:'mpeg',label:'MPEG'},
  {value:'ogv',label:'OGV'}
]
// CSS
import '../styles/TaskListItem.css';

type VideoFormats = 'avi' | 'm4v' | 'mov' | 'mp4' | 'mpeg' | 'ogv';

type Props = {
	onChange(hash: string, values: object): void;
	didSelectShow(hash: string): void;
	didSelectRemove(hash: string): void;
} & Partial<DefaultProps>

type DefaultProps = ReadOnly<typeof defaultProps>

const defaultProps = {
	hash: string,
	name: string,
	label: string,
	format: 'avi' | 'm4v' | 'mov' | 'mp4' | 'mpeg' | 'ogv',
	output: 'avi' | 'm4v' | 'mov' | 'mp4' | 'mpeg' | 'ogv',
	progress: number
}

export default class TaskListItem extends React.Component<Props> {

	static defaultProps = defaultProps;

	didSelectShow(event) {
		event.preventDefault();
		const { directory, name, format, output } = this.props;
		const directoryPath = directory + name.replace(format, output);
		this.props.onShow(directoryPath);
	}

	didChangeOutput(event) {
		event.preventDefault();
		const outputFormat = event.target.value.toLowerCase();
		this.props.onChange(this.props.hash, {output:outputFormat});
	}

	didSelectRemove(event) {
		event.preventDefault();
		this.props.onRemove(this.props.hash);
	}

	render() {

		const {
			label,
			name,
			format,
			output,
			progress
		} = this.props;

		return (
			<div className="task-list-item" data-js="TaskListItem" style={{...this.props.style}}>
				<TaskListItemState progress={progress} complete={progress===100} range={[0,30]}/>
				<span className="task-label">
					<input className="name" type="text" defaultValue={label}/>
					<span className="task-title">
						<label className="">{format.toUpperCase()}</label>
						<span className="name">{name}</span>
					</span>
				</span>
				<span className="format-container">
					<select className="format" defaultValue={output} onChange={this.didChangeOutput.bind(this)}>
						{VIDEO_FORMATS.map(FORMAT => {
							if (FORMAT.value !== format) return <option key={FORMAT.value} value={FORMAT.value}>{FORMAT.label}</option>;
						})}
					</select>
					<button onClick={this.didSelectRemove.bind(this)}>remove</button>
				</span>
			</div>
		)
	}
}