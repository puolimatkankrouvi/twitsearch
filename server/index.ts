import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express, {Request, Response } from "express";
import oauth from "oauth";
import path from "path";
import * as db from "./db";
import { ITweetSearch } from "./db";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Body parser
app.use(bodyParser.urlencoded({extended: false, limit: "1000mb"}));
app.use(bodyParser.json({limit: "1000mb"}));

interface IMessage {
    message: string,
}

const twitterSearchUrl = "https://api.twitter.com/1.1/search/tweets.json";

function search(_req: Request, _res: Response, query: string, next: (result: IMessage) => void) {
    const oauth2 = new oauth.OAuth2(
        process.env.CONSUMER_KEY || "",
        process.env.CONSUMER_SECRET || "",
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

app.get("/oldsearches", async (req: Request<{}, {}, {},{page?: number}>, res, next) => {
    try {     
        let page = 0;
        if (req.query.page) {
            page = req.query.page;
        }

        const tweetSearches = await db.getTweetSearches(page);
        res.statusCode = 200;
        res.send(tweetSearches);
    }
    catch (err) {
        next(err);
    }
});

app.get("/oldsearches/:searchId/", async (req: Request<{searchId: string},{},{}>, res, next) => {
    try {
        const tweetSearch = await db.getTweetSearchWithTweets(req.params.searchId);
        res.statusCode = 200;
        res.send(tweetSearch);
    }
    catch (err) {
        next(err);
    }
});

app.put("/save", cors(), async (req: Request<{}, {}, ITweetSearch>, res, next) => {
    const tweetSearch: ITweetSearch = req.body;
    try {
        const result = await db.saveTweets(tweetSearch);
        res.statusCode = 200;
        res.send(result);
    }
    catch(error) {
        next(error);
    }
});

app.listen(PORT);
