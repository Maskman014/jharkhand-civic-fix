import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

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
  // Get user data from localStorage (matching the login system)
  const getUserData = () => {
    const citizenData = localStorage.getItem('citizen');
    const adminData = localStorage.getItem('admin');
    const municipalityData = localStorage.getItem('municipality');
    
    if (citizenData) return JSON.parse(citizenData);
    if (adminData) return JSON.parse(adminData);
    if (municipalityData) return JSON.parse(municipalityData);
    return {};
  };
  
  const user = getUserData();
  
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Convert photo to base64 if present
    let photoData = null;
    if (formData.photo) {
      const reader = new FileReader();
      photoData = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target?.result);
        reader.readAsDataURL(formData.photo!);
      });
    }

    // Store the report to Supabase database
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          title: formData.problemName,
          description: formData.description,
          address: formData.location,
          category: 'General', // Default category
          priority: 'medium', // Default priority
          status: 'pending',
          images: photoData ? [photoData as string] : []
        }])
        .select();

      if (error) throw error;

      console.log('Report saved:', data);
    } catch (error: any) {
      console.error('Error saving report:', error);
      toast({
        title: "Error saving report",
        description: "Report saved locally but couldn't sync to server.",
        variant: "destructive"
      });
    }

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
      <div 
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.85), rgba(16, 185, 129, 0.85)), url(${jharkhandBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm border-2 border-white/20">
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
                <strong>Reporter:</strong> {user.name || user.user_id}<br />
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
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
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
                  <strong>Name:</strong> {user.name || user.user_id || 'Not specified'}<br />
                  {user.phone && <><strong>Phone:</strong> {user.phone}<br /></>}
                  {user.municipality && <><strong>Municipality:</strong> {user.municipality}</>}
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