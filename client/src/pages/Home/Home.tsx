import { useQuery } from "@tanstack/react-query";
import { FC, useContext } from "react";
import { map } from "lodash/fp";
import { renderTweet } from "./Function";
import { TweetContext } from "../../App";
import TweetDocument from "../../../../types/tweet.type";
import { Container, List } from "@mui/material";

const Home: FC = () => {
    const { isLoading, error, data } = useQuery<Array<TweetDocument>, Error>({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/v1/tweets');
            if (!response.ok) {
                throw new Error('Failed to fetch tweets');
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <Container>
            <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>

                <h2>Tweets: </h2>
                {map(renderTweet, data)}
            </List>
        </Container>

    );
};

export { Home };
