import { FC, useContext, useEffect, useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Grid, IconButton, List, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import * as tweetFunction from "./Function";
import { map } from 'lodash/fp';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import TweetContext from '../../context/TweetContext';
import TweetDocument from '../../../../types/tweet.type';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import DialogAddTweet from "../../components/DialogAddTweet/Index";



const Tweet: FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  const { tweet, setTweet } = useContext(TweetContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!id) {
        console.error("Invalid or missing tweet ID");
        return;
      }

      const tweetData: TweetDocument | null = await tweetFunction.getTweet(id).
        catch((error: Error) => {
          console.error("Error fetching tweet:", error);
          return null;
        });
      setTweet(tweetData);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    //setComments(tweet.comments)    
    tweet?.likes?.includes(user._id) ? setIsChecked(true) : setIsChecked(false);
  }, [tweet, user._id]);

  const updateLike = async (): Promise<void> => {
    setIsChecked(!isChecked);
    const newUpdateTweet: TweetDocument | null = !isChecked ?
      await tweetFunction.updateLike(`addLike/${tweet?._id}`) :
      await tweetFunction.updateLike(`addDislike/${tweet?._id}`);
    setTweet(newUpdateTweet)
  };

  const deleteTweet = async (): Promise<void> => {
    tweetFunction.deleteTweet(tweet._id)
  };
  return (
    <Container sx={{ paddingTop: 16 }}>
      <Card >
        <CardHeader onClick={()=>{navigate(`/UserProfile`, {state: {user: tweet.tweetOwner}})}} sx={{ fontSize: 33 }}
          avatar={
            <Avatar src={tweet?.tweetOwner?.image} />
          }
          title={<Typography variant="h6" component="div">
            @{tweet?.tweetOwner?.userName}
          </Typography>}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet?.text}</pre>
          </Typography>
        </CardContent>
        <CardActions>
          
          <IconButton onClick={deleteTweet}>
            <Delete fontSize='large' />
          </IconButton>
          
          <DialogAddTweet kind='comment' />
          <FormControlLabel sx={{ alignItems: 'end', width: '100%' }}
            value="bottom"
            control={<Checkbox checked={isChecked} onChange={updateLike} color='warning' icon={<FavoriteBorder fontSize='large' />} checkedIcon={<Favorite fontSize='large' />} />}
            label={tweet?.likes?.length + " likes"}
            labelPlacement="top"
          />
        </CardActions>
        <ToastContainer />

      </Card>
      <Grid>
        <Typography sx={{ padding: 8 }} variant="h4" component="div">
          Comments:
        </Typography>
        <List sx={{ bgcolor: 'background.paper', paddingLeft: 8 }}>
          {map(tweetFunction.renderComment)(tweet.comments)}
        </List>
      </Grid>
    </Container>
  )
}

export { Tweet }