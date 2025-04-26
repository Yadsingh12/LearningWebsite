import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', form);
      setMessage('✅ Account created! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('❌ Failed to register');
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
        {message && <p>{message}</p>}
      </div>
    </div >
  );
};

export default Register;
