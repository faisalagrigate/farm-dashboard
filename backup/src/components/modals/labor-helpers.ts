export interface Worker {
  id?: string;
  name: string;
  type: string;
  role: string;
  specialization: string;
  hourlyRate: number;
  phone: string;
  email: string;
  status: string;
  startDate: string;
  location: string;
  emergencyContact: string;
  emergencyPhone: string;
  skills: string[];
  notes: string;
}

export const validateWorkerForm = (formData: Partial<Worker>) => {
  const errors: Record<string, string> = {};

  if (!formData.name?.trim()) {
    errors.name = 'Worker name is required';
  }

  if (!formData.role) {
    errors.role = 'Role is required';
  }

  if (!formData.specialization) {
    errors.specialization = 'Specialization is required';
  }

  if (!formData.hourlyRate || formData.hourlyRate <= 0) {
    errors.hourlyRate = 'Valid hourly rate is required';
  }

  if (formData.hourlyRate && (formData.hourlyRate < 100 || formData.hourlyRate > 1000)) {
    errors.hourlyRate = 'Hourly rate should be between ₹100-₹1000';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(formData.phone)) {
    errors.phone = 'Valid Indian phone number is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Valid email address is required';
  }

  if (!formData.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!formData.location?.trim()) {
    errors.location = 'Work location is required';
  }

  return errors;
};

export const calculateAnnualCost = (hourlyRate: number): number => {
  if (hourlyRate) {
    const weeklyHours = 40;
    const weeksPerYear = 52;
    const annualHours = weeklyHours * weeksPerYear;
    return hourlyRate * annualHours;
  }
  return 0;
};

export const getDefaultWorkerData = (): Partial<Worker> => ({
  name: '',
  type: 'hired',
  role: '',
  specialization: '',
  hourlyRate: 0,
  phone: '',
  email: '',
  status: 'active',
  startDate: new Date().toISOString().split('T')[0],
  location: '',
  emergencyContact: '',
  emergencyPhone: '',
  skills: [],
  notes: ''
});