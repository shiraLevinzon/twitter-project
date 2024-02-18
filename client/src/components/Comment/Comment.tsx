import React, { FC, useContext } from 'react'
import { CommentProps } from './Types'
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { goToTweetPage } from './Function'
import { Avatar } from 'antd'

const Comment: FC<CommentProps> = ({ tweet }) => {
  const navigate: NavigateFunction = useNavigate()


  return (
      <Card onClick={()=>{goToTweetPage(navigate, tweet?._id)}}  sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet.text}</pre>
          </Typography>
        </CardContent>
      </Card>
  )
}

export { Comment }

