const mongoose = require('mongoose')


database_name = 'tietokanta';

//Own computer url
//mongo_url = 'mongodb://localhost:27017/' + database_name;

//Heroku url
mongo_url = 'mongodb://pompeli:P0mpel1p0ll0@ds139585.mlab.com:39585/' + database_name
var connection = mongoose.connect(mongo_url);


var tweetSchema = mongoose.Schema({
	text: String
});


var tweetModel = mongoose.model("TweetModel", tweetSchema);


var saveTweets = function(tweets){

}

module.exports = {
	saveTweets
}