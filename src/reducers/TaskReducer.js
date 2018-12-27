// Modules
import _ from 'lodash';
// Types
import {
	ADD_TASK,
	REMOVE_TASK,
	RESET_TASKS,
	TASK_COMPLETE,
	TASK_PROGRESS,
	TASK_FAILED
} from '../actions/types';
// Globals
const KEY_ARGUMENT_ID = '_id';
// State
const INITIAL_STATE = {};

/**
 * TASK SCHEMA
 * 
 * _id: string,
 * name: string,
 * source: string,
 * input: string,
 * output: string,
 * format: string,
 * progress: number,
 * complete: boolean
 */

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_TASK:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]: action.payload };
		case REMOVE_TASK:
			return _.omit(state, action.payload);
		case RESET_TASKS:
			return INITIAL_STATE;
		case TASK_COMPLETE:
			return { ...state, ..._.mapKeys({_id:action.payload,complete:true}, KEY_ARGUMENT_ID)};
		case TASK_PROGRESS:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]:_.set(state[action.payload[KEY_ARGUMENT_ID]], ['progress'], action.payload.progress)};
		default:
			return state;
	}
}