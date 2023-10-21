import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import {dog} from '../data/Dog';
import {ProfilePresenter} from "../Components/Profile/ProfilePresenter";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Face6Icon from '@mui/icons-material/Face6';
import "./Profile.css"
import {ListAll as ListAllPet} from "../Components/Pet/ListAll";
import {useAuth} from "../hooks/useAuth";
import {request} from "../utils/request";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const {jwt} = useAuth();

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        request("GET", "/user/me", null, jwt.token).then(r => r.json()).then(r => {
            // TODO: Handle codes different than 200
            setUser(r.data)
        })
    }, []);

    if (!user) {
        return (<div>Chargement...</div>)
    }

    return (
        <Container component="main" maxWidth="s">
            <Grid container flexDirection={"column"} alignItems={"center"} justifyContent={"center"} marginTop={2}>
                <Grid container flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Avatar sx={{bgcolor: "primary.main"}}><Face6Icon/></Avatar>
                    <Grid>
                        <Typography component="h2" variant="h4">
                            Bonjour {user.firstname} !
                        </Typography>
                        <Typography component="h1" variant="h5">
                            Vous êtes dans votre espace personnel
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={1} marginTop={2} marginBottom={2}>
                <ListAllPet jwt={jwt}/>

                <Grid container justifyContent={"center"} marginTop={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddBoxIcon/>}
                        onClick={() => navigate("/dashboard/create")}
                    >
                        Enregistrer un animal
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                open={snack.open}
                severity={snack.severity}
                key={'top_left'}
                autoHideDuration={4500}
                onClose={() => setSnack({
                    open: false,
                    message: "",
                    severity: "success"
                })}
            >
                <Alert severity={snack.severity} sx={{width: '100%'}}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Container>)
};
