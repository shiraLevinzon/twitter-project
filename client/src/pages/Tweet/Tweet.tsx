import { FC, useContext, useEffect, useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Grid, IconButton, List, Typography } from '@mui/material';
import { AddComment, Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
//import DeleteIcon from '@mui/icons-material/Delete';
import * as tweetFunction from "./Function";
import { map } from 'lodash/fp';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import TweetContext from '../../context/TweetContext';
import * as React from 'react';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './Types';
import TweetDocument from '../../../../types/tweet.type';
import { useParams } from 'react-router-dom';



const Tweet: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  const { tweet, setTweet } = useContext(TweetContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Input>();
  const [open, setOpen] = useState<boolean>(false);
  //const [comments, setComments]= useState<Array<TweetDocument>>();
  //const [tweet, setTweet]= useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!id) {
        console.error("Invalid or missing tweet ID");
        return;
      }

      const tweetData: TweetDocument | null = await tweetFunction.getTweet(id).
        catch((error: Error) => {
          console.error("Error fetching tweet:", error);
          return null;
        });
      setTweet(tweetData);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    //setComments(tweet.comments)    
    tweet?.likes?.includes(user._id) ? setIsChecked(true) : setIsChecked(false);
  }, [tweet, user._id]);



  const updateLike = async (): Promise<void> => {
    setIsChecked(!isChecked);
    !isChecked ? await setTweet(await tweetFunction.updateLike(`addLike/${tweet?._id}`)) :
      await setTweet(await tweetFunction.updateLike(`addDislike/${tweet?._id}`))
  };

  const addComment: SubmitHandler<Input> = async (comment: Input) :Promise<void>=> {
    const newUpdateTweet = await tweetFunction.addComment(comment.tweetText, tweet?._id);
    setTweet(newUpdateTweet);
    handleClose();
  }
  const deleteTweet = async (): Promise<void> => {

  };
  return (
    <Container sx={{ paddingTop: 16 }}>
      <Card >

        <CardHeader sx={{ fontSize: 33 }}
          avatar={
            <Avatar src={tweet?.tweetOwner?.image} />
          }
          title={<Typography variant="h6" component="div">
            @{tweet?.tweetOwner?.userName}
          </Typography>}
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
            label={tweet?.likes?.length + " likes"}
            labelPlacement="bottom"
          />
          <IconButton onClick={deleteTweet}>
            <Delete fontSize='large' />
          </IconButton>

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