import {createContext, useContext, useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage("user", userData);
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalStorage("user", userData);
    const login = async (data) => {
        setUser(data);
        setJwt(data);
        navigate("/dashboard/profile", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            jwt,
            login,
            logout
        }),
        [user, jwt]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
