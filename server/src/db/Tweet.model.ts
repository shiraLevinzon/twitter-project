import { Schema, model } from "mongoose";
import TweetDocument from '../../../types/tweet.type'

const tweetSchema = new Schema<TweetDocument>({
    text: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    tweetOwner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

});

const Tweet = model<TweetDocument>("Tweet", tweetSchema);
export default Tweet;