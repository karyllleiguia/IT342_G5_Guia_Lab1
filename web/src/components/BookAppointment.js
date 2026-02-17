import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/shared.css';
import '../styles/BookAppointment.css';

const DEPARTMENTS = [
  'General Medicine', 'Cardiology', 'Dermatology', 'Orthopedics',
  'Pediatrics', 'Gynecology', 'Neurology', 'Ophthalmology',
  'Dentistry', 'ENT (Ear, Nose, Throat)',
];

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM',
];

const generateQueueId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

const todayStr = () => new Date().toISOString().split('T')[0];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }, []);

  const handleBook = (e) => {
    e.preventDefault();
    if (!department || !date || !time) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const queueId = generateQueueId();

    appointments.push({
      id: Date.now().toString(),
      userId: user.id,
      queueId,
      department,
      date: new Date(date).toISOString(),
      time,
      status: 'approved',
      createdAt: Date.now(),
    });

    localStorage.setItem('appointments', JSON.stringify(appointments));
    toast.success(`Appointment booked! Queue ID: ${queueId}`);
    navigate('/app');
    setLoading(false);
  };

  return (
    <div className="book-wrapper">
      <div className="book-card">

        <h2 className="book-title">Book an Appointment</h2>
        <p className="book-subtitle">
          Select your preferred department, date, and time
        </p>

        <form onSubmit={handleBook} className="book-form">

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={todayStr()}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Time</label>
            <select
              className="form-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>🕐 {t}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>

        </form>

        <div className="book-info-box">
          <strong>Note:</strong> After booking, you'll receive a unique queue ID.
          Use it on the Dashboard to track your position in the queue.
        </div>

      </div>
    </div>
  );
}
