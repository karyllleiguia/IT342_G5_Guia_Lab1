const EmergencyGenerator = {
  generate: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const random = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `EMG-${random}`;
  },
};

const CardiologyGenerator = {
  generate: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const random = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `CAR-${random}`;
  },
};

const NeurologyGenerator = {
  generate: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const random = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `NEU-${random}`;
  },
};

const PediatricsGenerator = {
  generate: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const random = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `PED-${random}`;
  },
};

const StandardGenerator = {
  generate: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const random = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return `GEN-${random}`;
  },
};

const QueueIdFactory = {
  createGenerator(department) {
    switch (department) {
      case 'Cardiology':
        return CardiologyGenerator;
      case 'Neurology':
        return NeurologyGenerator;
      case 'Pediatrics':
        return PediatricsGenerator;
      default:
        return StandardGenerator;
    }
  },
};

export default QueueIdFactory;