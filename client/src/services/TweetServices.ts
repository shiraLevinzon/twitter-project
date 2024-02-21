export const updateLike = async (isChecked: boolean, tweetId: string): Promise<Response> => {

    const route: string = !isChecked ? `addLike/${tweetId}` :
        `addDislike/${tweetId}`;
    const token: string | null = localStorage.getItem("token");
    return await fetch('http://localhost:3001/api/v1/tweets/' + route,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
}

export const deleteTweet = async (tweetId: string): Promise<Response> => {

    const token: string | null = localStorage.getItem("token");
    return await fetch(`http://localhost:3001/api/v1/tweets/${tweetId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
}

export const getTweet = async (tweetId: string): Promise<Response> => {
    return await fetch(`http://localhost:3001/api/v1/tweets/getTweetById/${tweetId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
}

export const addTweet = async (tweetText: string): Promise<Response> => {
    const token: string | null = localStorage.getItem("token");
    return await fetch(`http://localhost:3001/api/v1/tweets`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: tweetText }),
        })
}
export const addComment = async (tweetText: string, tweetId: string): Promise<Response> => {
    const token: string | null = localStorage.getItem("token");

    return await fetch(`http://localhost:3001/api/v1/tweets/addComment/${tweetId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: tweetText }),
        })
}
export const getAllTweets = async (sortOption: string, search: string): Promise<Response> => {

    return await fetch(`http://localhost:3001/api/v1/tweets?sortOption=${sortOption}&search=${search}`);
}
export const getTweetsByOnwer = async (owner: string): Promise<Response> => {

    return await fetch(`http://localhost:3001/api/v1/tweets/getTweetsByOwener?owner=${owner}`);
}
