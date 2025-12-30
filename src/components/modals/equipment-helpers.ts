export interface Equipment {
  id?: string;
  name: string;
  type: string;
  category: string;
  model: string;
  brand: string;
  year: number;
  serialNumber: string;
  status: string;
  location: string;
  purchasePrice: number;
  currentValue: number;
  hoursUsed: number;
  fuelEfficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceCost: number;
  operatingCost: number;
  condition: string;
}

export const validateEquipmentForm = (formData: Partial<Equipment>) => {
  const errors: Record<string, string> = {};

  if (!formData.name?.trim()) {
    errors.name = 'Equipment name is required';
  }

  if (!formData.type) {
    errors.type = 'Equipment type is required';
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (!formData.brand) {
    errors.brand = 'Brand is required';
  }

  if (!formData.model?.trim()) {
    errors.model = 'Model is required';
  }

  if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
    errors.year = 'Valid year is required';
  }

  if (!formData.serialNumber?.trim()) {
    errors.serialNumber = 'Serial number is required';
  }

  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }

  if (!formData.purchasePrice || formData.purchasePrice <= 0) {
    errors.purchasePrice = 'Purchase price must be greater than 0';
  }

  if (!formData.currentValue || formData.currentValue <= 0) {
    errors.currentValue = 'Current value must be greater than 0';
  }

  if (formData.currentValue && formData.purchasePrice && formData.currentValue > formData.purchasePrice) {
    errors.currentValue = 'Current value cannot exceed purchase price';
  }

  if (formData.hoursUsed && formData.hoursUsed < 0) {
    errors.hoursUsed = 'Hours used cannot be negative';
  }

  if (formData.fuelEfficiency && formData.fuelEfficiency <= 0) {
    errors.fuelEfficiency = 'Fuel efficiency must be greater than 0';
  }

  if (formData.operatingCost && formData.operatingCost < 0) {
    errors.operatingCost = 'Operating cost cannot be negative';
  }

  if (formData.maintenanceCost && formData.maintenanceCost < 0) {
    errors.maintenanceCost = 'Maintenance cost cannot be negative';
  }

  return errors;
};

export const calculateDepreciation = (purchasePrice: number, year: number): number => {
  if (purchasePrice && year) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    const depreciationRate = 0.15; // 15% per year
    const depreciatedValue = purchasePrice * Math.pow(1 - depreciationRate, age);
    return Math.max(depreciatedValue, purchasePrice * 0.1); // Minimum 10% of original value
  }
  return 0;
};

export const getDefaultEquipmentData = (): Partial<Equipment> => ({
  name: '',
  type: '',
  category: '',
  model: '',
  brand: '',
  year: new Date().getFullYear(),
  serialNumber: '',
  status: 'operational',
  location: '',
  purchasePrice: 0,
  currentValue: 0,
  hoursUsed: 0,
  fuelEfficiency: 0,
  lastMaintenance: '',
  nextMaintenance: '',
  maintenanceCost: 0,
  operatingCost: 0,
  condition: 'excellent'
});