import * as React from "react";
import {DataView} from 'primereact/dataview';
import OldSearch from "./OldSearch";
import LoadingIndicator from "../LoadingIndicator";

function OldSearchesList(props) {
    const {errorMessage, oldSearches, loading} = {...props};

    if (loading) {
        return (
            <LoadingIndicator />
        );
    }

    return <DataView value={oldSearches} layout="list" itemTemplate={itemTemplate} header={getHeader()} style={{margin: "20px 0 0 0"}}/>;
}

function itemTemplate(search, _) {
    if (!search) {
        return null;
    }
   
    return <OldSearch search={search} />;
}

function getHeader() {
    return <div className="p-grid">
        <div className="p-col-6" />
        <div className="p-col-6" />
    </div>;
}

export default OldSearchesList;