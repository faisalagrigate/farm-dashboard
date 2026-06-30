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
  Image as ImageIcon,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  RefreshCw,
} from 'lucide-react';
import { useIotData } from '../../hooks/useIotData';
import { Co2SensorData } from '../iot/Co2SensorData';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';

// ---------- Media Gallery for a single device ----------
function DeviceMediaGallery({ deviceId, onClose }: { deviceId: string; onClose: () => void }) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [downloading, setDownloading] = useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/iot/media/${deviceId}?limit=50`)
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setMedia(list);
        if (list.length > 0) { setSelected(list[0]); setSelectedIdx(0); }
      })
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, [deviceId]);

  const navigate = (dir: number) => {
    const next = (selectedIdx + dir + media.length) % media.length;
    setSelectedIdx(next);
    setSelected(media[next]);
  };

  const handleDownload = async (item: any) => {
    setDownloading(item._id);
    try {
      const res = await fetch(item.mediaUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const ext = item.mediaType.startsWith('video/') ? 'mp4' : 'jpg';
      a.href = url;
      a.download = `${deviceId}_${new Date(item.timestamp).toISOString().slice(0, 19).replace(/:/g, '-')}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      // fallback: open in new tab
      window.open(item.mediaUrl, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  const images = media.filter(m => m.mediaType.startsWith('image/'));
  const videos = media.filter(m => m.mediaType.startsWith('video/'));

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-xl">
              <Camera className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Device Media</h2>
              <p className="text-xs text-gray-500 font-mono">{deviceId}</p>
            </div>
            <div className="flex gap-2 ml-2">
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">{images.length} images</Badge>
              <Badge className="bg-purple-100 text-purple-800 text-[10px]">{videos.length} videos</Badge>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-purple-600 border-t-transparent" />
              <p className="text-sm text-gray-500">Loading media…</p>
            </div>
          </div>
        ) : media.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <Camera className="h-12 w-12 opacity-30" />
            <p className="text-sm">No media captured yet for this device</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Main viewer */}
            <div className="flex-1 flex flex-col bg-gray-950 relative">
              {/* Nav arrows */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={() => navigate(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Media viewer */}
              <div className="flex-1 flex items-center justify-center p-4 min-h-0">
                {selected?.mediaType.startsWith('video/') ? (
                  <video
                    key={selected._id}
                    src={selected.mediaUrl}
                    controls
                    className="max-w-full max-h-full rounded-lg"
                  />
                ) : (
                  <img
                    key={selected?._id}
                    src={selected?.mediaUrl}
                    alt="Device media"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Info bar */}
              {selected && (
                <div className="px-4 py-3 flex items-center justify-between bg-black/70">
                  <div className="flex items-center gap-3">
                    <Badge className={selected.mediaType.startsWith('video/') ? 'bg-purple-600 text-white text-[10px]' : 'bg-blue-600 text-white text-[10px]'}>
                      {selected.mediaType.startsWith('video/') ? '▶ Video' : '📷 Image'}
                    </Badge>
                    <span className="text-gray-300 text-xs">{new Date(selected.timestamp).toLocaleString()}</span>
                    <span className="text-gray-500 text-xs">{selectedIdx + 1} / {media.length}</span>
                  </div>
                  <button
                    onClick={() => handleDownload(selected)}
                    disabled={downloading === selected._id}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {downloading === selected._id ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail sidebar */}
            <div className="w-full md:w-44 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto flex flex-row md:flex-col gap-2 p-2">
              {media.map((item, idx) => (
                <button
                  key={item._id}
                  onClick={() => { setSelected(item); setSelectedIdx(idx); }}
                  className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all group ${
                    selected?._id === item._id
                      ? 'border-purple-500 shadow-md'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ width: 80, height: 60 }}
                  title={new Date(item.timestamp).toLocaleString()}
                >
                  {item.mediaType.startsWith('video/') ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Play className="h-4 w-4 text-white opacity-70" />
                    </div>
                  ) : (
                    <img src={item.mediaUrl} alt="thumbnail" className="w-full h-full object-cover" />
                  )}
                  {/* Download hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Download className="h-3 w-3 text-white" />
                  </div>
                  {idx === 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[7px] px-1 rounded-bl font-bold">NEW</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Main IoTDevices page ----------
export function IoTDevices() {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [mediaDevice, setMediaDevice] = useState<string | null>(null);
  const [exportingDeviceId, setExportingDeviceId] = useState<string | null>(null);
  const [exportingAll, setExportingAll] = useState(false);

  const sensorDeviceId = 'CBFRAN-223';

  const {
    latestData,
    allData,
    pagination,
    loading,
    error,
    setPage
  } = useIotData(undefined, 1, 50);

  const processedDevices = React.useMemo(() => {
    if (!allData || allData.length === 0) return [];
    const deviceMap = new Map();
    const sortedData = [...allData].sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    sortedData.forEach(item => {
      if (!deviceMap.has(item.deviceId)) {
        const metrics = item.metrics || {};
        const batteryVoltage = metrics['Battery Voltage']?.value || metrics['Battery']?.value || 0;
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
            metrics.CO2 ? 'CO₂ / Humidity' : 'Soil Moisture',
          location: 'Poultry Shed A',
          status: (new Date().getTime() - new Date(item.timestamp).getTime() < 86400000) ? 'online' : 'offline',
          battery: batteryVoltage > 0 ? Math.min(100, Math.round((batteryVoltage / 12) * 100)) : 85,
          lastReading: item.timestamp,
          value: mainValue,
          connectivity: 'WiFi',
          firmware: 'v2.1.0',
          hasMedia: item.deviceId === 'AI23472',
        });
      }
    });
    return Array.from(deviceMap.values());
  }, [allData]);

  const deviceStats = {
    total: processedDevices.length || 0,
    online: processedDevices.filter(d => d.status === 'online').length || 0,
    warning: processedDevices.filter(d => d.status === 'warning' || d.battery < 20).length || 0,
    offline: processedDevices.filter(d => d.status === 'offline').length || 0,
    avgBattery: processedDevices.length > 0
      ? Math.round(processedDevices.reduce((sum, d) => sum + d.battery, 0) / processedDevices.length)
      : 0
  };

  // ---- Excel export ----
  const exportData = useCallback(async (deviceId?: string) => {
    const id = deviceId || null;
    if (id) setExportingDeviceId(id);
    else setExportingAll(true);

    try {
      let url = `${BASE_URL}/iot/data/export`;
      if (id) url += `?deviceId=${encodeURIComponent(id)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Export failed: ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = id
        ? `iot_data_${id}_${new Date().toISOString().slice(0, 10)}.xlsx`
        : `iot_data_all_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      alert(`Export failed: ${(e as any).message}`);
    } finally {
      setExportingDeviceId(null);
      setExportingAll(false);
    }
  }, []);

  const columns = [
    {
      key: 'id',
      label: 'Device ID',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-xs font-mono">{value}</div>
          <div className="text-gray-500 text-[11px]">{row.name}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const icons: any = {
          'Soil Moisture': <Droplets className="h-3 w-3 text-blue-500" />,
          'Weather Monitor': <Activity className="h-3 w-3 text-green-500" />,
          'CO₂ / Humidity': <Thermometer className="h-3 w-3 text-orange-500" />,
          'Camera': <Camera className="h-3 w-3 text-purple-500" />,
        };
        return (
          <div className="flex items-center space-x-1">
            {icons[value]}
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
      filterable: true,
      render: (value: string) => (
        <Badge className={value === 'online' ? 'bg-green-100 text-green-800 text-[10px]' : 'bg-red-100 text-red-800 text-[10px]'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'battery',
      label: 'Battery',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <Battery className={`h-3 w-3 ${value > 50 ? 'text-green-500' : value > 20 ? 'text-yellow-500' : 'text-red-500'}`} />
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
        <Badge variant="secondary" className="text-xs">{value}</Badge>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_: string, row: any) => (
        <div className="flex items-center gap-1.5">
          {/* View Media */}
          <button
            onClick={() => setMediaDevice(row.id)}
            title="View media"
            className="flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors border border-purple-200"
          >
            <Camera className="h-3 w-3" />
            Media
          </button>
          {/* Export */}
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
      {/* Media Gallery Modal */}
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
            id="export-all-btn"
          >
            {exportingAll ? (
              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4 mr-1" />
            )}
            Export All Data
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
              <p className="text-xs text-green-600">{deviceStats.total ? Math.round((deviceStats.online / deviceStats.total) * 100) : 0}%</p>
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

      {/* Live Sensor Telemetry */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-2 text-green-600" />
          Live Sensor Telemetry ({sensorDeviceId})
        </h2>
        <Co2SensorData data={latestData} loading={loading} />
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

      {/* Device Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

        {/* Side panel */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Device Types</h3>
            <div className="space-y-2">
              {[
                { type: 'Weather Monitor', count: processedDevices.filter(d => d.type === 'Weather Monitor').length, color: 'bg-green-100 text-green-800' },
                { type: 'CO₂ / Humidity', count: processedDevices.filter(d => d.type === 'CO₂ / Humidity').length, color: 'bg-orange-100 text-orange-800' },
                { type: 'Soil Moisture', count: processedDevices.filter(d => d.type === 'Soil Moisture').length, color: 'bg-blue-100 text-blue-800' },
                { type: 'Camera', count: processedDevices.filter(d => d.type === 'Camera').length, color: 'bg-purple-100 text-purple-800' },
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
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>WiFi</span>
                  <span className="text-gray-500">{processedDevices.length} devices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={75} className="h-2 flex-1" />
                  <span className="text-xs text-gray-600">Good</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Media Access */}
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4 text-purple-600" />
              Camera Devices
            </h3>
            <div className="space-y-2">
              {processedDevices.filter(d => d.type === 'Camera').length === 0 ? (
                <p className="text-xs text-gray-400">No camera devices found</p>
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
              {/* Always show AI23472 as fallback */}
              {processedDevices.filter(d => d.type === 'Camera').length === 0 && (
                <button
                  onClick={() => setMediaDevice('AI23472')}
                  className="w-full flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  <Camera className="h-3.5 w-3.5" />
                  View AI23472 Media
                </button>
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