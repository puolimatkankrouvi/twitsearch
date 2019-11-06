import React, { Component } from 'react';
import './Header.css';
import "primeflex/primeflex.css";

import SearchBarLogic from './SearchBarLogic'

class Header extends Component{
	render(){
		return(
			<div className="Header p-grid">
				<div className="p-col-2 p-lg-4">
					<h1 className="App-title">Twitsearch</h1>
				</div>
				<div className="p-col-10 p-lg-4">
					<SearchBarLogic />
				</div>
				<div className="p-col-0 p-lg-4">
				</div>
			</div>
		)
	}
}


export default Header;
