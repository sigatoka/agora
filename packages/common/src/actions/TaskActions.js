// Modules
import { ipcRenderer } from 'electron';
import store from '../reducers';
import _ from 'lodash';
// Types
import {
	ADD_TASK,
	REMOVE_TASK,
	RESET_TASKS,
	TASK_PROGRESS
} from './types';

ipcRenderer.on('convert:progress', (event, task) => {
	//console.log(Math.floor(file.progress)+"%")
	store.dispatch({ type:TASK_PROGRESS, payload:task });
});
// Monitor completion
ipcRenderer.on('convert:end', (event, task) => {
	// Update store
	// Trigger new file load
	ipcRenderer.send('files:added', [task.output]);
	// Notify User
	let notification = new Notification('Task Completed', {
		body:'Converted '+titleFromFileName(nameFromPath(task.output))
	});
});

/**
 * Start Tasks
 * @desc Sends tasks too be handled by the main process
 * @param {array<object>} tasks - Array of configured task objects.
 */
export const startTasks = tasks => dispatch => {
	// Cleanse tasks
	tasks = _.flatMap(tasks, task => {
		return task;
	}).filter((file) => {
		// Removed completed or in progress
		return !(file.input === file.output || file.complete || file.progress > 0 || file.output === '');
	});
	// Begin conversion
	ipcRenderer.send('convert:start', tasks);
}

/**
 * Add Task
 * @desc Adds the specified task object into state
 * @param {object} task - Configured task object.
 */
export const addTask = task => dispatch => dispatch({ type:ADD_TASK, payload:task });

/**
 * Remove Task
 * @desc Adds the specified task object into state
 * @param {object} task - Configured task object.
 */
export const removeTask = id => dispatch => dispatch({ type:REMOVE_TASK, payload:id });

/**
 * @name Reset Tasks
 * @desc Clears all stored tasks
 */
export const resetTasks = () => dispatch => dispatch({ type:RESET_TASKS });

function nameFromPath(path) {
	const components = path.split('/');
	return components[components.length-1];
}

function titleFromFileName(name) {
	return name.split(/\./gi)[0];
}