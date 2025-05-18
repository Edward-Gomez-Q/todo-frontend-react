import axios from "axios";
import RutaApi  from "../../assets/rutaApi"

//Obtener Usuario por accesstoken
export const getUserByAccessToken = async (accessToken) => {
    try {
        const response = await axios.get(`${RutaApi}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
};