import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react';

interface Farm {
  id?: number;
  name: string;
  location: string;
  size: number;
  manager: string;
  crops: string[];
  livestock: number;
  status: string;
  revenue: number;
  lastInspection: string;
}

interface FarmModalProps {
  farm?: Farm | null;
  onClose: () => void;
}

export function FarmModal({ farm, onClose }: FarmModalProps) {
  const [formData, setFormData] = useState<Partial<Farm>>({
    name: '',
    location: '',
    size: 0,
    manager: '',
    crops: [],
    livestock: 0,
    status: 'active',
    revenue: 0,
    lastInspection: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const availableCrops = [
    'Corn', 'Wheat', 'Soybeans', 'Cotton', 'Barley', 'Rice', 'Tomatoes', 
    'Potatoes', 'Lettuce', 'Carrots', 'Organic Vegetables', 'Herbs'
  ];

  useEffect(() => {
    if (farm) {
      setFormData(farm);
      setSelectedCrops(farm.crops || []);
    }
  }, [farm]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const toggleCrop = (crop: string) => {
    const newCrops = selectedCrops.includes(crop)
      ? selectedCrops.filter(c => c !== crop)
      : [...selectedCrops, crop];
    
    setSelectedCrops(newCrops);
    updateFormData('crops', newCrops);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Farm name is required';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.size || formData.size <= 0) {
      newErrors.size = 'Farm size must be greater than 0';
    }

    if (!formData.manager?.trim()) {
      newErrors.manager = 'Manager name is required';
    }

    if (selectedCrops.length === 0) {
      newErrors.crops = 'At least one crop must be selected';
    }

    if (formData.livestock && formData.livestock < 0) {
      newErrors.livestock = 'Livestock count cannot be negative';
    }

    if (formData.revenue && formData.revenue < 0) {
      newErrors.revenue = 'Revenue cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving farm:', { ...formData, crops: selectedCrops });
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>{farm ? 'Edit Farm' : 'Add New Farm'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-xs">Farm Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter farm name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`h-8 text-xs ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, State, Country"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <Label htmlFor="size" className="text-xs">Size (acres) *</Label>
                <Input
                  id="size"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                  value={formData.size || ''}
                  onChange={(e) => updateFormData('size', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.size ? 'border-red-500' : ''}`}
                />
                {errors.size && <p className="text-xs text-red-600 mt-1">{errors.size}</p>}
              </div>
              
              <div>
                <Label htmlFor="manager" className="text-xs">Farm Manager *</Label>
                <Input
                  id="manager"
                  placeholder="Manager name"
                  value={formData.manager || ''}
                  onChange={(e) => updateFormData('manager', e.target.value)}
                  className={`h-8 text-xs ${errors.manager ? 'border-red-500' : ''}`}
                />
                {errors.manager && <p className="text-xs text-red-600 mt-1">{errors.manager}</p>}
              </div>
            </div>
          </div>

          {/* Crops Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Crops & Production *</h3>
            
            <div>
              <Label className="text-xs">Select Crops Grown</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableCrops.map(crop => (
                  <div key={crop} className="flex items-center space-x-2">
                    <Checkbox
                      id={crop}
                      checked={selectedCrops.includes(crop)}
                      onCheckedChange={() => toggleCrop(crop)}
                      className="h-3 w-3"
                    />
                    <Label htmlFor={crop} className="text-xs">{crop}</Label>
                  </div>
                ))}
              </div>
              {errors.crops && <p className="text-xs text-red-600 mt-1">{errors.crops}</p>}
              
              {selectedCrops.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-600 mb-1">Selected crops:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCrops.map(crop => (
                      <Badge key={crop} variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Livestock & Financial */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Livestock & Financial</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="livestock" className="text-xs">Number of Livestock</Label>
                <Input
                  id="livestock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.livestock || ''}
                  onChange={(e) => updateFormData('livestock', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.livestock ? 'border-red-500' : ''}`}
                />
                {errors.livestock && <p className="text-xs text-red-600 mt-1">{errors.livestock}</p>}
              </div>
              
              <div>
                <Label htmlFor="revenue" className="text-xs">Annual Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.revenue || ''}
                  onChange={(e) => updateFormData('revenue', parseInt(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.revenue ? 'border-red-500' : ''}`}
                />
                {errors.revenue && <p className="text-xs text-red-600 mt-1">{errors.revenue}</p>}
              </div>
              
              <div>
                <Label htmlFor="status" className="text-xs">Farm Status</Label>
                <Select value={formData.status || 'active'} onValueChange={(value) => updateFormData('status', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active" className="text-xs">Active</SelectItem>
                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                    <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="lastInspection" className="text-xs">Last Inspection Date</Label>
                <Input
                  id="lastInspection"
                  type="date"
                  value={formData.lastInspection || ''}
                  onChange={(e) => updateFormData('lastInspection', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-xs text-blue-800">
              <div className="flex items-start space-x-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">AI Insight</Badge>
                <div>
                  <p>Based on your farm size and location, we recommend:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Installing 3-4 soil moisture sensors</li>
                    <li>Setting up automated irrigation for optimal water usage</li>
                    <li>Consider drought-resistant crop varieties for your region</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-green-600 hover:bg-green-700">
            {farm ? 'Update Farm' : 'Add Farm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}