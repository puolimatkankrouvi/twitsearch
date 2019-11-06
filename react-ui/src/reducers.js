import {CHANGE_TEXT, SET_SEARCHRESULT, TWEETSLOADING} from './actions.js';

const initialState = {text: "", searchResult: null, tweetsLoading: false};

export function search_reducer(state=[initialState], action){
	switch(action.type){
		case (CHANGE_TEXT):
			return { ...state, text: action.text };
		case (SET_SEARCHRESULT):
			return { ...state, text: "", searchResult: action.json, tweetsLoading: false};
		case (TWEETSLOADING):
			return {...state, tweetsLoading: action.loading};
		default:
			return state
	}
}


export default search_reducer;
