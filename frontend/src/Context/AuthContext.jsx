import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5000/api/protected', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser({ username: res.data.username });
      }).catch(err => {
        localStorage.removeItem('authToken');
      });
    }
  }, []);

  const login = (username, password) => {
    return axios.post('http://localhost:5000/api/login', { username, password })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('authToken', token);
        setUser({ username });
      });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
