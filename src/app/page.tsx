"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { LoginPage } from "../components/LoginPage";
import { Dashboard } from "../components/pages/Dashboard";
import { Farms } from "../components/pages/Farms";
import { Livestock } from "../components/pages/Livestock";
import { PoultryMonitoring } from "../components/pages/PoultryMonitoring";
import { Sales } from "../components/pages/Sales";
import { IoTDevices } from "../components/pages/IoTDevices";
import { Irrigation } from "../components/pages/Irrigation";
import { Weather } from "../components/pages/Weather";
import { Reports } from "../components/pages/Reports";
import { Tasks } from "../components/pages/Tasks";
import { Settings } from "../components/pages/Settings";
import { getControlToken, logoutIoT } from "../lib/iotControl";

export default function App() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("iot-devices");

  useEffect(() => {
    setAuthed(!!getControlToken());
    setReady(true);

    const onExpired = () => setAuthed(false);
    window.addEventListener("iot-auth-expired", onExpired);
    return () => window.removeEventListener("iot-auth-expired", onExpired);
  }, []);

  const handleLogout = async () => {
    await logoutIoT();
    setAuthed(false);
    setActiveTab("iot-devices");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "poultry":
        return <PoultryMonitoring />;
      case "dashboard":
        return <Dashboard />;
      case "farms":
        return <Farms />;
      case "livestock":
        return <Livestock />;
      case "sales":
        return <Sales />;
      case "iot-devices":
        return <IoTDevices />;
      case "irrigation":
        return <Irrigation />;
      case "weather":
        return <Weather />;
      case "reports":
        return <Reports />;
      case "tasks":
        return <Tasks />;
      case "settings":
        return <Settings />;
      default:
        return <IoTDevices />;
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0f1410] flex items-center justify-center text-zinc-400 text-sm">
        Loading…
      </div>
    );
  }

  if (!authed) {
    return <LoginPage onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  );
}
