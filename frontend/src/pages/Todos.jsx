import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from '../context/TodoContext';
import TodoList from '../components/todos/TodoList';
import TodoFilter from '../components/todos/TodoFilter';
import TodoForm from '../components/todos/TodoForm';
import Button from '../components/common/Button';
import { FiPlus, FiX } from 'react-icons/fi';
import './Todos.css';

const Todos = () => {
  const { todos, loading, fetchTodos, createTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [filters, setFilters] = useState({
    search: '',
    completed: null,
    priority: null,
    sort_by: '-created_at',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.completed !== null) params.completed = filters.completed;
    if (filters.priority) params.priority = filters.priority;
    if (filters.sort_by) params.sort_by = filters.sort_by;

    fetchTodos(params);
  }, [filters, fetchTodos]);

  const handleCreate = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingTodo) {
        await updateTodo(editingTodo.id, formData);
      } else {
        await createTodo(formData);
      }
      setIsModalOpen(false);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error saving todo:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(id);
    }
  };

  const handleToggle = async (id) => {
    await toggleComplete(id);
  };

  return (
    <div className="todos-page">
      <motion.div
        className="todos-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>My Todos</h1>
        <Button variant="primary" onClick={handleCreate}>
          <FiPlus /> Create Todo
        </Button>
      </motion.div>

      <TodoFilter filters={filters} onFilterChange={setFilters} />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="todo-form-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="todo-form-header">
              <h2>{editingTodo ? 'Edit Todo' : 'Create Todo'}</h2>
              <button
                className="todo-form-close"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTodo(null);
                }}
              >
                <FiX size={24} />
              </button>
            </div>
            <TodoForm
              todo={editingTodo}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingTodo(null);
              }}
              loading={formLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TodoList
        todos={todos}
        loading={loading}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Todos;

