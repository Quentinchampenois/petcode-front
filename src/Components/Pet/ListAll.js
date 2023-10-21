import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as React from "react";
import {PetPresenter} from "../PetPresenter";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Fab, Paper} from "@mui/material";
import "./ListAll.css"
import {NotFound} from "./NotFound";
import Slider from "react-slick";
import {useAuth} from "../../hooks/useAuth";
import {request} from "../../utils/request";

export const ListAll = () => {
    const {jwt, logout} = useAuth();
    const [userPets, setUserPets] = useState([]);
    const [petsFetchError, setPetsFetchError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        request("GET", '/pets', null, jwt.token)
            .then(response => response.json())
            .then(result => {
                if (result.error !== undefined) {
                    if (result.error[0].field === "jwt") {
                        throw new Error("JWT failure")
                    }
                } else {
                    setUserPets(result.data)
                }
            })
            .catch(e => {
                if (e.message === "JWT failure") {
                    logout()
                    return
                }
                setPetsFetchError(true)
            })

    }, [jwt]);

    const displayMyDog = () => {
        if (userPets.length > 0) {
            return userPets.map((pet) => {
                return <Grid item={pet.id} key={pet.id}> <PetPresenter name={pet.name}
                                                                       slug={pet.slug}
                                                                       breed={pet.breed}
                                                                       sexe={pet.sexe}
                                                                       birthdate={new Date()}
                                                                       createdAt={new Date()}
                                                                       activeSince={new Date()}
                />
                </Grid>
            })
        } else if (petsFetchError) {
            return <Grid item={false}><Typography component={"h3"}>Une erreur est survenue</Typography></Grid>
        }
    }

    if (userPets.length < 1) {
        return (
            <Grid item={true} container spacing={1} flexDirection={"row"} justifyContent={"center"}
                  alignItems={"center"}>
                <Paper elevation={3} className={"ListAll-Item-NotFound"}>
                    <Grid container justifyContent={"center"}>
                        <NotFound></NotFound>
                    </Grid>
                </Paper>
            </Grid>
        )
    }

    if (userPets.length > 0) {
        return userPets.map((pet) => {
            return <Grid item={true} key={pet.id} xs={12} sm={4} flexWrap={"wrap"}>
                <PetPresenter name={pet.name}
                              slug={pet.slug}
                              breed={pet.breed}
                              sexe={pet.sexe}
                              birthdate={pet.birthdate}
                              createdAt={new Date()}
                              activeSince={new Date()}
                />
            </Grid>
        })
    }

    return (
        <Paper elevation={3} className={"ListAll-Item-NotFound"}>
            <Grid container spacing={1} flexDirection={"row"} alignItems={"center"} className={"ListAll-Container"}>
                <Grid item item={true}>
                    <Typography component={"h3"}>Vous avez enregistré {userPets.length} animaux</Typography>
                </Grid>
                <Grid container spacing={1} justifyContent={"flex-end"}>
                    <Fab variant="extended"
                         color={"secondary"}
                         onClick={() => navigate("/dashboard/create")}
                    >
                        <AddBoxIcon sx={{mr: 1}}/>
                        Enregistrer un animal
                    </Fab>
                </Grid>


                <Grid container spacing={1}>
                    {displayMyDog()}
                </Grid>
            </Grid>
        </Paper>
    )
};