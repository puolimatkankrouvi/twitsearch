const express = require('express');
const path = require('path');
const OAuth2 = require('oauth').OAuth2;

const bodyParser = require('body-parser');

const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

//Credentials are secret and not included in github
const credentials = require('./credentials.js');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const appConsumerKey = credentials.getConsumerKey();
const appConsumerSecret = credentials.getConsumerSecret();


const twitter_search_url = 'https://api.twitter.com/1.1/search/tweets.json';

function search(req,res,query, next){

  var headers = {'Authorization': 'Bearer ' + res.locals.accessToken }

  var encodedQuery = encodeURIComponent(query);
  var url = twitter_search_url + '?q=' + encodedQuery;
  console.log(url);
  axios.get( url , {'headers': headers}, )
	.then( (res) => {
	  if(res.status == 200){
	  	console.log('testi2');
	  	next(res.data);
	  }
	  else{
	  	next({'message':'Error in search'});
	  }
	})
    .catch( (error) => {
      next({'message':'Error in search'});
    });
}


/*
  TODO:
  Search not getting query parameter if it has a hashtag
*/



function initGlobals(req,res,next){
	res.locals = {
		accessToken: undefined,
	};
	next();
}



function authenticate(req,res,next){

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
	    console.log('Access token error');
	  }
	  //Create token based on result and return response
	  res.locals.accessToken = access_token;
	  next();
	});

};

app.use(initGlobals, authenticate, search);

app.get('/search', authenticate , (req, res) => {
  // url: /search?q=#query
  query = req.query.q;
  search(req,res,query, (result) => {
    res.set('Content-Type', 'application/json');
    console.log(result);
    res.send(result);	
  });

});

app.post('/search', authenticate, (req, res) => {
  var query = res.data();
  var result = search(req,res,query);
  search(req,res,query, (result) => {
    res.set('Content-Type', 'application/json');
    res.send(result);	
  });
});



// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
