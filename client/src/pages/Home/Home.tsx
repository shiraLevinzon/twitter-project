import { useQuery } from "@tanstack/react-query";
import { FC, useContext, useEffect, useState } from "react";
import { map } from "lodash/fp";
import { margeFilter, renderTweet } from "./Function";
import TweetDocument from "../../../../types/tweet.type";
import { Container, FormControlLabel, Grid, List, Radio, RadioGroup, TextField } from "@mui/material";
import { FormControl } from "@mui/base";
import SearchIcon from '@mui/icons-material/Search';
import { filter } from "lodash/fp";
import { UserContext } from "../../context/UserContext";
import UserDocument from "../../../../types/user.type";

const Home: FC = ({ }) => {
    const { user }: { user: UserDocument } = useContext(UserContext);
    const [query, setQuery] = useState({
        sortOption: '',
        search: '',
        isFilterRequire: false
    });

    const { isLoading, error, data, refetch } = useQuery<Array<TweetDocument>, Error>({
        queryKey: [query],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/api/v1/tweets?sortOption=${query.sortOption}&search=${query.search}`);

            if (!response.ok) throw new Error('Failed to fetch tweets');
            else if (query.isFilterRequire) return await filter((tw: TweetDocument) => margeFilter(tw, user))(await response.json());
            return response.json();
        },
    });

    const filterOptionChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.value === 'newFollowing')
            await setQuery({ sortOption: "date", search: query.search, isFilterRequire: true });

        else if (event.target.value === 'popularFollowing')
            await setQuery({ sortOption: "likes", search: query.search, isFilterRequire: true });

        else
            await setQuery({ sortOption: event.target.value, search: query.search, isFilterRequire: false });

        await refetch();
    };

    const filterSearchChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setQuery({ sortOption: query.sortOption, search: event.target.value, isFilterRequire: false });
        await refetch();
    };

    // const newFollowingChange = async (): Promise<void> => {
    //     await setQuery({ sortOption: "date", search: query.search, isFilterRequire: true });
    //     await refetch();
    // };
    // const popularFollowingChange = async (): Promise<void> => {
    //     await setQuery({ sortOption: "likes", search: query.search, isFilterRequire: true });
    //     await refetch();
    // };

    return (
        <Container sx={{ paddingTop: 5 }}>
            <FormControl>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={filterOptionChange}
                        >
                            <FormControlLabel value="all" control={<Radio style={{ color: 'orange' }} />} label="All" />
                            <FormControlLabel value="date" control={<Radio style={{ color: 'orange' }} />} label="Newest" />
                            <FormControlLabel value="likes" control={<Radio style={{ color: 'orange' }} />} label="Most Popular" />
                            <FormControlLabel  value="newFollowing" control={<Radio style={{ color: 'orange' }} />} label="Newest from your folowing" />
                            <FormControlLabel  value="popularFollowing" control={<Radio style={{ color: 'orange' }} />} label="Most Popular from your folowing" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onChange={filterSearchChange} id="outlined-basic" label={<SearchIcon />} variant="outlined" ></TextField>
                    </Grid>
                </Grid>


            </FormControl>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && !error && (
                <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                    <h2>Tweets: </h2>
                    {map(renderTweet, data)}
                </List>
            )}

        </Container>

    );
};

export { Home };
