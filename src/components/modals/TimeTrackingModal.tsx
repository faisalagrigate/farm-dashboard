import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Timer, Clock, DollarSign, MapPin } from 'lucide-react';

interface TimeTrackingModalProps {
  onClose: () => void;
}

export function TimeTrackingModal({ onClose }: TimeTrackingModalProps) {
  const [formData, setFormData] = useState({
    workerId: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: '',
    breakTime: 0,
    task: '',
    location: '',
    notes: '',
    equipment: '',
    field: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const workers = [
    { id: 'P001', name: 'Carlos Rodriguez', rate: 18.50 },
    { id: 'P002', name: 'Maria Santos', rate: 22.00 },
    { id: 'P003', name: 'James Thompson', rate: 20.00 },
    { id: 'P004', name: 'Sarah Kim', rate: 16.00 },
    { id: 'P005', name: 'Mike Johnson', rate: 28.00 }
  ];

  const tasks = [
    'Crop Cultivation',
    'Equipment Operation',
    'Livestock Care',
    'Irrigation Setup',
    'Harvest Operations',
    'Field Preparation',
    'Equipment Maintenance',
    'Fence Repair',
    'Feed Distribution',
    'General Labor'
  ];

  const locations = [
    'Field A - Zone 1',
    'Field A - Zone 2',
    'Field B',
    'Field C',
    'Barn A',
    'Barn B',
    'Greenhouse 1',
    'Greenhouse 2',
    'Equipment Bay',
    'Pasture A',
    'Pasture B'
  ];

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const calculateHours = () => {
    if (formData.clockIn && formData.clockOut) {
      const start = new Date(`2024-01-01T${formData.clockIn}`);
      const end = new Date(`2024-01-01T${formData.clockOut}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return Math.max(0, diffHours - formData.breakTime);
    }
    return 0;
  };

  const calculateCost = () => {
    const selectedWorker = workers.find(w => w.id === formData.workerId);
    if (selectedWorker) {
      const totalHours = calculateHours();
      const regularHours = Math.min(totalHours, 8);
      const overtimeHours = Math.max(0, totalHours - 8);
      const regularCost = regularHours * selectedWorker.rate;
      const overtimeCost = overtimeHours * selectedWorker.rate * 1.5;
      return regularCost + overtimeCost;
    }
    return 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.workerId) {
      newErrors.workerId = 'Please select a worker';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.clockIn) {
      newErrors.clockIn = 'Clock in time is required';
    }

    if (!formData.clockOut) {
      newErrors.clockOut = 'Clock out time is required';
    }

    if (formData.clockIn && formData.clockOut) {
      const start = new Date(`2024-01-01T${formData.clockIn}`);
      const end = new Date(`2024-01-01T${formData.clockOut}`);
      if (end <= start) {
        newErrors.clockOut = 'Clock out must be after clock in';
      }
    }

    if (formData.breakTime < 0 || formData.breakTime > 4) {
      newErrors.breakTime = 'Break time must be between 0-4 hours';
    }

    if (!formData.task) {
      newErrors.task = 'Task is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const totalHours = calculateHours();
      const cost = calculateCost();
      const overtimeHours = Math.max(0, totalHours - 8);
      
      console.log('Saving time log:', {
        ...formData,
        totalHours,
        overtimeHours,
        cost
      });
      onClose();
    }
  };

  const selectedWorker = workers.find(w => w.id === formData.workerId);
  const totalHours = calculateHours();
  const overtimeHours = Math.max(0, totalHours - 8);
  const cost = calculateCost();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <Timer className="h-5 w-5 text-blue-600" />
            <span>Time Tracking</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Worker & Date */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workerId" className="text-xs">Worker *</Label>
                <Select value={formData.workerId} onValueChange={(value) => updateFormData('workerId', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.workerId ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select worker" />
                  </SelectTrigger>
                  <SelectContent>
                    {workers.map(worker => (
                      <SelectItem key={worker.id} value={worker.id} className="text-xs">
                        <div>
                          <div>{worker.name}</div>
                          <div className="text-gray-500">${worker.rate}/hr</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workerId && <p className="text-xs text-red-600 mt-1">{errors.workerId}</p>}
              </div>
              
              <div>
                <Label htmlFor="date" className="text-xs">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData('date', e.target.value)}
                  className={`h-8 text-xs ${errors.date ? 'border-red-500' : ''}`}
                />
                {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
              </div>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Time Details</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="clockIn" className="text-xs">Clock In Time *</Label>
                <Input
                  id="clockIn"
                  type="time"
                  value={formData.clockIn}
                  onChange={(e) => updateFormData('clockIn', e.target.value)}
                  className={`h-8 text-xs ${errors.clockIn ? 'border-red-500' : ''}`}
                />
                {errors.clockIn && <p className="text-xs text-red-600 mt-1">{errors.clockIn}</p>}
              </div>
              
              <div>
                <Label htmlFor="clockOut" className="text-xs">Clock Out Time *</Label>
                <Input
                  id="clockOut"
                  type="time"
                  value={formData.clockOut}
                  onChange={(e) => updateFormData('clockOut', e.target.value)}
                  className={`h-8 text-xs ${errors.clockOut ? 'border-red-500' : ''}`}
                />
                {errors.clockOut && <p className="text-xs text-red-600 mt-1">{errors.clockOut}</p>}
              </div>
              
              <div>
                <Label htmlFor="breakTime" className="text-xs">Break Time (hours)</Label>
                <Input
                  id="breakTime"
                  type="number"
                  step="0.25"
                  min="0"
                  max="4"
                  value={formData.breakTime}
                  onChange={(e) => updateFormData('breakTime', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.breakTime ? 'border-red-500' : ''}`}
                />
                {errors.breakTime && <p className="text-xs text-red-600 mt-1">{errors.breakTime}</p>}
              </div>
            </div>

            {/* Time Summary */}
            {totalHours > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-blue-900">Total Hours</div>
                    <div className="text-blue-700">{totalHours.toFixed(2)} hours</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">Regular/Overtime</div>
                    <div className="text-blue-700">
                      {Math.min(totalHours, 8).toFixed(2)}h / {overtimeHours.toFixed(2)}h
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">Total Cost</div>
                    <div className="text-blue-700">${cost.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Work Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Work Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task" className="text-xs">Primary Task *</Label>
                <Select value={formData.task} onValueChange={(value) => updateFormData('task', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.task ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map(task => (
                      <SelectItem key={task} value={task} className="text-xs">{task}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.task && <p className="text-xs text-red-600 mt-1">{errors.task}</p>}
              </div>
              
              <div>
                <Label htmlFor="location" className="text-xs">Work Location *</Label>
                <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                  <SelectTrigger className={`h-8 text-xs ${errors.location ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location} className="text-xs">{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <Label htmlFor="equipment" className="text-xs">Equipment Used</Label>
                <Input
                  id="equipment"
                  placeholder="Tractor, tools, etc."
                  value={formData.equipment}
                  onChange={(e) => updateFormData('equipment', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="field" className="text-xs">Specific Field/Area</Label>
                <Input
                  id="field"
                  placeholder="North section, Barn 2, etc."
                  value={formData.field}
                  onChange={(e) => updateFormData('field', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-xs">Work Notes</Label>
            <Textarea
              id="notes"
              placeholder="Describe work completed, issues encountered, etc."
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="text-xs"
              rows={3}
            />
          </div>

          {/* Cost Breakdown */}
          {selectedWorker && totalHours > 0 && (
            <Alert className="border-green-200 bg-green-50">
              <DollarSign className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-xs text-green-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Cost Breakdown:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Regular Hours: {Math.min(totalHours, 8).toFixed(2)}h × ${selectedWorker.rate} = ${(Math.min(totalHours, 8) * selectedWorker.rate).toFixed(2)}</li>
                      {overtimeHours > 0 && (
                        <li>Overtime Hours: {overtimeHours.toFixed(2)}h × ${(selectedWorker.rate * 1.5).toFixed(2)} = ${(overtimeHours * selectedWorker.rate * 1.5).toFixed(2)}</li>
                      )}
                      <li><strong>Total: ${cost.toFixed(2)}</strong></li>
                    </ul>
                  </div>
                  <div>
                    <strong>Worker Info:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Name: {selectedWorker.name}</li>
                      <li>Rate: ${selectedWorker.rate}/hour</li>
                      <li>Overtime Rate: ${(selectedWorker.rate * 1.5).toFixed(2)}/hour</li>
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Overtime Warning */}
          {overtimeHours > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-xs text-yellow-800">
                <strong>Overtime Alert:</strong> This worker will have {overtimeHours.toFixed(2)} hours of overtime, 
                which costs 1.5x the regular rate (${(selectedWorker?.rate || 0 * 1.5).toFixed(2)}/hour).
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-blue-600 hover:bg-blue-700">
            Save Time Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}