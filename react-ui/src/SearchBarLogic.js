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
		this.handleChange = this.handleChange.bind(this);
		this.sendSearch = this.sendSearch.bind(this);
	}

	handleChange(value) {
		//Dispatches action for changing text
		//The value is Proxy now
		this.props.dispatch(changeText(value));
	}
	
	sendSearch(){
		const searchText = this.props.searchText;
		console.info(searchText);
		if (searchText) {
			axios.post("localhost:8000/search/", searchText)
				.then(result => {
					console.info(result);
				});
		}
	}
	
	render(){
		return(
				<SearchBar
					searchText={this.props.searchText}
					handleChange={this.handleChange}
					sendSearch={this.sendSearch}
					className="Search-bar"
				/>
		)
	}
}

function mapDispatchToProps(dispatch, state){
	return {searchText: state.text, dispatch};
}

export default connect(mapDispatchToProps)(SearchBarLogic);
