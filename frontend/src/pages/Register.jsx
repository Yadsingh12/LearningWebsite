import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0); // Key to trigger re-render
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Password strength check
    const password = form.password;
    const isStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  
    if (!isStrong) {
      setMessage("❌ Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");
      setMessageKey(prevKey => prevKey + 1);  // Increment the key to force re-render
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/register', form);
      setMessage('✅ Account created! You can now log in.');
      setMessageKey(prevKey => prevKey + 1);  // Increment the key to force re-render
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to register';
      setMessage(`❌ ${errorMsg}`);
      setMessageKey(prevKey => prevKey + 1);  // Increment the key to force re-render
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
    </div >
  );
};

export default Register;
