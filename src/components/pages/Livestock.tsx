import React from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heart, Activity, MapPin, Calendar, TrendingUp } from 'lucide-react';

export function Livestock() {
  const livestockData = [
    {
      id: 'L001',
      tag: 'COW-001',
      type: 'Cattle',
      breed: 'Holstein',
      age: 36,
      weight: 650,
      health: 'Healthy',
      location: 'Barn A',
      lastCheckup: '2024-08-05',
      vaccination: 'Up to date',
      productivity: 'High'
    },
    {
      id: 'L002',
      tag: 'SHP-015',
      type: 'Sheep',
      breed: 'Merino',
      age: 18,
      weight: 75,
      health: 'Healthy',
      location: 'Pasture B',
      lastCheckup: '2024-08-03',
      vaccination: 'Due soon',
      productivity: 'Medium'
    },
    {
      id: 'L003',
      tag: 'CHK-234',
      type: 'Chicken',
      breed: 'Rhode Island Red',
      age: 8,
      weight: 2.5,
      health: 'Sick',
      location: 'Coop 1',
      lastCheckup: '2024-08-07',
      vaccination: 'Up to date',
      productivity: 'Low'
    }
  ];

  const columns = [
    {
      key: 'tag',
      label: 'Animal Tag',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.type} - {row.breed}</div>
        </div>
      )
    },
    {
      key: 'age',
      label: 'Age (months)',
      sortable: true
    },
    {
      key: 'weight',
      label: 'Weight (kg)',
      sortable: true
    },
    {
      key: 'health',
      label: 'Health Status',
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
      key: 'lastCheckup',
      label: 'Last Checkup',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'vaccination',
      label: 'Vaccination',
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'Up to date' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </Badge>
      )
    },
    {
      key: 'productivity',
      label: 'Productivity',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge className={`text-xs ${
          value === 'High' ? 'bg-green-100 text-green-800' :
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Livestock Management</h1>
          <p className="text-sm text-gray-600">Monitor animal health and productivity</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Heart className="h-4 w-4 mr-1" />
          Add Animal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Animals</p>
              <p className="text-2xl font-semibold text-gray-900">684</p>
              <p className="text-xs text-green-600">Across all farms</p>
            </div>
            <Heart className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Healthy</p>
              <p className="text-2xl font-semibold text-green-600">677</p>
              <p className="text-xs text-green-600">99% health rate</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Need Attention</p>
              <p className="text-2xl font-semibold text-red-600">7</p>
              <p className="text-xs text-red-600">Checkup required</p>
            </div>
            <Heart className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Productivity</p>
              <p className="text-2xl font-semibold text-gray-900">89%</p>
              <p className="text-xs text-blue-600">Above average</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Livestock Table */}
      <DataTable
        data={livestockData}
        columns={columns}
        title="Animal Records"
        searchPlaceholder="Search animals..."
        onAdd={() => console.log('Add animal')}
        onEdit={(animal) => console.log('Edit animal:', animal)}
        onDelete={(animal) => console.log('Delete animal:', animal)}
      />
    </div>
  );
}