import React from 'react';
import { 
  LayoutGrid, 
  MapPin, 
  Wheat, 
  Heart, 
  Cpu, 
  Droplets, 
  CloudRain, 
  BarChart3, 
  CheckSquare, 
  Settings,
  Leaf,
  Wrench,
  Users,
  DollarSign,
  Bird
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
        { id: 'poultry', label: 'Agrigate Poultry AI', icon: Bird, color: 'text-purple-600' },

    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, color: 'text-blue-600' },
    { id: 'farms', label: 'Farms', icon: MapPin, color: 'text-green-600' },
    { id: 'livestock', label: 'Livestock', icon: Heart, color: 'text-red-500' },
    { id: 'sales', label: 'Sales & Revenue', icon: DollarSign, color: 'text-green-600' },
    { id: 'iot-devices', label: 'IoT Devices', icon: Cpu, color: 'text-purple-600' },
    // { id: 'irrigation', label: 'Irrigation', icon: Droplets, color: 'text-blue-500' },
    { id: 'weather', label: 'Weather', icon: CloudRain, color: 'text-sky-600' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'tasks', label: 'Tasks & Alerts', icon: CheckSquare, color: 'text-orange-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Agrigate</h1>
            <p className="text-xs text-gray-500">Smart Farm Management </p>
          </div>
        </div>
      </div>
      
      <nav className="mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm ${
                isActive 
                  ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-blue-600' : item.color}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}