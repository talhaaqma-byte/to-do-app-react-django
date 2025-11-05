import api from './api';

export const todoService = {
  getAll: async (params = {}) => {
    const response = await api.get('/todos/', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/todos/${id}/`);
    return response.data;
  },

  create: async (todoData) => {
    const response = await api.post('/todos/', todoData);
    return response.data;
  },

  update: async (id, todoData) => {
    const response = await api.put(`/todos/${id}/`, todoData);
    return response.data;
  },

  patch: async (id, todoData) => {
    const response = await api.patch(`/todos/${id}/`, todoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/todos/${id}/`);
    return response.data;
  },

  toggleComplete: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle_complete/`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/todos/stats/');
    return response.data;
  },
};

