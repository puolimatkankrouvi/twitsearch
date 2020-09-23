import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText, searchToState, setTweetLoadProgress, setTweetsLoading} from './redux/actions.js';

import SearchBar from './SearchBar';

const searchUrl = `http://localhost:8000/search/`;

class SearchBarLogic extends Component {
	constructor() {
		super();
		this.sendSearch = this.sendSearch.bind(this);	
	}

	sendSearch(){
		const searchText = this.props.searchText;
		
		if (searchText) {
			this.props.setTweetsLoading(true);		
			const encodedText = encodeURI(searchText);
			
			const config = {
				onUploadProgress: this.props.setTweetLoadProgress
			}

			axios.post(searchUrl, {searchText: encodedText}, config)
				.then(result => {
					if (result.data) {
						this.props.setSearchToState(result.data);
					}
				},
				error => {
					this.props.setTweetsLoading(false);
				});
		}

		this.props.setSearchText("");
	}

	render(){
		return(
				<SearchBar
					searchText={this.props.searchText}
					handleChange={this.props.setSearchText}
					sendSearch={this.sendSearch}
					className="Search-bar"
				/>
		)
	}
}

function mapStateToProps(state) {
	return { searchText: state.text };
}

function calculatePercentageCompleted(progressEvent) {
	if (progressEvent) {
		return Math.floor((progressEvent.loaded * 100) / progressEvent.total);
	}

	return 0;
}

function dispatchToProps(dispatch) {
	return {
		setTweetLoadProgress: progressEvent => {					
			dispatch(setTweetLoadProgress(calculatePercentageCompleted(progressEvent)));
		},
		setTweetsLoading: tweetsLoading => {
			dispatch(setTweetsLoading(tweetsLoading));
		},
		setSearchToState: json => {
			dispatch(searchToState(json));
		},
		setSearchText: value => {
			dispatch(changeText(value));
		},
	};
}

export default connect(mapStateToProps, dispatchToProps)(SearchBarLogic);
