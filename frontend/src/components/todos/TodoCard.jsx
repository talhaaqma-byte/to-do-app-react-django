import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import './TodoCard.css';

const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  const formatDateTime = (dateStr, datetimeStr) => {
    if (datetimeStr) {
      // Parse the datetime string - backend returns it in ISO format
      let date;
      try {
        // Parse as ISO string - JavaScript Date will handle timezone conversion
        date = new Date(datetimeStr);
        
        // If date is invalid, try a different approach
        if (isNaN(date.getTime())) {
          // Fallback: try parsing without timezone
          const cleanStr = datetimeStr.replace(/[+-]\d{2}:\d{2}$/, '');
          date = new Date(cleanStr);
        }
        
        // Format in local timezone (this will show the time as user entered it)
        return format(date, 'MMM dd, yyyy') + ' at ' + format(date, 'h:mm a');
      } catch (e) {
        // If parsing fails, try with dateStr
        if (dateStr) {
          date = new Date(dateStr);
          return format(date, 'MMM dd, yyyy');
        }
        return null;
      }
    } else if (dateStr) {
      return format(new Date(dateStr), 'MMM dd, yyyy');
    }
    return null;
  };

  const displayDate = formatDateTime(todo.due_date, todo.due_datetime);

  return (
    <motion.div
      className={`todo-card ${todo.completed ? 'completed' : ''} ${todo.is_overdue ? 'overdue' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      {todo.is_overdue && !todo.completed && (
        <div className="overdue-badge">⚠️ Overdue Task</div>
      )}
      <div className="todo-card-header">
        <button
          className="todo-checkbox"
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <FiCheckCircle size={24} color="#10b981" />
          ) : (
            <FiCircle size={24} color="#9ca3af" />
          )}
        </button>
        <div className="todo-card-content">
          <h3 className={`todo-title ${todo.completed ? 'strikethrough' : ''} ${todo.is_overdue ? 'overdue-text' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>

      <div className="todo-card-footer">
        <div className="todo-meta">
          {displayDate && (
            <span className={`todo-date ${todo.is_overdue ? 'overdue-date' : ''}`}>
              📅 {displayDate}
            </span>
          )}
          <span
            className="todo-priority"
            style={{
              backgroundColor: `${priorityColors[todo.priority]}20`,
              color: priorityColors[todo.priority],
            }}
          >
            {priorityLabels[todo.priority]}
          </span>
        </div>
        <div className="todo-actions">
          <motion.button
            className="todo-action-button edit"
            onClick={() => onEdit(todo)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Edit todo"
          >
            <FiEdit2 size={18} />
          </motion.button>
          <motion.button
            className="todo-action-button delete"
            onClick={() => onDelete(todo.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Delete todo"
          >
            <FiTrash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoCard;

