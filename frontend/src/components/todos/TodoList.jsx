import { AnimatePresence } from 'framer-motion';
import TodoCard from './TodoCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { FiInbox } from 'react-icons/fi';
import './TodoList.css';

const TodoList = ({ todos, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="todo-list-loading">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <FiInbox size={64} color="#9ca3af" />
        <h3>No todos yet</h3>
        <p>Create your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;

