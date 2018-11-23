// Modules
import { ipcRenderer } from 'electron';
import createHash from 'create-hash';
// Types
import {
	ADD_LIBRARY_FILES
} from './types';

export const loadLibrary = () => dispatch => {
	ipcRenderer.send('library:load');

	ipcRenderer.on('library:files', (event, files) => {
		const filesWithMeta = files.map(filename => {
			return {
				hash:fileHashFromString(filename),
				label:labelFromFileName(filename),
				name:filename,
				path:'library/'+filename,
				size:0,
				type:'mp4',
				format:'mp4',
				complete:false,
				progress:0
			}
		});
		
		dispatch({type:ADD_LIBRARY_FILES,payload:filesWithMeta});
	})
}

function labelFromFileName(name) {
	return name.split(/\./gi)[0];
}

function fileHashFromString(str) {
	return createHash('sha256').update(str).digest('hex');
}