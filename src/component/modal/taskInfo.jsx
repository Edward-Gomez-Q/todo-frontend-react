import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import {createTask, updateTask, deleteTask} from "../../stores/tasks/TaskStore";


export const CrossBtn = ({ close }) => {
  return (
    <div className="absolute top-0 right-0 pt-5 pr-5">
      <button
        aria-label="none"
        type="button"
        onClick={close}
        className="rounded-md bg-white dark:bg-darkblack-500 focus:outline-none"
      >
        <span className="sr-only">Close</span>
        <svg
          className="stroke-darkblack-300"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6L18 18M6 18L18 6L6 18Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export const TaskInfoModal = ({ close, task, token, onTaskUpdated }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    estado: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originalStatus, setOriginalStatus] = useState(1);

  useEffect(() => {
    if (task) {
        const formattedDate = task.dueDate 
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "";
        setTaskData({
            title: task.title || "",
            description: task.description || "",
            dueDate: formattedDate,
            estado: task.estado || 1,
        });
        setOriginalStatus(task.estado || 1);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleStatusChange = (newStatus) => {
if (originalStatus === 3) {
      setError("No se puede modificar una tarea que ya está completada, solo se puede eliminar");
      return;
    }
    
    if (newStatus === 2 && originalStatus !== 1) {
      setError("Solo se puede cambiar a 'En Progreso' si la tarea está 'Pendiente'");
      return;
    }
    
    if (newStatus === 3 && originalStatus !== 2) {
      setError("Solo se puede cambiar a 'Completada' si la tarea está 'En Progreso'");
      return;
    }
    
    if (newStatus === 1 && (originalStatus === 2 || originalStatus === 3)) {
      setError("No se puede volver a 'Pendiente' desde 'En Progreso' o 'Completada'");
      return;
    }
    
    setError("");
    setTaskData({
      ...taskData,
      estado: newStatus,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (originalStatus === 3) {
      setError("No se puede modificar una tarea que ya está completada, solo se puede eliminar");
      return;
    }
    setLoading(true);

    try {
      await updateTask(token, task.id, taskData);
      setLoading(false);
      onTaskUpdated && onTaskUpdated();
      close();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Error al actualizar la tarea");
    }
  };

  const handleDelete = async () => {
    if (originalStatus !== 3) {
        setError("Solo se pueden eliminar tareas completadas");
        return;
    }
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        setLoading(true);
        try {
            await deleteTask(token, task.id, taskData.estado);
            setLoading(false);
            onTaskUpdated && onTaskUpdated();
            close();
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al eliminar la tarea");
        }
    }
  };

  const getStatusLabel = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "Pendiente";
      case 2:
        return "En progreso";
      case 3:
        return "Completada";
      default:
        return "Desconocido";
    }
  };
  const isReadOnly = originalStatus === 3;
  const isPendienteDisabled = originalStatus === 2 || originalStatus === 3;
  const isEnProgresoDisabled = originalStatus === 1 ? false : originalStatus !== 2;
  const isCompletadaDisabled = originalStatus !== 2;

return (
    <div className="step-content">
      <div className="relative max-w-[550px] transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <div className="absolute right-4 top-4 cursor-pointer" onClick={close}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5ZM7.5 6.06L9.4425 4.1175C9.6845 3.8755 10.0745 3.8755 10.3165 4.1175C10.5585 4.3595 10.5585 4.7495 10.3165 4.9915L8.374 6.934L10.3165 8.8765C10.5585 9.1185 10.5585 9.5085 10.3165 9.7505C10.0745 9.9925 9.6845 9.9925 9.4425 9.7505L7.5 7.808L5.5575 9.7505C5.3155 9.9925 4.9255 9.9925 4.6835 9.7505C4.4415 9.5085 4.4415 9.1185 4.6835 8.8765L6.626 6.934L4.6835 4.9915C4.4415 4.7495 4.4415 4.3595 4.6835 4.1175C4.9255 3.8755 5.3155 3.8755 5.5575 4.1175L7.5 6.06Z" fill="#8A8A8A"/>
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Información de la tarea
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            {isReadOnly 
              ? "Las tareas completadas no pueden ser modificadas, solo eliminadas" 
              : "Visualiza y modifica los detalles de tu tarea"}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                disabled={isReadOnly}
                className={`rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}
                placeholder="Título de la tarea"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                rows="4"
                disabled={isReadOnly}
                className={`rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}
                placeholder="Descripción de la tarea"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Fecha de vencimiento
              </label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                disabled={isReadOnly}
                className={`rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base ${isReadOnly ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Estado actual: {getStatusLabel(taskData.estado)}
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleStatusChange(1)}
                  disabled={isPendienteDisabled}
                  className={`px-4 py-2 rounded-lg ${
                    taskData.estado === 1
                      ? "bg-yellow-500 text-white"
                      : isPendienteDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#F5F5F5] dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-yellow-200"
                  }`}
                  title={isPendienteDisabled ? "No se puede volver a Pendiente" : ""}
                >
                  Pendiente
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(2)}
                  disabled={isEnProgresoDisabled}
                  className={`px-4 py-2 rounded-lg ${
                    taskData.estado === 2
                      ? "bg-blue-500 text-white"
                      : isEnProgresoDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#F5F5F5] dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-blue-200"
                  }`}
                  title={isEnProgresoDisabled ? "Solo se puede cambiar a En Progreso desde Pendiente" : ""}
                >
                  En progreso
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(3)}
                  disabled={isCompletadaDisabled}
                  className={`px-4 py-2 rounded-lg ${
                    taskData.estado === 3
                      ? "bg-green-500 text-white"
                      : isCompletadaDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#F5F5F5] dark:bg-darkblack-500 text-bgray-600 dark:text-white hover:bg-green-200"
                  }`}
                  title={isCompletadaDisabled ? "Solo se puede cambiar a Completada desde En Progreso" : ""}
                >
                  Completada
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || isReadOnly}
                className={`flex flex-1 py-4 text-white justify-center text-base font-medium rounded-lg ${
                  isReadOnly
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-success-300 hover:bg-success-400 transition-all"
                }`}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading || originalStatus !== 3}
                className={`flex py-4 px-6 text-white justify-center text-base font-medium rounded-lg ${
                  originalStatus === 3 
                    ? "bg-red-500 hover:bg-red-600 transition-all" 
                    : "bg-red-300 opacity-50 cursor-not-allowed"
                }`}
                title={originalStatus !== 3 ? "Solo se pueden eliminar tareas completadas" : ""}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateTaskModal = ({ close, token, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    estado: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        console.log("taskData", taskData);
        await createTask(token, taskData);
        setLoading(false);
        onTaskCreated && onTaskCreated();
        setTaskData({
            title: "",
            description: "",
            dueDate: "",
            estado: 1,
         });
        close();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Error al crear la tarea");
    }
  };

  return (
    <div className="step-content">
      <div className="relative max-w-[550px] transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <CrossBtn close={close} />
        <div>
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Crear nueva tarea
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            Ingresa los detalles para crear una nueva tarea
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                required
                maxLength={100}
                className="rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base"
                placeholder="Título de la tarea"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                maxLength={250}
                rows="4"
                className="rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base"
                placeholder="Descripción de la tarea"
              ></textarea>
              <span className="text-xs text-bgray-500 dark:text-darkblack-300 mt-1">
                Máximo 250 caracteres
              </span>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-bgray-600 dark:text-darkblack-300 mb-2">
                Fecha de vencimiento *
              </label>
              <input
                type="date"
                name="dueDate"
                required
                value={taskData.dueDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className="rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full py-4 text-white bg-success-300 hover:bg-success-400 transition-all justify-center text-base font-medium rounded-lg"
            >
              {loading ? "Creando..." : "Crear tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function TaskModals({ isActive, modalType, taskData, token, handleActive, onTaskUpdated, onTaskCreated }) {
  return (
    <div
      className={`modal fixed inset-0 z-50 overflow-y-auto flex items-center justify-center ${
        isActive ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75 dark:bg-bgray-900 dark:opacity-50"></div>
      <div className="modal-content w-full max-w-lg mx-auto px-4">
        {modalType === "info" ? (
          <TaskInfoModal 
            close={() => handleActive(false)} 
            task={taskData} 
            token={token}
            onTaskUpdated={onTaskUpdated}
          />
        ) : (
          <CreateTaskModal 
            close={() => handleActive(false)} 
            token={token}
            onTaskCreated={onTaskCreated}
          />
        )}
      </div>
    </div>
  );
}

CrossBtn.propTypes = {
  close: PropTypes.func.isRequired,
};

TaskInfoModal.propTypes = {
  close: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onTaskUpdated: PropTypes.func,
};

CreateTaskModal.propTypes = {
  close: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  onTaskCreated: PropTypes.func,
};

TaskModals.propTypes = {
  isActive: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  taskData: PropTypes.object,
  token: PropTypes.string.isRequired,
  handleActive: PropTypes.func.isRequired,
  onTaskUpdated: PropTypes.func,
  onTaskCreated: PropTypes.func,
};

export default TaskModals;