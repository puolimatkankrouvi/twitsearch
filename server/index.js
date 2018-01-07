const express = require('express');
const path = require('path');


const axios = require('axios');
const Oauth2 = require('client-oauth2')

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));



var twitterAuth = new Oauth2({
  clientId: '',
  clientSecret: '',
  accessTokenUri: '',
  authorizationUri: '',
  redirectUri: ''
});

//
function authenticate(){
	//Oauth

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
