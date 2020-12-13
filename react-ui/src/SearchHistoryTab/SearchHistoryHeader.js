import * as React from "react";
import { Panel } from "primereact/panel";
import { BreadCrumb } from "primereact/breadcrumb";

const seachHistoryHeader = (props) => {
    const selectedSearch = props.selectedSearch;

    let backButton = null;

    const breadCrumbList = [];
    if (selectedSearch && selectedSearch.name) {
        breadCrumbList.push({ label: selectedSearch.name });
    }

    return (
        <Panel>
            <h3>Saved searches</h3>
            {backButton}
            <BreadCrumb
                model={breadCrumbList}
                home={{ icon: "pi pi-home", url: "/history" }}
            />
        </Panel>
    );
};

export default seachHistoryHeader;