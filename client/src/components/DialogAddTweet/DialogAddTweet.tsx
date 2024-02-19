import React, { FC, useContext, useState } from 'react'
import { DialogProps } from './Types'
import { IconButton } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import { useTweet } from '../../context/TweetContext';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './Types';
import { addCommetOrTweet, closeDialog, openDialog, sucssesFetchActions } from './Function';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TweetPopulated } from '../../../../types/tweet.type';



const DialogAddTweet: FC<DialogProps> = ({ kind, refetch }) => {
  const { tweet, setTweet } = useTweet();

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Input>();
  const [open, setOpen] = useState<boolean>(false);

  const { refetch: refetchUpdateCommetOrTweet } = useQuery<TweetPopulated, Error>({
    queryKey: ["updateCommetOrTweet"],
    queryFn: async () => {
      const response: Response = await addCommetOrTweet(getValues(), kind, tweet);
      return response.json();
    },
    enabled: false,
    onSuccess: (data: TweetPopulated) => {
      sucssesFetchActions(setTweet, setOpen, refetch, data)
    },
    onError: (error: Error) => {
      toast.error(error.message, { position: 'top-right' })
    }
  });
  return (
    <React.Fragment>
      <IconButton onClick={() => { openDialog(setOpen) }}>
        <AddComment fontSize='large' />
      </IconButton>
      <Dialog
        sx={{ minWidth: 300 }}
        open={open}
        onClose={() => { closeDialog(setOpen) }}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(() => {
            refetchUpdateCommetOrTweet()
          })
        }}
      >
        <DialogTitle>Add {kind}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a {kind} that conforms to the site's standard, inappropriate comments will be deleted
          </DialogContentText>
          <TextField  {...register("tweetText", { required: "tweetText is required." })}
            autoFocus required margin="dense" id="tweetText" name="tweetText" label={`Your ${kind}`} type="text" fullWidth variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { closeDialog(setOpen) }}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { DialogAddTweet }