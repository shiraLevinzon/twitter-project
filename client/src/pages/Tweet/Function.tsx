import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetDocument from "../../../../types/tweet.type";
import Comment from "../../components/Comment/Index";

export const updateLike = async (route: string): Promise<TweetDocument> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response = await fetch('http://localhost:3001/api/v1/tweets/' + route,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    !response.ok && toast.error("error", { position: 'top-right' });

    return await response.json();

};

export const deleteTweet = async (tweetId: string) => {
    const token: string | null = localStorage.getItem("token");

    const response: Response = await fetch(`http://localhost:3001/api/v1/tweets/${tweetId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

    console.log(await response.text());

    //!response.ok && toast.error("error", { position: 'top-right' });

    //return await response.json();

};


export const getTweet = async (tweetId: string) => {

    const response: Response = await fetch(`http://localhost:3001/api/v1/tweets/getTweetById/${tweetId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

    !response.ok && toast.error("error", { position: 'top-right' });

    return await response.json();

};

export const renderComment = (comment: TweetDocument, index: number) => (
    <Comment key={`${comment._id}-${index}`} tweet={comment} />
);
