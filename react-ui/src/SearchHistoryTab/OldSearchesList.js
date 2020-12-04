import * as React from "react";
import {DataView} from 'primereact/dataview';
import PreviousSearch from "./OldSearch";
import { getOldSearches } from "../apiCalls";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";

function OldSearchesList(props) {
    const [loading, setLoading] = React.useState(true);
    const [oldSearches, setOldSearches] = React.UseState([]);
    const [errorMessage, setErrorMessage] = React.UseState(null);

    React.useEffect(
        () => {
            const successCallback = (oldSearches) => {
                setOldSearches(oldSearches);
                setErrorMessage(null);
                setLoading(false);
			};
            
			const errorCallback = (errorMessage) => {
                setErrorMessage(errorMessage);
                setLoading(false);
            };
            
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
        <DataView value={oldSearches} layout={"list"} itemTemplate={itemTemplate} header={getHeader()} style={{margin: "20px 0 0 0"}}/>
        {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
    </div>;
}

function itemTemplate(search, layout) {
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