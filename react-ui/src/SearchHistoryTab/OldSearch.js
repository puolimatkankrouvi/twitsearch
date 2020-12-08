import * as React from "react";

export default function previousSearch(props) {
    const search = props.search;
    const date = search.date ? new Date(search.date).toLocaleString() : null;
    return (
        <div className="p-col-12">
            <div className="p-grid">
                <div className="p-col-5">
                    <p>{search.name}</p>
                </div>
                <div className="p-col-5">
                    <p>{date}</p>
                </div>
            </div>
        </div>
    );
}