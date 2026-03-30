"use client";

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/pages/Dashboard';
import { Farms } from '../components/pages/Farms';
import { Livestock } from '../components/pages/Livestock';
import { PoultryMonitoring } from '../components/pages/PoultryMonitoring';
import { Equipment } from '../components/pages/Equipment';
import { Labor } from '../components/pages/Labor';
import { Sales } from '../components/pages/Sales';
import { IoTDevices } from '../components/pages/IoTDevices';
import { Irrigation } from '../components/pages/Irrigation';
import { Weather } from '../components/pages/Weather';
import { Reports } from '../components/pages/Reports';
import { Tasks } from '../components/pages/Tasks';
import { Settings } from '../components/pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('poultry');

  const renderContent = () => {
    switch (activeTab) {
      case 'poultry':
        return <PoultryMonitoring />;
      case 'dashboard':
        return <Dashboard />;
      case 'farms':
        return <Farms />;
      case 'livestock':
        return <Livestock />;
      case 'sales':
        return <Sales />;
      case 'iot-devices':
        return <IoTDevices />;
      case 'irrigation':
        return <Irrigation />;
      case 'weather':
        return <Weather />;
      case 'reports':
        return <Reports />;
      case 'tasks':
        return <Tasks />;
      case 'settings':
        return <Settings />;
      default:
        return <PoultryMonitoring />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
