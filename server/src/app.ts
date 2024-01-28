import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './User/User.router';
import tweetRouter from './Tweet/Tweet.router';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)

app.get("/test", (req, res) => {
    res.send("shira");
  });

export default app;