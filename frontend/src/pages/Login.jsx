import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      setMessage('✅ Login successful!');
      setMessageKey(prev => prev + 1);
      setTimeout(() => navigate('/'), 500);
    } catch (err) {
      setMessage('❌ Invalid username or password');
      setMessageKey(prev => prev + 1);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
      <div className="auth-form">
        <h2>Login</h2>
        <form className="jasssu" onSubmit={handleSubmit}>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {message && <p key={messageKey} className="error-msg">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
