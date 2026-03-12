import React, { useState } from 'react';
import { DataTable } from '../DataTable';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Cpu,
  Wifi,
  Battery,
  Thermometer,
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Wind
} from 'lucide-react';
import { useIotData } from '../../hooks/useIotData';
import { Co2SensorData } from '../iot/Co2SensorData';
import { ThermalCameraFeed } from '../iot/ThermalCameraFeed';

export function IoTDevices() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  // Example device IDs - these would ideally come from your actual device list
  const sensorDeviceId = 'SEN-CO2-001';
  const cameraDeviceId = 'CAM-THERMAL-001';

  const sensorData = useIotData(sensorDeviceId);
  const cameraData = useIotData(cameraDeviceId);

  const devicesData = [
    {
      id: 'SEN001',
      name: 'Soil Sensor Alpha',
      type: 'Soil Moisture',
      location: 'Field A - Zone 1',
      status: 'online',
      battery: 87,
      lastReading: '2024-08-09 14:30',
      value: '45%',
      connectivity: 'WiFi',
      firmware: 'v2.1.3'
    },
    {
      id: 'SEN002',
      name: 'Weather Station Beta',
      type: 'Weather Monitor',
      location: 'Field A - Central',
      status: 'online',
      battery: 92,
      lastReading: '2024-08-09 14:29',
      value: '24°C',
      connectivity: 'LoRaWAN',
      firmware: 'v1.8.2'
    },
    {
      id: 'SEN003',
      name: 'Humidity Tracker',
      type: 'Humidity',
      location: 'Greenhouse 1',
      status: 'warning',
      battery: 23,
      lastReading: '2024-08-09 14:25',
      value: '78%',
      connectivity: 'Zigbee',
      firmware: 'v2.0.1'
    },
    {
      id: 'IRR001',
      name: 'Smart Valve Controller',
      type: 'Irrigation',
      location: 'Field B - Zone 2',
      status: 'offline',
      battery: 0,
      lastReading: '2024-08-09 12:45',
      value: 'Closed',
      connectivity: 'WiFi',
      firmware: 'v1.5.7'
    },
    {
      id: 'CAM001',
      name: 'Livestock Monitor',
      type: 'Camera',
      location: 'Barn A',
      status: 'online',
      battery: 100,
      lastReading: '2024-08-09 14:31',
      value: 'Recording',
      connectivity: 'Ethernet',
      firmware: 'v3.2.1'
    }
  ];

  const deviceStats = {
    total: devicesData.length,
    online: devicesData.filter(d => d.status === 'online').length,
    warning: devicesData.filter(d => d.status === 'warning').length,
    offline: devicesData.filter(d => d.status === 'offline').length,
    avgBattery: Math.round(devicesData.reduce((sum, d) => sum + d.battery, 0) / devicesData.length)
  };

  const columns = [
    {
      key: 'id',
      label: 'Device ID',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs">{value}</div>
          <div className="text-gray-500 text-xs">{row.name}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const icons = {
          'Soil Moisture': <Droplets className="h-3 w-3 text-blue-500" />,
          'Weather Monitor': <Activity className="h-3 w-3 text-green-500" />,
          'Humidity': <Thermometer className="h-3 w-3 text-orange-500" />,
          'Irrigation': <Droplets className="h-3 w-3 text-blue-600" />,
          'Camera': <Cpu className="h-3 w-3 text-purple-500" />
        };
        return (
          <div className="flex items-center space-x-1">
            {icons[value as keyof typeof icons]}
            <span className="text-xs">{value}</span>
          </div>
        );
      }
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      filterable: true,
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
      key: 'battery',
      label: 'Battery',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Battery className={`h-3 w-3 ${value > 50 ? 'text-green-500' :
            value > 20 ? 'text-yellow-500' : 'text-red-500'
            }`} />
          <span className="text-xs">{value}%</span>
        </div>
      )
    },
    {
      key: 'lastReading',
      label: 'Last Reading',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs">{new Date(value).toLocaleString()}</span>
        </div>
      )
    },
    {
      key: 'value',
      label: 'Current Value',
      render: (value: string) => (
        <Badge variant="secondary" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'connectivity',
      label: 'Connection',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Wifi className="h-3 w-3 text-blue-500" />
          <span className="text-xs">{value}</span>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">IoT Devices</h1>
          <p className="text-sm text-gray-600">Manage and monitor all smart devices across your farms</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Cpu className="h-4 w-4 mr-1" />
            Add Device
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Activity className="h-4 w-4 mr-1" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Devices</p>
              <p className="text-2xl font-semibold text-gray-900">{deviceStats.total}</p>
            </div>
            <Cpu className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Online</p>
              <p className="text-2xl font-semibold text-green-600">{deviceStats.online}</p>
              <p className="text-xs text-green-600">{Math.round((deviceStats.online / deviceStats.total) * 100)}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Warning</p>
              <p className="text-2xl font-semibold text-yellow-600">{deviceStats.warning}</p>
              <p className="text-xs text-yellow-600">Low battery</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Offline</p>
              <p className="text-2xl font-semibold text-red-600">{deviceStats.offline}</p>
              <p className="text-xs text-red-600">Need attention</p>
            </div>
            <Wifi className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Avg Battery</p>
              <p className="text-2xl font-semibold text-gray-900">{deviceStats.avgBattery}%</p>
              <div className="w-16 mt-1">
                <Progress value={deviceStats.avgBattery} className="h-1" />
              </div>
            </div>
            <Battery className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Live IoT Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold mb-3 flex items-center">
            <Activity className="h-4 w-4 mr-2 text-green-600" />
            Live Sensor Telemetry ({sensorDeviceId})
          </h2>
          <Co2SensorData data={sensorData.latestData} loading={sensorData.loading} />
        </div>
        <div>
          <ThermalCameraFeed media={cameraData.media} loading={cameraData.loading} />
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-xs text-red-800">
            <strong>Device IRR001</strong> has been offline for 2 hours. Check power connection.
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-200 bg-yellow-50">
          <Battery className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-xs text-yellow-800">
            <strong>Device SEN003</strong> has low battery (23%). Replace batteries soon.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <Cpu className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-800">
            <strong>Firmware update</strong> available for 3 devices. Update recommended.
          </AlertDescription>
        </Alert>
      </div>

      {/* Device Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Devices Table */}
        <div className="lg:col-span-2">
          <DataTable
            data={devicesData}
            columns={columns}
            title="All Devices"
            searchPlaceholder="Search devices..."
            onAdd={() => console.log('Add device')}
            onEdit={(device) => setSelectedDevice(device)}
            onDelete={(device) => console.log('Delete device:', device)}
            pageSize={8}
          />
        </div>

        {/* Device Details */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Device Types</h3>
            <div className="space-y-2">
              {[
                { type: 'Soil Moisture', count: 1, color: 'bg-blue-100 text-blue-800' },
                { type: 'Weather Monitor', count: 1, color: 'bg-green-100 text-green-800' },
                { type: 'Humidity', count: 1, color: 'bg-orange-100 text-orange-800' },
                { type: 'Irrigation', count: 1, color: 'bg-blue-100 text-blue-800' },
                { type: 'Camera', count: 1, color: 'bg-purple-100 text-purple-800' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span>{item.type}</span>
                  <Badge className={item.color}>{item.count}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Connectivity Status</h3>
            <div className="space-y-3">
              {[
                { type: 'WiFi', count: 2, status: 'Good' },
                { type: 'LoRaWAN', count: 1, status: 'Excellent' },
                { type: 'Zigbee', count: 1, status: 'Fair' },
                { type: 'Ethernet', count: 1, status: 'Excellent' }
              ].map((conn, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{conn.type}</span>
                    <span className="text-gray-500">{conn.count} devices</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={conn.status === 'Excellent' ? 100 : conn.status === 'Good' ? 75 : 50}
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-gray-600">{conn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Maintenance Schedule</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span>SEN003 - Battery</span>
                <Badge className="bg-yellow-100 text-yellow-800">Due</Badge>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span>IRR001 - Inspection</span>
                <Badge className="bg-red-100 text-red-800">Overdue</Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>CAM001 - Firmware</span>
                <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}