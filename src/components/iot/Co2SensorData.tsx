import React from 'react';
import { Card } from '../ui/card';
import { Activity, Thermometer, Wind, Zap } from 'lucide-react';

interface Co2SensorDataProps {
    data: any;
    loading: boolean;
}

export function Co2SensorData({ data, loading }: Co2SensorDataProps) {
    if (loading && !data) return <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>;

    const co2Metrics = data?.metrics?.CO2 || { value: '--', unit: 'mg/Kg' };
    const tempMetrics = data?.metrics?.Temperature || data?.metrics?.temp || { value: '--', unit: '°C' };
    const humidityMetrics = data?.metrics?.RH || { value: '--', unit: '%' };
    const nh3Metrics = data?.metrics?.NH3 || { value: '--', unit: 'mg/Kg' };
    const batteryMetrics = data?.metrics?.['Battery Voltage'] || data?.metrics?.Battery || { value: '--', unit: 'V' };
    const signalMetrics = data?.metrics?.['Signal Strength'] || { value: '--', unit: 'dBm' };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="p-3 bg-green-50 border-green-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-green-600 uppercase font-bold tracking-tight">CO2 Level</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-green-900">{co2Metrics.value}</p>
                        <Wind className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-[10px] text-green-600/70">{co2Metrics.unit}</p>
                </div>
            </Card>

            <Card className="p-3 bg-blue-50 border-blue-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-blue-600 uppercase font-bold tracking-tight">Temperature</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-blue-900">{tempMetrics.value}</p>
                        <Thermometer className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-[10px] text-blue-600/70">{tempMetrics.unit || '°C'}</p>
                </div>
            </Card>

            <Card className="p-3 bg-orange-50 border-orange-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-orange-600 uppercase font-bold tracking-tight">Humidity</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-orange-900">{humidityMetrics.value}</p>
                        <Activity className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-[10px] text-orange-600/70">{humidityMetrics.unit}</p>
                </div>
            </Card>

            <Card className="p-3 bg-yellow-50 border-yellow-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-yellow-600 uppercase font-bold tracking-tight">Ammonia (NH3)</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-yellow-900">{nh3Metrics.value}</p>
                        <Wind className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-[10px] text-yellow-600/70">{nh3Metrics.unit}</p>
                </div>
            </Card>

            <Card className="p-3 bg-red-50 border-red-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-red-600 uppercase font-bold tracking-tight">Battery</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-red-900">{batteryMetrics.value}</p>
                        <Zap className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-[10px] text-red-600/70">{batteryMetrics.unit}</p>
                </div>
            </Card>

            <Card className="p-3 bg-purple-50 border-purple-100">
                <div className="flex flex-col">
                    <p className="text-[10px] text-purple-600 uppercase font-bold tracking-tight">Signal</p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-xl font-bold text-purple-900">{signalMetrics.value}</p>
                        <Activity className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-[10px] text-purple-600/70">{signalMetrics.unit}</p>
                </div>
            </Card>
        </div>
    );
}
