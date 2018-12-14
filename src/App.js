import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
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
		<Router basepath="/" /*history={}*/>
			<div style={{width:"100vw",height:"100vh",maxHeight:"100vh",position:"absolute",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",alignContent:"stretch",flexWrap:"nowrap"}}>
				<SelectionView style={{flex:"6 5 20%"}}/>
				<TaskList style={{flex:"4 0",transition:"max-height 0.3s ease-out",transition:"max-height 0.3s ease-out"}}/>
				<ConversionView style={{flex:"none"}}/>
			</div>
		</Router>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));