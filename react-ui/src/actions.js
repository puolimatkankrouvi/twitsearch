/* Action types */
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const SET_SEARCHRESULT = 'SET_SEARCHRESUL';

/*Action creators*/
export function changeText(text){
	return{
		type: CHANGE_TEXT,
		text
	}
}

export function searchToState(json){
	return{
		type: SET_SEARCHRESULT,
		json
	}
}
