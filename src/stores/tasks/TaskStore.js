
import axios from "axios";
import RutaApi  from "../../assets/rutaApi"

export const getAllTasks = async (token, options = {}) => {
    try {
        const {
            page = 1,
            limit = 12,
            estado,
            fecha,
            fechaInicio,
            fechaFin,
            masRecientes,
            searchTituloAndDescription
        } = options;

        const params = new URLSearchParams({
            page,
            limit
        });
        
        if (estado) params.append("estado", estado);
        if (fecha) params.append("fecha", fecha);
        if (masRecientes !== undefined) params.append("masRecientes", masRecientes);
        if (searchTituloAndDescription) {
            params.append("searchTituloAndDescription", searchTituloAndDescription);
        }
        if (fechaInicio && fechaFin) {
            params.append("fechaInicioReq", fechaInicio);
            params.append("fechaFinReq", fechaFin);
        }

        const response = await axios.get(`${RutaApi}/tasks?${params.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};
