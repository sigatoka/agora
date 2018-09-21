import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import fileReducer from './FileReducer';

const rootReducer = combineReducers({
	files:fileReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;