import { FC, Fragment, useContext, useState } from 'react'
import { TweetProps } from './Types'
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import * as tweetFunction from './Function';
import { Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import TweetContext from '../../context/TweetContext';
import { orange } from '@mui/material/colors';


const TweetItem: FC<TweetProps> = ({ tweet }) => {
  const navigate: NavigateFunction = useNavigate()
  const goToTweetPage = async (): Promise<void> => {
    navigate(`/tweet/${tweet._id}`);
  }
  return (
    <>
        <ListItem id={tweet._id} alignItems="flex-start">
          <ListItemAvatar onClick={()=>{navigate(`/UserProfile`, {state: {user: tweet.tweetOwner}})}}>
            <Avatar src={Array.isArray(tweet.tweetOwner) && tweet.tweetOwner.length > 0 && 'image' in tweet.tweetOwner[0]
            ? tweet.tweetOwner[0].image : "https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png"}/>
          </ListItemAvatar>
          <ListItemText onClick={goToTweetPage} sx={{ paddingTop: 4, paddingLeft: 4 }}
            primary={<Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <pre>{tweet.text}</pre>
              </Typography>
            </Fragment>}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {tweetFunction.getTimeElapsedString(tweet)}
                </Typography>
              </Fragment>
            }
          />
          {tweet?.likes.length + " likes"}
        </ListItem>
        <Divider />
    </>
  );

}

export { TweetItem }