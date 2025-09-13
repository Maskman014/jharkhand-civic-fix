import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Building2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const UnifiedLogin = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [citizenData, setCitizenData] = useState({ username: '', phone: '' });
  const [adminData, setAdminData] = useState({ userId: '', password: '' });
  const [municipalData, setMunicipalData] = useState({ userId: '', password: '' });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCitizenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (citizenData.username && citizenData.phone) {
      // Store citizen data in sessionStorage for use across pages
      sessionStorage.setItem('user', JSON.stringify({ 
        role: 'citizen', 
        name: citizenData.username, 
        phone: citizenData.phone 
      }));
      toast({ title: "Login Successful", description: "Welcome to the civic reporting system!" });
      navigate('/user-dashboard');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminData.userId && adminData.password) {
      sessionStorage.setItem('user', JSON.stringify({ 
        role: 'admin', 
        userId: adminData.userId 
      }));
      toast({ title: "Admin Login Successful", description: "Welcome to admin dashboard!" });
      navigate('/admin-dashboard');
    }
  };

  const handleMunicipalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (municipalData.userId && municipalData.password) {
      sessionStorage.setItem('user', JSON.stringify({ 
        role: 'municipal', 
        userId: municipalData.userId 
      }));
      toast({ title: "Municipal Login Successful", description: "Welcome to municipal dashboard!" });
      navigate('/municipality-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Jharkhand Civic Portal</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">About Us</a>
              <a href="/help" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Help</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Jharkhand Civic Issue Reporting System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report civic issues, track progress, and help improve our communities together
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Citizen Login */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Citizen / User</CardTitle>
              <CardDescription>Report civic issues in your area</CardDescription>
            </CardHeader>
            <CardContent>
              {activeForm !== 'citizen' ? (
                <Button 
                  className="w-full" 
                  onClick={() => setActiveForm('citizen')}
                >
                  Login as Citizen
                </Button>
              ) : (
                <form onSubmit={handleCitizenLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="citizen-username">Username</Label>
                    <Input 
                      id="citizen-username"
                      type="text"
                      value={citizenData.username}
                      onChange={(e) => setCitizenData({...citizenData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="citizen-phone">Phone Number</Label>
                    <Input 
                      id="citizen-phone"
                      type="tel"
                      value={citizenData.phone}
                      onChange={(e) => setCitizenData({...citizenData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Admin Login */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Administrator</CardTitle>
              <CardDescription>System administration and oversight</CardDescription>
            </CardHeader>
            <CardContent>
              {activeForm !== 'admin' ? (
                <Button 
                  className="w-full" 
                  onClick={() => setActiveForm('admin')}
                >
                  Login as Admin
                </Button>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-userid">User ID</Label>
                    <Input 
                      id="admin-userid"
                      type="text"
                      value={adminData.userId}
                      onChange={(e) => setAdminData({...adminData, userId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <Input 
                      id="admin-password"
                      type="password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Municipality Login */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Municipality Head & Co</CardTitle>
              <CardDescription>Municipal workers and officials</CardDescription>
            </CardHeader>
            <CardContent>
              {activeForm !== 'municipal' ? (
                <Button 
                  className="w-full" 
                  onClick={() => setActiveForm('municipal')}
                >
                  Login as Municipal Worker
                </Button>
              ) : (
                <form onSubmit={handleMunicipalLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="municipal-userid">User ID</Label>
                    <Input 
                      id="municipal-userid"
                      type="text"
                      value={municipalData.userId}
                      onChange={(e) => setMunicipalData({...municipalData, userId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="municipal-password">Password</Label>
                    <Input 
                      id="municipal-password"
                      type="password"
                      value={municipalData.password}
                      onChange={(e) => setMunicipalData({...municipalData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;