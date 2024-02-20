import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Input } from './Types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { ToastContainer, toast } from 'react-toastify';
import { addUser } from '../../services/UserServices';
import { useQuery } from '@tanstack/react-query';
import { sucssesFetchActions } from './Function';
import './Styles.css';

const Signup: FC = ({ }) => {

  const navigate: NavigateFunction = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Input>(
    {
      defaultValues: {
        userName: "",
        email: "",
        password: "",
        image: "https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png"
      },
    }
  );

  const { refetch } = useQuery<Response, Error>({
    queryKey: ["signup"],
    queryFn: async () => {
      return await addUser(getValues());
    },
    enabled: false,
    onSuccess: async (data: Response) => {
      data.ok ? sucssesFetchActions(navigate) :
        toast.error(await data.text(), { position: 'top-right' })

    },
    onError: (error: Error) => {
      toast.error(error.message, { position: 'top-right' })
    }
  });


  return <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Grid className="mainBox">
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" onSubmit={handleSubmit(() => { refetch() })}
      noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField  {...register("userName", { required: "User Name is required." })}
            autoComplete="given-name"
            name="userName"
            required
            fullWidth
            id="userName"
            label="User Name"
            autoFocus
          />
          <ErrorMessage errors={errors} name="userName" />

        </Grid>
        <Grid item xs={12}>
          <TextField  {...register("email", { required: "Email is required." })}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <ErrorMessage errors={errors} name="email" />

        </Grid>
        <Grid item xs={12}>
          <TextField  {...register("password", { required: "Password is required." })}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <ErrorMessage errors={errors} name="password" />
        </Grid>

        <Grid item xs={12}>
          <TextField  {...register("image")}
            fullWidth
            required
            defaultValue='https://i.pinimg.com/originals/3d/14/bf/3d14bf9a9325bb78d40bb80ed3a571a2.png'
            name="image"
            label="Profile Image Url"
            type="text"
            id="image"
            autoComplete="image"

          />
        </Grid>


      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <ToastContainer />

      <Grid container>

        <Grid item>
          <Typography
            component="div"
            variant="body2"
            onClick={() => navigate("/")}
            style={{ cursor: 'pointer' }}>
            Already have an account? Sign in
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Grid>
  </Container >
};

export { Signup }
