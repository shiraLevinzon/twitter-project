import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { map } from "lodash/fp";
import TweetDocument, { TweetPopulated } from "../../../../types/tweet.type";
import { Avatar, Container, FormControlLabel, Grid, List, Radio, RadioGroup, TextField } from "@mui/material";
import { FormControl } from "@mui/base";
import SearchIcon from '@mui/icons-material/Search';
import { filter } from "lodash/fp";
import { useUser } from "../../context/UserContext";
import UserDocument from "../../../../types/user.type";
import { Query } from "./Types";
import DialogAddTweet from "../../components/DialogAddTweet/Index";
import React from "react";
import { filterOptionChange, filterSearchChange, margeFilter, renderTweet } from "./Function";
import { getAllTweets } from "../../services/TweetServices";
import { useQuery } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HomeAvatar, HomeList, OrangeRadio } from "./Styles";

const Home: FC = ({ }) => {
    const navigate: NavigateFunction = useNavigate();
    const { user }: { user: UserDocument } = useUser();
    const [query, setQuery] = useState<Query>({
        sortOption: 'date',
        search: '',
        isFilterRequire: false
    });

    const { isLoading, error, data, refetch } = useQuery<Array<TweetPopulated>, Error>({
        queryKey: [query],
        queryFn: async () => {
            const response = await getAllTweets(query.sortOption, query.search);
            if (query.isFilterRequire)
                return await filter((tw: TweetPopulated) => margeFilter(tw, user))(await response.json());
            return response.json();
        },
        onError: () => {
            toast.error("failed to fetch");
        }

    });

    return (
        <>
            <HomeAvatar
                onClick={() => { navigate(`/UserProfile`, { state: { user: user } }) }}
                src={user.image}
            />
            <Container sx={{ paddingTop: 5 }}>
                <FormControl>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={7}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    filterOptionChange(setQuery, event, query, refetch)
                                }}
                                defaultValue='date'
                            >
                                <FormControlLabel value="all" control={<OrangeRadio />} label="All" />
                                <FormControlLabel value="date" control={<OrangeRadio />} label="Newest" />
                                <FormControlLabel value="likes" control={<OrangeRadio />} label="Most Popular" />
                                <FormControlLabel value="newFollowing" control={<OrangeRadio />} label="Newest from your folowing" />
                                <FormControlLabel value="popularFollowing" control={<OrangeRadio />} label="Most Popular from your folowing" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                filterSearchChange(setQuery, event, query, refetch)
                            }} id="outlined-basic" label={<SearchIcon />} color="warning"
                                variant="outlined" ></TextField>
                        </Grid>
                        <Grid item xs={1}>
                            <DialogAddTweet kind='tweet' refetch={refetch} />
                        </Grid>
                    </Grid>
                </FormControl>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!isLoading && !error && (
                    <HomeList>
                        <h2>Tweets: </h2>
                        {map(renderTweet, data)}
                    </HomeList>
                )}

            </Container>

        </>
    );
};

export { Home };
