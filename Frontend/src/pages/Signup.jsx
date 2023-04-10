import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Alert } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link style={{ textDecoration: "none", color: "Black" }} color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Signup() {
    const [emailError, setEmailError] = React.useState(false);
    const navigate = useNavigate();


    // React.useEffect(() => {
    //     if (userId) {
    //         navigate('/')
    //     }
    // }, [])

    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let postdata = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        }
        try {
            const res = await axios.post("https://tericsoft-assignment-production.up.railway.app/reg", postdata)
            console.log(res.data, "data");
            const ss = localStorage.setItem("ID", res?.data.Id)
            const userId = localStorage.getItem("ID") || null;


            if (userId) {
                navigate('/')
            }

        } catch (error) {
            alert(error?.response?.data?.message)
            console.log(error, "while signup")
            //   alert(,"done")
            //   return  <Alert severity="error"></Alert>

        }


    };
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;

        // validate email
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailError(!emailRegex.test(newEmail));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            autoComplete="name"
                            autoFocus
                            inputProps={{ maxLength: 50 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="current-email"
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? 'Please enter a valid email address' : ''}

                        />



                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >

                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link to="/login" variant="body2" style={{ textDecoration: "none", color: "Black" }}>
                                    {"Do you have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}