import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

const TweetSearch = mongoose.model("TweetSearch", tweetCollectionSchema);

export interface ITweetSearch {
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

const pageSize = 100;

const connectionString = process.env.CONNECTION_STRING || "";

export async function getTweetSearches(page: number) {
    await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const skip = page * pageSize;
    const tweetSearches = await TweetSearch.find(
        {},
        "name date _id",
        { limit: 100, skip }
        )
        .sort({"date": -1})
        .exec();
        
        return tweetSearches;
    }
    
export async function getTweetSearchWithTweets(tweetSearchId: string): Promise<mongoose.Document> {
    await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    const tweetSearch = await TweetSearch.findById(tweetSearchId, "tweets")
    .populate("tweets")
    .exec();

    return tweetSearch !== null ? tweetSearch : new TweetSearch();
}

export async function saveTweets(tweetJson: ITweetSearch): Promise<mongoose.Document> {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const tweets = [];

    for (const status of tweetJson.statuses) {
        const tweet = new TweetModel({
            created_at: status.created_at,
            text: status.text,
            username: status.user.name,
            screen_name: status.user.screen_name,
        });

        tweets.push(tweet);
        await tweet.save();
    }

    const tweetSearch = new TweetSearch({
        date: tweetJson.date,
        name: tweetJson.name,
        tweets,
    });

    return await tweetSearch.save();
}
