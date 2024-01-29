import express from 'express';
import {
    deleteTweet,
    getByDate,
    getByLikes,
    getByOwner,
    postTweet,
    addComment,
    addLike,
    getAll,
    getbyId

} from './Tweet.controller';

import auth from '../utils/auth'

const tweetRouter = express.Router();

tweetRouter.post("/", auth, postTweet);
tweetRouter.delete("/:tweetId", auth, deleteTweet);
tweetRouter.patch("/addLike/:fatherTweet", auth, addLike);
tweetRouter.patch("/addComment/:fatherTweet", auth, addComment);
tweetRouter.get("/", getAll);
tweetRouter.get("/getById/:tweetId", getbyId);
tweetRouter.get("/getByDate", getByDate);
tweetRouter.get("/getByLikes", getByLikes);
tweetRouter.get("/getByOwner", getByOwner);



export default tweetRouter;