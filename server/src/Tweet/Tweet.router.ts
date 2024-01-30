const express= require('express');
import * as tweetController from './Tweet.controller';
import * as tweetValidator from './Tweet.validator';

import auth from '../utils/auth'

const tweetRouter = express.Router();

tweetRouter.post("/", auth, tweetValidator.addTweetValidate,  tweetController.addTweet);
tweetRouter.delete("/:id", auth, tweetValidator.idValidate, tweetController.deleteTweet);
tweetRouter.patch("/addLike/:id", auth, tweetValidator.idValidate,  tweetController.updateLikes);
tweetRouter.patch("/addDislike/:id", auth, tweetValidator.idValidate,  tweetController.updateDislikes);
tweetRouter.patch("/addComment/:id", auth, tweetValidator.idValidate, tweetValidator.addTweetValidate, tweetController.updateComments); 
tweetRouter.get("/", tweetController.getAllTweets);
tweetRouter.get("/getTweetById/:id", tweetValidator.idValidate, tweetController.getTweetById);
tweetRouter.get("/getTweetsByDate", tweetController.getTweetsByDate);
tweetRouter.get("/getTweetsByLikes", tweetController.getTweetsByLikes);
tweetRouter.get("/getTweetsByOwener", tweetController.getTweetsByOwener);

export default tweetRouter;