"use client";

import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { MapPin, Users, Wheat, TrendingUp } from 'lucide-react';
import { FarmModal } from '../modals/FarmModal';

export function Farms() {
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);

  const farmsData = [
    {
      id: 1,
      name: 'Green Valley Farm',
      location: 'California, USA',
      size: 145.5,
      manager: 'John Smith',
      crops: ['Corn', 'Wheat', 'Soybeans'],
      livestock: 85,
      status: 'active',
      revenue: 125000,
      lastInspection: '2024-08-05'
    },
    {
      id: 2,
      name: 'Sunrise Acres',
      location: 'Texas, USA',
      size: 89.2,
      manager: 'Sarah Johnson',
      crops: ['Cotton', 'Corn'],
      livestock: 45,
      status: 'active',
      revenue: 98000,
      lastInspection: '2024-08-03'
    },
    {
      id: 3,
      name: 'Mountain View Ranch',
      location: 'Colorado, USA',
      size: 234.8,
      manager: 'Mike Davis',
      crops: ['Wheat', 'Barley'],
      livestock: 156,
      status: 'pending',
      revenue: 156000,
      lastInspection: '2024-07-28'
    },
    {
      id: 4,
      name: 'Prairie Winds Farm',
      location: 'Nebraska, USA',
      size: 78.3,
      manager: 'Emily Wilson',
      crops: ['Corn', 'Soybeans'],
      livestock: 23,
      status: 'active',
      revenue: 67000,
      lastInspection: '2024-08-07'
    },
    {
      id: 5,
      name: 'Blue Ridge Organic',
      location: 'Virginia, USA',
      size: 56.7,
      manager: 'David Brown',
      crops: ['Organic Vegetables', 'Herbs'],
      livestock: 0,
      status: 'active',
      revenue: 89000,
      lastInspection: '2024-08-06'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Farm Name',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-gray-500 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {row.location}
          </div>
        </div>
      )
    },
    {
      key: 'size',
      label: 'Size (acres)',
      sortable: true,
      render: (value: number) => `${value} acres`
    },
    {
      key: 'manager',
      label: 'Manager',
      sortable: true,
      filterable: true
    },
    {
      key: 'crops',
      label: 'Crops',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map(crop => (
            <Badge key={crop} variant="secondary" className="text-xs bg-green-100 text-green-800">
              {crop}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'livestock',
      label: 'Livestock',
      sortable: true,
      render: (value: number) => value > 0 ? `${value} animals` : 'None'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    {
      key: 'lastInspection',
      label: 'Last Inspection',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const totalStats = {
    totalFarms: farmsData.length,
    totalAcres: farmsData.reduce((sum, farm) => sum + farm.size, 0),
    totalRevenue: farmsData.reduce((sum, farm) => sum + farm.revenue, 0),
    activeFarms: farmsData.filter(farm => farm.status === 'active').length
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Farms Management</h1>
          <p className="text-sm text-gray-600">Manage all your farm locations and properties</p>
        </div>
        <Button 
          onClick={() => setShowAddFarm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          Add New Farm
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Farms</p>
              <p className="text-2xl font-semibold text-gray-900">{totalStats.totalFarms}</p>
              <p className="text-xs text-green-600">{totalStats.activeFarms} active</p>
            </div>
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Acres</p>
              <p className="text-2xl font-semibold text-gray-900">{totalStats.totalAcres.toFixed(1)}</p>
              <p className="text-xs text-blue-600">Across all farms</p>
            </div>
            <Wheat className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${(totalStats.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-green-600">This year</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Farm Size</p>
              <p className="text-2xl font-semibold text-gray-900">{(totalStats.totalAcres / totalStats.totalFarms).toFixed(1)}</p>
              <p className="text-xs text-blue-600">acres per farm</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Farms Table */}
      <DataTable
        data={farmsData}
        columns={columns}
        title="All Farms"
        searchPlaceholder="Search farms..."
        onAdd={() => setShowAddFarm(true)}
        onEdit={(farm) => setEditingFarm(farm)}
        onDelete={(farm) => console.log('Delete farm:', farm)}
      />

      {/* Add/Edit Farm Modal */}
      {(showAddFarm || editingFarm) && (
        <FarmModal
          farm={editingFarm}
          onClose={() => {
            setShowAddFarm(false);
            setEditingFarm(null);
          }}
        />
      )}
    </div>
  );
}