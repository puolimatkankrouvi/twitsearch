import {SET_OLD_SEARCHES, SET_ERROR_MESSAGE} from "./actions";

export function reducer(state, action) {
    switch (action.type) {
        case SET_OLD_SEARCHES:
            return {
                oldSearches: action.oldSearches,
                loading: false,
                errorMessage: null,
            };
        case SET_ERROR_MESSAGE:
            return {
              ...state,
              loading: false,
              errorMessage: action.errorMessage,  
            };
    }
}