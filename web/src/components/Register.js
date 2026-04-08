import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/shared.css';
import '../styles/Register.css';

import storage from '../adapters/StorageAdapter';
import withFormValidation, { validators } from '../decorator/withFormValidation';

function RegisterForm({ errors, validate }) {
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

    const isValid = validate(formData);
    if (!isValid) {
      setLoading(false);
      return;
    }

    const users = storage.get('users') || [];

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
    storage.set('users', users);
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
                className={`form-input ${errors[field] ? 'input-error' : ''}`}
                placeholder={placeholder}
                value={formData[field]}
                onChange={update(field)}
              />
              {errors[field] && (
                <span className="error-text">{errors[field]}</span>
              )}
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

const validationRules = {
  name:            [validators.required],
  email:           [validators.required, validators.email],
  phone:           [validators.required],
  password:        [validators.required, validators.minLength(6)],
  confirmPassword: [
    validators.required,
    (value, formData) => validators.passwordMatch(formData.password)(value),
  ],
};

export default withFormValidation(RegisterForm, validationRules);