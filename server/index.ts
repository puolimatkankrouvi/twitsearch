import bodyParser from "body-parser";
import cors from "cors";
import express, {NextFunction, Request, Response} from "express";
import OAuth2 from "oauth";
import path from "path";
import * as db from "./db";
const axios = require("axios").default;

const app = express();
const PORT = process.env.PORT || 8000;

// Credentials are secret
const credentials = require("./credentials.js");

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const appConsumerKey = credentials.getConsumerKey();
const appConsumerSecret = credentials.getConsumerSecret();

const twitterSearchUrl = "https://api.twitter.com/1.1/search/tweets.json";

function search(req: Request, res: Response, query, next) {
  const headers = {Authorization: `Bearer ${res.locals.accessToken}` };

  const encodedQuery = encodeURIComponent(query);
  const url = `${twitterSearchUrl}?q=${encodedQuery}&count=100`;
  axios.get( url , {headers}, )
	.then((res) => {
	  if (res.statusCode == 200) {
	  	next(res.data);
	  } else {
	  	next({message: "Error in search"});
	  }
	})
    .catch( (error) => {
      next({message: "Error in search"});
    });
}

function initGlobals(req: Request, res: Response, next: NextFunction) {
	res.locals = {
		accessToken: undefined,
	};
	next();
}

function authenticate(req, res, next) {
	const oauth2 = new OAuth2(
	  appConsumerKey,
	  appConsumerSecret,
	  "https://api.twitter.com/",
	   null,
	   "oauth2/token",
	   null
	);

	oauth2.getOAuthAccessToken(
	                "",
	                {grant_type: "client_credentials"},
	                (error, access_token, refresh_token, result) => {
	  if (error) {
	    console.log("Access token error");
	  }
	  // Create token based on result
	  res.locals.accessToken = access_token;
	  next();
	});

}

app.use(initGlobals, authenticate, search, cors());

app.get("/searchget", authenticate , (req, res) => {
  // url: /search?q=&23query
  const query = req.query.q;
  search(req, res, query, (result) => {
	res.statusCode = 200;
 res.set("Content-Type", "application/json");
    // Not working yet
 db.saveTweets(result);
	res.send(result);
});

});

app.post("/search", authenticate, (req, res) => {
  const query = req.body.searchText;
  if (query && query.length > 0) {
	search(req, res, query, (result) => {
		res.statusCode = 200;
		res.set("Content-Type", "application/json");
		res.send(result);
	});
  }
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", (request, response) => response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html")));

app.listen(PORT);
