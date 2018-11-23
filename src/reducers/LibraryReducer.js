// Modules
import _ from 'lodash';
// Types
import {
	UPDATE_FILE,
	ADD_LIBRARY_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES
} from '../actions/types';
// Globals
const INITIAL_STATE = {};
const KEY_ARGUMENT_ID = 'hash';

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_FILE:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]: action.payload };
		case ADD_LIBRARY_FILES:
			return { ...state, ..._.mapKeys(action.payload, KEY_ARGUMENT_ID)};
		case REMOVE_FILE:
			return _.omit(state, action.payload[KEY_ARGUMENT_ID]);
		case REMOVE_ALL_FILES:
			return INITIAL_STATE;
		default:
			return state;
	}
}