import * as React from "react";

export default function previousSearch(props) {
    const search = props.search;
    return (
        <div className="p-col-12">
            <div className="p-grid">
                <div className="p-col-10">
                    <div><p>{search.name}</p></div>
                </div>
                <div className="p-col-2">
                    <div>{search.date.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}