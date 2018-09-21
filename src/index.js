import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/index';
// CSS
import './index.css';
// Views
import SelectionView from './views/SelectionView';
import FileListView from './views/FileListView';
import ConversionView from './views/ConversionView';

const App = (
	<Provider store={store}>
		<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0}}>
			<SelectionView style={{flex:"3 10",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0}}/>
			<FileListView style={{flex:"10 3",minWidth:"500px"}}/>
			<ConversionView style={{flex:"none"}}/>
		</div>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));