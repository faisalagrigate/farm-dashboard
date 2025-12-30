import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Wheat, Droplets, Thermometer, TrendingUp, Calendar, MapPin } from 'lucide-react';

export function Crops() {
  const cropsData = [
    {
      id: 'C001',
      name: 'Corn',
      variety: 'Sweet Corn',
      field: 'Field A - Zone 1',
      area: 25.5,
      plantedDate: '2024-04-15',
      expectedHarvest: '2024-09-15',
      currentStage: 'Flowering',
      health: 'Good',
      yieldEstimate: 180,
      soilMoisture: 45,
      temperature: 24,
      lastWatered: '2024-08-08'
    },
    {
      id: 'C002',
      name: 'Wheat',
      variety: 'Winter Wheat',
      field: 'Field B - Zone 1',
      area: 35.2,
      plantedDate: '2024-03-20',
      expectedHarvest: '2024-08-20',
      currentStage: 'Ripening',
      health: 'Excellent',
      yieldEstimate: 220,
      soilMoisture: 38,
      temperature: 26,
      lastWatered: '2024-08-07'
    },
    {
      id: 'C003',
      name: 'Soybeans',
      variety: 'Non-GMO',
      field: 'Field A - Zone 2',
      area: 18.7,
      plantedDate: '2024-05-10',
      expectedHarvest: '2024-10-10',
      currentStage: 'Pod Development',
      health: 'Fair',
      yieldEstimate: 150,
      soilMoisture: 32,
      temperature: 25,
      lastWatered: '2024-08-06'
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Crop',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.variety}</div>
        </div>
      )
    },
    {
      key: 'field',
      label: 'Location',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs">{value}</span>
          </div>
          <div className="text-gray-500 text-xs">{row.area} acres</div>
        </div>
      )
    },
    {
      key: 'currentStage',
      label: 'Growth Stage',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className="text-xs bg-green-100 text-green-800">{value}</Badge>
      )
    },
    {
      key: 'health',
      label: 'Health Status',
      sortable: true,
      filterable: true
    },
    {
      key: 'soilMoisture',
      label: 'Soil Moisture',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Droplets className="h-3 w-3 text-blue-500" />
          <span className="text-xs">{value}%</span>
        </div>
      )
    },
    {
      key: 'temperature',
      label: 'Temperature',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Thermometer className="h-3 w-3 text-red-500" />
          <span className="text-xs">{value}°C</span>
        </div>
      )
    },
    {
      key: 'yieldEstimate',
      label: 'Est. Yield',
      sortable: true,
      render: (value: number) => `${value} bu/acre`
    },
    {
      key: 'expectedHarvest',
      label: 'Harvest Date',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Crops & Fields</h1>
          <p className="text-sm text-gray-600">Monitor crop health and field conditions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Wheat className="h-4 w-4 mr-1" />
          Add Crop
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Fields</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-green-600">79.4 acres</p>
            </div>
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Yield Est.</p>
              <p className="text-2xl font-semibold text-gray-900">183</p>
              <p className="text-xs text-blue-600">bu/acre</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Soil Moisture</p>
              <p className="text-2xl font-semibold text-gray-900">38%</p>
              <p className="text-xs text-blue-600">Optimal range</p>
            </div>
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Temperature</p>
              <p className="text-2xl font-semibold text-gray-900">25°C</p>
              <p className="text-xs text-orange-600">Good conditions</p>
            </div>
            <Thermometer className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Crops Table */}
      <DataTable
        data={cropsData}
        columns={columns}
        title="Field Management"
        searchPlaceholder="Search crops and fields..."
        onAdd={() => console.log('Add crop')}
        onEdit={(crop) => console.log('Edit crop:', crop)}
        onDelete={(crop) => console.log('Delete crop:', crop)}
      />
    </div>
  );
}