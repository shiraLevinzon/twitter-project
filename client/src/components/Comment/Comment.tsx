import React, { FC, useContext } from 'react'
import { CommentProps } from './Types'
import { Card, CardContent, Container, Typography } from '@mui/material'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import TweetContext from '../../context/TweetContext'

const Comment: FC<CommentProps> = ({ tweet }) => {
  const { setTweet } = useContext(TweetContext);

  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/tweet/${tweet._id}`} onClick={() => setTweet(tweet)}>
      <Card id={tweet._id} sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet?.text}</pre>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export { Comment }

