import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BookAppointment from './components/BookAppointment';
import Profile from './components/Profile';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/app"                 element={<Layout />}>
          <Route index                     element={<Dashboard />} />
          <Route path="book-appointment"   element={<BookAppointment />} />
          <Route path="profile"            element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
