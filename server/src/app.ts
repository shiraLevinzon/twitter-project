import express , {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './User/User.router';
import tweetRouter from './Tweet/Tweet.router';
import { application } from 'express';

const app : Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)

export default app;