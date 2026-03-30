import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency } from '../ui/currency-utils';
import { DollarSign, Calculator } from 'lucide-react';

interface Sale {
  id?: string;
  saleDate: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalRevenue: number;
  buyer: string;
  buyerContact: string;
  contractType: string;
  paymentStatus: string;
  paymentDate: string;
  field: string;
  qualityGrade: string;
  moistureContent: number;
  proteinContent: number;
  transportCost: number;
  commissionFee: number;
  netRevenue: number;
  costOfProduction: number;
  grossProfit: number;
  profitMargin: number;
  notes: string;
}

interface SaleModalProps {
  sale?: Sale | null;
  onClose: () => void;
}

const crops = [
  { name: 'Wheat', varieties: ['HD-2967', 'PBW-343', 'WH-147', 'HD-3086'] },
  { name: 'Rice', varieties: ['Basmati 1121', 'IR-64', 'Swarna', 'Pusa Basmati'] },
  { name: 'Cotton', varieties: ['BT Cotton', 'Desi Cotton', 'Hybrid Cotton'] },
  { name: 'Sugarcane', varieties: ['CoM 0265', 'Co 86032', 'CoM 88230'] },
  { name: 'Soybeans', varieties: ['JS 335', 'MACS 450', 'JS 9305'] },
  { name: 'Maize', varieties: ['HQPM-1', 'Shaktiman-1', 'DHM-117'] }
];

const contractTypes = ['Spot Sale', 'Forward Contract', 'Premium Contract', 'Direct Sale', 'Futures Contract', 'Pool Contract'];
const qualityGrades = ['Premium', 'Export Grade', 'Standard', 'Feed', 'Organic Certified', 'Food Grade'];
const units = ['quintals', 'tonnes', 'kg'];

export function SaleModal({ sale, onClose }: SaleModalProps) {
  const [formData, setFormData] = useState<Partial<Sale>>({
    saleDate: new Date().toISOString().split('T')[0],
    crop: '',
    variety: '',
    quantity: 0,
    unit: 'quintals',
    pricePerUnit: 0,
    totalRevenue: 0,
    buyer: '',
    buyerContact: '',
    contractType: 'Spot Sale',
    paymentStatus: 'pending',
    paymentDate: '',
    field: '',
    qualityGrade: 'Standard',
    moistureContent: 0,
    proteinContent: 0,
    transportCost: 0,
    commissionFee: 0,
    netRevenue: 0,
    costOfProduction: 0,
    grossProfit: 0,
    profitMargin: 0,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sale) {
      setFormData(sale);
    }
  }, [sale]);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value };
      
      // Auto-calculate derived values
      if (key === 'quantity' || key === 'pricePerUnit') {
        updated.totalRevenue = (updated.quantity || 0) * (updated.pricePerUnit || 0);
      }
      
      if (key === 'totalRevenue' || key === 'transportCost' || key === 'commissionFee') {
        const totalRev = updated.totalRevenue || 0;
        const transport = updated.transportCost || 0;
        const commission = updated.commissionFee || 0;
        updated.netRevenue = totalRev - transport - commission;
      }
      
      if (key === 'netRevenue' || key === 'costOfProduction') {
        const netRev = updated.netRevenue || 0;
        const cost = updated.costOfProduction || 0;
        updated.grossProfit = netRev - cost;
        updated.profitMargin = netRev > 0 ? (updated.grossProfit / netRev) * 100 : 0;
      }
      
      return updated;
    });
    
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.saleDate) newErrors.saleDate = 'Sale date is required';
    if (!formData.crop) newErrors.crop = 'Crop type is required';
    if (!formData.variety) newErrors.variety = 'Variety is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) newErrors.pricePerUnit = 'Price per unit must be greater than 0';
    if (!formData.buyer?.trim()) newErrors.buyer = 'Buyer name is required';
    if (!formData.buyerContact?.trim()) newErrors.buyerContact = 'Buyer contact is required';
    if (!formData.field) newErrors.field = 'Field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Saving sale:', formData);
      onClose();
    }
  };

  const getVarietiesForCrop = (cropName: string) => {
    const crop = crops.find(c => c.name === cropName);
    return crop ? crop.varieties : [];
  };

  const selectedCropVarieties = getVarietiesForCrop(formData.crop || '');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>{sale ? 'Edit Sale Record' : 'Add New Sale'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Sale Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Sale Details</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="saleDate" className="text-xs">Sale Date *</Label>
                <Input
                  id="saleDate"
                  type="date"
                  value={formData.saleDate || ''}
                  onChange={(e) => updateFormData('saleDate', e.target.value)}
                  className={`h-8 text-xs ${errors.saleDate ? 'border-red-500' : ''}`}
                />
                {errors.saleDate && <p className="text-xs text-red-600 mt-1">{errors.saleDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="crop" className="text-xs">Crop Type *</Label>
                <Select value={formData.crop || ''} onValueChange={(value) => {
                  updateFormData('crop', value);
                  updateFormData('variety', '');
                }}>
                  <SelectTrigger className={`h-8 text-xs ${errors.crop ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(crop => (
                      <SelectItem key={crop.name} value={crop.name} className="text-xs">{crop.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.crop && <p className="text-xs text-red-600 mt-1">{errors.crop}</p>}
              </div>
              
              <div>
                <Label htmlFor="variety" className="text-xs">Variety *</Label>
                <Select 
                  value={formData.variety || ''} 
                  onValueChange={(value) => updateFormData('variety', value)}
                  disabled={!formData.crop}
                >
                  <SelectTrigger className={`h-8 text-xs ${errors.variety ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select variety" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCropVarieties.map(variety => (
                      <SelectItem key={variety} value={variety} className="text-xs">{variety}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.variety && <p className="text-xs text-red-600 mt-1">{errors.variety}</p>}
              </div>
              
              <div>
                <Label htmlFor="field" className="text-xs">Field *</Label>
                <Input
                  id="field"
                  placeholder="Field location"
                  value={formData.field || ''}
                  onChange={(e) => updateFormData('field', e.target.value)}
                  className={`h-8 text-xs ${errors.field ? 'border-red-500' : ''}`}
                />
                {errors.field && <p className="text-xs text-red-600 mt-1">{errors.field}</p>}
              </div>
            </div>
          </div>

          {/* Quantity and Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Quantity & Pricing</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="quantity" className="text-xs">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.quantity || ''}
                  onChange={(e) => updateFormData('quantity', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.quantity ? 'border-red-500' : ''}`}
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>}
              </div>
              
              <div>
                <Label htmlFor="unit" className="text-xs">Unit</Label>
                <Select value={formData.unit || 'quintals'} onValueChange={(value) => updateFormData('unit', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit} className="text-xs">{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="pricePerUnit" className="text-xs">Price per {formData.unit} (₹) *</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  step="1"
                  min="0"
                  value={formData.pricePerUnit || ''}
                  onChange={(e) => updateFormData('pricePerUnit', parseFloat(e.target.value) || 0)}
                  className={`h-8 text-xs ${errors.pricePerUnit ? 'border-red-500' : ''}`}
                />
                {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
              </div>
              
              <div>
                <Label htmlFor="totalRevenue" className="text-xs">Total Revenue (₹)</Label>
                <Input
                  id="totalRevenue"
                  type="number"
                  value={formData.totalRevenue?.toFixed(0) || '0'}
                  readOnly
                  className="h-8 text-xs bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
              </div>
            </div>
          </div>

          {/* Buyer and Contract Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Buyer Information</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="buyer" className="text-xs">Buyer Name *</Label>
                <Input
                  id="buyer"
                  placeholder="Company or individual name"
                  value={formData.buyer || ''}
                  onChange={(e) => updateFormData('buyer', e.target.value)}
                  className={`h-8 text-xs ${errors.buyer ? 'border-red-500' : ''}`}
                />
                {errors.buyer && <p className="text-xs text-red-600 mt-1">{errors.buyer}</p>}
              </div>
              
              <div>
                <Label htmlFor="buyerContact" className="text-xs">Buyer Contact *</Label>
                <Input
                  id="buyerContact"
                  placeholder="Phone or email"
                  value={formData.buyerContact || ''}
                  onChange={(e) => updateFormData('buyerContact', e.target.value)}
                  className={`h-8 text-xs ${errors.buyerContact ? 'border-red-500' : ''}`}
                />
                {errors.buyerContact && <p className="text-xs text-red-600 mt-1">{errors.buyerContact}</p>}
              </div>
              
              <div>
                <Label htmlFor="contractType" className="text-xs">Contract Type</Label>
                <Select value={formData.contractType || 'Spot Sale'} onValueChange={(value) => updateFormData('contractType', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map(type => (
                      <SelectItem key={type} value={type} className="text-xs">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Quality and Payment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Quality & Payment</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="qualityGrade" className="text-xs">Quality Grade</Label>
                <Select value={formData.qualityGrade || 'Standard'} onValueChange={(value) => updateFormData('qualityGrade', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityGrades.map(grade => (
                      <SelectItem key={grade} value={grade} className="text-xs">{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="moistureContent" className="text-xs">Moisture (%)</Label>
                <Input
                  id="moistureContent"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.moistureContent || ''}
                  onChange={(e) => updateFormData('moistureContent', parseFloat(e.target.value) || 0)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor="paymentStatus" className="text-xs">Payment Status</Label>
                <Select value={formData.paymentStatus || 'pending'} onValueChange={(value) => updateFormData('paymentStatus', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                    <SelectItem value="paid" className="text-xs">Paid</SelectItem>
                    <SelectItem value="overdue" className="text-xs">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.paymentStatus === 'paid' && (
                <div>
                  <Label htmlFor="paymentDate" className="text-xs">Payment Date</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate || ''}
                    onChange={(e) => updateFormData('paymentDate', e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Costs and Profit */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-1">Cost Analysis</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="transportCost" className="text-xs">Transport Cost (₹)</Label>
                  <Input
                    id="transportCost"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.transportCost || ''}
                    onChange={(e) => updateFormData('transportCost', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="commissionFee" className="text-xs">Commission Fee (₹)</Label>
                  <Input
                    id="commissionFee"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.commissionFee || ''}
                    onChange={(e) => updateFormData('commissionFee', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="costOfProduction" className="text-xs">Cost of Production (₹)</Label>
                  <Input
                    id="costOfProduction"
                    type="number"
                    step="1"
                    min="0"
                    value={formData.costOfProduction || ''}
                    onChange={(e) => updateFormData('costOfProduction', parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-900 mb-3">Financial Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Gross Revenue:</span>
                    <span>{formatCurrency(formData.totalRevenue || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Revenue:</span>
                    <span>{formatCurrency(formData.netRevenue || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Profit:</span>
                    <span className="font-medium text-green-700">{formatCurrency(formData.grossProfit || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit Margin:</span>
                    <span className="font-medium text-green-700">{(formData.profitMargin || 0).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-xs">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Quality notes, delivery terms, special conditions, etc."
              value={formData.notes || ''}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="text-xs"
              rows={2}
            />
          </div>

          {/* Financial Summary Alert */}
          {formData.totalRevenue && formData.totalRevenue > 0 && (
            <Alert className="border-green-200 bg-green-50">
              <Calculator className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-xs text-green-800">
                <strong>Sale Summary:</strong> Revenue of {formatCurrency(formData.totalRevenue || 0)} 
                with {formatCurrency(formData.grossProfit || 0)} profit 
                ({(formData.profitMargin || 0).toFixed(1)}% margin) 
                at {formatCurrency(formData.pricePerUnit || 0)} per {formData.unit}.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-green-600 hover:bg-green-700">
            {sale ? 'Update Sale' : 'Add Sale'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}