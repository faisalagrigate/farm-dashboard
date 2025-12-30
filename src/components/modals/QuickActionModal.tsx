import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { MapPin, Droplets, FileText, Bell, Clock } from 'lucide-react';

interface QuickActionModalProps {
  type: string;
  onClose: () => void;
}

export function QuickActionModal({ type, onClose }: QuickActionModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    switch (type) {
      case 'farm':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-green-600" />
              <h3 className="text-base font-semibold">Add New Farm</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName" className="text-xs">Farm Name</Label>
                <Input
                  id="farmName"
                  placeholder="Enter farm name"
                  value={formData.farmName || ''}
                  onChange={(e) => updateFormData('farmName', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-xs">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="size" className="text-xs">Size (acres)</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="0"
                  value={formData.size || ''}
                  onChange={(e) => updateFormData('size', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="manager" className="text-xs">Manager</Label>
                <Input
                  id="manager"
                  placeholder="Manager name"
                  value={formData.manager || ''}
                  onChange={(e) => updateFormData('manager', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea
                id="description"
                placeholder="Farm description..."
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="text-xs"
                rows={3}
              />
            </div>
          </div>
        );

      case 'irrigation':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold">Schedule Irrigation</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zone" className="text-xs">Zone/Field</Label>
                <Select value={formData.zone || ''} onValueChange={(value) => updateFormData('zone', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-a-1" className="text-xs">Field A - Zone 1</SelectItem>
                    <SelectItem value="field-a-2" className="text-xs">Field A - Zone 2</SelectItem>
                    <SelectItem value="field-b-1" className="text-xs">Field B - Zone 1</SelectItem>
                    <SelectItem value="greenhouse-1" className="text-xs">Greenhouse 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration" className="text-xs">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={formData.duration || ''}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="startTime" className="text-xs">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={formData.startTime || ''}
                  onChange={(e) => updateFormData('startTime', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="frequency" className="text-xs">Frequency</Label>
                <Select value={formData.frequency || ''} onValueChange={(value) => updateFormData('frequency', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once" className="text-xs">Once</SelectItem>
                    <SelectItem value="daily" className="text-xs">Daily</SelectItem>
                    <SelectItem value="weekly" className="text-xs">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">AI Recommendation</Badge>
              </div>
              <p className="text-xs text-blue-800">
                Based on current soil moisture (38%) and weather forecast, we recommend 45 minutes of irrigation starting at 6:00 AM.
              </p>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-semibold">Generate Report</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportType" className="text-xs">Report Type</Label>
                <Select value={formData.reportType || ''} onValueChange={(value) => updateFormData('reportType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production" className="text-xs">Production Summary</SelectItem>
                    <SelectItem value="financial" className="text-xs">Financial Analysis</SelectItem>
                    <SelectItem value="environmental" className="text-xs">Environmental Impact</SelectItem>
                    <SelectItem value="livestock" className="text-xs">Livestock Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period" className="text-xs">Time Period</Label>
                <Select value={formData.period || ''} onValueChange={(value) => updateFormData('period', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week" className="text-xs">Last 7 days</SelectItem>
                    <SelectItem value="month" className="text-xs">Last 30 days</SelectItem>
                    <SelectItem value="quarter" className="text-xs">Last quarter</SelectItem>
                    <SelectItem value="year" className="text-xs">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="farms" className="text-xs">Farms to Include</Label>
                <Select value={formData.farms || ''} onValueChange={(value) => updateFormData('farms', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select farms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs">All Farms</SelectItem>
                    <SelectItem value="green-valley" className="text-xs">Green Valley Farm</SelectItem>
                    <SelectItem value="sunrise-acres" className="text-xs">Sunrise Acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="format" className="text-xs">Format</Label>
                <Select value={formData.format || ''} onValueChange={(value) => updateFormData('format', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf" className="text-xs">PDF</SelectItem>
                    <SelectItem value="excel" className="text-xs">Excel</SelectItem>
                    <SelectItem value="csv" className="text-xs">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-orange-600" />
              <h3 className="text-base font-semibold">Send Alert</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="alertType" className="text-xs">Alert Type</Label>
                <Select value={formData.alertType || ''} onValueChange={(value) => updateFormData('alertType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency" className="text-xs">Emergency</SelectItem>
                    <SelectItem value="maintenance" className="text-xs">Maintenance Required</SelectItem>
                    <SelectItem value="weather" className="text-xs">Weather Warning</SelectItem>
                    <SelectItem value="system" className="text-xs">System Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="recipients" className="text-xs">Recipients</Label>
                <Select value={formData.recipients || ''} onValueChange={(value) => updateFormData('recipients', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-managers" className="text-xs">All Farm Managers</SelectItem>
                    <SelectItem value="specific-farm" className="text-xs">Specific Farm Team</SelectItem>
                    <SelectItem value="maintenance" className="text-xs">Maintenance Team</SelectItem>
                    <SelectItem value="custom" className="text-xs">Custom Recipients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-xs">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your alert message..."
                  value={formData.message || ''}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  className="text-xs"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="urgent"
                  checked={formData.urgent || false}
                  onChange={(e) => updateFormData('urgent', e.target.checked)}
                  className="h-3 w-3"
                />
                <Label htmlFor="urgent" className="text-xs">Mark as urgent</Label>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown action type</div>;
    }
  };

  const getActionLabel = () => {
    switch (type) {
      case 'farm': return 'Add Farm';
      case 'irrigation': return 'Schedule Irrigation';
      case 'report': return 'Generate Report';
      case 'alert': return 'Send Alert';
      default: return 'Submit';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Quick Action</DialogTitle>
        </DialogHeader>
        
        {renderContent()}
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={onClose} size="sm" className="bg-blue-600 hover:bg-blue-700">
            {getActionLabel()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}