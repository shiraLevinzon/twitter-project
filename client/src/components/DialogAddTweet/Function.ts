import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TweetDocument, { TweetPopulated } from "../../../../types/tweet.type";
import { SubmitHandler } from "react-hook-form";
import { Input } from "./Types";
import { Dispatch } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { addComment, addTweet } from "../../services/TweetServices";

// export const addComment = async (tweetText: string, tweetId: string): Promise<TweetPopulated | null> => {
//     const token: string | null = localStorage.getItem("token");

//     const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets/addComment/${tweetId}`,
//         {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ text: tweetText }),
//         }).catch((error: Error) => {
//             toast.error(error.message, { position: 'top-right' });
//             return null
//         })
//     if (!response) return null;
//     if (!response.ok) {
//         toast.error(await response.text(), { position: 'top-right' });
//         return null;
//     }

//     return await response.json();
// };
// export const addTweet = async (tweetText: string): Promise<TweetPopulated | null> => {
//     const token: string | null = localStorage.getItem("token");

//     const response: Response | null = await fetch(`http://localhost:3001/api/v1/tweets`,
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ text: tweetText }),
//         }).catch((error: Error) => {
//             toast.error(error.message, { position: 'top-right' });
//             return null
//         })
//     if (!response) return null;
//     if (!response.ok) {
//         toast.error(await response.text(), { position: 'top-right' });
//         return null;
//     }

//     return await response.json();

// };

export const openDialog = (setOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setOpen(true);
};

export const closeDialog = (setOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setOpen(false);
};


export const addCommetOrTweet = async (
    comment: Input,
    kind: string,
    tweet: TweetPopulated)
    : Promise<Response> => {

    return kind === 'tweet' ?
        await addTweet(comment.tweetText) :
        await addComment(comment.tweetText, tweet?._id.toString());


}
export const sucssesFetchActions = async (
    setTweet: Dispatch<React.SetStateAction<TweetPopulated>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: ((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TweetPopulated[], Error>>) | undefined,
    data: TweetPopulated)
    : Promise<void> => {

    await setTweet(data);
    setOpen(false);
    refetch && await refetch();
}
