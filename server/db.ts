import mongoose from "mongoose";
import { connectionString } from "./dbConfig";
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const tweetSchema = mongoose.Schema({
    text: String,
    username: String,
    screen_name: String,
    created_at: String
});

const TweetModel = mongoose.model("TweetModel", tweetSchema);

const tweetCollectionSchema = mongoose.Schema({
    tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "TweetModel"}],
    date: Date,
    name: String,
});

const tweetCollection = mongoose.model("TweetCollection", tweetCollectionSchema);

export interface ITweets {
    date: string;
    name: string;
    statuses: ReadonlyArray<ITweet>;
}

interface ITweet {
    created_at: string;
    text: string;
    user: IUser;
}

interface IUser {
    name: string;
    screen_name: string;
}

export function saveTweets(tweetJson: ITweets): ITweets {
    const tweets = new tweetCollection();
    tweets.date = tweetJson.date;
    tweets.name = tweets.name;

    /*Tweets are in statuses. */
    if (tweetJson.hasOwnProperty("statuses") ) {
        for (const status of tweetJson.statuses) {
            const tweet = new TweetModel();

            if (status.hasOwnProperty("created_at")) {
                tweet.created_at = status.created_at;
            }

            if (status.hasOwnProperty("text")) {
                tweet.text = status.text;
            }
            if (status.hasOwnProperty("user")) {
                tweet.username = status.user.name;
                tweet.screen_name = status.user.screen_name;
            }

            tweet.save();
            tweets.tweets.push(tweet);
        }
    }

    tweets.save();

    return tweetJson;
}
