import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText, searchToState} from './actions.js';

import SearchBar from './SearchBar';

class SearchBarLogic extends Component {
	constructor(props){
		super(props);
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
		if (searchText) {
			axios.post("localhost:8000/search/", searchText)
				.then(result => {
					this.props.dispatch(searchToState(result));
				});
		}

		this.props.dispatch(changeText(""));
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

function mapStateToProps(state) {
	console.info(state);
	return { searchText: state.text };
}

export default connect(mapStateToProps)(SearchBarLogic);
