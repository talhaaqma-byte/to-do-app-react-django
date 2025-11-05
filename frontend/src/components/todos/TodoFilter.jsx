import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './TodoFilter.css';

const TodoFilter = ({ onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ ...filters, search: value });
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="todo-filter">
      <div className="filter-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FiFilter />
        Filters
      </button>

      {showFilters && (
        <motion.div
          className="filter-options"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.completed || 'all'}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('completed', value === 'all' ? null : value === 'true');
              }}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="false">Active</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Priority</label>
            <select
              value={filters.priority || 'all'}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('priority', value === 'all' ? null : value);
              }}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sort_by || '-created_at'}
              onChange={(e) => handleFilterChange('sort_by', e.target.value)}
              className="filter-select"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="-due_date">Due Date (Latest)</option>
              <option value="due_date">Due Date (Earliest)</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TodoFilter;

