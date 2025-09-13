import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Target, Award, Mail, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About CivicReport Jharkhand</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A student-led initiative empowering citizens to report civic issues and work together 
            with local authorities to build a better Jharkhand.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between citizens and local authorities by providing a transparent, 
                efficient platform for reporting and tracking civic issues across Jharkhand. We believe 
                that every citizen has the right to a well-maintained community and the power to make 
                positive changes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-accent" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a digitally empowered Jharkhand where every civic issue is addressed promptly 
                and transparently. We envision communities where citizens actively participate in local 
                governance and work collaboratively with authorities to improve living conditions for all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">How CivicReport Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Report",
                description: "Citizens report civic issues with photos and location details",
                icon: "📝"
              },
              {
                step: "2", 
                title: "Verify",
                description: "Our team verifies and categorizes submitted reports",
                icon: "✅"
              },
              {
                step: "3",
                title: "Forward",
                description: "Issues are forwarded to relevant local authorities",
                icon: "➡️"
              },
              {
                step: "4",
                title: "Track",
                description: "Citizens can track progress and receive updates",
                icon: "📊"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">Step {item.step}: {item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "1,247", label: "Issues Reported", icon: "📋" },
              { number: "892", label: "Issues Resolved", icon: "✅" },
              { number: "23", label: "Cities Covered", icon: "🏙️" },
              { number: "5,000+", label: "Citizens Helped", icon: "👥" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Team Section */}
        <div className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 justify-center">
                <Users className="h-6 w-6 text-primary" />
                <span>About Our Student Team</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed mb-6">
                CivicReport Jharkhand is proudly developed and maintained by a dedicated team of students 
                from various universities across Jharkhand. Our diverse backgrounds in technology, public 
                policy, and social work enable us to create solutions that truly serve our communities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Technology Team</h4>
                  <p className="text-sm text-muted-foreground">
                    Computer Science and Engineering students developing and maintaining the platform
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Outreach Team</h4>
                  <p className="text-sm text-muted-foreground">
                    Students from various disciplines promoting civic engagement in communities
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Research Team</h4>
                  <p className="text-sm text-muted-foreground">
                    Policy and social work students analyzing impact and improving processes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Transparency",
                description: "Every report and its progress is visible to the community",
                icon: "🔍"
              },
              {
                title: "Accessibility", 
                description: "Our platform is free and easy to use for all citizens",
                icon: "🌐"
              },
              {
                title: "Accountability",
                description: "We ensure responsible follow-up on all reported issues",
                icon: "📋"
              },
              {
                title: "Community First",
                description: "All decisions prioritize community benefit and well-being",
                icon: "🤝"
              },
              {
                title: "Innovation",
                description: "Using technology to solve traditional civic challenges",
                icon: "💡"
              },
              {
                title: "Collaboration",
                description: "Working together with citizens, authorities, and stakeholders",
                icon: "👥"
              }
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-6 w-6 text-primary" />
                <span>Get In Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">General Inquiries</h4>
                  <p className="text-muted-foreground">contact@civicreport-jharkhand.org</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Technical Support</h4>
                  <p className="text-muted-foreground">tech@civicreport-jharkhand.org</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Partnership Opportunities</h4>
                  <p className="text-muted-foreground">partnerships@civicreport-jharkhand.org</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-accent" />
                <span>Join Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Interested in contributing to your community? We're always looking for passionate 
                students and volunteers to join our team.
              </p>
              <div className="space-y-2">
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Volunteer With Us
                </Button>
                <Link to="/report" className="block">
                  <Button variant="outline" className="w-full">
                    Start Reporting Issues
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of citizens across Jharkhand who are actively improving their communities 
            through CivicReport. Every report matters, every voice counts.
          </p>
          <div className="space-x-4">
            <Link to="/report">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Report Your First Issue
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline">
                View Community Issues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;