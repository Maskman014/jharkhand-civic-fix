import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Trash2, Lightbulb, Droplets, AlertTriangle, Users } from "lucide-react";
import { MoreHorizontal, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import potholeImg from "@/assets/pothole-issue.jpg";
import garbageImg from "@/assets/garbage-issue.jpg";
import streetlightImg from "@/assets/streetlight-issue.jpg";
import waterImg from "@/assets/water-issue.jpg";
import trafficImg from "@/assets/traffic-issue.jpg";
import publicFacilityImg from "@/assets/public-facility-issue.jpg";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      } else {
        navigate('/login');
      }
    };

    getUser();
  }, [navigate]);

  const civicIssues = [
    {
      id: 'potholes',
      name: 'Potholes',
      description: 'Report damaged roads and potholes in your area',
      icon: Construction,
      color: 'bg-orange-100 text-orange-600',
      image: potholeImg
    },
    {
      id: 'garbage',
      name: 'Garbage & Waste',
      description: 'Report garbage and waste management issues',
      icon: Trash2,
      color: 'bg-green-100 text-green-600',
      image: garbageImg
    },
    {
      id: 'street-lights',
      name: 'Broken Street Lights',
      description: 'Report non-working or damaged street lights',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-600',
      image: streetlightImg
    },
    {
      id: 'water-problems',
      name: 'Water Related Problems',
      description: 'Report water supply, drainage, or pipe issues',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      image: waterImg
    },
    {
      id: 'traffic-issues',
      name: 'Traffic Issues',
      description: 'Report traffic signals and road safety problems',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      image: trafficImg
    },
    {
      id: 'public-facilities',
      name: 'Public Facilities',
      description: 'Report issues with parks, toilets, and other public facilities',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      image: publicFacilityImg
    },
    {
      id: 'others',
      name: 'Others',
      description: 'Report any other civic issues not listed above',
      icon: MoreHorizontal,
      color: 'bg-gray-100 text-gray-600',
      image: publicFacilityImg // Using a placeholder image
    }
  ];

  const handleIssueClick = (issueId: string, issueName: string) => {
    navigate(`/report-issue/${issueId}`, { state: { issueName } });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/');
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
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Welcome, {profile?.name || user?.email || 'User'}
              </h1>
              <p className="text-base text-muted-foreground">Report civic issues in your area</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="h-12 px-6 text-base flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6 text-center">
            What civic issue would you like to report?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-4xl mx-auto">
            Click on the picture of the problem type below. Your report helps improve our community and makes Jharkhand a better place to live.
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {civicIssues.map((issue) => {
            const IconComponent = issue.icon;
            return (
              <Card 
                key={issue.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:border-primary/50"
                onClick={() => handleIssueClick(issue.id, issue.name)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${issue.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{issue.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={issue.image} 
                      alt={issue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardDescription className="text-base mb-6 leading-relaxed">
                    {issue.description}
                  </CardDescription>
                  <Button className="w-full h-12 text-base font-semibold">
                    Report {issue.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-16 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-6">
            How to report an issue:
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-foreground text-lg">
            <li className="font-semibold">Click on the picture of the problem you want to report</li>
            <li className="font-semibold">Fill in the details about the issue</li>
            <li className="font-semibold">Add your location (GPS will help detect automatically)</li>
            <li className="font-semibold">Upload a photo if possible</li>
            <li className="font-semibold">Submit your report to the government</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;