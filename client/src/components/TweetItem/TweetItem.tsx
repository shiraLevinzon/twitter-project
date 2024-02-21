import { FC, Fragment, useContext, useState } from 'react'
import { TweetProps } from './Types'
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import {getTimeElapsedString, goToTweetPage} from './Function';
import { Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import React from 'react';


const TweetItem: FC<TweetProps> = ({ tweet }) => {
  const navigate: NavigateFunction = useNavigate();  

  return (
    <>
        <ListItem id={tweet._id} alignItems="flex-start">
          <ListItemAvatar onClick={()=>{navigate(`/UserProfile`, {state: {user: Array.isArray(tweet.tweetOwner) && tweet.tweetOwner.length > 0 &&tweet.tweetOwner[0]}})}}>
            <Avatar src={Array.isArray(tweet.tweetOwner) && tweet.tweetOwner.length > 0 && 'image' in tweet.tweetOwner[0]
            ? tweet.tweetOwner[0].image : "https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png"}/>
          </ListItemAvatar>
          <ListItemText onClick={()=>{goToTweetPage(navigate, tweet?._id)}} sx={{ paddingTop: 4, paddingLeft: 4 }}
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
                  {getTimeElapsedString(tweet)}
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