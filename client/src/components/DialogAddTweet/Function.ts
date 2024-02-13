import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetDocument from "../../../../types/tweet.type";

export const addComment = async (tweetText: string, tweetId: string): Promise<TweetDocument | null> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets/addComment/${tweetId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: tweetText }),
        }).catch((error:Error) => {
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
export const addTweet = async (tweetText: string): Promise<TweetDocument | null> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: tweetText }),
        }).catch((error:Error) => {
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

