import {CHANGE_TEXT, SET_SEARCHRESULT, TWEETLOADPROGRESS, TWEETSLOADING} from './actions.js';

const initialState = {text: "", searchResult: null, tweetsLoading: false, tweetLoadProgress: 0};

export function search_reducer(state=[initialState], action){
	switch(action.type){
		case (CHANGE_TEXT):
			return { ...state, text: action.text };
		case (SET_SEARCHRESULT):
			return { ...state, text: "", searchResult: action.json, tweetsLoading: false};
		case (TWEETSLOADING):
			return {...state, tweetsLoading: action.loading, tweetLoadProgress: 0};
		case (TWEETLOADPROGRESS):
			return {...state, tweetLoadProgress: action.progress };
		default:
			return state
	}
}


export default search_reducer;
