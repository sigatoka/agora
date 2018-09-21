// Modules
import _ from 'lodash';
import createHash from 'create-hash';
// Types
import {
	UPDATE_FILE,
	ADD_FILES,
	REMOVE_FILE,
	REMOVE_ALL_FILES,
	CONVERT_PROGRESS,
	CONVERT_COMPLETE
} from '../actions/types';

const useSample = false;
const SAMPLE_DATA = {
	"4935e839616996e868eea4e930f5a8e418d1af3feeab603e0fe66e4e":{
		"hash":"4935e839616996e868eea4e930f5a8e418d1af3feeab603e0fe66e4e",
		"name":"Test",
		"duration":31431,
		"fileName":"test.avi",
		"path":"/Users/mitchpierias/videos/test.avi",
		"size":4532154,
		"type":"mp4",
		"complete":false,
		"progress":0.2
	},
	"72b663391ab3bed60bb94fb40b94b0dd646102978b046e771761fea2":{
		"hash":"72b663391ab3bed60bb94fb40b94b0dd646102978b046e771761fea2",
		"name":"Fortnight",
		"duration":4325,
		"fileName":"fortnight.mp4",
		"path":"/Users/mitchpierias/videos/fortnight.mp4",
		"size":543543,
		"type":"avi",
		"complete":false,
		"progress":0
	},
	"98563bb9497c3e3eb1dc6c56a4a7e4522d76025b08f2950eb50174d8":{
		"hash":"98563bb9497c3e3eb1dc6c56a4a7e4522d76025b08f2950eb50174d8",
		"name":"Why Him",
		"duration":78453,
		"fileName":"why-him.avi",
		"path":"/Users/mitchpierias/videos/why-him.avi",
		"size":1751945,
		"type":"mp4",
		"complete":false,
		"progress":0
	},
	"d76102f25116b736581e3f59b7f6c1ef83ed68d06e4904cdce259d2d":{
		"hash":"d76102f25116b736581e3f59b7f6c1ef83ed68d06e4904cdce259d2d",
		"name":"The Hangover",
		"duration":4325,
		"fileName":"The Hangover.mp4",
		"path":"/Users/mitchpierias/videos/The Hangover.mp4",
		"size":543543,
		"type":"avi",
		"complete":false,
		"progress":12
	},
	"4935e839616996e868eea4e930f5a8e418d1af3feeab603e0fe66e4e":{
		"hash":"4935e839616996e868eea4e930f5a8e418d1af3feeab603e0fe66e4e",
		"name":"Test",
		"duration":31431,
		"fileName":"test.avi",
		"path":"/Users/mitchpierias/videos/test.avi",
		"size":4532154,
		"type":"mp4",
		"complete":false,
		"progress":0
	},
	"72b663391ab3bed60bb94fb40b94b0dd646102978b046e771761fea2":{
		"hash":"72b663391ab3bed60bb94fb40b94b0dd646102978b046e771761fea2",
		"name":"Fortnight",
		"duration":4325,
		"fileName":"fortnight.mp4",
		"path":"/Users/mitchpierias/videos/fortnight.mp4",
		"size":543543,
		"type":"avi",
		"complete":false,
		"progress":0
	},
	"98563bb9497c3e3eb1dc6c56a4a7e4522d76025b08f2950eb50174d8":{
		"hash":"98563bb9497c3e3eb1dc6c56a4a7e4522d76025b08f2950eb50174d8",
		"name":"Why Him",
		"duration":78453,
		"fileName":"why-him.avi",
		"path":"/Users/mitchpierias/videos/why-him.avi",
		"size":1751945,
		"type":"mp4",
		"complete":false,
		"progress":0
	},
	"d76102f25116b736581e3f59b7f6c1ef83ed68d06e4904cdce259d2d":{
		"hash":"d76102f25116b736581e3f59b7f6c1ef83ed68d06e4904cdce259d2d",
		"name":"The Hangover",
		"duration":4325,
		"fileName":"The Hangover.mp4",
		"path":"/Users/mitchpierias/videos/The Hangover.mp4",
		"size":543543,
		"type":"avi",
		"complete":false,
		"progress":0
	}
}

const INITIAL_STATE = (useSample)?SAMPLE_DATA:{};
const KEY_ARGUMENT_ID = 'hash';

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_FILE:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]: action.payload };
		case ADD_FILES:
			return { ...state, ..._.mapKeys(action.payload, KEY_ARGUMENT_ID)};
		case REMOVE_FILE:
			return _.omit(state, action.payload[KEY_ARGUMENT_ID]);
		case REMOVE_ALL_FILES:
			return INITIAL_STATE;
		case CONVERT_PROGRESS:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]: action.payload };
		case CONVERT_COMPLETE:
			return { ...state, [action.payload[KEY_ARGUMENT_ID]]: { ...action.payload, complete:true } };
		default:
			return state;
	}
}