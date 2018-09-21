import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/index';
// Views
import SelectionView from './views/SelectionView';
import FileListView from './views/FileListView';
import ConversionView from './views/ConversionView';

const App = (
	<Provider store={store}>
		<div style={{backgroundColor:"#232323",height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0,border:"1px solid red"}}>
			<SelectionView style={{flex:"5 5",border:"1px solid green"}}/>
			<FileListView style={{flex:"10 5",border:"1px solid blue"}}/>
			<ConversionView/>
		</div>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));