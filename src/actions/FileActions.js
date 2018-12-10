// Modules
import { ipcRenderer } from 'electron';
import createHash from 'create-hash';
// Types
import {
	UPDATE_FILE,
	ADD_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES
} from './types';

/**
 * @name Update File
 * @desc Overwrites the given file at key 'hash'
 * @param {Object} file - File data object
 */
export const updateFile = file => dispatch => dispatch({ type:UPDATE_FILE,payload:file });

/**
 * @name Add File
 * @desc Merges the provided file at key 'hash'
 * @param {Array<Object>} files - Array of file objects
 */
export const addFiles = files => dispatch => {
	// Process files
	files = files.map(({ name, path, size, type, format }) => {
		const label = labelFromFileName(name);
		const hash = fileHashFromString(path);
		const directory = path.replace(name,'');
		return { hash, label, name, path, directory, size, type, format, complete:false, progress:0 };
	});
	// Notify of files
	ipcRenderer.send('files:added', files);
	// Handle file metadata from the main process
	ipcRenderer.on('files:meta', (event, filesWithMeta) => {
		dispatch({type:ADD_FILES,payload:filesWithMeta});
	});
}

/**
 * @name Convert File
 * @desc Sends the file too be converted in the main process
 * @param {array<object>} files - Array of configured file objects.
 */
export const convertFiles = files => dispatch => {
	// Removed completed or in progress
	files = files.filter((file) => {
		return !(file.complete || file.progress > 0 || file.output === file.format || file.output === '');
	});
	// Begin conversion
	ipcRenderer.send('convert:start', files);
	// Observe progress
	ipcRenderer.on('convert:progress', (event, file) => {
		//console.log(Math.floor(file.progress)+"%")
		dispatch({ type:UPDATE_FILE, payload:file });
	});
	// Monitor completion
	ipcRenderer.on('convert:end', (event, { file, outputPath }) => {
		console.log("completed")
		file.completed = true;
		dispatch({ type:UPDATE_FILE, payload:file });
	});
}

/**
 * @name Remove File
 * @desc Removes the file matching the specified 'hash' key.
 * @param {object} file - File to remove.
 */
export const removeFile = file => dispatch => dispatch({ type:REMOVE_FILE, payload:file });

/**
 * @name Remove All Files
 * @desc Removes all files in the store.
 */
export const removeAllFiles = () => dispatch => dispatch({ type:REMOVE_ALL_FILES });

/**
 * @name Show Directory
 * @desc Notifies the main process to open the directory at the specified path.
 * @param {string} directoryPath - Full path to the directory.
 */
export const showInFolder = (directoryPath) => dispatch => ipcRenderer.send('file:show', directoryPath);

function labelFromFileName(name) {
	return name.split(/\./gi)[0];
}

function fileHashFromString(str) {
	return createHash('sha256').update(str).digest('hex');
}