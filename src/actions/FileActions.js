// Modules
import { ipcRenderer } from 'electron';
import createHash from 'create-hash';
// Types
import {
	UPDATE_FILE,
	ADD_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES,
	CONVERT_PROGRESS,
	CONVERT_COMPLETE
} from './types';

/**
 * @brief Update File Data
 * @param file <object> File data object
 */
export const updateFile = file => dispatch => {
	dispatch({ type:UPDATE_FILE,payload:file });
}

export const addFiles = files => dispatch => {
	// Process files
	files = files.map(({ name, path, size, type, format }) => {
		const label = labelFromFileName(name);
		const hash = fileHashFromString(path);
		const directory = path.replace(name,'');
		return { hash, label, name, path, directory, size, type, format, output:format, complete:false, progress:0 };
	});
	// Notify of files
	ipcRenderer.send('files:added', files);
	// Handle file metadata from the main process
	ipcRenderer.on('files:meta', (event, filesWithMeta) => {
		dispatch({type:ADD_FILES,payload:filesWithMeta});
	});
}

export const convertFiles = files => dispatch => {
	// Removed completed or in progress
	files = files.filter((file) => {
		return !(file.complete || file.progress > 0);
	});
	// Begin conversion
	ipcRenderer.send('convert:start', files);
	// Observe progress
	ipcRenderer.on('convert:progress', (event, file) => {
		dispatch({ type:CONVERT_PROGRESS, payload:file });
	});
	// Monitor completion
	ipcRenderer.on('convert:end', (event, { file, outputPath }) => {
		dispatch({ type:CONVERT_COMPLETE, payload:file });
	});
}

export const removeFile = file => dispatch => {
	dispatch({ type:REMOVE_FILE, payload:file });
}

export const removeAllFiles = () => dispatch => {
	dispatch({ type:REMOVE_ALL_FILES });
}

export const showInFolder = ({ directory, name, format, output }) => dispatch => {
	const outputPath = file.directory + name.replace(format, output);
	ipcRenderer.send('file:show', outputPath);
}

function labelFromFileName(name) {
	return name.split(/\./gi)[0];
}

function fileHashFromString(str) {
	return createHash('sha256').update(str).digest('hex');
}