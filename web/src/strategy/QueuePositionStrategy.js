import storage from '../adapters/StorageAdapter';

const FIFOStrategy = {
  calculate(appointment) {
    const all = storage.get('appointments') || [];
    return all.filter(
      (a) =>
        a.department === appointment.department &&
        a.date       === appointment.date &&
        a.status     === 'approved' &&
        a.createdAt  <  appointment.createdAt
    ).length;
  },
};

const PriorityStrategy = {
  calculate(_appointment) {
    return 0;
  },
};

const TimeSlotStrategy = {
  calculate(appointment) {
    const TIME_SLOTS = [
      '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
      '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM',
    ];
    return TIME_SLOTS.indexOf(appointment.time);
  },
};

const QueuePositionCalculator = {
  getStrategy(department) {
    switch (department) {
      default:
        return FIFOStrategy;
    }
  },

  calculate(appointment) {
    const strategy = this.getStrategy(appointment.department);
    return strategy.calculate(appointment);
  },
};

export default QueuePositionCalculator;