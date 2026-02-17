import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import '../styles/shared.css';
import '../styles/Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser(u);
    setFormData({ name: u.name || '', email: u.email || '', phone: u.phone || '' });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...user, ...formData };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updated;
      localStorage.setItem('users', JSON.stringify(users));
    }

    localStorage.setItem('currentUser', JSON.stringify(updated));
    setUser(updated);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    setIsEditing(false);
  };

  if (!user) return null;

  const appointments  = JSON.parse(localStorage.getItem('appointments') || '[]');
  const userApts      = appointments.filter((a) => a.userId === user.id);
  const approvedApts  = userApts.filter((a) => a.status === 'approved');

  const infoRows = [
    { icon: '👤', label: 'Full Name',     value: user.name  },
    { icon: '✉️', label: 'Email Address', value: user.email },
    { icon: '📱', label: 'Phone Number',  value: user.phone },
  ];

  const editFields = [
    { label: 'Full Name',     field: 'name',  type: 'text'  },
    { label: 'Email Address', field: 'email', type: 'email' },
    { label: 'Phone Number',  field: 'phone', type: 'tel'   },
  ];

  return (
    <div className="profile-wrapper">

      {/* Profile info card */}
      <div className="profile-card">
        <h2 className="profile-card-title">Profile Information</h2>
        <p className="profile-card-sub">Manage your personal information</p>

        {!isEditing ? (
          <>
            <div className="profile-info-list">
              {infoRows.map(({ icon, label, value }) => (
                <div key={label} className="profile-info-row">
                  <div className="profile-info-icon">{icon}</div>
                  <div>
                    <p className="profile-info-label">{label}</p>
                    <p className="profile-info-value">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            {editFields.map(({ label, field, type }) => (
              <div key={field} className="form-group">
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-input"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                  required
                />
              </div>
            ))}
            <div className="profile-btn-row">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-outline" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats card */}
      <div className="profile-card">
        <h2 className="profile-card-title">Account Statistics</h2>
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-icon">📋</div>
            <p className="profile-stat-value">{userApts.length}</p>
            <p className="profile-stat-label">Total Appointments</p>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-icon">✅</div>
            <p className="profile-stat-value">{approvedApts.length}</p>
            <p className="profile-stat-label">Approved</p>
          </div>
        </div>
      </div>

    </div>
  );
}
