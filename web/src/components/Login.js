import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/shared.css';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    setTimeout(() => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success('Login successful!');
        navigate('/app');
      } else {
        toast.error('Invalid email or password');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand-logo">
          <span className="brand-logo-icon">📅</span>
          <h1 className="brand-logo-text">QuickQueue</h1>
        </div>
        <p className="form-subtitle">Sign in to manage your appointments</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account?{' '}
          <Link to="/register" className="switch-link">Register here</Link>
        </p>

      </div>
    </div>
  );
}
