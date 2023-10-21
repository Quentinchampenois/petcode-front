import dogLogo from "../happy.png";
import {useParams} from "react-router-dom";
import "./Pet.css"
import Button from "@mui/material/Button";
import {Modal, Switch, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Avatar from "@mui/material/Avatar";
import PetsIcon from '@mui/icons-material/Pets';
import Container from "@mui/material/Container";

export const EditProfile = () => {
    const dog = {
        name: "Pyla",
        breed: "Beagle",
        sexe: "female",
        birthdate: "10-04-2019",
        owner: {
            firstname: "Human firstname",
            phones: [
                "06.xx.xx.xx",
                "07.xx.xx.xx",
                "09.xx.xx.xx",
            ],
            city: "Paris",
            street: "Avenue de l'exemple",
            socialnetworks: [
                {
                    provider: "Facebook",
                    url: "https://facebook.com/...",
                    profile: "Human firstname"
                },
                {
                    provider: "Instagram",
                    url: "https://instagram.com/...",
                    profile: "@Humanfirstname"
                },
                {
                    provider: "Twitter",
                    url: "https://twitter.com/...",
                    profile: "@Humanfirstname"
                },
                {
                    provider: "LinkedIn",
                    url: "https://linkedin.com/...",
                    profile: "Human firstname"
                }
            ]
        },
        extra: {
            welcomemessage: "Vous avez retrouvé Pyla ? Un grand merci à vous, nous vous prions de nous contacter au plus tôt s'il vous plait !"
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
    };

    return (
    <Container component="main" maxWidth="s">
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Avatar sx={{m: 1, bgcolor: "primary.main"}}><PetsIcon/></Avatar>
            <Typography component="h1" variant="h5">
                Mise à jour de votre profile
            </Typography>
        </Box>

        <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        error={true}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Votre nom"
                        name="name"
                        color={"success"}
                        value={dog.owner.name}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        error={true}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Votre prénom"
                        name="name"
                        color={"success"}
                        value={dog.owner.firstname}
                    />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item>
                    <TextField
                        error={true}
                        required
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        color={"success"}
                        value={dog.owner.email}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        error={true}
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        name="city"
                        label="Dans quelle ville habitez-vous ?"
                        color={"success"}
                        value={dog.owner.city}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        error={true}
                        margin="normal"
                        fullWidth
                        id="street"
                        name="street"
                        label="Nom de la rue ? (Facultatif)"
                        color={"success"}
                        value={dog.owner.street}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <TextField
                        error={true}
                        margin="normal"
                        fullWidth
                        id="phones_0"
                        name="phones[0]"
                        label="Numéro de téléphone"
                        color={"success"}
                        value={dog.owner.phones[0]}
                    />
                    <TextField
                        error={true}
                        margin="normal"
                        fullWidth
                        id="phones_1"
                        name="phones[1]"
                        label="Numéro de téléphone"
                        color={"success"}
                        value={dog.owner.phones[1]}
                    />
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                color={"success"}
            >
                Confirmer mes informations
            </Button>
        </Box>
    </Container>
    )
}
