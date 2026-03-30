import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { formatCurrency, formatCurrencyCompact } from '../ui/currency-utils';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Truck,
  DollarSign,
  Wheat,
  Heart,
  Wrench
} from 'lucide-react';
import { QuickActionModal } from '../modals/QuickActionModal';

export function Dashboard() {
  const [showQuickAction, setShowQuickAction] = useState(false);

  const farmStats = {
    totalArea: 2500, // acres
    activeFields: 12,
    totalRevenue: 58750000, // ৳5.87 Cr (converted from $708k)
    totalCosts: 36550000,   // ৳3.65 Cr (converted from $440k)
    netProfit: 22200000,    // ৳2.22 Cr (converted from $268k)
    profitMargin: 37.8
  };

  const sensorReadings = [
    {
      id: 1,
      location: 'Field A - Zone 1',
      soilMoisture: 65,
      temperature: 28,
      humidity: 72,
      ph: 6.8,
      batteryLevel: 85,
      lastUpdated: '2 mins ago',
      status: 'optimal'
    },
    {
      id: 2,
      location: 'Field B - Zone 2',
      soilMoisture: 45,
      temperature: 32,
      humidity: 58,
      ph: 7.2,
      batteryLevel: 92,
      lastUpdated: '5 mins ago',
      status: 'low-moisture'
    },
    {
      id: 3,
      location: 'Greenhouse 1',
      soilMoisture: 78,
      temperature: 26,
      humidity: 85,
      ph: 6.5,
      batteryLevel: 78,
      lastUpdated: '1 min ago',
      status: 'optimal'
    },
    {
      id: 4,
      location: 'Pasture A',
      soilMoisture: 38,
      temperature: 35,
      humidity: 45,
      ph: 7.0,
      batteryLevel: 34,
      lastUpdated: '8 mins ago',
      status: 'low-battery'
    }
  ];

  const equipmentStatus = [
    { name: 'John Deere 8345R', status: 'operational', hoursUsed: 1245, location: 'Field A' },
    { name: 'Case IH Combine', status: 'maintenance', hoursUsed: 890, location: 'Service Bay' },
    { name: 'Kubota M7-172', status: 'operational', hoursUsed: 756, location: 'Barn B' },
    { name: 'Gator Utility Vehicle', status: 'out-of-service', hoursUsed: 445, location: 'Repair Shop' }
  ];

  const recentSales = [
    { 
      crop: 'Rice', 
      quantity: 2500, 
      price: 620,        // ৳620 per quintal
      revenue: 1550000,  // ৳15.5 L
      buyer: 'Bangladesh Agro Ltd',
      date: '2024-08-15'
    },
    { 
      crop: 'Jute', 
      quantity: 3200, 
      price: 480,        // ৳480 per quintal
      revenue: 1536000,  // ৳15.36 L
      buyer: 'Dhaka Grain Merchants',
      date: '2024-08-10'
    },
    { 
      crop: 'Wheat', 
      quantity: 1800, 
      price: 890,        // ৳890 per quintal
      revenue: 1602000,  // ৳16.02 L
      buyer: 'Chittagong Trading Co',
      date: '2024-08-05'
    }
  ];

  const upcomingTasks = [
    { task: 'Irrigation - Field A Zone 2', priority: 'high', dueDate: 'Today, 2:00 PM', assignedTo: 'Kabir Rahman' },
    { task: 'Harvest - Field C (Rice)', priority: 'high', dueDate: 'Tomorrow, 6:00 AM', assignedTo: 'Rahim Team' },
    { task: 'Equipment Maintenance - Tractor', priority: 'medium', dueDate: 'Aug 12, 10:00 AM', assignedTo: 'Maintenance Crew' },
    { task: 'Soil Testing - Field B', priority: 'low', dueDate: 'Aug 15, 9:00 AM', assignedTo: 'Agricultural Officer' }
  ];

  const weatherData = {
    current: {
      temperature: 32,
      condition: 'Partly Cloudy',
      humidity: 68,
      windSpeed: 12,
      rainfall: 0
    },
    forecast: [
      { day: 'Today', high: 34, low: 26, condition: 'Sunny', rain: 10 },
      { day: 'Tomorrow', high: 31, low: 24, condition: 'Cloudy', rain: 40 },
      { day: 'Wednesday', high: 29, low: 22, condition: 'Rain', rain: 85 },
      { day: 'Thursday', high: 30, low: 23, condition: 'Partly Cloudy', rain: 20 }
    ]
  };

  const livestockData = {
    cattle: { total: 45, healthy: 42, sick: 2, pregnant: 3 },
    goats: { total: 128, healthy: 125, sick: 1, pregnant: 8 },
    poultry: { total: 2500, healthy: 2475, sick: 15, laying: 1890 }
  };

  const aiRecommendations = [
    {
      type: 'irrigation',
      message: 'Field B Zone 2 soil moisture is at 45%. Consider irrigation within next 6 hours for optimal crop health.',
      confidence: 87,
      action: 'Schedule Irrigation'
    },
    {
      type: 'disease',
      message: 'Weather conditions favor fungal growth. Apply preventive fungicide spray to wheat fields.',
      confidence: 72,
      action: 'Schedule Treatment'
    },
    {
      type: 'harvest',
      message: 'Wheat in Field C has reached optimal moisture content (12.5%). Harvest recommended within 3 days.',
      confidence: 94,
      action: 'Schedule Harvest'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Farm Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back! Here's what's happening on your farm today.</p>
        </div>
        <Button 
          onClick={() => setShowQuickAction(true)}
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Quick Action
        </Button>
      </div>

      {/* Farm Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Total Area</p>
              <p className="text-2xl font-semibold text-gray-900">{farmStats.totalArea}</p>
              <p className="text-xs text-green-600">{farmStats.activeFields} active fields</p>
            </div>
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(farmStats.totalRevenue)}</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12.5% vs last year
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Net Profit</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrencyCompact(farmStats.netProfit)}</p>
              <p className="text-xs text-blue-600">{farmStats.profitMargin}% margin</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Equipment</p>
              <p className="text-2xl font-semibold text-gray-900">
                {equipmentStatus.filter(e => e.status === 'operational').length}/{equipmentStatus.length}
              </p>
              <p className="text-xs text-green-600">operational</p>
            </div>
            <Truck className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Livestock</p>
              <p className="text-2xl font-semibold text-gray-900">
                {livestockData.cattle.total + livestockData.goats.total + livestockData.poultry.total}
              </p>
              <p className="text-xs text-blue-600">total animals</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
          <Badge className="bg-purple-100 text-purple-800 text-xs">
            Smart Insights
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec, index) => (
            <Alert key={index} className="border-blue-200 bg-blue-50">
              <div className="flex items-start space-x-2">
                {rec.type === 'irrigation' && <Droplets className="h-4 w-4 text-blue-600 mt-0.5" />}
                {rec.type === 'disease' && <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />}
                {rec.type === 'harvest' && <Wheat className="h-4 w-4 text-green-600 mt-0.5" />}
                <div className="flex-1">
                  <AlertDescription className="text-xs text-blue-800">
                    <p>{rec.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-blue-600">Confidence: {rec.confidence}%</span>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        {rec.action}
                      </Button>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Sales */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Recent Sales</h3>
            <Button size="sm" variant="outline">View All</Button>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{sale.crop}</p>
                    <p className="text-xs text-gray-600">{sale.quantity} quintals @ {formatCurrency(sale.price)}/quintal</p>
                    <p className="text-xs text-gray-500">{sale.buyer} • {new Date(sale.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-semibold text-green-600">{formatCurrencyCompact(sale.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weather Widget */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Weather</h3>
            <Sun className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">{weatherData.current.temperature}°C</p>
                <p className="text-sm text-gray-600">{weatherData.current.condition}</p>
              </div>
              <div className="text-right text-xs text-gray-600">
                <p>Humidity: {weatherData.current.humidity}%</p>
                <p>Wind: {weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="w-16">{day.day}</span>
                <span className="flex-1 text-center">{day.condition}</span>
                <span>{day.high}°/{day.low}°</span>
                <span className="text-blue-600">{day.rain}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Upcoming Tasks</h3>
            <Button size="sm" variant="outline">View All</Button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-gray-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {task.assignedTo}
                    </p>
                  </div>
                  <Badge 
                    className={`text-xs ml-2 ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sensor Readings */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Real-time Sensor Data</h3>
          <Button size="sm" variant="outline">Manage Sensors</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorReadings.map((sensor) => (
            <div key={sensor.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{sensor.location}</h4>
                <Badge 
                  className={`text-xs ${
                    sensor.status === 'optimal' ? 'bg-green-100 text-green-800' :
                    sensor.status === 'low-moisture' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {sensor.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Droplets className="h-3 w-3 text-blue-500" />
                  <span>Moisture: {sensor.soilMoisture}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Thermometer className="h-3 w-3 text-red-500" />
                  <span>Temp: {sensor.temperature}°C</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="h-3 w-3 text-gray-500" />
                  <span>Humidity: {sensor.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>pH: {sensor.ph}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Battery: {sensor.batteryLevel}%</span>
                  <span>{sensor.lastUpdated}</span>
                </div>
                <Progress value={sensor.batteryLevel} className="h-1 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Equipment Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Equipment Status</h3>
          <Button size="sm" variant="outline">Manage Equipment</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipmentStatus.map((equipment, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{equipment.name}</h4>
                <Badge 
                  className={`text-xs ${
                    equipment.status === 'operational' ? 'bg-green-100 text-green-800' :
                    equipment.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {equipment.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{equipment.hoursUsed} hours used</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{equipment.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Action Modal */}
      {showQuickAction && (
        <QuickActionModal onClose={() => setShowQuickAction(false)} />
      )}
    </div>
  );
}