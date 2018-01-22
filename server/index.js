const express = require('express');
const path = require('path');
const oauth2 = require('simple-oauth2');

const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const credentials = require('./credentials.js');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

const appConsumerKey = credentials.getConsumerKey();
const appConsumerSecret = credentials.getConsumerSecret();

const tokenAddress = 'https://api.twitter.com/oauth2/token';

//simple-oauth2
const oauth2Confiq = {
  client: {
    id: appConsumerKey,
    secret: appConsumerSecret
  },
  auth: {
    tokenHost: tokenAddress
  }
};

oauth2.create(oauth2Confiq);

// Authorization oauth2 URI
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: '',
  state: ''
});

//
function getAccessToken(){
	//Oauth2
  
}

const twitter_search_url = 'https://api.twitter.com/1.1/search/tweets.json';

function search(req,res,query){
	parameters = { 'q': query};

	var encodedQuery = encodeURIComponent(query);
	axios.get(twitter_search_url + 'q=' + encodedQuery)
		.then( (res) => {
			
		});
}

// Server request
app.get('/search', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});



// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
