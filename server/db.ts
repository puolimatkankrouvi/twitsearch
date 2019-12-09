import mongoose from "mongoose";
import { connectionString } from "./dbConfig";
const connection = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const tweetSchema = mongoose.Schema({
	text: String,
	username: String,
	screen_name: String,
	created_at: String

});

const TweetModel = mongoose.model("TweetModel", tweetSchema);

const tweetCollectionSchema = mongoose.Schema({
	tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "TweetModel"}],
});

const tweetCollection = mongoose.model("TweetCollection", tweetCollectionSchema);

interface ITweets {
	statuses: ReadonlyArray<ITweet>;
}

interface ITweet {
	created_at: Date;
	text: String;
	user: IUser;
}

interface IUser {
	name: String;
	screen_name: String;
}

export function saveTweets(tweetJson: ITweets): ITweets {
	const error = false;

	const tweets = new tweetCollection();

	/*Tweets should be in statuses */
	if (tweetJson.hasOwnProperty("statuses") ) {
		const tweet = new TweetModel();
		for (const status of tweetJson.statuses) {
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
			tweets.tweets = tweet;
			tweets.save();

		}
	}

	return tweetJson;
}
