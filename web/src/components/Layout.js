import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!user) return null;

  const navItems = [
    { to: '/app',                  label: 'Dashboard',        icon: '🏠' },
    { to: '/app/book-appointment', label: 'Book Appointment', icon: '➕' },
    { to: '/app/profile',          label: 'Profile',          icon: '👤' },
  ];

  return (
    <div className="layout-wrapper">

      {/* Header */}
      <header className="layout-header">
        <div className="layout-header-inner">
          <div className="layout-brand">
            <span className="layout-brand-icon">📅</span>
            <span className="layout-brand-name">QuickQueue</span>
          </div>
          <div className="layout-header-right">
            <span className="layout-welcome">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="layout-logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="layout-nav">
        <div className="layout-nav-inner">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`layout-nav-btn${location.pathname === to ? ' active' : ''}`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main className="layout-main">
        <Outlet />
      </main>

    </div>
  );
}
