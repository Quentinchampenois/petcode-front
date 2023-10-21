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
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {request} from "../utils/request";
import {isTokenValid} from "../utils/auth";
import {backendUrl} from "../utils/backendUrl";

export const RegisterPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [firstnameError, setFirstnameError] = React.useState("");

    const isValidEmail = () => {
        return /\S+@\S+\.\S+/.test(email);
    }
    const containsNumbersOrSpecialChars = /[0-9~`!@#$%^&*()_\-+={}\[\]:;"<>,\.\?\/\\|]+/;

    const validateForm = () => {
        let valid = true;

        if (email.length < 1 || !isValidEmail()) {
            setEmailError("Veuillez renseigner votre adresse e-mail");
            valid = false
        } else {
            if (emailError.length > 0) setEmailError("")
        }

        if (password.length < 7) {
            setPasswordError("Votre mot de passe doit contenir au moins 7 caractères");
            valid = false
        } else {
            if (passwordError.length > 0) setPasswordError("")
        }

        if (name.length < 1) {
            setNameError("Veuillez renseigner votre nom");
            valid = false
        } else {
            if (nameError.length > 0) setNameError("")
        }

        if (name.length > 50) {
            setNameError("Votre nom ne peut pas dépasser 50 caractères");
            valid = false
        } else {
            if (nameError.length > 0) setNameError("")
        }

        if (containsNumbersOrSpecialChars.test(name)) {
            setNameError("Votre nom ne peut pas contenir de caractères spéciaux ou de chiffres");
            valid = false
        } else {
            if (nameError.length > 0) setNameError("")
        }

        if (firstname.length < 1) {
            setFirstnameError("Veuillez renseigner votre prénom");
            valid = false
        } else {
            if (firstnameError.length > 0) setFirstnameError("")
        }

        if (firstname.length > 25) {
            setFirstnameError("Votre prénom ne peut pas dépasser 25 caractères");
            valid = false
        } else {
            if (firstnameError.length > 0) setFirstnameError("")
        }

        if (containsNumbersOrSpecialChars.test(firstname)) {
            setFirstnameError("Votre prénom ne peut pas contenir de caractères spéciaux ou de chiffres");
            valid = false
        } else {
            if (firstnameError.length > 0) setFirstnameError("")
        }

        return valid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        let bodyParams = {
            email: email,
            password: password,
            name: name,
            firstname: firstname
        }

        request("POST", "/signup", bodyParams, null)
            .then((r) => r.json())
            .then((r) => {
                if (r.status === 200) {
                    console.log(r.data.token)
                    if (isTokenValid(r.data.token)) {
                        login({
                            token: r.data.token
                        });
                    }
                } else {
                    console.error(r)
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
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inscription
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError.length > 0}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Typography variant={"caption"} color={"error"}>{emailError}</Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={passwordError.length > 0}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant={"caption"} color={"error"}>{passwordError}</Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Nom"
                        type="text"
                        id="name"
                        autoComplete="name"
                        error={nameError.length > 0}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Typography variant={"caption"} color={"error"}>{nameError}</Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstname"
                        label="Prénom"
                        type="text"
                        id="firstname"
                        autoComplete="firstname"
                        error={firstnameError.length > 0}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <Typography variant={"caption"} color={"error"}>{firstnameError}</Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Créer mon compte
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/login">
                                <Link href="#" variant="body2">
                                    {"Vous avez déjà un compte ? Connectez-vous"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
