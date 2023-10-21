import jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};