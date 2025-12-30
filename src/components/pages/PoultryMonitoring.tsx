import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DataTable } from '../DataTable';
import { formatCurrency } from '../ui/currency-utils';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind,
  AlertTriangle,
  CheckCircle,
  Camera,
  Mic,
  Brain,
  TrendingUp,
  TrendingDown,
  Heart,
  Weight,
  Cpu,
  Radio,
  Eye,
  Volume2,
  Zap,
  CloudRain,
  Battery,
  Signal,
  Bell,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export function PoultryMonitoring() {
  const [selectedFarm, setSelectedFarm] = useState('Farm-1');
  const [selectedShed, setSelectedShed] = useState('Shed-A');

  // Overview Statistics
  const overviewStats = {
    totalChickens: 15000,
    healthyChickens: 14720,
    mortalityRate: 1.87,
    averageWeight: 1.85,
    targetWeight: 2.0,
    fcr: 1.62,
    targetFCR: 1.55,
    feedConsumed: 24300,
    waterConsumed: 45600,
    avgGrowthRate: 52.3,
    daysToHarvest: 12,
    estimatedRevenue: 22500000 // ৳22.5L
  };

  // Real-time Sensor Data
  const sensorData = [
    {
      id: 'SHED-A-TEMP-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      type: 'Temperature',
      value: 28.5,
      unit: '°C',
      status: 'optimal',
      threshold: '26-30°C',
      lastUpdate: '30 sec ago',
      battery: 92
    },
    {
      id: 'SHED-A-HUM-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      type: 'Humidity',
      value: 65,
      unit: '%',
      status: 'optimal',
      threshold: '50-70%',
      lastUpdate: '45 sec ago',
      battery: 88
    },
    {
      id: 'SHED-A-NH3-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      type: 'Ammonia',
      value: 18,
      unit: 'ppm',
      status: 'warning',
      threshold: '<20 ppm',
      lastUpdate: '1 min ago',
      battery: 85
    },
    {
      id: 'SHED-A-CO2-01',
      shed: 'Shed A',
      zone: 'Zone 2',
      type: 'CO2',
      value: 2800,
      unit: 'ppm',
      status: 'optimal',
      threshold: '<3000 ppm',
      lastUpdate: '2 min ago',
      battery: 90
    },
    {
      id: 'SHED-B-TEMP-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      type: 'Temperature',
      value: 32.1,
      unit: '°C',
      status: 'critical',
      threshold: '26-30°C',
      lastUpdate: '20 sec ago',
      battery: 78
    },
    {
      id: 'SHED-B-HUM-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      type: 'Humidity',
      value: 48,
      unit: '%',
      status: 'warning',
      threshold: '50-70%',
      lastUpdate: '1 min ago',
      battery: 82
    }
  ];

  // Water Quality Sensors
  const waterQualityData = [
    {
      id: 'WATER-A-01',
      shed: 'Shed A',
      location: 'Main Tank',
      ph: 6.8,
      phStatus: 'optimal',
      tds: 245,
      tdsStatus: 'optimal',
      temperature: 24.5,
      lastUpdate: '5 min ago'
    },
    {
      id: 'WATER-B-01',
      shed: 'Shed B',
      location: 'Main Tank',
      ph: 7.2,
      phStatus: 'optimal',
      tds: 310,
      tdsStatus: 'warning',
      temperature: 25.1,
      lastUpdate: '3 min ago'
    }
  ];

  // Weight Monitoring Data
  const weightData = [
    {
      id: 'WEIGHT-A-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      currentWeight: 1.85,
      expectedWeight: 1.82,
      variance: '+1.6%',
      status: 'on-track',
      sampledChickens: 50,
      lastUpdate: '30 min ago'
    },
    {
      id: 'WEIGHT-A-02',
      shed: 'Shed A',
      zone: 'Zone 2',
      currentWeight: 1.78,
      expectedWeight: 1.82,
      variance: '-2.2%',
      status: 'below',
      sampledChickens: 50,
      lastUpdate: '35 min ago'
    },
    {
      id: 'WEIGHT-B-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      currentWeight: 1.91,
      expectedWeight: 1.82,
      variance: '+4.9%',
      status: 'above',
      sampledChickens: 50,
      lastUpdate: '25 min ago'
    }
  ];

  // Camera Monitoring Data
  const cameraData = [
    {
      id: 'CAM-A-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      status: 'online',
      chickenCount: 2450,
      expectedCount: 2500,
      behaviorStatus: 'normal',
      activityLevel: 72,
      crowdingIndex: 0.45,
      anomaliesDetected: 0,
      lastUpdate: '10 sec ago'
    },
    {
      id: 'CAM-A-02',
      shed: 'Shed A',
      zone: 'Zone 2',
      status: 'online',
      chickenCount: 2480,
      expectedCount: 2500,
      behaviorStatus: 'normal',
      activityLevel: 68,
      crowdingIndex: 0.38,
      anomaliesDetected: 0,
      lastUpdate: '15 sec ago'
    },
    {
      id: 'CAM-B-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      status: 'online',
      chickenCount: 2420,
      expectedCount: 2500,
      behaviorStatus: 'warning',
      activityLevel: 45,
      crowdingIndex: 0.62,
      anomaliesDetected: 3,
      lastUpdate: '12 sec ago'
    }
  ];

  // Thermal Health Data
  const thermalHealthData = [
    {
      id: 'THERMAL-A-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      avgBodyTemp: 40.8,
      normalRange: '40.5-41.5°C',
      elevatedTempCount: 12,
      suspectedFever: 2,
      status: 'monitoring',
      lastScan: '15 min ago'
    },
    {
      id: 'THERMAL-B-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      avgBodyTemp: 41.9,
      normalRange: '40.5-41.5°C',
      elevatedTempCount: 45,
      suspectedFever: 8,
      status: 'alert',
      lastScan: '10 min ago'
    }
  ];

  // Audio Monitoring Data
  const audioData = [
    {
      id: 'AUDIO-A-01',
      shed: 'Shed A',
      zone: 'Zone 1',
      noiseLevel: 65,
      normalRange: '60-75 dB',
      distressDetected: false,
      coughingDetected: false,
      fightingDetected: false,
      status: 'normal',
      lastAnalysis: '2 min ago'
    },
    {
      id: 'AUDIO-B-01',
      shed: 'Shed B',
      zone: 'Zone 1',
      noiseLevel: 82,
      normalRange: '60-75 dB',
      distressDetected: true,
      coughingDetected: true,
      fightingDetected: false,
      status: 'warning',
      lastAnalysis: '1 min ago'
    }
  ];

  // ML Predictions
  const mlPredictions = {
    mortalityRisk: {
      today: 12,
      tomorrow: 15,
      nextWeek: 45,
      trend: 'increasing'
    },
    weightForecast: [
      { day: 'Day 35', predicted: 1.85, actual: 1.85 },
      { day: 'Day 36', predicted: 1.92, actual: null },
      { day: 'Day 37', predicted: 1.98, actual: null },
      { day: 'Day 38', predicted: 2.05, actual: null },
      { day: 'Day 39', predicted: 2.11, actual: null },
      { day: 'Day 40', predicted: 2.18, actual: null }
    ],
    diseaseRisk: {
      respiratoryDisease: 35,
      metabolicDisorder: 12,
      parasites: 8,
      viral: 5
    },
    fcrForecast: {
      current: 1.62,
      projected: 1.68,
      optimal: 1.55,
      trend: 'above-target'
    }
  };

  // Alerts Data
  const alertsData = [
    {
      id: 'ALERT-001',
      severity: 'critical',
      type: 'Temperature',
      shed: 'Shed B',
      zone: 'Zone 1',
      message: 'Temperature above threshold (32.1°C)',
      timestamp: '2 min ago',
      status: 'active',
      action: 'Auto-cooling activated'
    },
    {
      id: 'ALERT-002',
      severity: 'warning',
      type: 'Behavior',
      shed: 'Shed B',
      zone: 'Zone 1',
      message: 'Low activity detected - possible illness',
      timestamp: '5 min ago',
      status: 'active',
      action: 'Inspection scheduled'
    },
    {
      id: 'ALERT-003',
      severity: 'warning',
      type: 'Audio',
      shed: 'Shed B',
      zone: 'Zone 1',
      message: 'Distress sounds and coughing detected',
      timestamp: '8 min ago',
      status: 'investigating',
      action: 'Vet notified'
    },
    {
      id: 'ALERT-004',
      severity: 'info',
      type: 'Ammonia',
      shed: 'Shed A',
      zone: 'Zone 1',
      message: 'Ammonia levels approaching threshold',
      timestamp: '12 min ago',
      status: 'resolved',
      action: 'Ventilation increased'
    }
  ];

  // Edge Computing Status
  const edgeDevices = [
    {
      id: 'EDGE-GATEWAY-01',
      name: 'IoT Gateway Alpha',
      type: 'ESP32 LoRaWAN',
      location: 'Shed A',
      status: 'online',
      uptime: '45 days',
      sensorsConnected: 12,
      dataRate: '2.4 KB/s',
      lastUpdate: '5 sec ago'
    },
    {
      id: 'EDGE-AI-01',
      name: 'Edge AI Device 1',
      type: 'NVIDIA Jetson Nano',
      location: 'Shed A',
      status: 'online',
      uptime: '42 days',
      cameras: 2,
      audioSensors: 1,
      cpuUsage: 68,
      gpuUsage: 45,
      memoryUsage: 72,
      temperature: 52,
      lastUpdate: '3 sec ago'
    },
    {
      id: 'EDGE-GATEWAY-02',
      name: 'IoT Gateway Beta',
      type: 'ESP32 LoRaWAN',
      location: 'Shed B',
      status: 'online',
      uptime: '38 days',
      sensorsConnected: 11,
      dataRate: '2.1 KB/s',
      lastUpdate: '8 sec ago'
    },
    {
      id: 'EDGE-AI-02',
      name: 'Edge AI Device 2',
      type: 'Raspberry Pi 4',
      location: 'Shed B',
      status: 'warning',
      uptime: '12 days',
      cameras: 2,
      audioSensors: 1,
      cpuUsage: 89,
      gpuUsage: null,
      memoryUsage: 85,
      temperature: 68,
      lastUpdate: '15 sec ago'
    }
  ];

  // Historical data for charts
  const temperatureHistory = [
    { time: '00:00', shedA: 27.5, shedB: 28.2 },
    { time: '04:00', shedA: 26.8, shedB: 27.5 },
    { time: '08:00', shedA: 28.2, shedB: 29.1 },
    { time: '12:00', shedA: 29.8, shedB: 31.5 },
    { time: '16:00', shedA: 28.9, shedB: 32.1 },
    { time: '20:00', shedA: 28.1, shedB: 30.2 }
  ];

  const mortalityHistory = [
    { day: 'Day 28', count: 8 },
    { day: 'Day 29', count: 12 },
    { day: 'Day 30', count: 10 },
    { day: 'Day 31', count: 15 },
    { day: 'Day 32', count: 18 },
    { day: 'Day 33', count: 22 },
    { day: 'Day 34', count: 28 },
    { day: 'Day 35', count: 32 }
  ];

  const fcrHistory = [
    { week: 'Week 1', fcr: 1.05 },
    { week: 'Week 2', fcr: 1.22 },
    { week: 'Week 3', fcr: 1.38 },
    { week: 'Week 4', fcr: 1.52 },
    { week: 'Week 5', fcr: 1.62 }
  ];

  const behaviorDistribution = [
    { name: 'Eating', value: 35, color: '#10b981' },
    { name: 'Resting', value: 30, color: '#3b82f6' },
    { name: 'Moving', value: 20, color: '#f59e0b' },
    { name: 'Drinking', value: 10, color: '#06b6d4' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const healthMetrics = [
    { metric: 'Activity', value: 72 },
    { metric: 'Feed Intake', value: 85 },
    { metric: 'Water Intake', value: 78 },
    { metric: 'Growth Rate', value: 68 },
    { metric: 'Body Temp', value: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'normal':
      case 'on-track':
        return 'text-green-600 bg-green-50';
      case 'warning':
      case 'monitoring':
      case 'below':
      case 'above':
        return 'text-orange-600 bg-orange-50';
      case 'critical':
      case 'alert':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agrigate Poultry AI</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time IoT monitoring and disease prevention system - Bangladesh</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
          >
            <option value="Farm-1">Farm 1 - Dhaka</option>
            <option value="Farm-2">Farm 2 - Chittagong</option>
            <option value="Farm-3">Farm 3 - Sylhet</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedShed}
            onChange={(e) => setSelectedShed(e.target.value)}
          >
            <option value="Shed-A">Shed A</option>
            <option value="Shed-B">Shed B</option>
            <option value="Shed-C">Shed C</option>
            <option value="All">All Sheds</option>
          </select>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Activity className="h-4 w-4 mr-2" />
            Live Dashboard
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Chickens</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{overviewStats.totalChickens.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                {overviewStats.healthyChickens.toLocaleString()} healthy
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Mortality Rate</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{overviewStats.mortalityRate}%</p>
              <p className="text-xs text-orange-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.3% vs yesterday
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Weight</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{overviewStats.averageWeight} kg</p>
              <p className="text-xs text-gray-600 mt-1">
                Target: {overviewStats.targetWeight} kg
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Weight className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">FCR</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{overviewStats.fcr}</p>
              <p className="text-xs text-orange-600 mt-1">
                Target: {overviewStats.targetFCR}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Growth Rate</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{overviewStats.avgGrowthRate}g/day</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                On track
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Est. Revenue</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{formatCurrency(overviewStats.estimatedRevenue / 100000)}L</p>
              <p className="text-xs text-gray-600 mt-1">
                In {overviewStats.daysToHarvest} days
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Alerts */}
      {alertsData.filter(a => a.status === 'active').length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <div className="flex items-center justify-between">
              <span>
                <strong>{alertsData.filter(a => a.status === 'active').length} Active Alerts</strong> - 
                {alertsData.filter(a => a.severity === 'critical' && a.status === 'active').length} critical, 
                {alertsData.filter(a => a.severity === 'warning' && a.status === 'active').length} warning
              </span>
              <Button size="sm" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-100">
                View All Alerts
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
          <TabsTrigger value="sensors">Environmental Sensors</TabsTrigger>
          <TabsTrigger value="cameras">Camera & Vision AI</TabsTrigger>
          <TabsTrigger value="audio">Audio Monitoring</TabsTrigger>
          <TabsTrigger value="ml">ML Predictions</TabsTrigger>
          <TabsTrigger value="edge">Edge Computing</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Actions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Temperature Trends (24 Hours)</h3>
                <Thermometer className="h-4 w-4 text-red-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={temperatureHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[25, 35]} />
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="shedA" stroke="#10b981" name="Shed A" strokeWidth={2} />
                  <Line type="monotone" dataKey="shedB" stroke="#f59e0b" name="Shed B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Weight Forecast (Next 6 Days)</h3>
                <Weight className="h-4 w-4 text-blue-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={mlPredictions.weightForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[1.8, 2.2]} />
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#93c5fd" name="Actual" />
                  <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="#c4b5fd" name="Predicted" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Mortality Trend (Last 8 Days)</h3>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={mortalityHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="count" fill="#f59e0b" name="Mortality Count" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">FCR Performance</h3>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={fcrHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[1, 1.8]} />
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="fcr" stroke="#10b981" name="FCR" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Behavior Distribution</h3>
                <Eye className="h-4 w-4 text-purple-500" />
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={behaviorDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {behaviorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Health Metrics Score</h3>
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={healthMetrics}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Sensors Tab */}
        <TabsContent value="sensors" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Environmental Sensors */}
            <Card className="col-span-2 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Environmental Sensors</h3>
              <div className="space-y-3">
                {sensorData.map((sensor) => (
                  <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        sensor.type === 'Temperature' ? 'bg-red-100' :
                        sensor.type === 'Humidity' ? 'bg-blue-100' :
                        sensor.type === 'Ammonia' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        {sensor.type === 'Temperature' && <Thermometer className="h-4 w-4 text-red-600" />}
                        {sensor.type === 'Humidity' && <Droplets className="h-4 w-4 text-blue-600" />}
                        {sensor.type === 'Ammonia' && <Wind className="h-4 w-4 text-orange-600" />}
                        {sensor.type === 'CO2' && <CloudRain className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-medium text-gray-900">{sensor.shed} - {sensor.zone}</p>
                          <Badge className={`text-xs px-2 py-0 ${getStatusColor(sensor.status)}`}>
                            {sensor.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{sensor.type} - {sensor.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{sensor.value}{sensor.unit}</p>
                      <p className="text-xs text-gray-500">{sensor.threshold}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Battery className="h-3 w-3" />
                        <span>{sensor.battery}%</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{sensor.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Water Quality */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Water Quality</h3>
              <div className="space-y-3">
                {waterQualityData.map((water) => (
                  <div key={water.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-900">{water.shed}</p>
                      <MapPin className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{water.location}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">pH Level</span>
                        <span className="text-xs font-semibold">{water.ph}</span>
                      </div>
                      <Progress value={(water.ph / 14) * 100} className="h-1" />
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-600">TDS (ppm)</span>
                        <span className={`text-xs font-semibold ${
                          water.tdsStatus === 'optimal' ? 'text-green-600' : 'text-orange-600'
                        }`}>{water.tds}</span>
                      </div>
                      <Progress value={(water.tds / 500) * 100} className="h-1" />
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-600">Temp</span>
                        <span className="text-xs font-semibold">{water.temperature}°C</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">{water.lastUpdate}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Weight Monitoring */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Weight Monitoring (Live Plates)</h3>
            <div className="grid grid-cols-3 gap-4">
              {weightData.map((weight) => (
                <div key={weight.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-medium text-gray-900">{weight.shed} - {weight.zone}</p>
                      <p className="text-xs text-gray-500">{weight.id}</p>
                    </div>
                    <Weight className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-600">Current</p>
                        <p className="text-lg font-semibold text-gray-900">{weight.currentWeight} kg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Expected</p>
                        <p className="text-sm font-medium text-gray-700">{weight.expectedWeight} kg</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(weight.status)}`}>
                        {weight.variance}
                      </Badge>
                      <span className="text-xs text-gray-500">{weight.sampledChickens} sampled</span>
                    </div>
                    
                    <Progress value={Math.min((weight.currentWeight / weight.expectedWeight) * 100, 100)} className="h-1.5" />
                    
                    <p className="text-xs text-gray-400 mt-2">{weight.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Cameras Tab */}
        <TabsContent value="cameras" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Camera Monitoring */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Live Camera Feeds & Chicken Count</h3>
              <div className="space-y-3">
                {cameraData.map((camera) => (
                  <div key={camera.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Camera className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{camera.shed} - {camera.zone}</p>
                          <p className="text-xs text-gray-500">{camera.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Signal className={`h-3 w-3 ${camera.status === 'online' ? 'text-green-600' : 'text-red-600'}`} />
                        <span className="text-xs text-gray-600">{camera.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Chicken Count</p>
                        <p className="text-lg font-semibold text-gray-900">{camera.chickenCount}</p>
                        <p className="text-xs text-gray-500">Expected: {camera.expectedCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Activity Level</p>
                        <p className="text-lg font-semibold text-gray-900">{camera.activityLevel}%</p>
                        <Progress value={camera.activityLevel} className="h-1.5 mt-1" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-xs text-gray-600">Behavior</p>
                        <Badge className={`text-xs mt-1 ${getStatusColor(camera.behaviorStatus)}`}>
                          {camera.behaviorStatus}
                        </Badge>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-xs text-gray-600">Crowding</p>
                        <p className="text-xs font-semibold mt-1">{camera.crowdingIndex}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-xs text-gray-600">Anomalies</p>
                        <p className={`text-xs font-semibold mt-1 ${camera.anomaliesDetected > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {camera.anomaliesDetected}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">{camera.lastUpdate}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Thermal Health Monitoring */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Thermal Health Monitoring</h3>
              <div className="space-y-3">
                {thermalHealthData.map((thermal) => (
                  <div key={thermal.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Thermometer className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{thermal.shed} - {thermal.zone}</p>
                          <p className="text-xs text-gray-500">{thermal.id}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(thermal.status)}`}>
                        {thermal.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs text-gray-600">Average Body Temp</span>
                          <span className="text-lg font-semibold text-gray-900">{thermal.avgBodyTemp}°C</span>
                        </div>
                        <Progress value={((thermal.avgBodyTemp - 40) / (42 - 40)) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Normal: {thermal.normalRange}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-white rounded">
                          <p className="text-xs text-gray-600">Elevated Temp</p>
                          <p className="text-lg font-semibold text-orange-600">{thermal.elevatedTempCount}</p>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <p className="text-xs text-gray-600">Suspected Fever</p>
                          <p className="text-lg font-semibold text-red-600">{thermal.suspectedFever}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-red-200">
                        <span className="text-xs text-gray-600">Last Thermal Scan</span>
                        <span className="text-xs text-gray-500">{thermal.lastScan}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Camera Feed Placeholder */}
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Live Camera Feed</p>
                  <p className="text-xs text-gray-500 mt-1">Click camera ID to view live stream</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Audio Monitoring & Sound Analysis</h3>
              <div className="space-y-3">
                {audioData.map((audio) => (
                  <div key={audio.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${
                          audio.status === 'normal' ? 'bg-green-100' : 'bg-orange-100'
                        }`}>
                          <Mic className={`h-4 w-4 ${
                            audio.status === 'normal' ? 'text-green-600' : 'text-orange-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{audio.shed} - {audio.zone}</p>
                          <p className="text-xs text-gray-500">{audio.id}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(audio.status)}`}>
                        {audio.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs text-gray-600">Noise Level</span>
                          <span className="text-lg font-semibold text-gray-900">{audio.noiseLevel} dB</span>
                        </div>
                        <Progress value={(audio.noiseLevel / 100) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Normal: {audio.normalRange}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className={`p-2 rounded text-center ${
                          audio.distressDetected ? 'bg-red-100 border border-red-300' : 'bg-white'
                        }`}>
                          <AlertTriangle className={`h-3 w-3 mx-auto mb-1 ${
                            audio.distressDetected ? 'text-red-600' : 'text-gray-400'
                          }`} />
                          <p className="text-xs text-gray-600">Distress</p>
                          <p className={`text-xs font-semibold ${
                            audio.distressDetected ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {audio.distressDetected ? 'Detected' : 'None'}
                          </p>
                        </div>
                        
                        <div className={`p-2 rounded text-center ${
                          audio.coughingDetected ? 'bg-orange-100 border border-orange-300' : 'bg-white'
                        }`}>
                          <Volume2 className={`h-3 w-3 mx-auto mb-1 ${
                            audio.coughingDetected ? 'text-orange-600' : 'text-gray-400'
                          }`} />
                          <p className="text-xs text-gray-600">Coughing</p>
                          <p className={`text-xs font-semibold ${
                            audio.coughingDetected ? 'text-orange-600' : 'text-gray-400'
                          }`}>
                            {audio.coughingDetected ? 'Detected' : 'None'}
                          </p>
                        </div>
                        
                        <div className={`p-2 rounded text-center ${
                          audio.fightingDetected ? 'bg-red-100 border border-red-300' : 'bg-white'
                        }`}>
                          <Zap className={`h-3 w-3 mx-auto mb-1 ${
                            audio.fightingDetected ? 'text-red-600' : 'text-gray-400'
                          }`} />
                          <p className="text-xs text-gray-600">Fighting</p>
                          <p className={`text-xs font-semibold ${
                            audio.fightingDetected ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {audio.fightingDetected ? 'Detected' : 'None'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Last Analysis</span>
                        <span className="text-xs text-gray-500">{audio.lastAnalysis}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Sound Pattern Analysis</h3>
              
              {/* Audio Waveform Placeholder */}
              <div className="mb-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-900">Live Audio Stream</span>
                  </div>
                  <Badge className="text-xs bg-green-100 text-green-700">Recording</Badge>
                </div>
                
                {/* Simulated Waveform */}
                <div className="flex items-center space-x-1 h-20">
                  {[...Array(50)].map((_, i) => (
                    <div 
                      key={i}
                      className="flex-1 bg-purple-400 rounded-full"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
                
                <p className="text-xs text-gray-600 mt-3 text-center">Shed A - Zone 1 | 65 dB</p>
              </div>

              {/* Sound Event Log */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-700">Recent Sound Events</h4>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div className="p-2 bg-red-50 rounded border border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                        <span className="text-xs font-medium text-gray-900">Distress Sound Detected</span>
                      </div>
                      <span className="text-xs text-gray-500">1 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-5">Shed B - Zone 1 | Confidence: 87%</p>
                  </div>
                  
                  <div className="p-2 bg-orange-50 rounded border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-3 w-3 text-orange-600" />
                        <span className="text-xs font-medium text-gray-900">Coughing Pattern Detected</span>
                      </div>
                      <span className="text-xs text-gray-500">1 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-5">Shed B - Zone 1 | Confidence: 78%</p>
                  </div>
                  
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-gray-900">Normal Activity Sounds</span>
                      </div>
                      <span className="text-xs text-gray-500">3 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-5">Shed A - Zone 1 | All zones normal</p>
                  </div>
                  
                  <div className="p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-3 w-3 text-blue-600" />
                        <span className="text-xs font-medium text-gray-900">Feeding Activity Increased</span>
                      </div>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-5">All Sheds | Normal pattern</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ML Predictions Tab */}
        <TabsContent value="ml" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Mortality Risk Assessment */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Mortality Risk Assessment</h3>
                <Brain className="h-4 w-4 text-purple-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <p className="text-xs text-gray-600 mb-1">Today</p>
                  <p className="text-2xl font-semibold text-orange-600">{mlPredictions.mortalityRisk.today}</p>
                  <p className="text-xs text-gray-500 mt-1">chickens</p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <p className="text-xs text-gray-600 mb-1">Tomorrow</p>
                  <p className="text-2xl font-semibold text-orange-600">{mlPredictions.mortalityRisk.tomorrow}</p>
                  <p className="text-xs text-gray-500 mt-1">chickens</p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                  <p className="text-xs text-gray-600 mb-1">Next Week</p>
                  <p className="text-2xl font-semibold text-red-600">{mlPredictions.mortalityRisk.nextWeek}</p>
                  <p className="text-xs text-gray-500 mt-1">chickens</p>
                </div>
              </div>
              
              <Alert className="border-orange-200 bg-orange-50">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-xs">
                  Mortality trend is <strong>{mlPredictions.mortalityRisk.trend}</strong>. 
                  Recommend increased monitoring and vet consultation.
                </AlertDescription>
              </Alert>
            </Card>

            {/* Disease Risk Prediction */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Disease Risk Prediction</h3>
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Respiratory Disease</span>
                    <span className="text-xs font-semibold text-red-600">{mlPredictions.diseaseRisk.respiratoryDisease}%</span>
                  </div>
                  <Progress value={mlPredictions.diseaseRisk.respiratoryDisease} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Metabolic Disorder</span>
                    <span className="text-xs font-semibold text-orange-600">{mlPredictions.diseaseRisk.metabolicDisorder}%</span>
                  </div>
                  <Progress value={mlPredictions.diseaseRisk.metabolicDisorder} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Parasites</span>
                    <span className="text-xs font-semibold text-yellow-600">{mlPredictions.diseaseRisk.parasites}%</span>
                  </div>
                  <Progress value={mlPredictions.diseaseRisk.parasites} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Viral Infection</span>
                    <span className="text-xs font-semibold text-green-600">{mlPredictions.diseaseRisk.viral}%</span>
                  </div>
                  <Progress value={mlPredictions.diseaseRisk.viral} className="h-2" />
                </div>
              </div>
              
              <Alert className="border-red-200 bg-red-50 mt-4">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-xs">
                  <strong>High Risk:</strong> Respiratory disease risk at 35%. 
                  Monitor coughing sounds and thermal readings closely.
                </AlertDescription>
              </Alert>
            </Card>

            {/* FCR Forecast */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">FCR Forecast & Optimization</h3>
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Current FCR</p>
                  <p className="text-2xl font-semibold text-blue-600">{mlPredictions.fcrForecast.current}</p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Projected FCR</p>
                  <p className="text-2xl font-semibold text-orange-600">{mlPredictions.fcrForecast.projected}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Optimal FCR</p>
                  <p className="text-2xl font-semibold text-green-600">{mlPredictions.fcrForecast.optimal}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={fcrHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[1, 1.8]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="fcr" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <Alert className="border-orange-200 bg-orange-50">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-xs">
                  FCR trend is <strong>{mlPredictions.fcrForecast.trend}</strong>. 
                  Consider adjusting feed formulation and environmental conditions.
                </AlertDescription>
              </Alert>
            </Card>

            {/* AI Recommendations */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">AI-Powered Recommendations</h3>
                <Zap className="h-4 w-4 text-yellow-600" />
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start space-x-2">
                    <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Optimize Feeding Schedule</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Increase feeding frequency in Shed A Zone 2 based on weight variance analysis. 
                        Expected FCR improvement: 0.08
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Immediate Veterinary Inspection</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Shed B Zone 1 shows multiple warning signs: elevated temperature, distress sounds, 
                        and low activity. Risk of disease outbreak: 67%
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs h-7 border-red-600 text-red-600">
                        Schedule Vet Visit
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Thermometer className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Adjust Environmental Controls</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Reduce temperature by 1.5°C in Shed B and increase ventilation rate by 15% 
                        to lower ammonia levels.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                        Auto-Adjust
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Performance Recognition</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Shed A maintains optimal conditions. Growth rate 8% above target. 
                        Continue current management practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Edge Computing Tab */}
        <TabsContent value="edge" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {edgeDevices.map((device) => (
              <Card key={device.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${
                      device.status === 'online' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {device.type.includes('Gateway') ? (
                        <Radio className={`h-5 w-5 ${device.status === 'online' ? 'text-green-600' : 'text-orange-600'}`} />
                      ) : (
                        <Cpu className={`h-5 w-5 ${device.status === 'online' ? 'text-green-600' : 'text-orange-600'}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{device.name}</h3>
                      <p className="text-xs text-gray-500">{device.type}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs px-2 py-1 ${
                    device.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {device.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Location</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{device.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Uptime</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{device.uptime}</span>
                  </div>
                  
                  {device.type.includes('Gateway') ? (
                    <>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">Sensors Connected</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{device.sensorsConnected}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">Data Rate</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">{device.dataRate}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Camera className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">Cameras / Audio</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {device.cameras} / {device.audioSensors}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">CPU Usage</span>
                            <span className={`text-xs font-semibold ${
                              device.cpuUsage! > 80 ? 'text-red-600' : 'text-gray-900'
                            }`}>{device.cpuUsage}%</span>
                          </div>
                          <Progress value={device.cpuUsage!} className="h-1.5" />
                        </div>
                        
                        {device.gpuUsage !== null && (
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-600">GPU Usage</span>
                              <span className="text-xs font-semibold text-gray-900">{device.gpuUsage}%</span>
                            </div>
                            <Progress value={device.gpuUsage} className="h-1.5" />
                          </div>
                        )}
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">Memory Usage</span>
                            <span className={`text-xs font-semibold ${
                              device.memoryUsage! > 80 ? 'text-orange-600' : 'text-gray-900'
                            }`}>{device.memoryUsage}%</span>
                          </div>
                          <Progress value={device.memoryUsage!} className="h-1.5" />
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-xs text-gray-600">Temperature</span>
                          <span className={`text-xs font-semibold ${
                            device.temperature! > 65 ? 'text-orange-600' : 'text-gray-900'
                          }`}>{device.temperature}°C</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last Update</span>
                      <span className="text-xs text-gray-600">{device.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* System Architecture Diagram */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">System Architecture Overview</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center mb-3">
                  <Cpu className="h-6 w-6 text-blue-600 mx-auto" />
                </div>
                <h4 className="text-xs font-semibold text-gray-900 text-center mb-2">IoT Sensors</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Temperature & Humidity</li>
                  <li>• Ammonia & CO2</li>
                  <li>• Water pH & TDS</li>
                  <li>• Weight Plates</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-center mb-3">
                  <Radio className="h-6 w-6 text-purple-600 mx-auto" />
                </div>
                <h4 className="text-xs font-semibold text-gray-900 text-center mb-2">Edge Gateway</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• ESP32/LoRaWAN</li>
                  <li>• Data Aggregation</li>
                  <li>• Local Processing</li>
                  <li>• Cloud Sync</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-center mb-3">
                  <Brain className="h-6 w-6 text-green-600 mx-auto" />
                </div>
                <h4 className="text-xs font-semibold text-gray-900 text-center mb-2">Edge AI</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Vision AI (Cameras)</li>
                  <li>• Audio Analysis</li>
                  <li>• Behavior Detection</li>
                  <li>• Real-time Alerts</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-center mb-3">
                  <Activity className="h-6 w-6 text-orange-600 mx-auto" />
                </div>
                <h4 className="text-xs font-semibold text-gray-900 text-center mb-2">Cloud ML</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Weight Prediction</li>
                  <li>• Mortality Risk</li>
                  <li>• Disease Detection</li>
                  <li>• FCR Forecasting</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Alert Management</h3>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Bell className="h-3 w-3 mr-1" />
                  Configure Alerts
                </Button>
                <Button size="sm" variant="outline">
                  Export Log
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {alertsData.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-0.5">
                        {alert.severity === 'critical' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {alert.severity === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                        {alert.severity === 'info' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-semibold text-gray-900">{alert.type}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{alert.shed} - {alert.zone}</span>
                          <Badge className={`text-xs px-2 py-0 ${
                            alert.status === 'active' ? 'bg-red-100 text-red-700' :
                            alert.status === 'investigating' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{alert.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <CheckCircle className="h-3 w-3" />
                            <span>{alert.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                      {alert.status === 'active' && (
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Alert Statistics */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Total Alerts (24h)</span>
                <Bell className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{alertsData.length}</p>
              <p className="text-xs text-gray-500 mt-1">+3 from yesterday</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Active Alerts</span>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-2xl font-semibold text-orange-600">
                {alertsData.filter(a => a.status === 'active').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Critical Alerts</span>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-2xl font-semibold text-red-600">
                {alertsData.filter(a => a.severity === 'critical').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Immediate action needed</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Resolved (24h)</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-semibold text-green-600">
                {alertsData.filter(a => a.status === 'resolved').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Successfully handled</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
