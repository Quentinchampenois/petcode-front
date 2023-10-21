import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./NotFound.css"
import {Fab, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Grid item container xs={12} textAlign={"center"}>
            <Typography component={"p"} gutterBottom>
                Vous n'avez pas encore enregistré d'animal
            </Typography>
        </Grid>
    );
}