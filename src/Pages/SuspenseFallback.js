import LinearProgress from "@mui/material/LinearProgress";
import dogLogo from "../happy.png";
import "./SuspenseFallback.css"

export const SuspenseFallback = () => (
    <>
        <LinearProgress></LinearProgress>

        <div className="Main-container">
            <img src={dogLogo} alt="DogLogo"/>
            <div>
                <p>Chargement des informations de PetCode...</p>
            </div>
        </div>
    </>
)