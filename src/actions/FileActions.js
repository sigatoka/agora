// Modules
import { ipcRenderer } from 'electron';
import store from '../reducers';
import createHash from 'create-hash';
// Types
import {
	UPDATE_FILE,
	ADD_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES
} from './types';

/**
 * File Metadata Event
 * @desc Handles the file metadata from the main process
 */
ipcRenderer.on('files:meta', (event, filesWithMeta) => {
	// Model the file data from metadata
	filesWithMeta = filesWithMeta.map(meta => {
		meta.name = nameFromPath(meta.path);
		meta.title = titleFromFileName(meta.name);
		meta._id = fileHashFromString(meta.path);
		meta.directory = meta.path.replace(meta.name,'');
		meta.format = extensionFromFilename(meta.name);
		return meta;
	});
	// Notify the file store
	store.dispatch({type:ADD_FILES,payload:filesWithMeta});
});

/**
 * File Error Event
 * @desc Handles the file error from the main process
 */
ipcRenderer.on('files:error', (event, error) => {
	console.error(error);
});

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
export const addFiles = paths => dispatch => {
	// Load files for given paths
	ipcRenderer.send('files:added', paths);
}

/**
 * @name Remove File
 * @desc Removes the file matching the specified 'hash' key.
 * @param {object} file - File to remove.
 */
export const removeFile = file => dispatch => dispatch({ type:REMOVE_FILE, payload:file });

/**
 * @name Remove All
 * @desc Removes all files in the store.
 */
export const removeAllFiles = () => dispatch => dispatch({ type:REMOVE_ALL_FILES });

/**
 * @name Show Directory
 * @desc Notifies the main process to open the directory at the specified path.
 * @param {string} directoryPath - Full path to the directory.
 */
export const showInFolder = (directoryPath) => dispatch => ipcRenderer.send('file:show', directoryPath);

function nameFromPath(path) {
	const components = path.split('/');
	return components[components.length-1];
}

function extensionFromFilename(fileName) {
	const components = fileName.split('.');
	return components[components.length-1];
}

function titleFromFileName(name) {
	return name.split(/\./gi)[0];
}

function fileHashFromString(str) {
	return createHash('sha256').update(str).digest('hex');
}