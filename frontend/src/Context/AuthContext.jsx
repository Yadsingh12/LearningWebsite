import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser({ username: res.data.username });
      }).catch(() => {
        localStorage.removeItem('authToken');
      });
    }
  }, []);

  // Login function
  const login = (username, password) => {
    return axios.post('http://localhost:5000/login', { username, password })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('authToken', token);
        setUser({ username });
      });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Register function (auto-login after success)
  const register = (username, password) => {
    // Password validation
    const isStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    if (!isStrong) {
      return Promise.reject({
        message: "❌ Password must be at least 8 chars and include uppercase, lowercase, number, symbol."
      });
    }

    return axios.post('http://localhost:5000/register', { username, password })
      .then(() => login(username, password))  // Auto-login after registration
      .catch(err => {
        const msg = err.response?.data?.detail || 'Failed to register';
        return Promise.reject({ message: `❌ ${msg}` });
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
