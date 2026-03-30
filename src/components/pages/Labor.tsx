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
  Users, 
  Clock, 
  DollarSign, 
  UserPlus, 
  CalendarDays,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  Plus,
  Calculator,
  Timer,
  Wrench
} from 'lucide-react';
import { LaborModal } from '../modals/LaborModal';
import { TimeTrackingModal } from '../modals/TimeTrackingModal';

export function Labor() {
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showTimeTracking, setShowTimeTracking] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [activeTab, setActiveTab] = useState('personnel');

  const personnelData = [
    {
      id: 'P001',
      name: 'Ramesh Kumar',
      type: 'hired',
      role: 'Farm Worker',
      specialization: 'Crop Management',
      hourlyRate: 153.55,        // ₹154/hr (converted from $18.50/hr)
      hoursThisWeek: 42,
      hoursThisMonth: 168,
      phone: '+91 98765 43210',
      email: 'ramesh.k@email.com',
      status: 'active',
      startDate: '2024-03-15',
      location: 'Field A',
      overtime: 2,
      weeklyCost: 6449,         // ₹6,449 (converted from $777)
      monthlyCost: 25796        // ₹25,796 (converted from $3,108)
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      type: 'own',
      role: 'Equipment Operator',
      specialization: 'Heavy Machinery',
      hourlyRate: 182.60,       // ₹183/hr (converted from $22.00/hr)
      hoursThisWeek: 40,
      hoursThisMonth: 160,
      phone: '+91 98765 43211',
      email: 'priya.s@farmco.com',
      status: 'active',
      startDate: '2022-06-10',
      location: 'Equipment Bay',
      overtime: 0,
      weeklyCost: 7304,         // ₹7,304 (converted from $880)
      monthlyCost: 29216        // ₹29,216 (converted from $3,520)
    },
    {
      id: 'P003',
      name: 'Suresh Patil',
      type: 'hired',
      role: 'Livestock Manager',
      specialization: 'Animal Care',
      hourlyRate: 166.00,       // ₹166/hr (converted from $20.00/hr)
      hoursThisWeek: 45,
      hoursThisMonth: 180,
      phone: '+91 98765 43212',
      email: 'suresh.p@email.com',
      status: 'active',
      startDate: '2024-01-20',
      location: 'Barn A',
      overtime: 5,
      weeklyCost: 7885,         // ₹7,885 (converted from $950)
      monthlyCost: 31125        // ₹31,125 (converted from $3,750)
    },
    {
      id: 'P004',
      name: 'Kavya Singh',
      type: 'hired',
      role: 'General Laborer',
      specialization: 'Multiple Tasks',
      hourlyRate: 132.80,       // ₹133/hr (converted from $16.00/hr)
      hoursThisWeek: 38,
      hoursThisMonth: 152,
      phone: '+91 98765 43213',
      email: 'kavya.s@email.com',
      status: 'on-leave',
      startDate: '2024-05-05',
      location: 'Greenhouse 1',
      overtime: 0,
      weeklyCost: 5046,         // ₹5,046 (converted from $608)
      monthlyCost: 20186        // ₹20,186 (converted from $2,432)
    },
    {
      id: 'P005',
      name: 'Vikram Singh',
      type: 'own',
      role: 'Farm Supervisor',
      specialization: 'Operations Management',
      hourlyRate: 232.40,       // ₹232/hr (converted from $28.00/hr)
      hoursThisWeek: 50,
      hoursThisMonth: 200,
      phone: '+91 98765 43214',
      email: 'vikram.s@farmco.com',
      status: 'active',
      startDate: '2020-02-15',
      location: 'Main Office',
      overtime: 10,
      weeklyCost: 12202,        // ₹12,202 (converted from $1,470)
      monthlyCost: 48808        // ₹48,808 (converted from $5,880)
    }
  ];

  const machineryUsageData = [
    {
      id: 'MU001',
      equipmentId: 'EQ001',
      equipmentName: 'Mahindra 8000',
      operator: 'Priya Sharma',
      operatorId: 'P002',
      date: '2024-08-09',
      startTime: '06:00',
      endTime: '14:00',
      totalHours: 8,
      field: 'Field A - Zone 1',
      task: 'Cultivation',
      fuelUsed: 48.5,
      operatingCost: 30212,     // ₹30,212 (converted from $364)
      operatorCost: 1461,      // ₹1,461 (converted from $176)
      totalCost: 31820,        // ₹31,820 (converted from $540)
      efficiency: 'good'
    },
    {
      id: 'MU002',
      equipmentId: 'EQ002',
      equipmentName: 'Sonalika DI-60',
      operator: 'Ramesh Kumar',
      operatorId: 'P001',
      date: '2024-08-08',
      startTime: '07:00',
      endTime: '16:00',
      totalHours: 9,
      field: 'Field B',
      task: 'Harvesting',
      fuelUsed: 85.2,
      operatingCost: 58452,     // ₹58,452 (converted from $704.25)
      operatorCost: 1382,      // ₹1,382 (converted from $166.50)
      totalCost: 72272,        // ₹72,272 (converted from $870.75)
      efficiency: 'excellent'
    },
    {
      id: 'MU003',
      equipmentId: 'EQ004',
      equipmentName: 'Kubota MU4501',
      operator: 'Suresh Patil',
      operatorId: 'P003',
      date: '2024-08-09',
      startTime: '08:00',
      endTime: '12:00',
      totalHours: 4,
      field: 'Pasture B',
      task: 'Feed Distribution',
      fuelUsed: 22.8,
      operatingCost: 10790,     // ₹10,790 (converted from $130)
      operatorCost: 664,       // ₹664 (converted from $80)
      totalCost: 17430,        // ₹17,430 (converted from $210)
      efficiency: 'good'
    }
  ];

  const timeLogsData = [
    {
      id: 'TL001',
      workerId: 'P001',
      workerName: 'Ramesh Kumar',
      date: '2024-08-09',
      clockIn: '06:00',
      clockOut: '14:30',
      breakTime: 0.5,
      totalHours: 8,
      overtimeHours: 0,
      task: 'Crop Cultivation',
      location: 'Field A',
      cost: 1228,             // ₹1,228 (converted from $148)
      approved: true
    },
    {
      id: 'TL002',
      workerId: 'P002',
      workerName: 'Priya Sharma',
      date: '2024-08-09',
      clockIn: '06:00',
      clockOut: '14:00',
      breakTime: 1,
      totalHours: 7,
      overtimeHours: 0,
      task: 'Equipment Operation',
      location: 'Field A',
      cost: 1278,             // ₹1,278 (converted from $154)
      approved: true
    },
    {
      id: 'TL003',
      workerId: 'P003',
      workerName: 'Suresh Patil',
      date: '2024-08-09',
      clockIn: '05:30',
      clockOut: '15:00',
      breakTime: 1,
      totalHours: 8.5,
      overtimeHours: 0.5,
      task: 'Livestock Care',
      location: 'Barn A',
      cost: 1473,             // ₹1,473 (converted from $177.50)
      approved: false
    }
  ];

  const personnelColumns = [
    {
      key: 'name',
      label: 'Worker',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.role}</div>
          <div className="flex items-center space-x-1 mt-1">
            <Badge className={`text-xs ${
              row.type === 'own' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {row.type === 'own' ? 'Employee' : 'Contractor'}
            </Badge>
          </div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Specialization',
      sortable: true,
      filterable: true
    },
    {
      key: 'hourlyRate',
      label: 'Hourly Rate',
      sortable: true,
      render: (value: number) => `${formatCurrency(Math.round(value))}/hr`
    },
    {
      key: 'hoursThisWeek',
      label: 'This Week',
      sortable: true,
      render: (value: number, row: any) => (
        <div>
          <div className="text-xs">{value}h</div>
          {row.overtime > 0 && (
            <div className="text-xs text-orange-600">+{row.overtime}h OT</div>
          )}
        </div>
      )
    },
    {
      key: 'hoursThisMonth',
      label: 'This Month',
      sortable: true,
      render: (value: number) => `${value}h`
    },
    {
      key: 'location',
      label: 'Current Location',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{value}</span>
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
      key: 'weeklyCost',
      label: 'Weekly Cost',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (value: string, row: any) => (
        <div className="text-xs">
          <div className="flex items-center space-x-1">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{value}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <Mail className="h-3 w-3 text-gray-400" />
            <span>{row.email}</span>
          </div>
        </div>
      )
    }
  ];

  const machineryColumns = [
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
      key: 'operator',
      label: 'Operator',
      sortable: true,
      filterable: true
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'totalHours',
      label: 'Hours',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div>{value}h</div>
          <div className="text-gray-500">{row.startTime} - {row.endTime}</div>
        </div>
      )
    },
    {
      key: 'field',
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
      key: 'task',
      label: 'Task',
      sortable: true,
      filterable: true
    },
    {
      key: 'fuelUsed',
      label: 'Fuel Used',
      sortable: true,
      render: (value: number) => `${value}L`
    },
    {
      key: 'efficiency',
      label: 'Efficiency',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'excellent' ? 'bg-green-100 text-green-800' :
          value === 'good' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'totalCost',
      label: 'Total Cost',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div className="font-medium">{formatCurrency(value)}</div>
          <div className="text-gray-500">
            Op: {formatCurrency(row.operatingCost)} | Labor: {formatCurrency(row.operatorCost)}
          </div>
        </div>
      )
    }
  ];

  const timeLogColumns = [
    {
      key: 'workerName',
      label: 'Worker',
      sortable: true,
      filterable: true
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'clockIn',
      label: 'Clock In/Out',
      render: (value: string, row: any) => (
        <div className="text-xs">
          <div>{value} - {row.clockOut}</div>
          <div className="text-gray-500">Break: {row.breakTime}h</div>
        </div>
      )
    },
    {
      key: 'totalHours',
      label: 'Hours',
      sortable: true,
      render: (value: number, row: any) => (
        <div className="text-xs">
          <div>Regular: {value - row.overtimeHours}h</div>
          {row.overtimeHours > 0 && (
            <div className="text-orange-600">OT: {row.overtimeHours}h</div>
          )}
        </div>
      )
    },
    {
      key: 'task',
      label: 'Task',
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
      key: 'cost',
      label: 'Cost',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'approved',
      label: 'Status',
      render: (value: boolean) => (
        <Badge className={`text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? 'Approved' : 'Pending'}
        </Badge>
      )
    }
  ];

  const laborStats = {
    totalWorkers: personnelData.length,
    activeWorkers: personnelData.filter(p => p.status === 'active').length,
    hiredWorkers: personnelData.filter(p => p.type === 'hired').length,
    ownWorkers: personnelData.filter(p => p.type === 'own').length,
    totalWeeklyHours: personnelData.reduce((sum, p) => sum + p.hoursThisWeek, 0),
    totalWeeklyCost: personnelData.reduce((sum, p) => sum + p.weeklyCost, 0),
    totalOvertimeHours: personnelData.reduce((sum, p) => sum + p.overtime, 0),
    avgHourlyRate: personnelData.reduce((sum, p) => sum + p.hourlyRate, 0) / personnelData.length
  };

  const machineryStats = {
    totalMachineHours: machineryUsageData.reduce((sum, m) => sum + m.totalHours, 0),
    totalMachineCost: machineryUsageData.reduce((sum, m) => sum + m.totalCost, 0),
    avgEfficiency: machineryUsageData.filter(m => m.efficiency === 'excellent').length / machineryUsageData.length * 100
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Labor & Resources</h1>
          <p className="text-sm text-gray-600">Manage personnel hours, costs, and machinery usage</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowTimeTracking(true)}
          >
            <Timer className="h-4 w-4 mr-1" />
            Time Tracking
          </Button>
          <Button 
            onClick={() => setShowAddWorker(true)}
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Add Worker
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Workers</p>
              <p className="text-2xl font-semibold text-gray-900">{laborStats.totalWorkers}</p>
              <p className="text-xs text-green-600">{laborStats.activeWorkers} active</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Weekly Hours</p>
              <p className="text-2xl font-semibold text-gray-900">{laborStats.totalWeeklyHours}</p>
              <p className="text-xs text-orange-600">{laborStats.totalOvertimeHours}h overtime</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Weekly Labor Cost</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(laborStats.totalWeeklyCost)}</p>
              <p className="text-xs text-blue-600">Avg: {formatCurrency(Math.round(laborStats.avgHourlyRate))}/hr</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Machine Hours</p>
              <p className="text-2xl font-semibold text-gray-900">{machineryStats.totalMachineHours}</p>
              <p className="text-xs text-blue-600">This week</p>
            </div>
            <Wrench className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Machine Cost</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(machineryStats.totalMachineCost)}</p>
              <p className="text-xs text-orange-600">Equipment + Labor</p>
            </div>
            <Calculator className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Efficiency</p>
              <p className="text-2xl font-semibold text-gray-900">{machineryStats.avgEfficiency.toFixed(0)}%</p>
              <p className="text-xs text-green-600">Excellent ratings</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Cost Analysis Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <TrendingUp className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-xs text-purple-800">
          <strong>Cost Analysis:</strong> Hired workers cost 15% less per hour but own employees show 25% higher productivity. 
          Consider converting high-performing contractors to full-time positions.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personnel" className="text-xs">Personnel Management</TabsTrigger>
          <TabsTrigger value="machinery" className="text-xs">Machinery Usage</TabsTrigger>
          <TabsTrigger value="timelogs" className="text-xs">Time Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="personnel" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <DataTable
                data={personnelData}
                columns={personnelColumns}
                title="Personnel Directory"
                searchPlaceholder="Search workers..."
                onAdd={() => setShowAddWorker(true)}
                onEdit={(worker) => setEditingWorker(worker)}
                onDelete={(worker) => console.log('Delete worker:', worker)}
              />
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">Worker Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Own Employees</span>
                      <span>{laborStats.ownWorkers}</span>
                    </div>
                    <Progress value={(laborStats.ownWorkers / laborStats.totalWorkers) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Hired Workers</span>
                      <span>{laborStats.hiredWorkers}</span>
                    </div>
                    <Progress value={(laborStats.hiredWorkers / laborStats.totalWorkers) * 100} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-base font-semibold mb-3">Specializations</h3>
                <div className="space-y-2">
                  {['Crop Management', 'Heavy Machinery', 'Animal Care', 'Multiple Tasks', 'Operations Management'].map(spec => {
                    const count = personnelData.filter(p => p.specialization === spec).length;
                    return (
                      <div key={spec} className="flex justify-between items-center text-xs">
                        <span>{spec}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="machinery" className="space-y-4">
          <DataTable
            data={machineryUsageData}
            columns={machineryColumns}
            title="Machinery Usage Logs"
            searchPlaceholder="Search machinery usage..."
            onAdd={() => console.log('Add machinery log')}
            onEdit={(log) => console.log('Edit log:', log)}
            onDelete={(log) => console.log('Delete log:', log)}
          />
        </TabsContent>

        <TabsContent value="timelogs" className="space-y-4">
          <DataTable
            data={timeLogsData}
            columns={timeLogColumns}
            title="Time Tracking Logs"
            searchPlaceholder="Search time logs..."
            onAdd={() => setShowTimeTracking(true)}
            onEdit={(log) => console.log('Edit time log:', log)}
            onDelete={(log) => console.log('Delete time log:', log)}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {(showAddWorker || editingWorker) && (
        <LaborModal
          worker={editingWorker}
          onClose={() => {
            setShowAddWorker(false);
            setEditingWorker(null);
          }}
        />
      )}

      {showTimeTracking && (
        <TimeTrackingModal
          onClose={() => setShowTimeTracking(false)}
        />
      )}
    </div>
  );
}