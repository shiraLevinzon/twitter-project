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
import { useMutation } from '@tanstack/react-query';



const DialogAddTweet: FC<DialogProps> = ({ kind, refetch }) => {
  const { tweet, setTweet } = useTweet();

  const { register, handleSubmit, formState: { errors } } = useForm<Input>();
  const [open, setOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (info: Input) => {            
        return addCommetOrTweet(info, kind,tweet);
    },
    onSuccess: async (data: Response) => {
        data.ok ? sucssesFetchActions(setTweet,setOpen,refetch,data) :
            toast.error(await data.text(), { position: 'top-right' })
    },
    onError: () => {
        toast.error("error", { position: 'top-right' })
    },
})

  return (
    <React.Fragment>
      <IconButton onClick={()=>{openDialog(setOpen)}}>
        <AddComment fontSize='large' />
      </IconButton>
      <Dialog
        sx={{ minWidth: 300 }}
        open={open}
        onClose={()=>{closeDialog(setOpen)}}
        PaperProps={{
          component: 'form',
          onSubmit:handleSubmit((info: Input) => {
             mutation.mutate(info);})
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
          <Button onClick={()=>{closeDialog(setOpen)}}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { DialogAddTweet }