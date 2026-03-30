"use client";

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Droplets, Zap } from 'lucide-react';

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFarm, setSelectedFarm] = useState('all');

  const reportTypes = [
    { id: 'production', name: 'Production Report', description: 'Crop yields and livestock productivity' },
    { id: 'financial', name: 'Financial Analysis', description: 'Revenue, costs, and profitability' },
    { id: 'environmental', name: 'Environmental Impact', description: 'Water usage, energy consumption' },
    { id: 'operational', name: 'Operational Summary', description: 'Tasks, maintenance, and efficiency' }
  ];

  const quickStats = [
    { label: 'Total Revenue', value: '$425,000', change: '+12%', color: 'text-green-600' },
    { label: 'Operating Costs', value: '$180,000', change: '-8%', color: 'text-red-600' },
    { label: 'Water Usage', value: '2,340,000L', change: '-5%', color: 'text-blue-600' },
    { label: 'Energy Consumption', value: '45,600 kWh', change: '+3%', color: 'text-yellow-600' }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Generate comprehensive farm performance reports</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week" className="text-xs">Last Week</SelectItem>
              <SelectItem value="month" className="text-xs">Last Month</SelectItem>
              <SelectItem value="quarter" className="text-xs">Last Quarter</SelectItem>
              <SelectItem value="year" className="text-xs">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.color}`}>{stat.change} vs last period</p>
              </div>
              {index === 0 && <DollarSign className="h-8 w-8 text-green-600" />}
              {index === 1 && <TrendingUp className="h-8 w-8 text-red-600" />}
              {index === 2 && <Droplets className="h-8 w-8 text-blue-600" />}
              {index === 3 && <Zap className="h-8 w-8 text-yellow-600" />}
            </div>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate" className="text-xs">Generate Reports</TabsTrigger>
          <TabsTrigger value="history" className="text-xs">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold">{report.name}</h3>
                    <p className="text-xs text-gray-600">{report.description}</p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Select farms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">All Farms</SelectItem>
                      <SelectItem value="green-valley" className="text-xs">Green Valley Farm</SelectItem>
                      <SelectItem value="sunrise-acres" className="text-xs">Sunrise Acres</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 h-7 text-xs">
                    Generate Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-3">Recent Reports</h3>
            <div className="space-y-2">
              {[
                { name: 'Production Report - August 2024', date: '2024-08-09', type: 'Production', status: 'Ready' },
                { name: 'Financial Analysis - Q2 2024', date: '2024-07-31', type: 'Financial', status: 'Ready' },
                { name: 'Environmental Impact - July 2024', date: '2024-08-01', type: 'Environmental', status: 'Processing' },
                { name: 'Operational Summary - Week 32', date: '2024-08-05', type: 'Operational', status: 'Ready' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                      <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </Badge>
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analytics Overview */}
      <Card className="p-4">
        <h3 className="text-base font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Production Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Crop Yield Efficiency</span>
                <span className="text-green-600">+8.5%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Livestock Productivity</span>
                <span className="text-green-600">+12.3%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Resource Utilization</span>
                <span className="text-blue-600">94.2%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Cost Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Cost per Acre</span>
                <span className="text-red-600">-5.2%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Energy Efficiency</span>
                <span className="text-green-600">+7.8%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Labor Costs</span>
                <span className="text-yellow-600">+2.1%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Environmental Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Water Conservation</span>
                <span className="text-green-600">-8.7%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Carbon Footprint</span>
                <span className="text-green-600">-4.3%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Waste Reduction</span>
                <span className="text-green-600">-12.5%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}