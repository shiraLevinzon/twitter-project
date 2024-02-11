import { FC, useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './Types';


const Tweet: FC = () => {
  const { user } = useContext(UserContext);
  const { tweet, setTweet } = useContext(TweetContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Input>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    tweet.likes.includes(user._id) ? setIsChecked(true) : setIsChecked(false);
  }, [tweet, user._id]);



  const updateLike = async (): Promise<void> => {
    setIsChecked(!isChecked);
    !isChecked ? await setTweet(await tweetFunction.updateLike(`addLike/${tweet?._id}`)) :
      await setTweet(await tweetFunction.updateLike(`addDislike/${tweet?._id}`))
  };

  const addComment: SubmitHandler<Input> = async (comment: Input) => {
    const newUpdateTweet = await tweetFunction.addComment(comment.tweetText, tweet._id);
    setTweet(newUpdateTweet);
    handleClose();
  }
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

          <React.Fragment>
            <IconButton onClick={handleClickOpen}>
              <AddCommentIcon fontSize='large' />
            </IconButton>
            <Dialog
              sx={{ minWidth: 300 }}
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(addComment)
              }}
            >
              <DialogTitle>Add Comment</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add a comment that conforms to the site's standard, inappropriate comments will be deleted
                </DialogContentText>
                <TextField  {...register("tweetText", { required: "tweetText is required." })}
                  autoFocus required margin="dense" id="tweetText" name="tweetText" label="Your Comment" type="text" fullWidth variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>

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