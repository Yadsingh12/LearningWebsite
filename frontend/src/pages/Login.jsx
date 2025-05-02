import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [errorKey, setErrorKey] = useState(0); // Key to trigger re-render of the error message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      setErrorKey(prevKey => prevKey + 1); // Increment the key to force re-render of error message
    }
  };

  return (
    <div className="auth-container">
      <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
      <div className="auth-form">
        <h2>Login</h2>
        <form class="jasssu" onSubmit={handleSubmit}>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p key={errorKey} className="error-msg">{error}</p>} {/* Trigger animation on error change */}
      </div>
    </div>
  );
};

export default Login;
