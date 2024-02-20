import { FC, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Types";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { sucssesFetchActions } from "./Function";
import UserDocument from "../../../../types/user.type";
import { ErrorMessage } from "@hookform/error-message";
import { useUser } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addLogin } from "../../services/UserServices";
import {MainBox} from './Styles'

const Login: FC = ({ }) => {
    const { setUser }: { setUser: React.Dispatch<React.SetStateAction<UserDocument>> } = useUser();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<Input>();
    const navigate: NavigateFunction = useNavigate();


    const { refetch } = useQuery<Response, Error>({
        queryKey: ["login"],
        queryFn: async () => {
            return await addLogin(getValues());
        },
        enabled: false,
        onSuccess: async (data: Response) => {
            data.ok ? sucssesFetchActions(data, setUser, navigate) :
                toast.error(await data.text(), { position: 'top-right' })
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: 'top-right' })
        }
    });


    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <MainBox >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(() => {
                refetch();
            })} noValidate sx={{ mt: 1 }}>
                <TextField {...register("email", { required: "Email is required." })}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <ErrorMessage errors={errors} name="email" />

                <TextField {...register("password", { required: "Password is required." })}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <ErrorMessage errors={errors} name="password" />


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
                            onClick={() => navigate("/signup")}
                            style={{ cursor: 'pointer' }}
                        >
                            Don't have an account? Sign Up
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </MainBox>
    </Container>
};

export { Login };
