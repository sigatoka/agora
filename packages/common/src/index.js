import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './reducers/index';
// Components
import TaskList from './components/TaskList';
import SelectionView from './views/SelectionView';
// CSS
import './styles/App.css';

const App = (
	<Provider store={store}>
		<Fragment>
			<SelectionView/>
			<TaskList/>
		</Fragment>
	</Provider>
)

export default App;