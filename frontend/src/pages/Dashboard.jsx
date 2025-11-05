import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTodos } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell as PieCell, ResponsiveContainer, BarChart, Bar, Cell as BarCell, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FiPlus, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { todos, stats, fetchTodos, fetchStats, loading } = useTodos();
  const [recentTodos, setRecentTodos] = useState([]);

  useEffect(() => {
    fetchTodos({ sort_by: '-created_at' });
    fetchStats();
  }, [fetchTodos, fetchStats]);

  useEffect(() => {
    if (todos.length > 0) {
      setRecentTodos(todos.slice(0, 5));
    }
  }, [todos]);

  if (loading && !stats) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const completionRate = stats?.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const pieData = [
    { name: 'Completed', value: stats?.completed || 0, color: '#10b981' },
    { name: 'Pending', value: stats?.pending || 0, color: '#f59e0b' },
  ];

  const priorityData = [
    { name: 'High', value: stats?.high_priority || 0, color: '#ef4444' },
    { name: 'Medium', value: stats?.medium_priority || 0, color: '#f59e0b' },
    { name: 'Low', value: stats?.low_priority || 0, color: '#10b981' },
  ];

  return (
    <div className="dashboard">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Welcome back, {user?.username || 'User'}! 👋</h1>
          <p>Here's your productivity overview</p>
        </div>
        <Link to="/todos">
          <Button variant="primary" size="medium">
            <FiPlus /> Create Todo
          </Button>
        </Link>
      </motion.div>

      <div className="dashboard-stats">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
            <FiTrendingUp color="#667eea" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.total || 0}</h3>
            <p>Total Todos</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <FiCheckCircle color="#10b981" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.completed || 0}</h3>
            <p>Completed</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <FiClock color="#f59e0b" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.pending || 0}</h3>
            <p>Pending</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
            <FiTrendingUp color="#667eea" size={24} />
          </div>
          <div className="stat-content">
            <h3>{completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </motion.div>
      </div>

      <div className="dashboard-charts">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Completion Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
              >
                {pieData.map((entry, index) => (
                  <PieCell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Priority Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]}
                stroke="#fff"
                strokeWidth={2}
              >
                {priorityData.map((entry, index) => (
                  <BarCell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {recentTodos.length > 0 && (
        <motion.div
          className="recent-todos"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Recent Todos</h2>
          <div className="recent-todos-list">
            {recentTodos.map((todo) => (
              <motion.div
                key={todo.id}
                className="recent-todo-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="recent-todo-content">
                  <h4 className={todo.completed ? 'completed' : ''}>{todo.title}</h4>
                  <span className={`priority-badge ${todo.priority}`}>
                    {todo.priority}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/todos" className="view-all-link">
            View All Todos →
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

