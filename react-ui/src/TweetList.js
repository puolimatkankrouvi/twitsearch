import * as React from "react";
import {DataView} from 'primereact/dataview';
import "primeflex/primeflex.css";
import "./TweetList.css";

export default class TweetList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.getHeader = this.getHeader.bind(this);
    }
	state = {
        tweets: this.props.searchResult && this.props.searchResult["statuses"] ? this.props.searchResult.statuses : [
            { text: "bsakjbdksad", profileImageUrl: "dfksdhkjfsdhf", createdAt: "Mon May 06 20:01:29 +0000 2019" },
        ],
    };
    render() {
        if (!this.state) {
            return null;
        }

        const header = this.getHeader();

        return <DataView value={this.state.tweets} layout={"list"} itemTemplate={this.itemTemplate} header={header} />;
    }

    itemTemplate(tweet, layout) {
        if (!tweet) {
            return;
        }
       
        return (
            <div className="p-col-12">
                <div className="tweet-details">
                    <div>
                        <img src={tweet.profileImageUrl || ""} alt={tweet.text}/>
                        <div className="p-grid">
                            <div className="p-col-12">Text: <b>{tweet.text}</b></div>
                            <div className="p-col-12">Created at: <b>{tweet.createdAt}</b></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getHeader() {
        return <div className="p-grid">
            <div className="p-col-6"></div>
            <div className="p-col-6">
            </div>
        </div>;
    }
}