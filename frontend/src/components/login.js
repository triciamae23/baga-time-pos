import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Link the CSS

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      {/* <img src="/logo192.png" alt="logo" style={{ width: '60px', marginBottom: '10px' }} /> */}
      <div className="login-box">
        <h2>BAGA TIME! </h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
        <p className="register-text" onClick={() => navigate('/register')}>
          Don’t have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}