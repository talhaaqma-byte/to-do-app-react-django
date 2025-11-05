import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Todos from './pages/Todos';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <TodoProvider>
                    <Dashboard />
                  </TodoProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <TodoProvider>
                    <Todos />
                  </TodoProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
