import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";
import {isTokenValid} from "../utils/auth";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Profil", path: "profile" }
                ]}
            />
            {outlet}
        </div>
    );
};
