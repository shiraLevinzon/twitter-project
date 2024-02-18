import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, Grid, IconButton, List, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { map } from 'lodash/fp';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import { useTweet } from '../../context/TweetContext';
import TweetDocument, { TweetPopulated } from '../../../../types/tweet.type';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import DialogAddTweet from "../../components/DialogAddTweet/Index";
import UserDocument from '../../../../types/user.type';
import { MutationKey, useMutation } from '@tanstack/react-query';
import { deleteTweet, getTweet, updateLike } from '../../services/TweetServices';
import { renderComment, sucssesDeleteActions, sucssesUpdateLikeActions } from './Function';



const Tweet: FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { user }: { user: UserDocument } = useUser();
  const { tweet, setTweet }: { tweet: TweetPopulated, setTweet: Dispatch<SetStateAction<TweetPopulated>> } = useTweet();
  const [isChecked, setIsChecked] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      id && await mutationGetTweet.mutate(id)

    };
    fetchData();
  }, [id]);

  useEffect(() => {
    tweet?.likes?.includes(user._id) ? setIsChecked(true) : setIsChecked(false);
  }, [tweet, user._id]);
  
  
 const mutationDeleteTweet = useMutation({
    mutationFn: () => {
      return deleteTweet(tweet._id.toString());
    },
    onSuccess: async (data: Response) => {
      data.ok ? sucssesDeleteActions(data,navigate) :
        toast.error(await data.text(), { position: 'top-right' });
        
    },
    onError: () => {
      toast.error("error", { position: 'top-right' })
    },
  });

  const mutationGetTweet = useMutation({
    mutationFn: (id: string) => {
      return getTweet(id);
    },
    onSuccess: async (data: Response) => {

      data.ok ? setTweet(await data.json()):
        toast.error(await data.text(), { position: 'top-right' })

    },
    onError: () => {
      toast.error("error", { position: 'top-right' })
    },
  })
  
  const mutationUpdateLike = useMutation({
    mutationFn: () => {
      return updateLike(isChecked, tweet._id.toString());
    },
    onSuccess: async (data: Response) => {
      data.ok ? sucssesUpdateLikeActions(data, setTweet,setIsChecked,isChecked)  :
        toast.error(await data.text(), { position: 'top-right' })

    },
    onError: () => {
      toast.error("error", { position: 'top-right' })
    },
  });
  
  return (
    <Container sx={{ paddingTop: 16 }}>
      <Card >
        <CardHeader onClick={() => { navigate(`/UserProfile`, { state: { user: tweet.tweetOwner } }) }} sx={{ fontSize: 33 }}
          avatar={
            <Avatar src={tweet?.tweetOwner?.image || ""} />
          }
          title={<Typography variant="h6" component="div">
            @{tweet?.tweetOwner?.userName || ""}
          </Typography>}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            <pre>{tweet?.text}</pre>
          </Typography>
        </CardContent>
        <CardActions>

          <IconButton onClick={()=>{mutationDeleteTweet.mutate()}}>
            <Delete fontSize='large' />
          </IconButton>

          <DialogAddTweet kind='comment' />
          <FormControlLabel sx={{ alignItems: 'end', width: '100%' }}
            value="bottom"
            control={<Checkbox checked={isChecked} onChange={()=>{mutationUpdateLike.mutate()}} color='warning' icon={<FavoriteBorder fontSize='large' />} checkedIcon={<Favorite fontSize='large' />} />}
            label={tweet?.likes?.length + " likes"}
            labelPlacement="top"
          />
        </CardActions>
        <ToastContainer />

      </Card>
      <Grid>
        <Typography sx={{ padding: 8 }} variant="h4" component="div">
          Comments:
        </Typography>
        <List sx={{ bgcolor: 'background.paper', paddingLeft: 8 }}>
          {map(renderComment)(tweet.comments as TweetDocument[])}
        </List>
      </Grid>
    </Container>
  )
}

export { Tweet }