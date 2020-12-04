import * as React from "react";
import {connect} from "react-redux";
import {DataView} from 'primereact/dataview';
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";

import {Tweet} from "./Tweet";

function TweetList(props) {
    const { tweets, tweetsLoading } = props;

    if (!tweets) {
        return null;
    }

    if (tweetsLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return <div>
        <DataView value={props.tweets} layout={"list"} itemTemplate={itemTemplate} header={getHeader()} style={{margin: "20px 0 0 0"}}/>
        {props.errorMessage ? <ErrorMessage errorMessage={props.errorMessage} /> : null}
    </div>;
}

function itemTemplate(tweet, layout) {
    if (!tweet) {
        return null;
    }
   
    return <Tweet tweet={tweet} />;
}

function getHeader() {
    return <div className="p-grid">
        <div className="p-col-6" />
        <div className="p-col-6" />
    </div>;
}

function mapStateToProps(state) {
    const { searchResult, tweetsLoading, errorMessage } = state;
    let tweets = [];
    if (searchResult && searchResult.statuses) {
        tweets = searchResult.statuses;
    }

    return {tweets, tweetsLoading, errorMessage };
}

export default connect(mapStateToProps)(TweetList);