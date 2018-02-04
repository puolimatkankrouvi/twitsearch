import React, { Component } from 'react';
import './Header.css';

import SearchBarLogic from './SearchBarLogic'

class Header extends Component{




	render(){
		return(
			<div className="Header">
				<h1 className="App-title">Twitsearch</h1>
				<SearchBarLogic />
			</div>
		)
	}
}


export default Header;
