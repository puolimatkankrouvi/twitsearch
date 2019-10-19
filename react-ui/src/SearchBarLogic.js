import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText} from './actions.js';

import SearchBar from './SearchBar';

class SearchBarLogic extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: '',
			sent: false
		};
		this.handleChange.bind(this);
		this.sendSearch.bind(this);
	}

	handleChange(value){
		//Dispatches action for changing text
		//The value is Proxy now
		this.props.dispatch(changeText(value));
	}
	
	sendSearch(){
		const searchText = this.props.searchText;
		if (searchText) {
			axios.post("localhost:8000/search/", searchText)
				.then(result => {
					console.info(result);
				});
		}
	}
	
	render(){
		return(
			<div className="Search-bar">
				<SearchBar
					handleChange={this.handleChange}
					handleSubmit={this.sendSearch}
				/>
			</div>
		)
	}
}

function mapStateToProps(dispatch, state){
	return {searchText: state.text, dispatch};
}

export default connect(mapStateToProps)(SearchBarLogic);
