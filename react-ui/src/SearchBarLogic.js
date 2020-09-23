import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {changeText, searchToState, setErrorMessage, setTweetLoadProgress, setTweetsLoading} from './redux/actions.js';

import SearchBar from './SearchBar';

const searchUrl = `http://localhost:8000/search/`;

const searchBarLogic = (props) => {
	const sendSearch = React.useCallback(() => {
		const searchText = props.searchText;
		if (searchText) {
			props.setTweetsLoading(true);		
			const encodedText = encodeURI(searchText);
			
			const config = {
				onUploadProgress: function(progressEvent) {
					const percentage = calculatePercentageCompleted(progressEvent);
					props.setTweetLoadProgress(percentage);
				}
			}

			axios.post(searchUrl, {searchText: encodedText}, config)
				.then(result => {
					if (result.data) {
						props.setSearchToState(result.data);
					}
				},
				error => {
					const errorMessage = typeof error === "string" ? error : error.message;
					props.setErrorMessage(errorMessage);
					props.setTweetsLoading(false);
				});
		}

		props.setSearchText("");
	},
		[props.searchText]
	);

	return(
		<SearchBar
			searchText={props.searchText}
			handleChange={props.setSearchText}
			sendSearch={sendSearch}
			className="Search-bar"
		/>
	);
};

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
		setTweetLoadProgress: percentage => {			
			dispatch(setTweetLoadProgress(percentage));
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
		setErrorMessage: errorMessage => {
			dispatch(setErrorMessage(errorMessage));
		},
	};
}

export default connect(mapStateToProps, dispatchToProps)(searchBarLogic);
