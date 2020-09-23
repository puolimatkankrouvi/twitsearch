/* Action types */
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const SET_SEARCHRESULT = 'SET_SEARCHRESULT';
export const TWEETSLOADING = 'TWEETSLOADING';
export const TWEETLOADPROGRESS = "TWEETLOADPROGRESS";

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

export function setTweetsLoading(loading) {
	return  {
		type: TWEETSLOADING,
		loading
	}
}

export function setTweetLoadProgress(progress) {
	return {
		type: TWEETLOADPROGRESS,
		progress,
	};
}