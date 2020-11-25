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

export function save(searchResult, name, errorCallback) {
	const body = {
		tweets: searchResult,
		name,
		date: new Date(),
	};

	Axios.put(saveUrl, JSON.stringify(body))
		.then(
			() => {},
			error => {
				const errorMessage = typeof error === "string" ? error : error.message;
				errorCallback(errorMessage);
            }
		);
}