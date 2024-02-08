import { FC, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Container, Divider, FormControlLabel, Grid, Icon, IconButton, IconButtonProps, List, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import TweetDocument from '../../../../types/tweet.type';
import Favorite from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tweetFunction from "./Function";
import { map } from 'lodash/fp';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import TweetContext from '../../context/TweetContext';



const Tweet: FC = () => {
  //const location = useLocation();
  const { user } = useContext(UserContext);
  const { tweet, setTweet } = useContext(TweetContext);
  const [comments, setComments] = useState<Array<TweetDocument>>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    //const currentTweet = location.state.tweet;
    //setTweet(currentTweet);
    tweet.likes.includes(user._id) ? setIsChecked(true) : setIsChecked(false)
    setComments(tweet.comments)

  }, [])

  const updateLike = async (): Promise<void> => {
    setIsChecked(!isChecked);
    !isChecked ? await setTweet(await tweetFunction.updateLike(`addLike/${tweet?._id}`)) :
      await setTweet(await tweetFunction.updateLike(`addDislike/${tweet?._id}`))
  };


  return (
    <Container sx={{ paddingTop: 16 }}>
      <Card >

        <CardHeader
          avatar={
            <Avatar
              src="https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png"
              sx={{ width: 56, height: 56 }} />
          }
          title={user.userName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet?.text}</pre>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <FormControlLabel
            value="bottom"
            control={<Checkbox checked={isChecked} onChange={updateLike} color='warning' icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
            label={tweet?.likes.length + " likes"}
            labelPlacement="bottom"
          />
          <IconButton>
            <DeleteIcon fontSize='large' />
          </IconButton>
          <IconButton>
            <AddCommentIcon fontSize='large' />
          </IconButton>

        </CardActions>
        <ToastContainer />

      </Card>
      <Grid>
        <Typography sx={{ padding: 8 }} variant="h4" component="div">
          Comments:
        </Typography>
        <List sx={{ bgcolor: 'background.paper', paddingLeft: 8 }}>
          {map(tweetFunction.renderComment)(comments)}
        </List>
      </Grid>
    </Container>
  )
}

export { Tweet }