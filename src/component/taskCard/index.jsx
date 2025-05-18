import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function TaskCard({ task, onClick }) {
  const { title, description, dueDate, state, createdAt } = task;
  
  const getStateColorClass = () => {
    switch (state) {
      case "1":
        return "bg-yellow-100 text-yellow-800";
      case "2":
        return "bg-blue-100 text-blue-800";
      case "3":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStateText = () => {
    switch (state) {
      case "1": return "Pendiente";
      case "2": return "En progreso";
      case "3": return "Completada";
      default: return "Sin estado";
    }
  };
  const timeAgo = createdAt 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es }) 
    : "";

  return (
    <div 
      className="bg-white dark:bg-darkblack-600 rounded-lg p-6 relative shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl text-bgray-900 dark:text-white font-bold line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColorClass()}`}>
            {getStateText()}
          </span>
          <button className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-darkblack-500">
            <svg
              width="20"
              height="20"
              className="stroke-bgray-50"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14.3066C10.8954 14.3066 10 13.4144 10 12.3137C10 11.2131 10.8954 10.3208 12 10.3208C13.1046 10.3208 14 11.2131 14 12.3137C14 13.4144 13.1046 14.3066 12 14.3066Z"
                strokeWidth="1.5"
              />
              <path
                d="M20 14.3066C18.8954 14.3066 18 13.4144 18 12.3137C18 11.2131 18.8954 10.3208 20 10.3208C21.1046 10.3208 22 11.2131 22 12.3137C22 13.4144 21.1046 14.3066 20 14.3066Z"
                strokeWidth="1.5"
              />
              <path
                d="M4 14.3066C2.89543 14.3066 2 13.4144 2 12.3137C2 11.2131 2.89543 10.3208 4 10.3208C5.10457 10.3208 6 11.2131 6 12.3137C6 13.4144 5.10457 14.3066 4 14.3066Z"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-base text-bgray-600 dark:text-bgray-50 line-clamp-3">
          {description}
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-bgray-500 dark:text-bgray-300">
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {timeAgo}
        </div>
        
        <div className="flex items-center text-sm text-bgray-500 dark:text-bgray-300">
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Fecha límite: {new Date(dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TaskCard;