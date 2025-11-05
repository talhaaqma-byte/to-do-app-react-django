import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import './AuthForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (errorData.username) {
          setErrors({ username: errorData.username[0] });
        } else if (errorData.email) {
          setErrors({ email: errorData.email[0] });
        } else if (errorData.password) {
          setErrors({ password: errorData.password[0] });
        } else {
          setErrors({ submit: 'Registration failed. Please try again.' });
        }
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h1 className="auth-form-title">
          Create Account
        </h1>
        <p className="auth-form-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Choose a username"
            autoComplete="username"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
            autoComplete="email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password"
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            error={errors.password2}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={loading}
            className="auth-submit-button"
          >
            {loading ? <LoadingSpinner size="small" /> : 'Sign Up'}
          </Button>

          <p className="auth-form-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

