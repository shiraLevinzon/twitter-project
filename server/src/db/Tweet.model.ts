import { Schema, Document, model, Types } from "mongoose";

type Tweet = {
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: Types.ObjectId[];
  tweetOwner: Types.ObjectId;
  likes: Types.ObjectId[];
};

type TweetDocument =  Tweet  & Document;

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