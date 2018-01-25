import React, { Component } from 'react';
import Redux from 'redux';
import Request from 'react-axios';

import SearchBar from './SearchBar';


class SearchBarLogic extends Component{


	handleChange(value){
		<Request method="post" url="/search" data={this.state.data} >
	}

	constructor(){
		this.state = {
			data: [],
			sent: false
		}
	}



	render(){
		<div className="Search-bar">
			<SearchBar {...this.props} handleChange={this.handleChange} />
		</div>
	}
}

