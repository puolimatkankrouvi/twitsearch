import {CHANGE_TEXT} from './actions.js';

export function search_reducer(state=[], action){
	switch(action.type){
		case(CHANGE_TEXT):
			return state.concat([{text: action.text, sent:false}])
		default:
			return state
	}
}


export default search_reducer;
