import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Building2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

const UnifiedLogin = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [citizenData, setCitizenData] = useState({ username: '', phone: '' });
  const [adminData, setAdminData] = useState({ userId: '' });
  const [municipalData, setMunicipalData] = useState({ userId: '' });
  
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
    if (adminData.userId) {
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
    if (municipalData.userId) {
      sessionStorage.setItem('user', JSON.stringify({ 
        role: 'municipal', 
        userId: municipalData.userId 
      }));
      toast({ title: "Municipal Login Successful", description: "Welcome to municipal dashboard!" });
      navigate('/municipality-dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.85)), url(${jharkhandBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Government of Jharkhand</h1>
                <p className="text-sm text-muted-foreground">Civic Issue Reporting Portal</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-foreground hover:text-primary px-4 py-2 text-base font-medium transition-colors">Home</a>
              <a href="/about" className="text-foreground hover:text-primary px-4 py-2 text-base font-medium transition-colors">About Us</a>
              <a href="/help" className="text-foreground hover:text-primary px-4 py-2 text-base font-medium transition-colors">Help</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h1 className="text-5xl font-bold text-white mb-6">
              झारखंड नागरिक समस्या रिपोर्टिंग सिस्टम
            </h1>
            <h2 className="text-3xl font-semibold text-white/90 mb-4">
              Jharkhand Civic Issue Reporting System
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              सरकारी पोर्टल - नागरिक समस्याओं की रिपोर्ट करें और प्रगति को ट्रैक करें<br/>
              Government Portal - Report civic issues, track progress, and help improve our communities
            </p>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Citizen Login */}
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-2xl font-bold">नागरिक / Citizen</CardTitle>
              <CardDescription className="text-lg">नागरिक समस्याओं की रिपोर्ट करें<br/>Report civic issues in your area</CardDescription>
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
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">प्रशासक / Administrator</CardTitle>
              <CardDescription className="text-lg">सिस्टम प्रशासन और निगरानी<br/>System administration and oversight</CardDescription>
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
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="admin-userid" className="text-base font-semibold">User ID / यूजर आईडी</Label>
                    <Input 
                      id="admin-userid"
                      type="text"
                      value={adminData.userId}
                      onChange={(e) => setAdminData({...adminData, userId: e.target.value})}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter your User ID"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1 h-12 text-lg bg-primary hover:bg-primary-dark">Login / लॉगिन</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="flex-1 h-12 text-lg"
                    >
                      Cancel / रद्द करें
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Municipality Login */}
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-warning/20 border-2 border-warning rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-10 w-10 text-warning" />
              </div>
              <CardTitle className="text-2xl font-bold">नगर निगम / Municipality</CardTitle>
              <CardDescription className="text-lg">नगरपालिका कर्मचारी और अधिकारी<br/>Municipal workers and officials</CardDescription>
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
                <form onSubmit={handleMunicipalLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="municipal-userid" className="text-base font-semibold">User ID / यूजर आईडी</Label>
                    <Input 
                      id="municipal-userid"
                      type="text"
                      value={municipalData.userId}
                      onChange={(e) => setMunicipalData({...municipalData, userId: e.target.value})}
                      required
                      className="h-12 text-lg"
                      placeholder="Enter your User ID"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1 h-12 text-lg bg-warning hover:bg-warning/90">Login / लॉगिन</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="flex-1 h-12 text-lg"
                    >
                      Cancel / रद्द करें
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