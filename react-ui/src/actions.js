

/* Action types */

export const CHANGE_TEXT = 'CHANGE_TEXT';


/*Action creators*/

export function changeText(text){
	return{
		type: CHANGE_TEXT,
		text
	}
}
