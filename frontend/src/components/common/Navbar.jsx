import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            📝 TodoApp
          </motion.span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/dashboard"
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/todos"
            className={`navbar-link ${isActive('/todos') ? 'active' : ''}`}
          >
            Todos
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-menu-wrapper">
            <motion.button
              className="user-menu-button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser size={20} />
              <span className="user-name">{user?.username || 'User'}</span>
            </motion.button>

            {userMenuOpen && (
              <motion.div
                className="user-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="user-menu-item">
                  <FiUser size={16} />
                  <span>{user?.email || user?.username}</span>
                </div>
                <button className="user-menu-item logout" onClick={handleLogout}>
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Link
            to="/dashboard"
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/todos"
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Todos
          </Link>
          <button className="mobile-link logout" onClick={handleLogout}>
            <FiLogOut size={16} />
            Logout
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

