// Modules
import React from 'react';
import { string, number, bool, func } from 'prop-types';
// Components
import FileListItemState from './FileListItemState';
// Formats
const VIDEO_FORMATS = [
  {value:'avi',label:'AVI'},
  {value:'m4v',label:'M4V raw MPEG-4'},
  {value:'mov',label:'MOV / QuickTime'},
  {value:'mp4',label:'MP4 / QuickTime'},
  {value:'mpeg',label:'MPEG'},
  {value:'ogv',label:'OGV'}
]

export default class FileListItem extends React.Component {

	static defaultProps = {
		hash:'',
		label:'',
		name:'',
		path:'',
		directory:'',
		type:'',
		format:'',
		output:'',
		complete:false,
		progress:0,
		didChangeType:null,
		didSelectShow:null,
		didSelectRemove:null,
		didHoverFileName:null
	}

	static propTypes = {
		hash:string,
		label:string,
		name:string,
		path:string,
		directory:string,
		type:string,
		format:string,
		output:string,
		complete:bool,
		progress:number,
		didChangeType:func,
		didSelectShow:func,
		didSelectRemove:func,
		didHoverFileName:func
	}

	didChangeType(event) {
		event.preventDefault();
		const { hash, label, name, path, directory, type, format, complete, progress } = this.props;
		const output = event.target.value.toLowerCase();
		this.props.onChange({ hash, label, name, path, directory, type, format, output, complete, progress });
	}

	didSelectShow(event) {
		event.preventDefault();
		const { directory, name, format, output } = this.props;
		this.props.onShow({ directory, name, format, output });
	}

	didSelectRemove(event) {
		event.preventDefault();
		this.props.onRemove(this.props.hash);
	}

	didHoverFileName(event) {
		event.target.value = this.props.path;
	}

	render() {

		const {
			hash,
			label,
			name,
			path,
			directory,
			type,
			format,
			output,
			complete,
			progress
		} = this.props;

		return (
			<div style={{width:"94%",maxHeight:"40px",...this.props.style,backgroundColor:"#232323",color:"#313131",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"stretch",margin:"1.5%",padding:"1.5%",borderRadius:"10px"}}>
				<span style={{flex:"none",alignSelf:"stretch",display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"stretch",padding:0,margin:0}}>
					<FileListItemState progress={progress} completed={complete}/>
					<span style={{flex:"none",alignSelf:"stretch",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"stretch",padding:"1%",marginLeft:"2%"}}>
						<input type="text" defaultValue={label} style={{fontSize:"1.1em",color:((complete)?"#FFE4B1":"#A1A2A6"),backgroundColor:"transparent",border:"none",outline:"none"}}/>
						<span style={{fontSize:"0.9em"}} onMouseOver={this.didHoverFileName.bind(this)}>{name}</span>
					</span>
				</span>
				<span style={{flex:"10 3",padding:"0 1%",margin:0,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"stretch"}}>
					<span style={{width:"60px",backgroundColor:"#383838",color:"#B3B4B8",outline:"none",border:"none",fontSize:"0.9em",padding:"0px 18px",marginRight:"5px",borderRadius:"5px",textAlign:"center",verticalAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>{format.toUpperCase()}</span>
					<select defaultValue={output} onChange={this.didChangeType.bind(this)} style={{width:'180px',backgroundColor:"#383838",color:"#B3B4B8",outline:"none",border:"none",fontSize:"0.9em",padding:"0px 18px"}}>
						{VIDEO_FORMATS.map(FORMAT => (
							<option key={FORMAT.value} value={FORMAT.value}>{FORMAT.label}</option>
						))}
					</select>
				</span>
				<span style={{flex:"none",display:"flex",flexDirection:"row",alignSelf:"stretch",justifyContent:"space-between",alignItems:"stretch",margin:0,padding:0}}>
					{(complete||progress>0)
						? <button onClick={this.didSelectShow.bind(this)} style={{minWidth:"100px"}}>Show</button>
						: <button onClick={this.didSelectRemove.bind(this)} style={{minWidth:"100px"}}>Remove</button>
					}
				</span>
			</div>
		)
	}
}