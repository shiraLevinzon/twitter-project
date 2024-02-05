import { FC, Fragment, useState } from 'react'
import { TweetProps } from './Types'
import { Avatar, Box, Collapse, Container, Divider, Grid, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { map } from 'lodash/fp';
import { getTimeElapsedString, renderComment } from './Function';
import { Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepOrange } from '@mui/material/colors';



const Tweet: FC<TweetProps> = ({ tweet }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  console.log(tweet)
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>

        </ListItemAvatar>
        <ListItemText

          primary={tweet.text}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {getTimeElapsedString(tweet)}
              </Typography>

            </Fragment>
          }

        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
    // <Container>
    //   <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 1200}}>

    //     <Grid sx={{ border: 1 }} container spacing={1}>

    //       <Grid sx={{ paddingLeft: 16}} item xs={6}>
    //       {/* <Avatar alt={tweet.tweetOwner._id} src={tweet.tweetOwner.image} sx={{ width: 56, height: 56 }}/> */}
    //       <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>        
    //       </Grid>

    //       <Grid item xs={6}>

    //       <p>Created At: {tweet.dateCreated?.toString()}</p>
    //       </Grid>
    //       <Grid item xs={12}>
    //         {tweet.text}
    //       </Grid>

    //   <Grid item xs={3}>
    //     <IconButton>
    //       <FavoriteIcon />
    //     </IconButton>
    //   </Grid>

    // </Grid>

    //   </Box >
    // </Container >
  );

}

export { Tweet }