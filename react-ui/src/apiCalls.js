import Axios from 'axios';

const port = 8000;

const searchUrl = `http://localhost:${port}/search/`;
const saveUrl = `http://localhost:${port}/save/`;

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

export function save(searchResult, name) {
	const body = {
		name,
		date: new Date(),
		statuses: searchResult.statuses,
	};

	return Axios.put(saveUrl, body);
}