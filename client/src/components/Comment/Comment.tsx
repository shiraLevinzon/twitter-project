import React, { FC } from 'react'
import { CommentProps } from './Types'
import { Card, CardContent, Container, Typography } from '@mui/material'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const Comment : FC<CommentProps> = ({tweet}) => {
  const navigate: NavigateFunction = useNavigate()

  const goToTweetPage = () : void => {
    navigate('/tweet', { state: { tweet: tweet }} )
  }
  return (
    <Card onClick={goToTweetPage} id={tweet._id} sx={{marginBottom:2}}>
      <CardContent>
        <Typography variant="h5" component="div">
          <pre>{tweet?.text}</pre>
        </Typography>
      </CardContent>
    </Card>
  )
}

export {Comment}
