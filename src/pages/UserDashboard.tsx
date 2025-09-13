import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Trash2, Lightbulb, Droplets, AlertTriangle, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const civicIssues = [
    {
      id: 'potholes',
      name: 'Potholes',
      description: 'Report damaged roads and potholes',
      icon: Construction,
      color: 'bg-orange-100 text-orange-600',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'garbage',
      name: 'Garbage',
      description: 'Report garbage and waste management issues',
      icon: Trash2,
      color: 'bg-green-100 text-green-600',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'street-lights',
      name: 'Broken Street Lights',
      description: 'Report non-working or damaged street lights',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-600',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'water-problems',
      name: 'Water Related Problems',
      description: 'Report water supply, drainage, or pipe issues',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'traffic-issues',
      name: 'Traffic Issues',
      description: 'Report traffic signals and road safety problems',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'public-facilities',
      name: 'Public Facilities',
      description: 'Report issues with parks, toilets, and other facilities',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      image: '/api/placeholder/300/200'
    }
  ];

  const handleIssueClick = (issueId: string, issueName: string) => {
    navigate(`/report-issue/${issueId}`, { state: { issueName } });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome, {user.name || 'Citizen'}
              </h1>
              <p className="text-sm text-gray-600">Report civic issues in your area</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What civic issue would you like to report?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Click on the type of problem you want to report. Your report helps improve our community.
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {civicIssues.map((issue) => {
            const IconComponent = issue.icon;
            return (
              <Card 
                key={issue.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handleIssueClick(issue.id, issue.name)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${issue.color}`}>
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{issue.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-4">
                    {issue.description}
                  </CardDescription>
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <IconComponent className="h-16 w-16 text-gray-400" />
                  </div>
                  <Button className="w-full">
                    Report {issue.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to report an issue:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click on the type of problem you want to report</li>
            <li>Fill in the details about the issue</li>
            <li>Add your location (GPS will help detect automatically)</li>
            <li>Upload a photo if possible</li>
            <li>Submit your report</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;