const mongoose = require("mongoose");
require("./dbConfig");
let connection = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

let tweetSchema = mongoose.Schema({
	text: String,
	username: String,
	screen_name: String,
	created_at: String

});

let tweetModel = mongoose.model("TweetModel", tweetSchema);

let tweetCollectionSchema = mongoose.Schema({
	tweets: [{type: mongoose.Schema.Types.ObjectId , ref: "tweetModel"}],
});

let tweetCollection = mongoose.model("TweetCollection", tweetCollectionSchema);

function processTweets(tweets_json) {
	let error = false;

	const tweets = new tweetCollection();

	/*Tweets should be in statuses */
	if (tweets_json.hasOwnProperty("statuses") ) {
		tweet = new tweetModel();
		for (i in tweets_json.statuses) {

			status = tweets_json[i];

			console.log(status);

			if (status.hasOwnProperty("created_at")) {
				tweet.created_at = status.created_at;
			} else {
				error = true;
			}

			if (status.hasOwnProperty("text")) {
				tweet.text = status.text;
			} else {
				error = true;
			}

			if (status.hasOwnProperty("user")) {
				tweet.username = status.user.name;
				tweet.screen_name = status.user.screen_name;

			} else {
				error = true;
			}

			tweet.save();

			tweets.tweets = tweet;

			tweets.save();

		}
	} else {
		error = true;
	}

	if (error) {
		console.log("Error processing tweets");
	}

	return tweets;
}

let saveTweets = function(tweets_json) {
	processTweets(tweets_json, (tweets) => {
		console.log("Tweets saved");

		res.send(tweets.json());
	});
};

module.exports = {
	saveTweets
};
