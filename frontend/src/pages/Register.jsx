import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import '../style/Auth.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.username, form.password);
      setMessage('✅ Account created! Logging in...');
      setMessageKey(prev => prev + 1);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.message || '❌ Registration failed');
      setMessageKey(prev => prev + 1);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        {message && <p key={messageKey} className="error-msg">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
