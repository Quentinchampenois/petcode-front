import dogLogo from "../happy.png";
import {useNavigate, useParams} from "react-router-dom";
import "./Pet.css"
import Button from "@mui/material/Button";
import {Modal, Switch, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import * as React from "react";
import Grid from "@mui/material/Grid";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { dog as fixture} from "../data/Dog";
import {Report} from "../Components/Pet/Report";
import {request} from "../utils/request";
import {useLocalStorage} from "../hooks/useLocalStorage";

export const Pet = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [sexe, setSexe] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [reportToken, setReportToken] = useLocalStorage("reportToken", null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {slug} = useParams();
    const history = useNavigate();


    const calculateAge = (birthdateStr) => {
        // Parse the birthdate string to create a Date object
        const [day, month, year] = birthdateStr.split('/').map(Number);
        const birthdate = new Date(year, month - 1, day);

        // Get the current date
        const currentDate = new Date();

        // Calculate the age
        let age = currentDate.getFullYear() - birthdate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthdate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        request("GET", `/pet/${slug}`, null, null)
            .then(r => r.json())
            .then((res) => {
                if (res.status === 200) {
                    setName(res.data.pet.name);
                    setBreed(res.data.pet.breed);
                    setSexe(res.data.pet.sexe);
                    setBirthdate(res.data.pet.birthdate);
                    setReportToken(res.data.token);
                    console.log(calculateAge(res.data.pet.birthdate))
                } else {
                    throw new Error("Erreur lors de la récupération des données")
                }
            })
            .catch((error) => {
                navigate("/404")
            });
    }, [slug, history]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={dogLogo} alt="Pet logo"/>
                <p className={'Dog-informations'}>{name} - {birthdate}</p>
            </header>

            <main>
                <section className={"Welcome-message"}>
                    <Button className={"Contact-button"} onClick={handleOpen}>Alerter le propriétaire</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Report name={name} slug={slug} token={reportToken} />
                    </Modal>
                </section>
                <section>
                    <p className={"Section-title"}>Informations sur le chien</p>
                    <p>Nom : {name}</p>
                    <p>Sexe : {sexe}</p>
                    <p>Date de naissance : {birthdate} ({calculateAge(birthdate)} an)</p>
                    <p>Race: {breed}</p>
                </section>
                <section>
                    <p className={"Section-title"}>Informations des propriétaires</p>
                    <p>Prénom : {fixture.owner.firstname}</p>
                    {fixture.owner.phones.map((phone, index) => <p key={index}>Téléphone : {phone}</p>)}
                    <p>Ville: {fixture.owner.city}</p>
                    <p>Rue: {fixture.owner.street}</p>
                    <section>
                        <p className={"Section-title"}>Réseaux sociaux</p>

                        <Grid container flexDirection={"row"} justifyContent={"space-around"}>
                            <Grid item>
                                <Tooltip title="Instagram">
                                    <Grid container flexDirection={"column"} alignItems={"center"}>
                                        <InstagramIcon/>
                                        <Typography component={"p"} sx={{ml: 1}}>
                                            {fixture.owner.socialnetworks.instagram.profile}
                                        </Typography>
                                    </Grid>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Facebook">
                                    <Grid container flexDirection={"column"} alignItems={"center"}>
                                        <FacebookIcon/>
                                        <Typography component={"p"} sx={{ml: 1}}>
                                            {fixture.owner.socialnetworks.facebook.profile}
                                        </Typography>
                                    </Grid>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="LinkedIn">
                                    <Grid container flexDirection={"column"} alignItems={"center"}>
                                        <LinkedInIcon/>
                                        <Typography component={"p"} sx={{ml: 1}}>
                                            {fixture.owner.socialnetworks.linkedin.profile}
                                        </Typography>
                                    </Grid>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </section>
                </section>
            </main>
        </div>
    )
}
