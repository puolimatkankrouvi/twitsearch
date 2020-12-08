import * as React from "react";
import OldSearchesList from "./OldSearchesList";
import SearchHistoryHeader from "./SearchHistoryHeader";
import ErrorMessage from "../ErrorMessage";

import { getOldSearches } from "../apiCalls";

const SET_OLD_SEARCHES = "SET_OLD_SEARCHES";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

function reducer(state, action) {
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

const initialState = {
    loading: true,
    oldSearches: [],
    errorMessage: null,
};

const searchHistoryTab = () => {    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {loading, errorMessage, oldSearches} = {...state};
    
    React.useEffect(
        () => {
            const successCallback = (oldSearches) => {dispatch({type: SET_OLD_SEARCHES, oldSearches });};        
			const errorCallback = (errorMessage) => (dispatch({ type: SET_ERROR_MESSAGE, errorMessage }));
            
            getOldSearches(successCallback, errorCallback);
        },
        []
    );

    return (
        <div>
            <SearchHistoryHeader />
            <OldSearchesList
                loading={loading}
                oldSearches={oldSearches}
            />        
            {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
        </div>
    );
};

export default searchHistoryTab;