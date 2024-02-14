import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetDocument from "../../../../types/tweet.type";
import Comment from "../../components/Comment/Index";
import { NavigateFunction } from "react-router-dom";

export const updateLike = async (route: string): Promise<TweetDocument | null> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch('http://localhost:3001/api/v1/tweets/' + route,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).catch((error: Error) => {
            toast.error(error.message, { position: 'top-right' });
            return null
        })
    if (!response) return null;
    if (!response.ok) {
        toast.error(await response.text(), { position: 'top-right' });
        return null;
    }

    return await response.json();

};

export const deleteTweet = async (tweetId: string) => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets/${tweetId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).catch((error: Error) => {
            toast.error(error.message, { position: 'top-right' });
            return null
        })
    response && !response.ok ? toast.error(await response?.text(), { position: 'top-right' }):
    response && await toast.success(await response?.text(), { position: 'top-right' });
    


};


export const getTweet = async (tweetId: string): Promise<TweetDocument | null> => {

    const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets/getTweetById/${tweetId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch((error: Error) => {
            toast.error(error.message, { position: 'top-right' });
            return null
        })
    if (!response) return null;
    if (!response.ok) {
        toast.error(await response.text(), { position: 'top-right' });
        return null;
    }

    return await response.json();

};

export const renderComment = (comment: TweetDocument, index: number) => (
    <Comment key={`${comment._id}-${index}`} tweet={comment} />
);
