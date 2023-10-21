import Grid from "@mui/material/Grid";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Paper,
    Tooltip
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import * as React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import './PetPresenter.css'
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {PetPropertyPresenter} from "./PetPropertyPresenter";
import {request} from "../utils/request";
import {useAuth} from "../hooks/useAuth";

export const PetPresenter = (props) => {
    const navigate = useNavigate();
    const [deletePrompt, setDeletePrompt] = useState("");
    const { jwt } = useAuth();
    const [qrcode, setQrcode] = useState("");

    const sexeIcon = () => {
        if (props.sexe === "femelle") {
            return (<FemaleIcon className={'pink'} sx={{mr: 2}}/>);
        } else {
            return (<MaleIcon className={'blue'} sx={{mr: 2}}/>);
        }
    }

    const [ondelete, setOndelete] = useState(false);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success"
    })

    useEffect(() => {
        request("GET", `/pets/${props.slug}/qrcode`, null, jwt.token)
            .then(response => response.json())
            .then(result => {
                setQrcode(result.data.qrcode.base64)
            })
    }, [jwt]);

    const deletePet = () => {
        setOndelete(true);
    };

    const endDeletePet = () => {
        setOndelete(false);
    };

    const confirmDeletePet = () => {
        if (deletePrompt === "SUPPRIMER") {
            request("DELETE", `/pets/${props.slug}`, null, jwt.token)
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        console.error(result.error);
                        setSnack({
                            open: true,
                            message: result.error,
                            severity: "error"
                        })
                    } else {
                        setOndelete(false)
                        navigate("/dashboard/profile", {
                            state: {
                                flash: {
                                    message: "Collier supprimé avec succès",
                                    severity: "success"
                                }
                            }
                        })
                    }
                })
                .catch(e => {
                    console.error(e);
                    setSnack({
                        open: true,
                        message: "Une erreur est survenue",
                        severity: "error"
                    })
                })
        } else {
            setSnack({
                open: true,
                message: "Veuillez rentrer SUPPRIMER avant de confirmer",
                severity: "error"
            })
        }
    }

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            sm={12}
            className={"Pet-Presenter"}
        >
            <Grid container spacing={2}>
                <Grid item={true} xs={12} sm={12}>
                    <Typography variant="h6" textAlign={"center"} className={""} gutterBottom>
                        {props.name}
                    </Typography>
                </Grid>

                <Grid item={true} container>
                    <Grid item={true} container flexDirection={"row"} justifyContent={"center"} xs={12}>
                        <PetPropertyPresenter
                            icon={<CakeTwoToneIcon/>}
                            text={props.birthdate}
                        />
                        <PetPropertyPresenter
                            icon={<PetsTwoToneIcon/>}
                            text={props.breed}
                        />
                        <PetPropertyPresenter
                            icon={props.sexe === "female" ? <FemaleIcon className={"pink"} /> : <MaleIcon className={"blue"} />}
                            text={props.sexe === "female" ? "Femelle" : "Male"}
                        />
                    </Grid>
                </Grid>

                <Grid item={true} container xs={12} justifyContent={"center"} paddingLeft={-16}>
                    <img src={`data:image/jpeg;base64,${qrcode}`}
                    width={200} />
                </Grid>

                <Grid item={true} xs={12}>
                    <Grid item={true} container>
                        <Grid item={true} xs={6} container >
                            <Tooltip title="Voir la fiche">
                                <Button
                                    color={'info'}
                                    variant={'outlined'}
                                    xs={12}
                                    onClick={() => navigate(`/pet/${props.slug}`)}
                                >
                                    <VisibilityIcon />
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item={true} xs={3} container flexDirection={"row"} alignItems={"flex-end"}
                              justifyContent={"flex-end"} >
                            <Tooltip title="Modifier la fiche">
                                <Button
                                    color={'warning'}
                                    onClick={() => navigate(`/dashboard/edit/${props.slug}`)}
                                    variant={"outlined"}
                                >
                                    <AutoFixHighIcon/>
                                </Button>
                            </Tooltip>
                        </Grid>

                        <Grid item={true} xs={3} container flexDirection={"row"} alignItems={"flex-end"}
                              justifyContent={"flex-end"}>
                            <Tooltip title="Supprimer">
                                <Button
                                    color={'error'}
                                    onClick={deletePet}
                                    xs={12}
                                    variant={"outlined"}
                                >
                                    <RemoveCircleOutlineIcon/>
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog open={ondelete} onClose={endDeletePet}>
                    <DialogTitle>Supprimer le collier de {props.name} ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            En supprimant le collier de {props.name}, vous supprimez également toutes les données qui y
                            sont
                            liées.
                            Afin d'éviter toute erreur de manipulation, veuillez écrire "SUPPRIMER" dans le champ
                            ci-dessous.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Veuillez écrire SUPPRIMER"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setDeletePrompt(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={endDeletePet}>Annuler</Button>
                        <Button onClick={confirmDeletePet} disabled={deletePrompt !== "SUPPRIMER"}
                                color={"error"}>Supprimer</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Paper>
    )
}