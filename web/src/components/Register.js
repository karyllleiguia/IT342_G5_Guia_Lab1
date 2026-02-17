import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/shared.css';
import '../styles/Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === formData.email)) {
      toast.error('Email already registered');
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('Registration successful! Please login.');
    navigate('/');
    setLoading(false);
  };

  const fields = [
    { label: 'Full Name',        field: 'name',            type: 'text',     placeholder: 'Enter your full name' },
    { label: 'Email',            field: 'email',           type: 'email',    placeholder: 'Enter your email' },
    { label: 'Phone Number',     field: 'phone',           type: 'tel',      placeholder: 'Enter your phone number' },
    { label: 'Password',         field: 'password',        type: 'password', placeholder: 'Create a password' },
    { label: 'Confirm Password', field: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
  ];

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="brand-logo">
          <span className="brand-logo-icon">📅</span>
          <h1 className="brand-logo-text">QuickQueue</h1>
        </div>
        <p className="form-subtitle">Create your account to get started</p>

        <form onSubmit={handleRegister} className="register-form">
          {fields.map(({ label, field, type, placeholder }) => (
            <div key={field} className="form-group">
              <label className="form-label">{label}</label>
              <input
                type={type}
                className="form-input"
                placeholder={placeholder}
                value={formData[field]}
                onChange={update(field)}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{' '}
          <Link to="/" className="switch-link">Sign in here</Link>
        </p>

      </div>
    </div>
  );
}
