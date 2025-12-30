import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency } from '../ui/currency-utils';
import { Wrench, Calculator } from 'lucide-react';
import { 
  equipmentTypes, 
  equipmentCategories, 
  equipmentBrands, 
  equipmentConditions, 
  equipmentStatusOptions 
} from './equipment-constants';
import { 
  Equipment, 
  validateEquipmentForm, 
  calculateDepreciation, 
  getDefaultEquipmentData 
} from './equipment-helpers';

interface EquipmentModalProps {
  equipment?: Equipment | null;
  onClose: () => void;
}

export function EquipmentModal({ equipment, onClose }: EquipmentModalProps) {
  const [formData, setFormData] = useState<Partial<Equipment>>(getDefaultEquipmentData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    }
  }, [equipment]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateEquipmentForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Saving equipment:', formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-orange-600" />
            <span>{equipment ? 'Edit Equipment' : 'Add New Equipment'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-xs">Equipment Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter equipment name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`h-8 text-xs ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="type" className="text-xs">Equipment Type *</Label>
                <Select value={formData.type || ''} onValueChange={(value) => updateFormData('type', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.type ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map(type => (
                      <SelectItem key={type} value={type} className="text-xs">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
              </div>
              
              <div>
                <Label htmlFor="category" className="text-xs">Category *</Label>
                <Select value={formData.category || ''} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.category ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentCategories.map(category => (
                      <SelectItem key={category} value={category} className="text-xs">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
              </div>
              
              <div>
                <Label htmlFor="brand" className="text-xs">Brand *</Label>
                <Select value={formData.brand || ''} onValueChange={(value) => updateFormData('brand', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.brand ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentBrands.map(brand => (
                      <SelectItem key={brand} value={brand} className="text-xs">{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="model" className="text-xs">Model *</Label>
                <Input
                  id="model"
                  placeholder="Enter model"
                  value={formData.model || ''}
                  onChange={(e) => updateFormData('model', e.target.value)}
                  className={`h-8 text-xs ${errors.model ? 'border-red-500' : ''}`}
                />
                {errors.model && <p className="text-xs text-red-600 mt-1">{errors.model}</p>}
              </div>
              
              <div>
                <Label htmlFor="year" className="text-xs">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year || ''}
                  onChange={(e) => updateFormData('year', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.year ? 'border-red-500' : ''}`}
                />
                {errors.year && <p className="text-xs text-red-600 mt-1">{errors.year}</p>}
              </div>
              
              <div>
                <Label htmlFor="serialNumber" className="text-xs">Serial Number *</Label>
                <Input
                  id="serialNumber"
                  placeholder="Enter serial number"
                  value={formData.serialNumber || ''}
                  onChange={(e) => updateFormData('serialNumber', e.target.value)}
                  className={`h-8 text-xs ${errors.serialNumber ? 'border-red-500' : ''}`}
                />
                {errors.serialNumber && <p className="text-xs text-red-600 mt-1">{errors.serialNumber}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">Current Location *</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Financial Information</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="purchasePrice" className="text-xs">Purchase Price (₹) *</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  min="0"
                  value={formData.purchasePrice || ''}
                  onChange={(e) => updateFormData('purchasePrice', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.purchasePrice ? 'border-red-500' : ''}`}
                />
                {errors.purchasePrice && <p className="text-xs text-red-600 mt-1">{errors.purchasePrice}</p>}
              </div>
              
              <div>
                <Label htmlFor="currentValue" className="text-xs">Current Value (₹) *</Label>
                <Input
                  id="currentValue"
                  type="number"
                  min="0"
                  value={formData.currentValue || ''}
                  onChange={(e) => updateFormData('currentValue', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.currentValue ? 'border-red-500' : ''}`}
                />
                {errors.currentValue && <p className="text-xs text-red-600 mt-1">{errors.currentValue}</p>}
                {formData.purchasePrice && formData.year && (
                  <p className="text-xs text-blue-600 mt-1">
                    Est: {formatCurrency(Math.round(calculateDepreciation(formData.purchasePrice, formData.year)))}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="operatingCost" className="text-xs">Operating Cost (₹/hr)</Label>
                <Input
                  id="operatingCost"
                  type="number"
                  min="0"
                  value={formData.operatingCost || ''}
                  onChange={(e) => updateFormData('operatingCost', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.operatingCost ? 'border-red-500' : ''}`}
                />
                {errors.operatingCost && <p className="text-xs text-red-600 mt-1">{errors.operatingCost}</p>}
              </div>
              
              <div>
                <Label htmlFor="maintenanceCost" className="text-xs">Annual Maintenance (₹)</Label>
                <Input
                  id="maintenanceCost"
                  type="number"
                  min="0"
                  value={formData.maintenanceCost || ''}
                  onChange={(e) => updateFormData('maintenanceCost', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.maintenanceCost ? 'border-red-500' : ''}`}
                />
                {errors.maintenanceCost && <p className="text-xs text-red-600 mt-1">{errors.maintenanceCost}</p>}
              </div>
            </div>
          </div>

          {/* Operational Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Operational Information</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="hoursUsed" className="text-xs">Total Hours Used</Label>
                <Input
                  id="hoursUsed"
                  type="number"
                  min="0"
                  value={formData.hoursUsed || ''}
                  onChange={(e) => updateFormData('hoursUsed', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.hoursUsed ? 'border-red-500' : ''}`}
                />
                {errors.hoursUsed && <p className="text-xs text-red-600 mt-1">{errors.hoursUsed}</p>}
              </div>
              
              <div>
                <Label htmlFor="fuelEfficiency" className="text-xs">Fuel Efficiency (L/hr)</Label>
                <Input
                  id="fuelEfficiency"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.fuelEfficiency || ''}
                  onChange={(e) => updateFormData('fuelEfficiency', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.fuelEfficiency ? 'border-red-500' : ''}`}
                />
                {errors.fuelEfficiency && <p className="text-xs text-red-600 mt-1">{errors.fuelEfficiency}</p>}
              </div>
              
              <div>
                <Label htmlFor="status" className="text-xs">Status</Label>
                <Select value={formData.status || 'operational'} onValueChange={(value) => updateFormData('status', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentStatusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value} className="text-xs">
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="condition" className="text-xs">Condition</Label>
                <Select value={formData.condition || 'excellent'} onValueChange={(value) => updateFormData('condition', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentConditions.map(condition => (
                      <SelectItem key={condition.value} value={condition.value} className="text-xs">
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastMaintenance" className="text-xs">Last Maintenance Date</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance || ''}
                  onChange={(e) => updateFormData('lastMaintenance', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="nextMaintenance" className="text-xs">Next Maintenance Date</Label>
                <Input
                  id="nextMaintenance"
                  type="date"
                  value={formData.nextMaintenance || ''}
                  onChange={(e) => updateFormData('nextMaintenance', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Cost Analysis Alert */}
          {formData.purchasePrice && formData.purchasePrice > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <Calculator className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-xs text-orange-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Cost Analysis:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Purchase: {formatCurrency(formData.purchasePrice)}</li>
                      <li>Current Value: {formatCurrency(formData.currentValue || 0)}</li>
                      <li>Annual Maintenance: {formatCurrency(formData.maintenanceCost || 0)}</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Recommendations:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Maintenance interval: {formData.type === 'Tractor' ? '250 hours' : '200 hours'}</li>
                      <li>Annual depreciation: 12-15%</li>
                      <li>Consider telematics integration</li>
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-orange-600 hover:bg-orange-700">
            {equipment ? 'Update Equipment' : 'Add Equipment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}