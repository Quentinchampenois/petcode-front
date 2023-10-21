import Typography from "@mui/material/Typography";
import CakeTwoToneIcon from "@mui/icons-material/CakeTwoTone";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import * as React from "react";

export const PetPropertyPresenter = (props) => {
    return (
        <Grid item xs={4} container flexDirection={"column"} alignItems={"center"} paddingTop={2}>
            <Typography variant="h6" textAlign={"center"} className={"decorated-text"} gutterBottom>
                {props.icon}
            </Typography>
            <Typography variant="p" textAlign={"center"} className={""} gutterBottom>
                {props.text}
            </Typography>
        </Grid>
    )
}