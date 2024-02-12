import React, { FC, useContext, useState } from 'react'
import { DialogProps } from './Types'
import { IconButton} from '@mui/material';
import { AddComment} from '@mui/icons-material';
import * as tweetFunction from "./Function";
import TweetContext from '../../context/TweetContext';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './Types';



const DialogAddTweet: FC<DialogProps> = ({kind}) => {
  const { tweet, setTweet } = useContext(TweetContext);

  const { register, handleSubmit, formState: { errors } } = useForm<Input>();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addCommetOrTweet: SubmitHandler<Input> = async (comment: Input) :Promise<void>=> {
    const newUpdateTweet = kind==='tweet'? await tweetFunction.addTweet(comment.tweetText): 
    await tweetFunction.addComment(comment.tweetText, tweet?._id);
    setTweet(newUpdateTweet);
    handleClose();
  }

  return (
    <React.Fragment>
    <IconButton onClick={handleClickOpen}>
      <AddComment fontSize='large' />
    </IconButton>
    <Dialog
      sx={{ minWidth: 300 }}
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(addCommetOrTweet)
      }}
    >
      <DialogTitle>Add {kind}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a {kind} that conforms to the site's standard, inappropriate comments will be deleted
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
  )
}

export  {DialogAddTweet}