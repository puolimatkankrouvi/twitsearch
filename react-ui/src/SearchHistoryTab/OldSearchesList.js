import * as React from "react";
import {DataView} from 'primereact/dataview';
import PreviousSearch from "./OldSearch";
import { getOldSearches } from "../apiCalls";
import { reducer } from "./redux/reducers";
import { SET_OLD_SEARCHES, SET_ERROR_MESSAGE } from "./redux/actions";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";

const initialState = {
    loading: true,
    oldSearches: [],
    errorMessage: null,
};

function OldSearchesList() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {errorMessage, oldSearches, loading} = {...state};

    React.useEffect(
        () => {
            const successCallback = (oldSearches) => {dispatch({type: SET_OLD_SEARCHES, oldSearches });};        
			const errorCallback = (errorMessage) => (dispatch({ type: SET_ERROR_MESSAGE, errorMessage }));
            
            getOldSearches(successCallback, errorCallback);
        },
        []
    );

    if (loading) {
        return (
            <LoadingIndicator />
        );
    }

    return <div>
        <DataView value={oldSearches} layout="list" itemTemplate={itemTemplate} header={getHeader()} style={{margin: "20px 0 0 0"}}/>
        {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
    </div>;
}

function itemTemplate(search, _) {
    if (!search) {
        return null;
    }
   
    return <PreviousSearch search={search} />;
}

function getHeader() {
    return <div className="p-grid">
        <div className="p-col-6" />
        <div className="p-col-6" />
    </div>;
}

export default OldSearchesList;