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
import { submitForm } from "./Function";
import UserDocument from "../../../../types/user.type";
import { ErrorMessage } from "@hookform/error-message";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import React from "react";


const Login: FC = ({}) => {
    const { setUser }: { setUser: React.Dispatch<React.SetStateAction<UserDocument| null>> } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<Input>();

    const navigate: NavigateFunction = useNavigate();
    const submitLoginForm: SubmitHandler<Input> = async (info: Input) => {
        const user: UserDocument |null = await submitForm(info, navigate);
        setUser(user)
    }

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitLoginForm)} noValidate sx={{ mt: 1 }}>
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
        </Box>
    </Container>
};

export { Login };
