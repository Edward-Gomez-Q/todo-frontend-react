import axios from "axios";
import RutaApi from "../../assets/rutaApi";

const apiRequest = async (method, endpoint, token, data = null, params = null) => {
  try {
    const config = {
      method,
      url: `${RutaApi}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (data) {
      config.data = data;
    }

    if (params) {
      config.url += `?${new URLSearchParams(params).toString()}`;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error en petición ${method} a ${endpoint}:`, error);
    throw error;
  }
};
const validateTaskData = (taskData) => {
  if (!taskData.title) {
    throw new Error("El título es obligatorio");
  }
  
  if (taskData.title.length > 100) {
    throw new Error("El título no puede exceder los 100 caracteres");
  }
  
  if (taskData.description && taskData.description.length > 250) {
    throw new Error("La descripción no puede exceder los 250 caracteres");
  }
  
  if (taskData.dueDate && new Date(taskData.dueDate) < new Date()) {
    throw new Error("La fecha de vencimiento no puede ser anterior a la fecha actual");
  }
};

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
    
    const params = {
      page,
      limit
    };
    
    // Añadir parámetros opcionales si existen
    if (estado) params.estado = estado;
    if (fecha) params.fecha = fecha;
    if (masRecientes !== undefined) params.masRecientes = masRecientes;
    if (searchTituloAndDescription) params.searchTituloAndDescription = searchTituloAndDescription;
    if (fechaInicio && fechaFin) {
      params.fechaInicioReq = fechaInicio;
      params.fechaFinReq = fechaFin;
    }

    return await apiRequest("get", "/tasks", token, null, params);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (token, taskData) => {
  try {
    validateTaskData(taskData);
    return await apiRequest("post", "/tasks", token, taskData);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (token, taskId, taskData) => {
  try {
    validateTaskData(taskData);
    return await apiRequest("put", `/tasks/${taskId}`, token, taskData);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (token, taskId, taskState) => {
  try {
    return await apiRequest("delete", `/tasks/${taskId}`, token);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};