import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssueForm = () => {
  const { issueId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle the "others" case and format issue names properly
  const formatIssueName = (id: string) => {
    if (id === 'others') return 'Other Issue';
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const issueName = location.state?.issueName || formatIssueName(issueId || 'issue');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  
  const [formData, setFormData] = useState({
    problemName: issueName,
    description: '',
    location: '',
    photo: null as File | null
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          setIsGettingLocation(false);
          toast({
            title: "Location detected",
            description: "GPS coordinates have been added to your report"
          });
        },
        (error) => {
          setIsGettingLocation(false);
          console.error('Error getting location:', error);
          toast({
            title: "Location error",
            description: "Please enter your location manually",
            variant: "destructive"
          });
        },
        { timeout: 10000 }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "GPS not supported",
        description: "Please enter your location manually",
        variant: "destructive"
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      toast({
        title: "Photo uploaded",
        description: `Selected: ${file.name}`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide details about the issue",
        variant: "destructive"
      });
      return;
    }

    if (!formData.location.trim()) {
      toast({
        title: "Location required",
        description: "Please provide or detect your location",
        variant: "destructive"
      });
      return;
    }

    // Store the report (in a real app, this would go to a database)
    const report = {
      id: Date.now(),
      citizenName: user.name,
      citizenPhone: user.phone,
      problemName: formData.problemName,
      description: formData.description,
      location: formData.location,
      photo: formData.photo?.name || null,
      status: 'Pending',
      dateReported: new Date().toLocaleDateString(),
      timeReported: new Date().toLocaleTimeString()
    };

    // Store in localStorage (mock database)
    const existingReports = JSON.parse(localStorage.getItem('civicReports') || '[]');
    existingReports.push(report);
    localStorage.setItem('civicReports', JSON.stringify(existingReports));

    setIsSubmitted(true);
  };

  const handleBackToDashboard = () => {
    navigate('/user-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Your issue has been recorded!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for reporting this civic issue. Your report has been submitted successfully and will be reviewed by the relevant authorities.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Issue:</strong> {formData.problemName}<br />
                <strong>Submitted:</strong> {new Date().toLocaleString()}<br />
                <strong>Status:</strong> Pending Review
              </p>
            </div>
            <Button onClick={handleBackToDashboard} className="w-full">
              Report Another Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={handleGoBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Report: {formData.problemName}
              </h1>
              <p className="text-sm text-gray-600">Fill in the details below</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Report {formData.problemName} Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Problem Name */}
              <div>
                <Label htmlFor="problemName">Problem Name</Label>
                {issueId === 'others' ? (
                  <Input
                    id="problemName"
                    type="text"
                    value={formData.problemName}
                    onChange={(e) => setFormData(prev => ({ ...prev, problemName: e.target.value }))}
                    placeholder="Enter the type of issue you want to report"
                    required
                  />
                ) : (
                  <Input
                    id="problemName"
                    type="text"
                    value={formData.problemName}
                    onChange={(e) => setFormData(prev => ({ ...prev, problemName: e.target.value }))}
                    className="bg-gray-50"
                    readOnly
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail. Include when you noticed it, how severe it is, and any other relevant information..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter address or GPS coordinates"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {isGettingLocation ? 'Getting...' : 'GPS'}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Click GPS to automatically detect your current location
                </p>
              </div>

              {/* Photo Upload */}
              <div>
                <Label htmlFor="photo">Photo Upload</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photo')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Choose Photo
                  </Button>
                  {formData.photo && (
                    <span className="text-sm text-green-600">
                      ✓ {formData.photo.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  A photo helps authorities understand the issue better
                </p>
              </div>

              {/* User Info Display */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Reporter Information:</h4>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {user.name}<br />
                  <strong>Phone:</strong> {user.phone}
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Submit Issue Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssueForm;