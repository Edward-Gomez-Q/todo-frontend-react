import { useState, useEffect } from "react";
import TaskCard from "../../component/taskCard";
import { getAllTasks } from "../../stores/tasks/TaskStore";
import TaskModals from "../../component/modal/taskInfo";
import { useNavigate } from "react-router-dom";


function TasksList() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || token === "undefined") {
      localStorage.removeItem("access_token");
      navigate("/");
    }
    setSearchInput(filters.searchTituloAndDescription);
  }, [navigate]);



  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AccessToken = localStorage.getItem("access_token");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 12
  });
  const [filters, setFilters] = useState({
    estado: "",
    fecha: "createdAt",
    masRecientes: "true",
    searchTituloAndDescription: "",
    fechaInicio: "",
    fechaFin: ""
  });
  const [ searchInput, setSearchInput ] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedTask, setSelectedTask] = useState(null);
  const openCreateTaskModal = () => {
    setModalType("create");
    setSelectedTask(null);
    setIsModalActive(true);
  };
  const fetchTasks = async (token) => {
      if (!token) {
        setError("No se encontró token de acceso. Por favor, inicia sesión de nuevo.");
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const data = await getAllTasks(token, {
          page: pagination.currentPage,
          limit: pagination.limit,
          ...filters
        });
        console.log("Tasks data:", data);
        setTasks(data.tareas);
        setPagination({
          currentPage: data.pagination.page,
          totalPages: data.pagination.totalPages,
          limit: data.pagination.limit
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Error al cargar las tareas. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
  };
  const handleTaskAction = () => {
    fetchTasks(AccessToken);
  };

  const handleTaskClick = (task) => {
    const taskForModal = {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      estado: parseInt(task.state) // Convertir a número
    };
    setSelectedTask(taskForModal);
    setModalType("info");
    setIsModalActive(true);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: newPage
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchTasks(token);
    } else {
      setError("No se encontró token de acceso. Por favor, inicia sesión de nuevo.");
    }
  }, [filters, pagination.currentPage]);

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Estado</span>
        <select
          value={filters.estado}
          onChange={(e) => handleFilterChange("estado", e.target.value)}
          className="rounded-lg border border-bgray-300 px-3 py-[14px] text-sm font-medium text-bgray-900 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50"
        >
          <option value="">Todos</option>
          <option value="1">Pendiente</option>
          <option value="2">En progreso</option>
          <option value="3">Completada</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Ordenar por fecha</span>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <select
            value={filters.fecha}
            onChange={(e) => handleFilterChange("fecha", e.target.value)}
            className=" w-full sm:w-auto rounded-lg border border-bgray-300 px-3 pr-10 py-[14px] text-sm font-medium text-bgray-900 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50"
          >
            <option value="createdAt">Fecha de creación</option>
            <option value="fechaLimite">Fecha límite</option>
          </select>
          <select
            value={filters.masRecientes}
            onChange={(e) => handleFilterChange("masRecientes", e.target.value)}
            className=" w-full sm:w-auto rounded-lg border border-bgray-300 px-3 pr-10 py-[14px] text-sm font-medium text-bgray-900 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50">
            <option value="true">Más recientes</option>
            <option value="false">Más antiguas</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-grow sm:items-end gap-2 sm:gap-4">
        <div className="flex flex-col flex-grow space-y-2">
          <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">Buscar</span>
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilterChange("searchTituloAndDescription", searchInput);
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }
            }}
            className="w-full rounded-lg border border-bgray-300 px-3 py-3 text-sm font-medium text-bgray-900 placeholder:text-bgray-400 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50"
          />
        </div>

        <div className="sm:pb-[6px]">
          <button
            onClick={() => {
              handleFilterChange("searchTituloAndDescription", searchInput);
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
            className="w-full sm:w-auto rounded-lg bg-success-300 hover:bg-success-400 text-white px-4 py-2 text-sm font-semibold transition-all"
          >
            Buscar
          </button>
        </div>
      </div>

    </div>
  );


  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    if (totalPages <= 1) return null;

    const maxVisiblePages = 3;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return (
      <div className="mt-8 flex justify-center overflow-x-auto">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-bgray-300 bg-white px-3 py-2 text-sm font-semibold text-bgray-700 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50 disabled:opacity-50"
          >
            {'<'}
          </button>
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="rounded-lg border border-bgray-300 bg-white px-3 py-2 text-sm font-semibold text-bgray-700 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-2 text-sm font-semibold text-bgray-500 dark:text-bgray-300">
                  ...
                </span>
              )}
            </>
          )}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                currentPage === page
                  ? 'bg-green-500 text-white'
                  : 'border border-bgray-300 bg-white text-bgray-700 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50'
              }`}
            >
              {page}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-sm font-semibold text-bgray-500 dark:text-bgray-300">
                  ...
                </span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="rounded-lg border border-bgray-300 bg-white px-3 py-2 text-sm font-semibold text-bgray-700 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50"
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-bgray-300 bg-white px-3 py-2 text-sm font-semibold text-bgray-700 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-bgray-50 disabled:opacity-50"
          >
            {'>'}
          </button>
        </nav>
      </div>
    );
  };



  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-6 sm:pt-[39px] pt-[25px]">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mis Tareas</h1>
          <p className="text-gray-600 dark:text-gray-300">Gestiona y organiza tus tareas diarias</p>
        </div>
        <button
          onClick={openCreateTaskModal}
          className="px-4 py-2 bg-success-300 hover:bg-success-400 text-white rounded-lg transition-all flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
          Crear
        </button>
      </div>
      <section className=" w-full 2xl:mb-0 mb-6">
        {renderFilters()}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 p-8 rounded-md text-center">
            <h3 className="text-xl font-medium mb-2">No hay tareas</h3>
            <p>No se encontraron tareas con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={{
                  id: task.id,
                  title: task.titulo,
                  description: task.descripcion,
                  dueDate: task.fechaLimite,
                  state: task.estado_id.toString(),
                  createdAt: task.createdAt
                }} 
                onClick={handleTaskClick}
              />
            ))}
          </div>
        )}
        
        {renderPagination()}
      </section>
      <TaskModals 
        isActive={isModalActive}
        modalType={modalType}
        taskData={selectedTask}
        token={AccessToken}
        handleActive={setIsModalActive}
        onTaskUpdated={handleTaskAction}
        onTaskCreated={handleTaskAction}
      />
    </main>
  );
}

export default TasksList;