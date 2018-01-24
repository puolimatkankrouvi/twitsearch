import React, { Component } from 'react';
import Redux from 'redux';

import SearchBar from './SearchBar';


class SearchBarLogic extends Component{


	

	constructor(props){
		super(props);
		this.state = {
			query: '',
			sent: false
		};
	}



	render(){
		<div className="Header">
			<SearchBar />
		</div>
	}
}

