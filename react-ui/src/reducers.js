import {CHANGE_TEXT, SET_SEARCHRESULT} from './actions.js';

const initialState = {text: "", searchResult: null};

export function search_reducer(state=[initialState], action){
	switch(action.type){
		case(CHANGE_TEXT):
			const encodedText = encodeURI(action.text);
			return {...state, text: encodedText};
		case(SET_SEARCHRESULT):
			return {text: "", searchResult: action.json};
		default:
			return state
	}
}


export default search_reducer;
