const express= require('express');
const cors= require('cors');
const bodyParser= require('body-parser');

import userRouter from './User/User.router';
import tweetRouter from './Tweet/Tweet.router';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)

export default app;