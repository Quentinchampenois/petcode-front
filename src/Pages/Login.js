import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Link as RouterLink} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";
import {isTokenValid} from "../utils/auth";
import {request} from "../utils/request";

export const LoginPage = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let bodyParams = {
            email: email,
            password: password
        }
        request("POST", "/signin", bodyParams, null)
        .then((r) => r.json())
            .then((r) => {
                if (r.status === 200) {
                    if (isTokenValid(r.data.token)) {
                        login({
                            token: r.data.token
                        });
                    }
                } else {
                    setError(r.error[0].error)
                }
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} error={error !== ""}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        error={error !== ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={error !== ""}
                    />

                    <Typography component="small" variant="small" color="error">{error}</Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={email === "" || password === ""}
                    >
                        Me connecter
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/register">
                                <Link href="#" variant="body2">
                                    {"Vous n'avez pas de compte ? Créez votre compte facilement"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
