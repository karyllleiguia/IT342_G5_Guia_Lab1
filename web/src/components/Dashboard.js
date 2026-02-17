import React, { useState, useEffect } from 'react';
import '../styles/shared.css';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(all.filter((a) => a.userId === currentUser.id));
  }, []);

  const filtered = appointments.filter(
    (a) =>
      a.queueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approved = appointments.filter((a) => a.status === 'approved');
  const active   = appointments.filter(
    (a) => a.status === 'approved' && new Date(a.date) >= new Date()
  );

  const getQueuePosition = (apt) => {
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    return all.filter(
      (a) =>
        a.department === apt.department &&
        a.date       === apt.date &&
        a.status     === 'approved' &&
        a.createdAt  <  apt.createdAt
    ).length;
  };

  const badgeClass = (status) => {
    const map = {
      approved:  'badge badge-approved',
      pending:   'badge badge-pending',
      completed: 'badge badge-completed',
    };
    return map[status] || 'badge';
  };

  return (
    <div className="dashboard-page">

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: 'Total Appointments', value: appointments.length, icon: '📋' },
          { label: 'Approved',           value: approved.length,     icon: '✅' },
          { label: 'Active Queues',      value: active.length,       icon: '⏳' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="stat-card">
            <div className="stat-card-label"><span>{icon}</span>{label}</div>
            <div className="stat-card-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="search-card">
        <h3 className="search-card-title">Track Your Queue</h3>
        <p className="search-card-sub">Search by queue ID or department name</p>
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Enter queue ID or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments */}
      <div>
        <h2 className="section-title">Your Appointments</h2>

        {filtered.length === 0 ? (
          <div className="appt-empty">
            <div className="appt-empty-icon">📭</div>
            <p>No appointments found. Book your first appointment!</p>
          </div>
        ) : (
          <div className="appt-list">
            {filtered.map((apt) => {
              const pos = apt.status === 'approved' ? getQueuePosition(apt) : null;
              return (
                <div key={apt.id} className="appt-card">

                  <div className="appt-card-top">
                    <div className="appt-card-left">
                      <div className="appt-icon-box">📅</div>
                      <div>
                        <h3 className="appt-dept">{apt.department}</h3>
                        <p className="appt-queue-id">
                          Queue ID: <span>{apt.queueId}</span>
                        </p>
                      </div>
                    </div>
                    <span className={badgeClass(apt.status)}>{apt.status}</span>
                  </div>

                  <div className="appt-meta">
                    <span>📆 {new Date(apt.date).toLocaleDateString('en-US', {
                      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                    })}</span>
                    <span>🕐 {apt.time}</span>
                  </div>

                  {apt.status === 'approved' && pos !== null && (
                    <div className="queue-position-box">
                      <span className="queue-position-icon">👥</span>
                      <div>
                        <p className="queue-position-label">Queue Position</p>
                        <p className="queue-position-note">
                          {pos === 0
                            ? "You're next in line!"
                            : `${pos} patient${pos !== 1 ? 's' : ''} ahead of you`}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
