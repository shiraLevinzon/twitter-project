import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetDocument from "../../../../types/tweet.type";

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
