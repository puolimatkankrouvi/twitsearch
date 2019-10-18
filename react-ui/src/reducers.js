import {CHANGE_TEXT} from './actions.js';

export function search_reducer(state=[], action){
	switch(action.type){
		case(CHANGE_TEXT):
			const encodedText = encodeURI(action.text);
			return state.concat([{text: encodedText, sent:false}])
		default:
			return state
	}
}


export default search_reducer;
