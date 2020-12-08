import Axios from 'axios';

const port = 8000;

const searchUrl = `http://localhost:${port}/search/`;
const saveUrl = `http://localhost:${port}/save/`;
const oldSearchesUrl = `http://localhost:${port}/oldsearches/`;

export function search(searchText, config, successCallback, errorCallback) {
	const encodedText = encodeURI(searchText);

	Axios.post(searchUrl, { searchText: encodedText }, config)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
				else {
					errorCallback("Error loading tweets.");
                }
			},
			error => {
				const errorMessage = typeof error === "string" ? error : error.message;
				errorCallback(errorMessage);
			}
		);
}

export function getOldSearches(successCallback, errorCallback) {
	Axios.get(oldSearchesUrl)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
			},
			error => {
				errorCallback("Error loading search history.");
			}
		);
}

export function getOldSearchesWithTweets(searchId, successCallback, errorCallback) {
	Axios.get(`oldSearchesUrl/${searchId}`)
		.then(
			result => {
				if (result.data) {
					successCallback(result.data);
				}
			},
			error => {
				errorCallback("Error loading tweets of old search.");
			}
		);
}

export function save(searchResult, name) {
	const body = {
		name,
		date: new Date(),
		statuses: searchResult.statuses,
	};

	return Axios.put(saveUrl, body);
}