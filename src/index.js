import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/index';
// CSS
import './index.css';
// Views
import LibraryView from './views/LibraryView';

const linkStyle = {
	color:"#7F7B68",
	fontSize:"0.8rem",
	fontWeight:100,
	padding:"5px 16px",
	fontFamily:"Montserrat,sans-serif",
	letterSpacing:"0.055em",
	padding:"10px"
}

const linkSelectedStyle = {
	color:"#2c2732"
}

const App = (
	<Provider store={store}>
		<Router basepath="/" /*history={}*/>
			<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"stretch",flexWrap:"nowrap",margin:0,padding:0}}>
				<Route>
					<nav style={{flex:"none",height:"50px",border:"none",boxShadow:"rgba(0,0,0,0.08) 0px 1px 4px 0px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end",alignContent:"stretch",flexWrap:"nowrap",margin:0,padding:0}}>
						<img alt="icn" style={{height:"60px",alignSelf:"center",margin:"5px",display:"inline-block"}}/>
						<input type="text" placeholder="Search content" style={{flex:"10 3",height:"30px",outline:"none",border:"none",padding:"0px 10px",border:"none"}}/>
						<div style={{flex:"none",display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",alignContent:"stretch",flexWrap:"nowrap",margin:0,padding:0}}>
							<NavLink to="/browse" style={linkStyle} activeStyle={linkSelectedStyle}>Browse</NavLink>
							<NavLink to="/library" style={{...linkStyle,borderBottom:"2px solid #1bd4a5"}} activeStyle={linkSelectedStyle}>Library</NavLink>
							<NavLink to="/account" style={linkStyle} activeStyle={linkSelectedStyle}>Account</NavLink>
						</div>
					</nav>
				</Route>
				<LibraryView style={{flex:"5 10"}}/>
			</div>
		</Router>
	</Provider>
)

ReactDOM.render(App ,document.getElementById('root'));