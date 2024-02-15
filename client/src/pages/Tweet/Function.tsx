import "react-toastify/dist/ReactToastify.css";
import TweetDocument, { TweetPopulated } from "../../../../types/tweet.type";
import Comment from "../../components/Comment/Index";
import { Dispatch, SetStateAction } from "react";


export const renderComment = (comment: TweetDocument, index: number) => (
    <Comment key={`${comment._id}-${index}`} tweet={comment} />
);
export const sucssesUpdateLikeActions = async (
    data: Response,
    setTweet: Dispatch<SetStateAction<TweetPopulated>>,
    setIsChecked:Dispatch<SetStateAction<boolean>>,
    isChecked:boolean

   ) => {

    setTweet(await data.json());
    setIsChecked(!isChecked);
}