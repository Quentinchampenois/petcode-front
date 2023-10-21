import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./NotFound.css"
import {Switch} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {request} from "../../utils/request";

export const Report = (props) => {
    const [hasDog, setHasDog] = useState(true);
    const [name, setName] = useState(props.name);
    const [date, setDate] = useState(new Date());
    const [city, setCity] = useState("");
    const [where, setWhere] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [additional, setAdditional] = useState("");
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '3px solid #FF0000FF',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        validatePhoneNumber()

        let bodyParams = {
            slug: props.slug,
            name: name,
            hasDog: hasDog,
            city: city,
            where: where,
            phoneNumber: phoneNumber,
            additional: additional,
        }

        request("POST", `/pet/${props.slug}/report`, bodyParams, props.token)
    };

    const validatePhoneNumber = () => {
        if (/^0[0-9]\d{8}$/.test(phoneNumber)) {
            setPhoneNumberError("")
        } else {
            setPhoneNumberError("Veuillez renseigner un format de numéro de téléphone valide. ex: 07xxxxxx")
        }
    };

    const handlePhoneNumber = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === "") {
            setPhoneNumber(value)
        }
    }

    const toggleHasDogForm = () => {
        if (!hasDog) {
            return (<>
                <Typography>L'animal n'est plus avec vous, pouvez-vous préciser où se trouve-t-il actuellement
                    ?</Typography>

                <input type="hidden" name={"has_pet"} value={'off'}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="where"
                    label={`Où se trouve ${name} ?`}
                    name="where"
                    color={"error"}
                    autoFocus
                    multiline
                    rows={2}
                    maxRows={4}
                    onChange={(e) => setWhere(e.target.value)}
                />
            </>)
        } else {
            return (<><input type={"hidden"} value={""} name={"where"}/></>)
        }
    }
    const handleSwitch = (event) => {
        setHasDog(event.target.checked);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Box sx={{ ...style, width: "60%" }}>
                <Typography id="modal-title" variant="h6" component="h2" align={"center"}>
                    Vous avez retrouvé {props.name} ?
                </Typography>
                <Typography id="modal-description" sx={{mt: 2}}>
                    Merci de remplir les champs suivants, un message sera directement envoyé aux
                    propriétaires :
                </Typography>

                <Grid container>
                    <Box component="form" onSubmit={handleSubmit} width={"100%"} noValidate
                         sx={{mt: 1}}>
                        <Grid row>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="city"
                                    label="Dans quelle ville l'avez-vous trouvé ?"
                                    name="city"
                                    color={"warning"}
                                    onChange={(e) => setCity(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>

                        <Grid row>
                            <Grid item>
                                <Typography>Quand avez vous trouvé {name} ?</Typography>
                                <DatePicker onChange={(current) => setDate(current)}
                                            selected={date} showTimeSelect name={"date_found"}/>
                            </Grid>
                        </Grid>

                        <Grid row>
                            <Grid item>
                                <Typography>L'animal est-il toujours avec vous ?</Typography>
                                <Switch defaultChecked color="warning" onChange={handleSwitch}
                                        name={"has_pet"}/>
                            </Grid>
                            <Grid item>
                                {toggleHasDogForm()}
                            </Grid>
                        </Grid>

                        <Grid row>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone_number"
                                    label="Votre numéro de téléphone"
                                    name="phone_number"
                                    color={"warning"}
                                    autoFocus
                                    placeholder="07xxxxxxxx"
                                    minLength={10}
                                    maxLength={10}
                                    value={phoneNumber}
                                    error={phoneNumberError !== ""}
                                    onChange={handlePhoneNumber}/>
                            </Grid>
                        </Grid>

                        <Grid row>
                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="additional"
                                    label="Des informations supplémentaires ?"
                                    name="additional"
                                    color={"warning"}
                                    autoFocus
                                    multiline
                                    rows={2}
                                    maxRows={4}
                                    onChange={(e) => setAdditional(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            color={"error"}
                            onClick={handleSubmit}
                        >
                            Alerter le propriétaire
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}