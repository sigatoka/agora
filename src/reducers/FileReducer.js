// Modules
import _ from 'lodash';
// Types
import {
	UPDATE_FILE,
	ADD_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES,
	CONVERT_PROGRESS,
	CONVERT_COMPLETE
} from '../actions/types';

const isSample = true;

const SAMPLE_DATA = {
	"test.avi":{
		name:"Test",
		duration:31431,
		fileName:"test.avi",
		path:"/Users/mitchpierias/videos/test.avi",
		size:4532154,
		type:"mp4",
		complete:false,
		progress:0
	},
	"fortnight.mp4":{
		name:"Fortnight",
		duration:4325,
		fileName:"fortnight.mp4",
		path:"/Users/mitchpierias/videos/fortnight.mp4",
		size:543543,
		type:"avi",
		complete:false,
		progress:0
	},
	"why-him.avi":{
		name:"Why Him",
		duration:78453,
		fileName:"why-him.avi",
		path:"/Users/mitchpierias/videos/why-him.avi",
		size:1751945,
		type:"mp4",
		complete:false,
		progress:0
	},
	"The Hangover.mp4":{
		name:"The Hangover",
		duration:4325,
		fileName:"The Hangover.mp4",
		path:"/Users/mitchpierias/videos/The Hangover.mp4",
		size:543543,
		type:"avi",
		complete:false,
		progress:0
	}
}

const INITIAL_STATE = (isSample)?SAMPLE_DATA:{};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_FILE:
			return { ...state, [action.payload.path]: action.payload };
		case ADD_FILES:
			return { ...state, ..._.mapKeys(action.payload, 'path')};
		case REMOVE_FILE:
			return _.omit(state, action.payload.path);
		case REMOVE_ALL_FILES:
			return INITIAL_STATE;
		case CONVERT_PROGRESS:
			return { ...state, [action.payload.path]: action.payload };
		case CONVERT_COMPLETE:
			return { ...state, [action.payload.path]: { ...action.payload, complete:true } };
		default:
			return state;
	}
}