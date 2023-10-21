import Button from "@mui/material/Button";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    Snackbar
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Avatar from "@mui/material/Avatar";
import PetsIcon from '@mui/icons-material/Pets';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {useNavigate, useParams} from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
import dayjs from "dayjs";
import {request} from "../../utils/request";
import {useAuth} from "../../hooks/useAuth";

export const Edit = () => {
    const navigate = useNavigate();
    const { jwt, logout } = useAuth();
    const {slug} = useParams();
    const [sexe, setSexe] = useState({
        value: null,
        error: false,
    })
    const [name, setName] = useState({
        value: "",
        error: false
    })
    const [breed, setBreed] = useState({
        value: "",
        error: false
    })
    const [birthdate, setBirthdate] = useState(null)
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success"
    })

    useEffect(() => {
        request("GET", `/pets/${slug}`, null, jwt.token)
            .then(response => response.json())
            .then(result => {
                if (result.status === 401) {
                    logout()
                    return
                }

                let data = result.data

                setSexe({
                    value: data.sexe,
                    error: false
                })

                setName({
                    value: data.name,
                    error: false
                })

                setBreed({
                    value: data.breed,
                    error: false
                })

                setBirthdate(dayjs(data.birthdate, "DD/MM/YYYY"))
            })
            .catch(e => {
                console.error(e);
            })
    }, []);

    const changeSexe = (event, newSexe) => {
        setSexe({
            value: newSexe,
            error: newSexe === null
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let bodyParams = {
            name: name.value,
            breed: breed.value,
            birthdate: birthdate.format("DD/MM/YYYY"),
            sexe: sexe.value
        }
        request("PUT",`/pets/${slug}`, bodyParams, jwt.token)
        .then(r => {
            if (r.ok) {
                navigate("/dashboard/profile", {
                    replace: true, state: {
                        flash: {
                            open: true,
                            message: `Les informations de ${name.value} ont bien été mises à jour`,
                            severity: "success"
                        }
                    }
                })
            } else {
                setSnack({
                    open: true,
                    message: `Une erreur est survenue lors de la modification des informations de ${name.value}`,
                    severity: "error"
                })

                r.json().then((body) => {
                    body.error.map(item => {
                        if (item.field === "name") {
                            setName({
                                value: name.value,
                                error: item.error
                            })
                        }

                        if (item.field === "breed") {
                            setBreed({
                                value: breed.value,
                                error: item.error
                            })
                        }

                        if (item.field === "sexe") {
                            setSexe({
                                value: sexe.value,
                                error: item.error
                            })
                        }
                    });
                });
            }
        })
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
                <Button color={"success"}
                        variant={'contained'}
                        startIcon={<UndoIcon/>}
                        onClick={ () => navigate(-1) }
                >Revenir en arrière</Button>

                <Avatar sx={{m: 1, bgcolor: "primary.main"}}><PetsIcon/></Avatar>
                <Typography component="h1" variant="h5">
                    Modifier les informations de {name.value}
                </Typography>
            </Box>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center">
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>
                        <Grid row>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id={"name"}
                                    label={"Quel est son nom ?"}
                                    name={"name"}
                                    color={"success"}
                                    value={name.value}
                                    error={name.error}
                                    helperText={name.error}
                                    aria-errormessage={"Le nom de votre animal est obligatoire"}
                                    onChange={(event) => setName({
                                        value: event.target.value,
                                        error: event.target.value.length < 1
                                    })}
                                />
                            </Grid>

                            <Grid item>
                                <Typography>
                                    Male ou femelle ? *
                                </Typography>

                                <FormControl component="fieldset" error={sexe.error != null}>
                                    <RadioGroup aria-label="Sexe" name="sexe" value={sexe.value} onChange={changeSexe}>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Femelle" />
                                        <FormHelperText>{sexe.error}</FormHelperText>
                                    </RadioGroup>
                                </FormControl>


                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="breed"
                                    label="Quelle race ?"
                                    name="breed"
                                    color={"success"}
                                    value={breed.value}
                                    error={breed.error}
                                    helperText={breed.error}
                                    onChange={(event) => setBreed({
                                        value: event.target.value,
                                        error: event.target.value.length < 1,
                                    })}
                                />
                            </Grid>

                            <Grid item>
                                <Typography>Date de naissance (facultatif)</Typography>
                                <DatePicker
                                    onChange={(newValue) => setBirthdate(newValue)}
                                    disableFuture
                                    slotProps={{
                                        textField: {
                                            helperText: "La date de naissance doit être au format JJ/MM/AAAA",
                                        },
                                    }}
                                    value={birthdate}
                                    views={["day", "month", "year"]}
                                    name={"birthdate"}
                                    required
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
                            Enregistrer
                        </Button>

                        <Typography component={"small"}>Vous pourrez toujours éditer les informations
                            de {name.value === "" ? "votre animal" : name.value} ultérieurement</Typography>
                    </Box>
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                    open={snack.open}
                    severity={snack.severity}
                    key={'top_left'}
                    autoHideDuration={4500}
                    onClose={() => setSnack({...snack, open: false})}
                >
                    <Alert severity={snack.severity} sx={{width: '100%'}}>
                        {snack.message}
                    </Alert>
                </Snackbar>
            </LocalizationProvider>
        </Container>
    )
}
