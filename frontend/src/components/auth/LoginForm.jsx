import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import { motion } from 'framer-motion';
import './AuthForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || 'Invalid credentials. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="auth-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-form-card">
        <motion.h1
          className="auth-form-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back
        </motion.h1>
        <p className="auth-form-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Enter your username"
            autoComplete="username"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          {errors.submit && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.submit}
            </motion.div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={loading}
            className="auth-submit-button"
          >
            {loading ? <LoadingSpinner size="small" /> : 'Sign In'}
          </Button>

          <p className="auth-form-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginForm;

