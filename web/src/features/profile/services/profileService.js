/**
 * Profile Service
 * Handles user profile management
 */

import storage from '../../../shared/adapters/StorageAdapter';

class ProfileService {
  /**
   * Get user profile by ID
   */
  getUserProfile(userId) {
    const users = storage.get('users') || [];
    return users.find(user => user.id === userId) || null;
  }

  /**
   * Update user profile
   */
  updateProfile(userId, updates) {
    const users = storage.get('users') || [];
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      id: userId, // Don't allow ID changes
    };
    
    storage.set('users', users);
    
    // Update current user in storage
    const currentUser = storage.get('currentUser');
    if (currentUser && currentUser.id === userId) {
      storage.set('currentUser', users[userIndex]);
    }
    
    return users[userIndex];
  }

  /**
   * Validate email uniqueness (for updates)
   */
  isEmailAvailable(email, excludeUserId = null) {
    const users = storage.get('users') || [];
    return !users.some(user => 
      user.email === email && user.id !== excludeUserId
    );
  }

  /**
   * Get user statistics (appointments)
   */
  getUserStatistics(userId) {
    const appointments = storage.get('appointments') || [];
    const userAppointments = appointments.filter(apt => apt.userId === userId);
    
    return {
      totalAppointments: userAppointments.length,
      approvedAppointments: userAppointments.filter(a => a.status === 'approved').length,
      pendingAppointments: userAppointments.filter(a => a.status === 'pending').length,
      completedAppointments: userAppointments.filter(a => a.status === 'completed').length,
    };
  }
}

export default new ProfileService();
