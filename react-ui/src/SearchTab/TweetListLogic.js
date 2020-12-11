import * as React from "react";
import { connect } from "react-redux";
import TweetList from "../TweetList";
import ErrorMessage from "../ErrorMessage";

function TweetListLogic(props) {
    return <div>
        <TweetList
            tweets={props.tweets}
            tweetsLoading={props.tweetsLoading}
        />   
        {props.errorMessage ? <ErrorMessage errorMessage={props.errorMessage} /> : null}
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

export default connect(mapStateToProps)(TweetListLogic);