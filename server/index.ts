import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express, {Request, Response } from "express";
import oauth from "oauth";
import path from "path";
import { ICredentials, getCredentials } from "./credentials";
import * as db from "./db";
import { ITweets } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Body parser
app.use(bodyParser.urlencoded({extended: false, limit: "1000mb"}));
app.use(bodyParser.json({limit: "1000mb"}));

const credentials: ICredentials = getCredentials();

interface IMessage {
    message: string,
}

const twitterSearchUrl = "https://api.twitter.com/1.1/search/tweets.json";

function search(_req: Request, _res: Response, query: string, next: (result: IMessage) => void) {
    const oauth2 = new oauth.OAuth2(
        credentials.consumerKey,
        credentials.consumerSecret,
        "https://api.twitter.com/",
        undefined,
        "oauth2/token",
        undefined
    );

    oauth2.getOAuthAccessToken("", {grant_type: "client_credentials"}, (authError, accessToken) => {
        if (authError) {
            next({message: "Access token error"});
        }

        const headers = {Authorization: `Bearer ${accessToken}` };

        const encodedQuery = encodeURIComponent(query);
        const url = `${twitterSearchUrl}?q=${encodedQuery}&count=100`;
        axios.get(url, {headers})
            .then((response) => {
                if (response.status === 200) {
                    next(response.data);
                } else {
                    next({message: "Error in search"});
                }
            })
            .catch(() => {
                next({message: "Error in search"});
            });
        }
    );
}

app.use(cors());

app.get("/search", (req, res) => {
  // url: /search?q=&23query
    const query = req.query.q as string;
    search(req, res, query,
        (result) => {
            res.statusCode = 200;
            res.set("Content-Type", "application/json");
            res.send(result);
        }
    );
});

app.post("/search", (req, res) => {
    const query = req.body.searchText;
    if (query && query.length > 0) {
        search(req, res, query,
            (result) => {
                res.statusCode = 200;
                res.set("Content-Type", "application/json");
                res.send(result);
            }
        );
    }
});

app.put("/save", cors(), async (req: Request<{}, {}, ITweets>, res, next) => {
    const tweets: ITweets = req.body;
    try {
        const result = await db.saveTweets(tweets);
        res.statusCode = 200;
        res.send(result);
    }
    catch(error) {
        next(error);
    }
});

// All remaining requests return the React app, so it can handle routing.
// app.get("*", (request, response) => response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html")));

app.listen(PORT);
