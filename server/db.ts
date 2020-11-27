import mongoose from "mongoose";
import { connectionString } from "./dbConfig";

const tweetSchema = new mongoose.Schema({
    text: String,
    username: String,
    screen_name: String,
    created_at: String
});

const TweetModel = mongoose.model("TweetModel", tweetSchema);

const tweetCollectionSchema = new mongoose.Schema({
    tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "TweetModel"}],
    date: Date,
    name: String,
});

const TweetCollection = mongoose.model("TweetCollection", tweetCollectionSchema);

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

export function saveTweets(tweetJson: ITweets, next) {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        next(error);
    });

    const tweets = [];

    for (const status of tweetJson.statuses) {
        const tweet = new TweetModel({
            created_at: status.created_at,
            text: status.text,
            username: status.user.name,
            screen_name: status.user.screen_name,
        });

        tweets.push(tweet);
    }

    const tweetCollection = new TweetCollection({
        date: tweetJson.date,
        name: tweetJson.name,
        tweets,
    });
    tweetCollection.save().then(
        result => {
            next(tweetJson);
        }
    )
    .catch(
        err => {
            next(err);
        }
    );
}
