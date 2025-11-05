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

  return (
    <motion.div
      className={`todo-card ${todo.completed ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
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
          <h3 className={`todo-title ${todo.completed ? 'strikethrough' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>

      <div className="todo-card-footer">
        <div className="todo-meta">
          {todo.due_date && (
            <span className="todo-date">
              📅 {format(new Date(todo.due_date), 'MMM dd, yyyy')}
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

