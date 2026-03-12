import React from 'react';
import { Card } from '../ui/card';
import { Activity, Thermometer, Wind } from 'lucide-react';

interface Co2SensorDataProps {
    data: any;
    loading: boolean;
}

export function Co2SensorData({ data, loading }: Co2SensorDataProps) {
    if (loading && !data) return <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>;

    const co2Metrics = data?.metrics?.CO2 || { value: '--', unit: 'ppm' };
    const tempMetrics = data?.metrics?.Temperature || { value: '--', unit: '°C' };
    const humidityMetrics = data?.metrics?.Humidity || { value: '--', unit: '%' };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-green-50 border-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-green-600 uppercase font-semibold">CO2 Level</p>
                        <p className="text-2xl font-bold text-green-900">{co2Metrics.value} <span className="text-sm font-normal">{co2Metrics.unit}</span></p>
                    </div>
                    <Wind className="h-8 w-8 text-green-500" />
                </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-blue-600 uppercase font-semibold">Temperature</p>
                        <p className="text-2xl font-bold text-blue-900">{tempMetrics.value} <span className="text-sm font-normal">{tempMetrics.unit}</span></p>
                    </div>
                    <Thermometer className="h-8 w-8 text-blue-500" />
                </div>
            </Card>

            <Card className="p-4 bg-orange-50 border-orange-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-orange-600 uppercase font-semibold">Humidity</p>
                        <p className="text-2xl font-bold text-orange-900">{humidityMetrics.value} <span className="text-sm font-normal">{humidityMetrics.unit}</span></p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-500" />
                </div>
            </Card>
        </div>
    );
}
