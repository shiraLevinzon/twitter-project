import { FC, Fragment, useContext, useState } from 'react'
import { TweetProps } from './Types'
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import * as tweetFunction from './Function';
import { Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import TweetContext from '../../context/TweetContext';


const TweetItem: FC<TweetProps> = ({ tweet }) => {

  const { setTweet } = useContext(TweetContext);

  return (
    <>

      <Link style={{ textDecoration: 'none', color: 'inherit' }}  to={`/tweet/${tweet._id}`}  onClick={() => setTweet(tweet)}>

        <ListItem id={tweet._id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src="https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png" />
          </ListItemAvatar>
          <ListItemText sx={{ paddingTop: 4, paddingLeft: 4 }}
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
      </Link>
    </>
  );

}

export { TweetItem }