import { FC, useEffect, useState } from 'react'
import { Await, useLocation } from 'react-router-dom';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Container, FormControlLabel, Grid, Icon, IconButton, IconButtonProps, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import TweetDocument from '../../../../types/tweet.type';
import Favorite from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tweetFunction from "./Function";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { map } from 'lodash/fp';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Tweet: FC = () => {
  const location = useLocation();
  const [tweet, setTweet] = useState<TweetDocument>();

  useEffect(() => {
    setTweet(location.state.tweet)
  }, [])

  const [isChecked, setIsChecked] = useState(false);

  const updateLike = async () => {
    setIsChecked(!isChecked);
    !isChecked ? await setTweet(await tweetFunction.updateLike(`addLike/${tweet?._id}`)) :
    await setTweet(await tweetFunction.updateLike(`addDislike/${tweet?._id}`))
    console.log(tweet);
    
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
          title={tweet?.tweetOwner?._id}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet?.text}</pre>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <FormControlLabel
            value="bottom"
            control={<Checkbox onChange={updateLike} color='warning' icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
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

        {/* <Grid>
          Comments:
          {map((comment: TweetDocument) => <Typography>
            {comment?.text}
          </Typography>)(tweet?.comments)}
        </Grid>
 */}



      </Card>
    </Container>
  )
}

export { Tweet }