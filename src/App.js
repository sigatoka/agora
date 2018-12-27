import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/index';
// Components
import TaskList from './components/TaskList';
import SelectionView from './views/SelectionView';
import ConversionView from './views/ConversionView';
// CSS
import './styles/App.css';

const App = (
	<Provider store={store}>
		<Fragment>
			<SelectionView/>
			<TaskList/>
			<ConversionView/>
		</Fragment>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));