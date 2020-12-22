import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request } from "express";
import path from "path";
import * as db from "./db";
import { ITweetSearch } from "./db";
import { search } from "./search";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Body parser
app.use(bodyParser.urlencoded({extended: false, limit: "1000mb"}));
app.use(bodyParser.json({limit: "1000mb"}));

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

app.put("/save", async (req: Request<{}, {}, ITweetSearch>, res, next) => {
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
