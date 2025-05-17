import axios from "axios";
import RutaApi  from "../../assets/rutaApi"
//Consumir el login
const login = async (email, password) => {
    try {
        const response = await axios.post(`${RutaApi}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
// Register
const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${RutaApi}/auth/register`, {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export { login, register };