import {CircularProgress, InputAdornment, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import EditNoteIcon from "@mui/icons-material/EditNote";
import * as React from "react";
import {dog} from '../../data/Dog';
import "./ProfilePresenter.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextField from "@mui/material/TextField";
import {AccountCircle} from "@mui/icons-material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {useState} from "react";

export const ProfilePresenter = () => {
    const [editDisabled, setEditDisabled] = useState(true);
    const [firstname, setFirstname] = useState(dog.owner.firstname);
    const [name, setName] = useState(dog.owner.name);
    const [email, setEmail] = useState(dog.owner.email);
    const [city, setCity] = useState(dog.owner.city);
    const [street, setStreet] = useState(dog.owner.street);
    const [phone0, setPhone0] = useState(dog.owner.phones[0]);
    const [phone1, setPhone1] = useState(dog.owner.phones[1]);
    const [phone2, setPhone2] = useState(dog.owner.phones[2]);
    const [phone3, setPhone3] = useState(dog.owner.phones[3]);
    const [instagram, setInstagram] = useState(dog.owner.socialnetworks.instagram.profile);
    const [facebook, setFacebook] = useState(dog.owner.socialnetworks.facebook.profile);
    const [linkedin, setLinkedin] = useState(dog.owner.socialnetworks.linkedin.profile);

    const jsxLoadingData = (
        <>
            <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Typography component="b">
                    Chargement de vos informations
                </Typography>

                <CircularProgress color="secondary"/>
            </Grid>
        </>
    )

    const switchEdit = () => {
        setEditDisabled(!editDisabled)
    }

    const jsxEditBtn = (
        <>
            <Button
                startIcon={editDisabled ? <AutoFixHighIcon/> : <CancelIcon/>}
                color={'warning'}
                onClick={switchEdit}
                variant={editDisabled ? 'contained' : 'outlined'}
            >
                {editDisabled ? 'Modifier mes informations' : 'Annuler les modifications'}
            </Button>
        </>
    )

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            sm={2}>
            <Grid container flexDirection={'column'}>
                <Grid item={true}>
                    <Typography component={'h3'}>Vos informations</Typography>
                </Grid>

                <Grid container flexDirection={'row'} spacing={4} sx={{mt: 2, mb: 2}}>
                    <Grid item>
                        <TextField
                            id="firstname"
                            name={'firstname'}
                            disabled={editDisabled}
                            label="Prénom"
                            value={firstname}
                            required
                            onChange={(evt) => setFirstname(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            id="name"
                            name={'name'}
                            disabled={editDisabled}
                            label="Nom de famille"
                            value={name}
                            required
                            onChange={(evt) => setName(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4} flexDirection={'row'}>
                    <Grid item={true}>
                        <TextField
                            id="city"
                            name={'city'}
                            disabled={editDisabled}
                            label="Ville de résidence"
                            value={city}
                            onChange={(evt) => setCity(evt.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            id="street"
                            name={'street'}
                            disabled={editDisabled}
                            label="Rue de résidence (facultatif)"
                            value={street}
                            onChange={(evt) => setStreet(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationCityIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{mt: 2}}>
                    <TextField
                        id="email"
                        name={'email'}
                        disabled={editDisabled}
                        label="E-mail"
                        value={email}
                        required
                        onChange={(evt) => setEmail(evt.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmailIcon/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </Grid>
                <Grid container sx={{mt: 2}} flexDirection={'column'} spacing={2}>
                    <Grid item={true} sx={{mb: 2}}>
                        <Typography component={'h3'}>Numéros de téléphone</Typography>
                    </Grid>

                    <Grid container spacing={1} justifyContent={'space-around'}>
                        <Grid item={true}>
                            <TextField
                                id="phone_0"
                                name={'phones[0]'}
                                placeholder={"06........"}
                                disabled={editDisabled}
                                label="1. Téléphone"
                                value={phone0}
                                required
                                onChange={(evt) => setPhone0(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="phone_2"
                                name={'phones[2]'}
                                placeholder={"06........"}
                                disabled={editDisabled}
                                label="3. Téléphone (facultatif)"
                                value={phone2}
                                onChange={(evt) => setPhone2(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="phone_1"
                                name={'phones[1]'}
                                placeholder={"06........"}
                                disabled={editDisabled}
                                label="2. Téléphone (facultatif)"
                                value={phone1}
                                onChange={(evt) => setPhone1(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>

                        <Grid item={true}>
                            <TextField
                                id="phone_3"
                                name={'phones[3]'}
                                placeholder={"06........"}
                                disabled={editDisabled}
                                label="4. Téléphone (facultatif)"
                                value={phone3}
                                onChange={(evt) => setPhone3(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container sx={{mt: 2}} flexDirection={'column'} spacing={2}>
                    <Grid item={true} sx={{mb: 2}}>
                        <Typography component={'h3'}>Réseaux sociaux</Typography>
                    </Grid>

                    <Grid container spacing={4} sx={{ml: 2}}>
                        <Grid item={true}>
                            <TextField
                                id="instagram"
                                name={'instagram'}
                                disabled={editDisabled}
                                label="Instagram (facultatif)"
                                placeholder={'@jeannedupont'}
                                value={instagram}
                                onChange={(evt) => setInstagram(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InstagramIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="facebook"
                                name={'facebook'}
                                disabled={editDisabled}
                                label="Facebook (facultatif)"
                                placeholder={'Jeanne Dupont'}
                                value={facebook}
                                onChange={(evt) => setFacebook(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FacebookIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="linkedin"
                                name={'linkedin'}
                                disabled={editDisabled}
                                label="LinkedIn (facultatif)"
                                placeholder={'Jeanne Dupont'}
                                value={linkedin}
                                onChange={(evt) => setLinkedin(evt.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LinkedInIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={0} sx={{mt: 4}}>
                    <Grid item={true} xs={6}>
                        {jsxEditBtn}
                    </Grid>
                    <Grid item={true} xs={6}>
                        {editDisabled ? <></> :
                            <Button
                                startIcon={<SaveIcon/>}
                                color={'success'}
                                onClick={switchEdit}
                                variant={'contained'}
                            >
                                Sauvegarder
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}