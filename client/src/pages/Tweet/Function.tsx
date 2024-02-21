import "react-toastify/dist/ReactToastify.css";
import TweetDocument, { TweetPopulated } from "../../../../types/tweet.type";
import Comment from "../../components/Comment/Index";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { delay } from "lodash/fp";


export const renderComment = (comment: TweetDocument, index: number) => (
    <Comment key={`${comment._id}-${index}`} tweet={comment} />
);
export const sucssesUpdateLikeActions = async (
    data: TweetPopulated,
    setTweet: Dispatch<SetStateAction<TweetPopulated>>,
    setIsChecked: Dispatch<SetStateAction<boolean>>,
    isChecked: boolean

) => {

    setTweet(data);
    setIsChecked(!isChecked);
}

export const sucssesDeleteActions = async (
    navigate: NavigateFunction
) => {

    toast.success("tweet deleted sucssefuly", { position: 'top-right' });
    setTimeout(() => {
        navigate(-1);
    },5000);
}