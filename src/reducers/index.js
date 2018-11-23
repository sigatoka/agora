// Modules
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import fileReducer from './FileReducer';
import libraryReducer from './LibraryReducer';

const rootReducer = combineReducers({
	files:fileReducer,
	library:libraryReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;