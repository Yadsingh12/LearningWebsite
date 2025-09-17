import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL; // must start with VITE_

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Central axios instance
  const backendRequest = axios.create({
    baseURL: BACKEND_API_URL,
    timeout: 5000, // handle unresponsive backend
  });

  // Attach token automatically
  backendRequest.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      backendRequest.get('/protected')
        .then(res => setUser({ username: res.data.username }))
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        });
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await backendRequest.post('/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('authToken', token);
      setUser({ username });
      return { success: true, message: "✅ Logged in successfully!" };
    } catch (err) {
      if (err.response) {
        // Backend responded with error
        const msg = err.response.data?.detail || '❌ Invalid credentials';
        return { success: false, message: msg };
      } else {
        // Backend did not respond
        return { success: false, message: '❌ Backend not responding. Please try later.' };
      }
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Register function
  const register = async (username, password) => {
    // Password validation
    const isStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    if (!isStrong) {
      return { success: false, message: "❌ Password must be at least 8 chars and include uppercase, lowercase, number, symbol." };
    }

    try {
      await backendRequest.post('/register', { username, password });
      // Auto-login after registration
      const loginResult = await login(username, password);
      return loginResult;
    } catch (err) {
      if (err.response) {
        const msg = err.response.data?.detail || '❌ Username may already exist';
        return { success: false, message: msg };
      } else {
        return { success: false, message: '❌ Backend not responding. Please try later.' };
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, backendRequest }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
