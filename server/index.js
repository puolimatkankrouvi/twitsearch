const express = require('express');
const path = require('path');
const OAuth2 = require('oauth').OAuth2;

const bodyParser = require('body-parser');

const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const credentials = require('./credentials.js');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const appConsumerKey = credentials.getConsumerKey();
const appConsumerSecret = credentials.getConsumerSecret();


const twitter_search_url = 'https://api.twitter.com/1.1/search/tweets.json';

function search(query, access_token){


  var headers = {'Authorization': 'token'}

	var encodedQuery = encodeURIComponent(query);
  var url = twitter_search_url + 'q=' + encodedQuery;
	axios.get( url , {'headers': headers})
		.then( (res) => {
      return res.json();
		})
    .catch( (error) => {
      console.log(error);
      return {};
    });
}


/*
  TODO:
  Getting the token for search-function
  Next as function chaining?
*/

function auth(next){

  var oauth2 = new OAuth2(
    appConsumerKey,
    appConsumerSecret, 
    'https://api.twitter.com/', 
    null,
    'oauth2/token', 
    null
  );

  oauth2.getOAuthAccessToken(
                    '',
                    {'grant_type':'client_credentials'},
                    (error, access_token, refresh_token, result) => {
      if(error){
        console.error('Access token error',error);
        return res.status(300).json('Authentication failed');
      }
      //Create token based on result and return response
      return next('Bearer ' + access_token);
  });
});


app.get('/search', (req, res) => {
  // /search?q=#query
  query = req.query.q; 
  search(query);
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

app.post('/search', (req, res) => {
  var result = search(query);
  console.log(result);
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
