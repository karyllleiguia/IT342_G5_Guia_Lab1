import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import Dashboard from './features/appointments/Dashboard';
import BookAppointment from './features/appointments/BookAppointment';
import Profile from './features/profile/components/Profile';
import Layout from './shared/components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          <Route
            path="book-appointment"
            element={<BookAppointment />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}