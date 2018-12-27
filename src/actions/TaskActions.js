// Modules
import { ipcRenderer } from 'electron';
//import createHash from 'create-hash';
import _ from 'lodash';
// Types
import {
	ADD_TASK,
	REMOVE_TASK,
	RESET_TASKS,
	TASK_COMPLETE,
	TASK_PROGRESS,
	TASK_FAILED
} from './types';

/**
 * @name Start Tasks
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
	// Observe progress
	// ! Not the right way to add listeners
		// Causes a new listener to subscribe on each call
	ipcRenderer.on('convert:progress', (event, task) => {
		//console.log(Math.floor(file.progress)+"%")
		dispatch({ type:TASK_PROGRESS, payload:task });
	});
	// Monitor completion
	ipcRenderer.on('convert:end', (event, task) => {
		// Update store
		// Trigger new file load
		ipcRenderer.send('files:added', [task.output]);
		// Notify User
		let taskCompletedNotification = new Notification('Task Completed', {
			body:'Created file '+titleFromFileName(nameFromPath(task.output))
		});
	});
}

/**
 * @name Add Task
 * @desc Adds the specified task object into state
 * @param {object} task - Configured task object.
 */
export const addTask = task => dispatch => dispatch({ type:ADD_TASK, payload:task });

/**
 * @name Remove Task
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

function fileHashFromString(str) {
	return "";
	//return createHash('sha256').update(str).digest('hex');
}