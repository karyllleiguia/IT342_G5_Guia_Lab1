class AppointmentObserver {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }

  notify(newAppointment) {
    this.listeners.forEach((callback) => callback(newAppointment));
  }
}

export const appointmentObserver = new AppointmentObserver();
