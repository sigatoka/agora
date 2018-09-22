import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/index';
// CSS
import './index.css';
// Views
import SelectionView from './views/SelectionView';
import FileList from './components/FileList';
import ConversionView from './views/ConversionView';

const App = (
	<Provider store={store}>
		<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0}}>
			<SelectionView style={{flex:"10 5",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0}}/>
			<FileList style={{flex:"5 10",minWidth:"500px",transition:"max-height 0.3s ease-out",transition:"max-height 0.3s ease-out"}}/>
			<ConversionView style={{flex:"none"}}/>
		</div>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));