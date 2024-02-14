import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useEffect, useState } from "react";
import { map } from "lodash/fp";
import * as homeFunction from "./Function";
import TweetDocument from "../../../../types/tweet.type";
import { Avatar, Container, FormControlLabel, Grid, List, Radio, RadioGroup, TextField } from "@mui/material";
import { FormControl } from "@mui/base";
import SearchIcon from '@mui/icons-material/Search';
import { filter } from "lodash/fp";
import { UserContext } from "../../context/UserContext";
import UserDocument from "../../../../types/user.type";
import { Query } from "./Types";
import DialogAddTweet from "../../components/DialogAddTweet/Index";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home: FC = ({ }) => {
    const navigate: NavigateFunction = useNavigate()
    const { user }: { user: UserDocument } = useContext(UserContext);
    const [query, setQuery] = useState<Query>({
        sortOption: 'date',
        search: '',
        isFilterRequire: false
    });

    const { isLoading, error, data, refetch } = useQuery<Array<TweetDocument>, Error>({
        queryKey: [query],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/api/v1/tweets?sortOption=${query.sortOption}&search=${query.search}`);
            if (!response.ok) throw new Error('Failed to fetch tweets');
            else if (query.isFilterRequire) return await filter((tw: TweetDocument) => homeFunction.margeFilter(tw, user))(await response.json());
            return response.json();
        },
    });

    const filterOptionChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {

        const sortOptions: Record<string, { sortOption: string, isFilterRequire: boolean }> = {
            newFollowing: { sortOption: "date", isFilterRequire: true },
            popularFollowing: { sortOption: "likes", isFilterRequire: true },
            date: { sortOption: "date", isFilterRequire: false },
            likes: { sortOption: "likes", isFilterRequire: false },
            all: { sortOption: "all", isFilterRequire: false }
        };

        await setQuery({ ...sortOptions[event.target.value], search: query.search });
        await refetch();
    };

    const filterSearchChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setQuery({ sortOption: query.sortOption, search: event.target.value, isFilterRequire: false });
        await refetch();
    };


    return (
        <>
            <Avatar
                onClick={() => { navigate(`/UserProfile`, { state: { user: user } }) }}
                src={user.image}
                sx={{
                    width: 70,  // Set the width to your desired size
                    height: 70,  // Set the height to your desired size
                    position: 'absolute',
                    top: 30,  // Adjust the top position for padding from the top
                    right: 30,  // Adjust the right position for padding from the right
                    cursor: 'pointer',
                }}
            />
            <Container sx={{ paddingTop: 5 }}>
                <FormControl>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={7}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={filterOptionChange}
                                defaultValue='date'
                            >
                                <FormControlLabel value="all" control={<Radio style={{ color: 'orange' }} />} label="All" />
                                <FormControlLabel value="date" control={<Radio style={{ color: 'orange' }} />} label="Newest" />
                                <FormControlLabel value="likes" control={<Radio style={{ color: 'orange' }} />} label="Most Popular" />
                                <FormControlLabel value="newFollowing" control={<Radio style={{ color: 'orange' }} />} label="Newest from your folowing" />
                                <FormControlLabel value="popularFollowing" control={<Radio style={{ color: 'orange' }} />} label="Most Popular from your folowing" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField onChange={filterSearchChange} id="outlined-basic" label={<SearchIcon />} color="warning"
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
                    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                        <h2>Tweets: </h2>
                        {map(homeFunction.renderTweet, data)}
                    </List>
                )}

            </Container>
            <ToastContainer />

        </>
    );
};

export { Home };
