import * as React from "react";
import {connect} from "react-redux";
import {DataView} from 'primereact/dataview';
import {ProgressBar} from 'primereact/progressbar';

import {Tweet} from "./Tweet";

function TweetList(props) {
    const { tweets, tweetsLoading, tweetLoadProgress} = props;
        if (!tweets) {
            return null;
        }

        if (tweetsLoading) {
            return <div className="p-grid">
                <div className="p-col-4"></div>
                <div className="p-col-4">
                    <ProgressBar value={tweetLoadProgress} showValue={true} />
                </div>
                <div className="p-col-4"></div>
            </div>;
        }

        const header = getHeader();
        return <DataView value={props.tweets} layout={"list"} itemTemplate={itemTemplate} header={header} style={{margin: "20px 0 0 0"}}/>;
}

function itemTemplate(tweet, layout) {
    if (!tweet) {
        return null;
    }
   
    return <Tweet tweet={tweet} />;
}

function getHeader() {
    return <div className="p-grid">
        <div className="p-col-6"></div>
        <div className="p-col-6">
        </div>
    </div>;
}

function mapStateToProps(state) {
    const { searchResult, tweetsLoading, tweetLoadProgress } = state;
    let tweets = [];
    if (searchResult && searchResult.statuses) {
        tweets = searchResult.statuses;
    }

    return {tweets, tweetsLoading, tweetLoadProgress };
}

export default connect(mapStateToProps)(TweetList);