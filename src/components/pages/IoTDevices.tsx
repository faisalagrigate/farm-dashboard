"use client";

import React, { useState, useCallback } from 'react';
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
  Wind,
  Camera,
  Play,
  FileSpreadsheet,
  RefreshCw,
} from 'lucide-react';
import { useIotData } from '../../hooks/useIotData';
import { Co2SensorData } from '../iot/Co2SensorData';
import { ThermalCameraFeed } from '../iot/ThermalCameraFeed';
import { DeviceMediaGallery } from '../iot/DeviceMediaGallery';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';

export function IoTDevices() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [mediaDevice, setMediaDevice] = useState<string | null>(null);
  const [exportingDeviceId, setExportingDeviceId] = useState<string | null>(null);
  const [exportingAll, setExportingAll] = useState(false);

  // Example device IDs - these would ideally come from your actual device list
  const sensorDeviceId = 'CBFRAN-223';
  const cameraDeviceId = 'AI23472';

  const {
    latestData,
    allData,
    pagination,
    loading,
    error,
    setPage
  } = useIotData(undefined, 1, 50); // Fetch 50 to discover unique devices
  const cameraData = useIotData(cameraDeviceId);

  const exportData = useCallback(async (deviceId?: string) => {
    if (deviceId) setExportingDeviceId(deviceId);
    else setExportingAll(true);

    try {
      let url = `${BASE_URL}/iot/data/export`;
      if (deviceId) url += `?deviceId=${encodeURIComponent(deviceId)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Export failed: ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = deviceId
        ? `iot_data_${deviceId}_${new Date().toISOString().slice(0, 10)}.xlsx`
        : `iot_data_all_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      alert(`Export failed: ${(e as Error).message}`);
    } finally {
      setExportingDeviceId(null);
      setExportingAll(false);
    }
  }, []);

  const processedDevices = React.useMemo(() => {
    if (!allData || allData.length === 0) return [];

    const deviceMap = new Map();

    // Sort by timestamp desc to ensure we process latest readings first
    const sortedData = [...allData].sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    sortedData.forEach(item => {
      if (!deviceMap.has(item.deviceId)) {
        const metrics = item.metrics || {};
        const batteryVoltage = metrics['Battery Voltage']?.value || metrics['Battery']?.value || 0;

        // Determine primary value to show in the table
        let mainValue = 'N/A';
        if (metrics.Temperature) mainValue = `${metrics.Temperature.value}${metrics.Temperature.unit}`;
        else if (metrics.CO2) mainValue = `${metrics.CO2.value}${metrics.CO2.unit}`;
        else if (metrics.RH) mainValue = `${metrics.RH.value}${metrics.RH.unit}`;
        else if (metrics.temp) mainValue = `${metrics.temp.value}${metrics.temp.unit}`;

        deviceMap.set(item.deviceId, {
          id: item.deviceId,
          name: item.deviceId === 'CBFRAN-223' ? 'Shed Monitor Node' :
            item.deviceId === 'AI23472' ? 'AI Camera Node' :
            item.deviceId === 'test-device-123' ? 'Testing Prototype' : `Node ${item.deviceId}`,
          type: item.deviceId === 'AI23472' ? 'Camera' :
            metrics.Temperature ? 'Weather Monitor' :
            metrics.CO2 ? 'Humidity' : 'Soil Moisture',
          location: 'Poultry Shed A',
          status: (new Date().getTime() - new Date(item.timestamp).getTime() < 86400000) ? 'online' : 'offline',
          battery: batteryVoltage > 0 ? Math.min(100, Math.round((batteryVoltage / 12) * 100)) : 85,
          lastReading: item.timestamp,
          value: mainValue,
          connectivity: 'WiFi',
          firmware: 'v2.1.0'
        });
      }
    });

    // Camera devices may only upload media without sensor telemetry
    if (!deviceMap.has(cameraDeviceId) && cameraData.media.length > 0) {
      deviceMap.set(cameraDeviceId, {
        id: cameraDeviceId,
        name: 'AI Camera Node',
        type: 'Camera',
        location: 'Poultry Shed A',
        status: 'online',
        battery: 96,
        lastReading: cameraData.media[0]?.timestamp || new Date().toISOString(),
        value: 'Streaming',
        connectivity: 'WiFi',
        firmware: 'v2.1.0',
      });
    }

    return Array.from(deviceMap.values());
  }, [allData, cameraData.media, cameraDeviceId]);

  const deviceStats = {
    total: processedDevices.length || 0,
    online: processedDevices.filter(d => d.status === 'online').length || 0,
    warning: processedDevices.filter(d => d.status === 'warning' || d.battery < 20).length || 0,
    offline: processedDevices.filter(d => d.status === 'offline').length || 0,
    avgBattery: processedDevices.length > 0
      ? Math.round(processedDevices.reduce((sum, d) => sum + d.battery, 0) / processedDevices.length)
      : 0
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
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMediaDevice(row.id)}
            title="View media"
            className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors border border-purple-200"
          >
            <Camera className="h-3 w-3" />
            Media
          </button>
          <button
            onClick={() => exportData(row.id)}
            disabled={exportingDeviceId === row.id}
            title="Export Excel"
            className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-green-50 hover:bg-green-100 text-green-700 transition-colors border border-green-200 disabled:opacity-50"
          >
            {exportingDeviceId === row.id ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-3 w-3" />
            )}
            Export
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {mediaDevice && (
        <DeviceMediaGallery deviceId={mediaDevice} onClose={() => setMediaDevice(null)} />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">IoT Devices</h1>
          <p className="text-sm text-gray-600">Manage and monitor all smart devices across your farms</p>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => exportData()}
            disabled={exportingAll}
          >
            {exportingAll ? (
              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4 mr-1" />
            )}
            Export Data
          </Button>
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
          <Co2SensorData data={latestData} loading={loading} />
        </div>
        <div>
          <ThermalCameraFeed
            media={cameraData.media}
            loading={cameraData.loading}
            loadMoreMedia={cameraData.loadMoreMedia}
            hasMoreMedia={cameraData.mediaHasMore}
          />
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
            data={processedDevices}
            columns={columns}
            title="All Devices"
            searchPlaceholder="Search devices..."
            onAdd={() => console.log('Add device')}
            onEdit={(device) => setSelectedDevice(device)}
            onDelete={(device) => console.log('Delete device:', device)}
            pageSize={pagination.limit}
            currentPage={pagination.page}
            totalRecords={pagination.total}
            onPageChange={setPage}
          />
        </div>

        {/* Device Details */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Device Types</h3>
            <div className="space-y-2">
              {[
                { type: 'Weather Monitor', count: processedDevices.filter(d => d.type === 'Weather Monitor').length, color: 'bg-green-100 text-green-800' },
                { type: 'Humidity', count: processedDevices.filter(d => d.type === 'Humidity').length, color: 'bg-orange-100 text-orange-800' },
                { type: 'Soil Moisture', count: processedDevices.filter(d => d.type === 'Soil Moisture').length, color: 'bg-blue-100 text-blue-800' },
                { type: 'Camera', count: processedDevices.filter(d => d.type === 'Camera').length || (cameraData.media.length > 0 ? 1 : 0), color: 'bg-purple-100 text-purple-800' }
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
                { type: 'WiFi', count: processedDevices.length, status: 'Good' },
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
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4 text-purple-600" />
              Camera Devices
            </h3>
            <div className="space-y-2">
              {processedDevices.filter(d => d.type === 'Camera').length === 0 ? (
                <button
                  onClick={() => setMediaDevice(cameraDeviceId)}
                  className="w-full flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  <Camera className="h-3.5 w-3.5" />
                  View {cameraDeviceId} Media
                </button>
              ) : (
                processedDevices.filter(d => d.type === 'Camera').map(device => (
                  <div key={device.id} className="flex items-center justify-between p-2 rounded-lg bg-purple-50 border border-purple-100">
                    <div>
                      <p className="text-xs font-mono font-medium text-purple-900">{device.id}</p>
                      <p className="text-[10px] text-purple-600">{device.name}</p>
                    </div>
                    <button
                      onClick={() => setMediaDevice(device.id)}
                      className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium"
                    >
                      <Play className="h-3 w-3" />
                      View
                    </button>
                  </div>
                ))
              )}
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