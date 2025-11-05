import { createContext, useContext, useState, useCallback } from 'react';
import { todoService } from '../services/todoService';

const TodoContext = createContext(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchTodos = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const results = await todoService.getAll(params);
      setTodos(Array.isArray(results) ? results : results.results || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await todoService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoService.create(todoData);
      setTodos((prev) => [newTodo, ...prev]);
      await fetchStats();
      return newTodo;
    } catch (err) {
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todoService.update(id, todoData);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      await fetchStats();
      return updatedTodo;
    } catch (err) {
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.delete(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      await fetchStats();
    } catch (err) {
      throw err;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodo = await todoService.toggleComplete(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      await fetchStats();
      return updatedTodo;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    todos,
    loading,
    error,
    stats,
    fetchTodos,
    fetchStats,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

