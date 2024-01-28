import express from 'express';
import {
    deleteTweet,
    getByDate,
    getByLikes,
    getByOwner,
    postTweet,
    addComment,
    addLike

} from './Tweet.controller';

import auth from '../utils/auth'

const tweetRouter = express.Router();

tweetRouter.post("/", auth, postTweet);
tweetRouter.delete("/:tweetId", auth, deleteTweet);
tweetRouter.patch("/addLike", auth, addLike);
tweetRouter.patch("/addComment", auth, addComment);
tweetRouter.get("/getByDate", getByDate);
tweetRouter.get("/getByLikes", getByLikes);
tweetRouter.get("/getByOwner", getByOwner);



export default tweetRouter;