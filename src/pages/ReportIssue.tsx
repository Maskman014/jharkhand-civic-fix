import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Send, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

const ReportIssue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contact: "",
    photo: null as File | null
  });

  const categories = [
    "Roads & Traffic",
    "Street Lighting",
    "Water Supply",
    "Sewerage & Drainage",
    "Waste Management",
    "Public Transport",
    "Parks & Gardens",
    "Building & Construction",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      toast("Photo uploaded successfully!");
    }
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({ 
            ...prev, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          }));
          toast("Location detected successfully!");
        },
        (error) => {
          toast("Unable to detect location. Please enter manually.");
        }
      );
    } else {
      toast("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast("Issue reported successfully! We'll keep you updated on the progress.");
  };

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.85), rgba(16, 185, 129, 0.85)), url(${jharkhandBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-accent/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Issue Reported Successfully!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for helping improve your community. Your report has been submitted and will be reviewed by the relevant authorities.
            </p>
            <div className="bg-muted rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
              <ul className="text-left text-muted-foreground space-y-2">
                <li>• Your report will be assigned a unique tracking ID</li>
                <li>• Local authorities will be notified</li>
                <li>• You'll receive updates via email as the status changes</li>
                <li>• You can track progress on our interactive map</li>
              </ul>
            </div>
            <div className="space-x-4">
              <Button onClick={() => setIsSubmitted(false)}>
                Report Another Issue
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/map"}>
                View Issues Map
              </Button>
            </div>
          </div>
        </div>
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
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Report a Civic Issue</h1>
            <p className="text-lg text-muted-foreground">
              Help us improve your community by reporting civic issues that need attention
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-primary" />
                <span>Issue Report Form</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Pothole on Main Street"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of the issue..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter address or coordinates"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationDetect}
                      className="shrink-0"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Detect
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click "Detect" to automatically get your current location
                  </p>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (Optional)</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("photo")?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {formData.photo ? "Change Photo" : "Upload Photo"}
                    </Button>
                    {formData.photo && (
                      <span className="text-sm text-muted-foreground">
                        {formData.photo.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Email *</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contact}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    We'll use this to send you updates about your report
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !formData.title || !formData.description || !formData.location || !formData.contact || !formData.category}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Issue Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="mt-8 bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-3 text-primary">Important Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All reports are reviewed within 24-48 hours</li>
                <li>• You'll receive email updates as your issue progresses</li>
                <li>• Photos help authorities understand and prioritize issues</li>
                <li>• Duplicate reports are automatically merged</li>
                <li>• Emergency issues should be reported to local emergency services</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;