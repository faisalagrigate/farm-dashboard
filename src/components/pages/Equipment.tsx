"use client";

import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency, formatCurrencyCompact } from '../ui/currency-utils';
import { 
  Wrench, 
  Truck, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MapPin,
  Plus,
  Settings,
  Fuel,
  Activity
} from 'lucide-react';
import { EquipmentModal } from '../modals/EquipmentModal';

export function Equipment() {
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');

  const equipmentData = [
    {
      id: 'EQ001',
      name: 'Mahindra 8000',
      type: 'Tractor',
      category: 'Heavy Machinery',
      model: '8000',
      brand: 'Mahindra',
      year: 2020,
      serialNumber: 'MH8000-2020001',
      status: 'operational',
      location: 'Barn A',
      purchasePrice: 2367500,    // ৳23.67L
      currentValue: 2035750,     // ৳20.36L
      hoursUsed: 1245,
      fuelEfficiency: 18.5,
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-09-15',
      maintenanceCost: 124500,   // ৳1.24L
      operatingCost: 377.75,     // ৳378/hr
      condition: 'excellent'
    },
    {
      id: 'EQ002',
      name: 'Sonalika DI-60',
      type: 'Combine Harvester',
      category: 'Heavy Machinery',
      model: 'DI-60',
      brand: 'Sonalika',
      year: 2019,
      serialNumber: 'SL60001',
      status: 'operational',
      location: 'Field Storage',
      purchasePrice: 4316000,    // ৳43.16L
      currentValue: 3486000,     // ৳34.86L
      hoursUsed: 890,
      fuelEfficiency: 12.3,
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-10-01',
      maintenanceCost: 232400,   // ৳2.32L
      operatingCost: 649.28,     // ৳649/hr
      condition: 'good'
    },
    {
      id: 'EQ003',
      name: 'Tafe 9500 DI',
      type: 'Tractor',
      category: 'Heavy Machinery',
      model: '9500 DI',
      brand: 'TAFE',
      year: 2018,
      serialNumber: 'TF9500001',
      status: 'maintenance',
      location: 'Service Bay',
      purchasePrice: 2282500,    // ৳22.83L
      currentValue: 1535500,     // ৳15.36L
      hoursUsed: 2156,
      fuelEfficiency: 16.8,
      lastMaintenance: '2024-08-05',
      nextMaintenance: '2024-08-20',
      maintenanceCost: 182600,   // ৳1.83L
      operatingCost: 437.83,     // ৳438/hr
      condition: 'fair'
    },
    {
      id: 'EQ004',
      name: 'Kubota MU4501',
      type: 'Utility Tractor',
      category: 'Medium Machinery',
      model: 'MU4501',
      brand: 'Kubota',
      year: 2021,
      serialNumber: 'KU4501001',
      status: 'operational',
      location: 'Greenhouse Area',
      purchasePrice: 1203500,    // ৳12.04L
      currentValue: 1037500,     // ৳10.38L
      hoursUsed: 756,
      fuelEfficiency: 22.1,
      lastMaintenance: '2024-07-20',
      nextMaintenance: '2024-09-20',
      maintenanceCost: 70550,    // ৳71K
      operatingCost: 269.75,     // ৳270/hr
      condition: 'excellent'
    },
    {
      id: 'EQ005',
      name: 'Maruti Suzuki Utility',
      type: 'Utility Vehicle',
      category: 'Light Equipment',
      model: 'Super Carry',
      brand: 'Maruti Suzuki',
      year: 2022,
      serialNumber: 'MS2022001',
      status: 'out-of-service',
      location: 'Repair Shop',
      purchasePrice: 153550,     // ৳1.54L
      currentValue: 132800,      // ৳1.33L
      hoursUsed: 445,
      fuelEfficiency: 35.2,
      lastMaintenance: '2024-08-08',
      nextMaintenance: '2024-08-15',
      maintenanceCost: 23240,    // ৳23K
      operatingCost: 101.68,     // ৳102/hr
      condition: 'poor'
    }
  ];

  const maintenanceData = [
    {
      id: 'M001',
      equipmentId: 'EQ001',
      equipmentName: 'Mahindra 8000',
      type: 'Scheduled',
      description: 'Oil change and filter replacement',
      scheduledDate: '2024-09-15',
      status: 'pending',
      technician: 'Karim Ahmed',
      estimatedCost: 7055,      // ৳7,055
      estimatedHours: 3
    },
    {
      id: 'M002',
      equipmentId: 'EQ003',
      equipmentName: 'Tafe 9500 DI',
      type: 'Repair',
      description: 'Hydraulic pump replacement',
      scheduledDate: '2024-08-20',
      status: 'in-progress',
      technician: 'Rahim Hossain',
      estimatedCost: 265600,    // ৳2,65,600
      estimatedHours: 8
    },
    {
      id: 'M003',
      equipmentId: 'EQ005',
      equipmentName: 'Maruti Suzuki Utility',
      type: 'Emergency',
      description: 'Engine diagnostics and repair',
      scheduledDate: '2024-08-15',
      status: 'pending',
      technician: 'Abdul Jabbar',
      estimatedCost: 124500,    // ৳1,24,500
      estimatedHours: 6
    }
  ];

  const equipmentColumns = [
    {
      key: 'name',
      label: 'Equipment',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.brand} {row.model} ({row.year})</div>
          <div className="text-gray-400 text-xs">SN: {row.serialNumber}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <Badge className={`text-xs mb-1 ${
            row.category === 'Heavy Machinery' ? 'bg-red-100 text-red-800' :
            row.category === 'Medium Machinery' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {value}
          </Badge>
          <div className="text-xs text-gray-500">{row.category}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{value}</span>
        </div>
      )
    },
    {
      key: 'hoursUsed',
      label: 'Usage Hours',
      sortable: true,
      render: (value: number) => (
        <div className="text-xs">
          <div>{value.toLocaleString()} hrs</div>
          <div className="text-gray-500">Total runtime</div>
        </div>
      )
    },
    {
      key: 'condition',
      label: 'Condition',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'excellent' ? 'bg-green-100 text-green-800' :
          value === 'good' ? 'bg-blue-100 text-blue-800' :
          value === 'fair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'currentValue',
      label: 'Current Value',
      sortable: true,
      render: (value: number) => formatCurrencyCompact(value)
    },
    {
      key: 'nextMaintenance',
      label: 'Next Maintenance',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    }
  ];

  const maintenanceColumns = [
    {
      key: 'equipmentName',
      label: 'Equipment',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.equipmentId}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'Emergency' ? 'bg-red-100 text-red-800' :
          value === 'Repair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'description',
      label: 'Description',
      filterable: true
    },
    {
      key: 'scheduledDate',
      label: 'Scheduled Date',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true
    },
    {
      key: 'technician',
      label: 'Technician',
      sortable: true,
      filterable: true
    },
    {
      key: 'estimatedCost',
      label: 'Est. Cost',
      sortable: true,
      render: (value: number) => formatCurrencyCompact(value)
    },
    {
      key: 'estimatedHours',
      label: 'Est. Hours',
      sortable: true,
      render: (value: number) => `${value}h`
    }
  ];

  const equipmentStats = {
    total: equipmentData.length,
    operational: equipmentData.filter(e => e.status === 'operational').length,
    maintenance: equipmentData.filter(e => e.status === 'maintenance').length,
    outOfService: equipmentData.filter(e => e.status === 'out-of-service').length,
    totalValue: equipmentData.reduce((sum, e) => sum + e.currentValue, 0),
    avgHours: Math.round(equipmentData.reduce((sum, e) => sum + e.hoursUsed, 0) / equipmentData.length),
    monthlyMaintenanceCost: maintenanceData.reduce((sum, m) => sum + m.estimatedCost, 0)
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Equipment Management</h1>
          <p className="text-sm text-gray-600">Manage farm machinery, tools, and equipment inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Maintenance Schedule
          </Button>
          <Button 
            onClick={() => setShowAddEquipment(true)}
            size="sm" 
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Equipment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Equipment</p>
              <p className="text-2xl font-semibold text-gray-900">{equipmentStats.total}</p>
              <p className="text-xs text-green-600">{equipmentStats.operational} operational</p>
            </div>
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Fleet Value</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(equipmentStats.totalValue)}</p>
              <p className="text-xs text-blue-600">Current market value</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Usage</p>
              <p className="text-2xl font-semibold text-gray-900">{equipmentStats.avgHours}</p>
              <p className="text-xs text-blue-600">hours per equipment</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">In Maintenance</p>
              <p className="text-2xl font-semibold text-yellow-600">{equipmentStats.maintenance}</p>
              <p className="text-xs text-yellow-600">units being serviced</p>
            </div>
            <Wrench className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Monthly Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(equipmentStats.monthlyMaintenanceCost)}</p>
              <p className="text-xs text-orange-600">estimated costs</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-xs text-red-800">
            <strong>Maruti Suzuki Utility</strong> has been out of service for 3 days. Engine repair needed.
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-xs text-yellow-800">
            <strong>Mahindra 8000</strong> maintenance due in 7 days. Schedule service appointment.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <Fuel className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-800">
            <strong>Fuel efficiency</strong> has decreased by 8% across the fleet this month.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory" className="text-xs">Equipment Inventory</TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <DataTable
            data={equipmentData}
            columns={equipmentColumns}
            title="Equipment Fleet"
            searchPlaceholder="Search equipment..."
            onAdd={() => setShowAddEquipment(true)}
            onEdit={(equipment) => setEditingEquipment(equipment)}
            onDelete={(equipment) => console.log('Delete equipment:', equipment)}
          />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <DataTable
            data={maintenanceData}
            columns={maintenanceColumns}
            title="Maintenance Schedule"
            searchPlaceholder="Search maintenance tasks..."
            onAdd={() => console.log('Add maintenance task')}
            onEdit={(task) => console.log('Edit task:', task)}
            onDelete={(task) => console.log('Delete task:', task)}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">Equipment Utilization</h3>
              <div className="space-y-3">
                {equipmentData.map((equipment) => (
                  <div key={equipment.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{equipment.name}</span>
                      <span>{equipment.hoursUsed} hrs</span>
                    </div>
                    <Progress 
                      value={Math.min((equipment.hoursUsed / 3000) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">Cost Analysis</h3>
              <div className="space-y-3">
                {equipmentData.map((equipment) => (
                  <div key={equipment.id} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                    <div>
                      <div className="font-medium">{equipment.name}</div>
                      <div className="text-gray-500">{formatCurrency(Math.round(equipment.operatingCost))}/hr operating cost</div>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrencyCompact(equipment.maintenanceCost)}</div>
                      <div className="text-gray-500">maintenance cost</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">Equipment by Category</h3>
              <div className="space-y-2">
                {['Heavy Machinery', 'Medium Machinery', 'Light Equipment'].map(category => {
                  const count = equipmentData.filter(e => e.category === category).length;
                  const value = equipmentData
                    .filter(e => e.category === category)
                    .reduce((sum, e) => sum + e.currentValue, 0);
                  
                  return (
                    <div key={category} className="flex justify-between items-center text-xs">
                      <span>{category}</span>
                      <div className="text-right">
                        <div>{count} units</div>
                        <div className="text-gray-500">{formatCurrencyCompact(value)} value</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-base font-semibold mb-3">Efficiency Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span>Fleet Availability</span>
                  <span className="text-green-600">
                    {Math.round((equipmentStats.operational / equipmentStats.total) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg Fuel Efficiency</span>
                  <span className="text-blue-600">
                    {(equipmentData.reduce((sum, e) => sum + e.fuelEfficiency, 0) / equipmentData.length).toFixed(1)} L/hr
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Maintenance Cost Ratio</span>
                  <span className="text-orange-600">
                    {((equipmentData.reduce((sum, e) => sum + e.maintenanceCost, 0) / equipmentStats.totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Depreciation Rate</span>
                  <span className="text-red-600">12.5% annually</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Equipment Modal */}
      {(showAddEquipment || editingEquipment) && (
        <EquipmentModal
          equipment={editingEquipment}
          onClose={() => {
            setShowAddEquipment(false);
            setEditingEquipment(null);
          }}
        />
      )}
    </div>
  );
}