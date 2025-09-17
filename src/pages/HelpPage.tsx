import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, HelpCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

const HelpPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I report a civic issue?",
      answer: "To report an issue, log in as a citizen using your username and phone number. Then select the type of problem from the dashboard, fill in the details, add your location, and submit the report."
    },
    {
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including potholes, garbage problems, broken street lights, water-related issues, traffic problems, and public facility concerns."
    },
    {
      question: "Do I need to provide my exact location?",
      answer: "Yes, location is required for proper issue resolution. You can either enter your address manually or use the GPS feature to automatically detect your current location."
    },
    {
      question: "How can I track my reported issue?",
      answer: "Currently, once you submit an issue, you'll receive a confirmation. The municipal authorities will review and update the status. Future versions will include tracking features."
    },
    {
      question: "Is it necessary to upload a photo?",
      answer: "While photos are not mandatory, they are highly recommended as they help authorities better understand the issue and prioritize accordingly."
    },
    {
      question: "Who can access the admin and municipal dashboards?",
      answer: "Admin and municipal dashboards are restricted to authorized personnel only. You need specific User IDs and passwords provided by the relevant authorities."
    },
    {
      question: "What happens after I submit a report?",
      answer: "After submission, your report is stored in the system and made available to municipal workers. They can view the details, update the status, and take appropriate action."
    },
    {
      question: "Can I report issues anonymously?",
      answer: "No, the system requires user identification (username and phone number) to ensure accountability and to allow authorities to contact you if needed."
    }
  ];

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
                ← Back to Home
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Help & Support</h1>
                <p className="text-sm text-gray-600">Get help with using the civic reporting system</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Introduction */}
        <div className="mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
                How to Use the Civic Reporting System
              </CardTitle>
              <CardDescription>
                Welcome to the Jharkhand Civic Issue Reporting System. This platform allows citizens to report civic problems and helps authorities manage and resolve them efficiently.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Role</h3>
                  <p className="text-sm text-gray-600">Select Citizen/User login to report issues, or use Admin/Municipal login if you're authorized personnel.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Report or Manage</h3>
                  <p className="text-sm text-gray-600">Citizens can select issue types and submit reports. Officials can view and manage reported issues.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Track Progress</h3>
                  <p className="text-sm text-gray-600">Municipal workers update issue status, and citizens receive confirmation of their submissions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div>
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Need additional help? Contact our support team through any of the following methods:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-gray-600">+91-XXX-XXX-XXXX</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-gray-600">support@jharkhand-civic.gov.in</p>
                    <p className="text-xs text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Office Address</p>
                    <p className="text-sm text-gray-600">Civic Centre, Ranchi</p>
                    <p className="text-xs text-gray-500">Jharkhand - 834001</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;