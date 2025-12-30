import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Users, UserPlus, DollarSign, Phone, Mail } from 'lucide-react';

interface Worker {
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

interface LaborModalProps {
  worker?: Worker | null;
  onClose: () => void;
}

export function LaborModal({ worker, onClose }: LaborModalProps) {
  const [formData, setFormData] = useState<Partial<Worker>>({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const workerTypes = [
    { value: 'hired', label: 'Hired/Contractor', description: 'Temporary or contract worker' },
    { value: 'own', label: 'Employee', description: 'Full-time farm employee' }
  ];

  const roles = [
    'Farm Worker',
    'Equipment Operator',
    'Livestock Manager',
    'Crop Specialist',
    'Irrigation Technician',
    'General Laborer',
    'Farm Supervisor',
    'Maintenance Worker',
    'Harvest Worker',
    'Field Manager'
  ];

  const specializations = [
    'Crop Management',
    'Heavy Machinery',
    'Animal Care',
    'Irrigation Systems',
    'Equipment Maintenance',
    'Harvest Operations',
    'Multiple Tasks',
    'Operations Management',
    'Organic Farming',
    'Precision Agriculture'
  ];

  const availableSkills = [
    'Tractor Operation',
    'Combine Harvester',
    'Irrigation Systems',
    'Animal Handling',
    'Crop Monitoring',
    'Equipment Maintenance',
    'Welding',
    'Pesticide Application',
    'GPS/Precision Ag',
    'Organic Practices',
    'Safety Protocols',
    'First Aid Certified'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', description: 'Currently working' },
    { value: 'on-leave', label: 'On Leave', description: 'Temporarily unavailable' },
    { value: 'inactive', label: 'Inactive', description: 'No longer working' }
  ];

  useEffect(() => {
    if (worker) {
      setFormData(worker);
      setSelectedSkills(worker.skills || []);
    }
  }, [worker]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(newSkills);
    updateFormData('skills', newSkills);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Worker name is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.hourlyRate || formData.hourlyRate <= 0) {
      newErrors.hourlyRate = 'Valid hourly rate is required';
    }

    if (formData.hourlyRate && (formData.hourlyRate < 10 || formData.hourlyRate > 100)) {
      newErrors.hourlyRate = 'Hourly rate should be between $10-$100';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Work location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving worker:', { ...formData, skills: selectedSkills });
      onClose();
    }
  };

  const calculateAnnualCost = () => {
    if (formData.hourlyRate) {
      const weeklyHours = 40;
      const weeksPerYear = 52;
      const annualHours = weeklyHours * weeksPerYear;
      return formData.hourlyRate * annualHours;
    }
    return 0;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>{worker ? 'Edit Worker' : 'Add New Worker'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-xs">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter worker's full name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`h-8 text-xs ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="type" className="text-xs">Worker Type *</Label>
                <Select value={formData.type || 'hired'} onValueChange={(value) => updateFormData('type', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workerTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-xs">
                        <div>
                          <div>{type.label}</div>
                          <div className="text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="role" className="text-xs">Job Role *</Label>
                <Select value={formData.role || ''} onValueChange={(value) => updateFormData('role', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.role ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role} className="text-xs">{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
              </div>
              
              <div>
                <Label htmlFor="specialization" className="text-xs">Specialization *</Label>
                <Select value={formData.specialization || ''} onValueChange={(value) => updateFormData('specialization', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.specialization ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec} className="text-xs">{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specialization && <p className="text-xs text-red-600 mt-1">{errors.specialization}</p>}
              </div>
              
              <div>
                <Label htmlFor="hourlyRate" className="text-xs">Hourly Rate ($) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.25"
                  min="0"
                  placeholder="0.00"
                  value={formData.hourlyRate || ''}
                  onChange={(e) => updateFormData('hourlyRate', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.hourlyRate ? 'border-red-500' : ''}`}
                />
                {errors.hourlyRate && <p className="text-xs text-red-600 mt-1">{errors.hourlyRate}</p>}
                {formData.hourlyRate && formData.hourlyRate > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Annual cost: ${calculateAnnualCost().toLocaleString()} (40hrs/week)
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="status" className="text-xs">Status</Label>
                <Select value={formData.status || 'active'} onValueChange={(value) => updateFormData('status', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value} className="text-xs">
                        <div>
                          <div>{status.label}</div>
                          <div className="text-gray-500">{status.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Contact Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-xs">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`h-8 text-xs ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-xs">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="worker@email.com"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`h-8 text-xs ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="emergencyContact" className="text-xs">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Emergency contact name"
                  value={formData.emergencyContact || ''}
                  onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyPhone" className="text-xs">Emergency Phone</Label>
                <Input
                  id="emergencyPhone"
                  placeholder="+1 (555) 987-6543"
                  value={formData.emergencyPhone || ''}
                  onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Work Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Work Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-xs">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className={`h-8 text-xs ${errors.startDate ? 'border-red-500' : ''}`}
                />
                {errors.startDate && <p className="text-xs text-red-600 mt-1">{errors.startDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">Primary Work Location *</Label>
                <Input
                  id="location"
                  placeholder="Field A, Barn B, etc."
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Skills & Certifications</h3>
            
            <div>
              <Label className="text-xs">Select Skills</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="h-3 w-3"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
              
              {selectedSkills.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Selected skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-xs">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the worker..."
              value={formData.notes || ''}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="text-xs"
              rows={3}
            />
          </div>

          {/* Cost Analysis */}
          {formData.hourlyRate && formData.hourlyRate > 0 && (
            <Alert className="border-purple-200 bg-purple-50">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-xs text-purple-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Cost Analysis:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Weekly (40hrs): ${(formData.hourlyRate * 40).toFixed(2)}</li>
                      <li>Monthly (173hrs): ${(formData.hourlyRate * 173).toFixed(2)}</li>
                      <li>Annual (2080hrs): ${(formData.hourlyRate * 2080).toLocaleString()}</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Benefits Estimate ({formData.type === 'own' ? 'Employee' : 'Contractor'}):</strong>
                    <ul className="mt-1 space-y-1">
                      {formData.type === 'own' ? (
                        <>
                          <li>Health Insurance: ~$6,000/year</li>
                          <li>Workers' Comp: ~$1,200/year</li>
                          <li>Total Cost: ~${(calculateAnnualCost() + 7200).toLocaleString()}/year</li>
                        </>
                      ) : (
                        <>
                          <li>No benefits required</li>
                          <li>Flexible scheduling</li>
                          <li>Total Cost: ${calculateAnnualCost().toLocaleString()}/year</li>
                        </>
                      )}
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
          <Button onClick={handleSubmit} size="sm" className="bg-purple-600 hover:bg-purple-700">
            {worker ? 'Update Worker' : 'Add Worker'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}