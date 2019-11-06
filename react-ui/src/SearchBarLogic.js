import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText, searchToState, setTweetsLoading} from './actions.js';

import SearchBar from './SearchBar';

class SearchBarLogic extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.sendSearch = this.sendSearch.bind(this);
	}

	handleChange(value) {
		//Dispatches action for changing text
		this.props.dispatch(changeText(value));
	}
	
	sendSearch(){
		const searchText = this.props.searchText;
		if (searchText) {
			this.props.dispatch(setTweetsLoading(true));			
			const encodedText = encodeURI(searchText);
			axios.post("http://localhost:8000/search/", {searchText: encodedText})
				.then(result => {
					if (result.data) {
						this.props.dispatch(searchToState(result.data));
					}
				},
				error => {
					this.props.dispatch(setTweetsLoading(false));
					console.info(error);
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
	return { searchText: state.text };
}

export default connect(mapStateToProps)(SearchBarLogic);
