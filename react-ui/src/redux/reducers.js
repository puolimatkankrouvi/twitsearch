import {CHANGE_TEXT, SET_SEARCHRESULT, TWEETLOADPROGRESS, TWEETSLOADING, ERRORMESSAGE, SET_SAVESEARCHDIALOG_OPEN} from './actions.js';

const initialState = {
	text: "",
	searchResult: null,
	tweetsLoading: false,
	tweetLoadProgress: 0,
    errorMessage: null,
    saveSearchDialogOpen: false,
};

export function search_reducer(state=[initialState], action){
	switch(action.type){
		case (CHANGE_TEXT):
			return {...state, text: action.text };
		case (SET_SEARCHRESULT):
			return { ...state, text: "", searchResult: action.json, tweetsLoading: false, errorMessage: null};
		case (TWEETSLOADING):
			return {...state, tweetsLoading: action.loading };
		case (TWEETLOADPROGRESS):
			return {...state, tweetLoadProgress: action.progress };
		case (ERRORMESSAGE):
            return {...state, errorMessage: action.errorMessage };
        case (SET_SAVESEARCHDIALOG_OPEN):
            return {...state, saveSearchDialogOpen: action.open };
		default:
			return state
	}
}


export default search_reducer;
