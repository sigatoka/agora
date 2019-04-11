// Modules
import React from 'react';
import _ from 'lodash';
// Components
import TaskListItemStatus from './TaskListItemStatus';
// CSS
import '../styles/TaskListItem.css';
// Formats
const VIDEO_FORMATS = [
  {value:'avi',label:'AVI'},
  {value:'m4v',label:'M4V raw MPEG-4'},
  {value:'mov',label:'MOV / QuickTime'},
  {value:'mp4',label:'MP4 / QuickTime'},
  {value:'mpeg',label:'MPEG'},
  {value:'ogv',label:'OGV'}
]

type VideoFormats = 'avi' | 'm4v' | 'mov' | 'mp4' | 'mpeg' | 'ogv';

type TaskProps = {
	_id: string;
	output: FileFormats;
}

export type PropTypes = {
	id: string;
	name: string;
	title: string;
	format: VideoFormats;
	outputs: array<TaskProps>;
	onClick(): void;
	onChange(id: string, values: object): void;
	onShow(id: string): void;
	onReset(id: string): void;
	onRemove(id: string): void;
}

export default function TaskListItem(props: PropTypes) {

	const {
		id,
		title,
		name,
		format,
		outputs,
		onClick,
		onReset,
		onRemove,
		onChange,
		onShow
	} = props;

	const progress = (outputs.length === 0) ? 0 : (outputs.reduce((sum, output) => { return sum+(output.progress||0) }, 0) / outputs.length);

	return (
		<div className="task-list-item" data-js="TaskListItem" style={{...props.style,padding:"12px 3vmin"}}>
			<TaskListItemStatus progress={progress} onClick={onClick.bind(this)} clickable={outputs.length>0}/>
			<span className="task-label">
				<input className="name" type="text" defaultValue={title} disabled={true}/>
				<span className="task-title">
					<label className="">{(format||'').toUpperCase()}</label>
					<span className="name">{name}</span>
				</span>
			</span>
			<span className="format-container">
				{outputs.map((output, idx) => 
					<span key={idx} className="format">
						<span>{output.format}</span>
						{(output.progress >= 100)
							? <button className="format-control" onClick={() => onShow(output._id)} value={output.format}>view</button>
							: <button className="format-control" onClick={event => onChange(id, event.target.value.toLowerCase())} value={output.format} disabled={output.progress>0}>{(output.progress>0)?null:'X'}</button>
						}
					</span>
				)}
				<select className="format" value={0} placeholder="select" onChange={event => onChange(id, event.target.value.toLowerCase())}>
					<option value={0} disabled>Select format</option>
					{VIDEO_FORMATS.map(FORMAT => {
						if (FORMAT.value !== format && _.findIndex(outputs,['format',FORMAT.value]) < 0) return <option key={FORMAT.value} value={FORMAT.value}>{FORMAT.label}</option>;
					})}
				</select>
				{(outputs.length > 0)
					? <button onClick={event => onReset(id)}>reset</button>
					: <button onClick={event => onRemove(id)}>remove</button>
				}
			</span>
		</div>
	)
}