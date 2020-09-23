import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText, searchToState, setTweetLoadProgress, setTweetsLoading} from './redux/actions.js';

import SearchBar from './SearchBar';

const searchUrl = `http://localhost:8000/search/`;

class SearchBarLogic extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.sendSearch = this.sendSearch.bind(this);
		this.updateProgressBar = this.updateProgressBar.bind(this);
	}

	handleChange(value) {
		//Dispatches action for changing text
		this.props.dispatch(changeText(value));
	}

	updateProgressBar(progressEvent) {		
		const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
		this.props.dispatch(setTweetLoadProgress(percentCompleted));
	}
	
	sendSearch(){
		const searchText = this.props.searchText;
		if (searchText) {
			this.props.dispatch(setTweetsLoading(true));			
			const encodedText = encodeURI(searchText);
			
			const config = {
				onUploadProgress: this.updateProgressBar
			}

			axios.post(searchUrl, {searchText: encodedText}, config)
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
