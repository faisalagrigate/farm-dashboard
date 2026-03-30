"use client";

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Smartphone,
  Mail,
  Save
} from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    alerts: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-5',
    units: 'metric'
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account and application preferences</p>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-700">
          <Save className="h-4 w-4 mr-1" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs">Preferences</TabsTrigger>
          <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
          <TabsTrigger value="data" className="text-xs">Data</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-sm text-gray-600">Farm Manager</p>
                <Button size="sm" variant="outline" className="mt-2 text-xs">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs">First Name</Label>
                <Input id="firstName" defaultValue="John" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                <Input id="lastName" defaultValue="Smith" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" defaultValue="john.smith@example.com" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="h-8 text-xs" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <Select defaultValue="manager">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" className="text-xs">Administrator</SelectItem>
                    <SelectItem value="manager" className="text-xs">Farm Manager</SelectItem>
                    <SelectItem value="worker" className="text-xs">Farm Worker</SelectItem>
                    <SelectItem value="viewer" className="text-xs">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-gray-600">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">SMS Notifications</p>
                  <p className="text-xs text-gray-600">Receive critical alerts via SMS</p>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-gray-600">Browser push notifications</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">System Alerts</p>
                  <p className="text-xs text-gray-600">Critical system and equipment alerts</p>
                </div>
                <Switch 
                  checked={notifications.alerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, alerts: checked}))}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">Alert Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Equipment Failures',
                'Weather Warnings',
                'Irrigation Issues',
                'Livestock Health',
                'Crop Diseases',
                'Security Breaches',
                'Maintenance Due',
                'Harvest Ready'
              ].map((alertType, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-xs">{alertType}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">Application Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="theme" className="text-xs">Theme</Label>
                <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({...prev, theme: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light" className="text-xs">Light</SelectItem>
                    <SelectItem value="dark" className="text-xs">Dark</SelectItem>
                    <SelectItem value="auto" className="text-xs">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language" className="text-xs">Language</Label>
                <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({...prev, language: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" className="text-xs">English</SelectItem>
                    <SelectItem value="es" className="text-xs">Spanish</SelectItem>
                    <SelectItem value="fr" className="text-xs">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone" className="text-xs">Timezone</Label>
                <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({...prev, timezone: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8" className="text-xs">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-5" className="text-xs">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0" className="text-xs">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="units" className="text-xs">Units</Label>
                <Select value={preferences.units} onValueChange={(value) => setPreferences(prev => ({...prev, units: value}))}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric" className="text-xs">Metric</SelectItem>
                    <SelectItem value="imperial" className="text-xs">Imperial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-xs">Current Password</Label>
                <Input id="currentPassword" type="password" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-xs">New Password</Label>
                <Input id="newPassword" type="password" className="h-8 text-xs" />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-xs">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="h-8 text-xs" />
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Enable 2FA for enhanced security</p>
                <p className="text-xs text-gray-600">Use your phone to verify login attempts</p>
              </div>
              <Button size="sm" variant="outline">
                Enable 2FA
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Management
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">Export Farm Data</p>
                  <p className="text-xs text-gray-600">Download all your farm data as CSV/JSON</p>
                </div>
                <Button size="sm" variant="outline">
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">Import Data</p>
                  <p className="text-xs text-gray-600">Import data from other farm management systems</p>
                </div>
                <Button size="sm" variant="outline">
                  Import
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-red-200 rounded">
                <div>
                  <p className="text-sm font-medium text-red-700">Delete Account</p>
                  <p className="text-xs text-red-600">Permanently delete your account and all data</p>
                </div>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}