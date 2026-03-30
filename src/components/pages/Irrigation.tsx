"use client";

import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Droplets, Power, Clock, MapPin, Activity, TrendingDown } from 'lucide-react';

export function Irrigation() {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Irrigation Management</h1>
          <p className="text-sm text-gray-600">Control water distribution across your fields</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Droplets className="h-4 w-4 mr-1" />
          Schedule Irrigation
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Daily Usage</p>
              <p className="text-2xl font-semibold text-gray-900">2,340L</p>
              <p className="text-xs text-blue-600">-5% vs yesterday</p>
            </div>
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Active Zones</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-green-600">of 8 zones</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Water Efficiency</p>
              <p className="text-2xl font-semibold text-gray-900">94%</p>
              <p className="text-xs text-green-600">Excellent</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Next Schedule</p>
              <p className="text-2xl font-semibold text-gray-900">6:00 AM</p>
              <p className="text-xs text-blue-600">Field C</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Irrigation Zones */}
      <Card className="p-4">
        <h3 className="text-base font-semibold mb-4">Irrigation Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'Zone 1', location: 'Field A - North', status: 'active', duration: 45, remaining: 15, soilMoisture: 45 },
            { id: 'Zone 2', location: 'Field A - South', status: 'scheduled', duration: 30, remaining: 0, soilMoisture: 38 },
            { id: 'Zone 3', location: 'Field B', status: 'active', duration: 60, remaining: 35, soilMoisture: 42 },
            { id: 'Zone 4', location: 'Greenhouse 1', status: 'offline', duration: 0, remaining: 0, soilMoisture: 65 },
            { id: 'Zone 5', location: 'Greenhouse 2', status: 'idle', duration: 0, remaining: 0, soilMoisture: 58 },
            { id: 'Zone 6', location: 'Field C', status: 'scheduled', duration: 40, remaining: 0, soilMoisture: 32 }
          ].map(zone => (
            <Card key={zone.id} className="p-3 border">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="text-sm font-medium">{zone.id}</h4>
                  <p className="text-xs text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {zone.location}
                  </p>
                </div>
                <Badge className={`text-xs ${
                  zone.status === 'active' ? 'bg-green-100 text-green-800' :
                  zone.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  zone.status === 'offline' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {zone.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Soil Moisture</span>
                  <span>{zone.soilMoisture}%</span>
                </div>
                <Progress value={zone.soilMoisture} className="h-2" />
                
                {zone.status === 'active' && (
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Time Remaining</span>
                      <span>{zone.remaining} min</span>
                    </div>
                    <Progress value={(zone.remaining / zone.duration) * 100} className="h-2" />
                  </div>
                )}
                
                <div className="flex space-x-1 mt-2">
                  <Button size="sm" variant="outline" className="flex-1 h-6 text-xs">
                    <Power className="h-3 w-3 mr-1" />
                    {zone.status === 'active' ? 'Stop' : 'Start'}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-6 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}