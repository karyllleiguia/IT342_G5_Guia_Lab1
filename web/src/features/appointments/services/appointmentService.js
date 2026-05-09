/**
 * Appointment Service
 * Handles all appointment-related business logic
 */

import storage from '../../../shared/adapters/StorageAdapter';
import QueueIdFactory from '../../../shared/factory/QueueIdFactory';
import { appointmentObserver } from '../../../shared/observers/AppointmentObserver';

class AppointmentService {
  /**
   * Get all appointments for a user
   */
  getUserAppointments(userId) {
    const allAppointments = storage.get('appointments') || [];
    return allAppointments.filter(apt => apt.userId === userId);
  }

  /**
   * Get all appointments (for admin)
   */
  getAllAppointments() {
    return storage.get('appointments') || [];
  }

  /**
   * Book a new appointment
   */
  bookAppointment(appointmentData) {
    const { userId, department, date, time } = appointmentData;
    
    // Generate unique Queue ID using Factory pattern
    const queueId = QueueIdFactory.generateId(department);
    
    const newAppointment = {
      id: Date.now().toString(),
      userId,
      queueId,
      department,
      date: new Date(date).toISOString(),
      time,
      status: 'approved',
      createdAt: Date.now(),
    };
    
    // Save to storage
    const appointments = storage.get('appointments') || [];
    appointments.push(newAppointment);
    storage.set('appointments', appointments);
    
    // Notify observers
    appointmentObserver.notifyCreated(newAppointment);
    
    return newAppointment;
  }

  /**
   * Search appointments by query
   */
  searchAppointments(userId, query) {
    const userAppointments = this.getUserAppointments(userId);
    
    if (!query) return userAppointments;
    
    const lowerQuery = query.toLowerCase();
    return userAppointments.filter(apt =>
      apt.queueId.toLowerCase().includes(lowerQuery) ||
      apt.department.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get appointment statistics for a user
   */
  getUserStats(userId) {
    const appointments = this.getUserAppointments(userId);
    
    return {
      total: appointments.length,
      approved: appointments.filter(a => a.status === 'approved').length,
      active: appointments.filter(
        a => a.status === 'approved' && new Date(a.date) >= new Date()
      ).length,
      pending: appointments.filter(a => a.status === 'pending').length,
      completed: appointments.filter(a => a.status === 'completed').length,
    };
  }

  /**
   * Delete an appointment
   */
  deleteAppointment(appointmentId) {
    const appointments = storage.get('appointments') || [];
    const filtered = appointments.filter(apt => apt.id !== appointmentId);
    storage.set('appointments', filtered);
    
    appointmentObserver.notifyDeleted(appointmentId);
    
    return true;
  }

  /**
   * Update appointment status
   */
  updateAppointmentStatus(appointmentId, newStatus) {
    const appointments = storage.get('appointments') || [];
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    
    const oldStatus = appointment.status;
    appointment.status = newStatus;
    
    storage.set('appointments', appointments);
    appointmentObserver.notifyStatusChanged(appointment, oldStatus, newStatus);
    
    return appointment;
  }
}

export default new AppointmentService();
