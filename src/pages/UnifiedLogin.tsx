import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Building, Shield, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const UnifiedLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const userType = searchParams.get("type") || "citizen";
  
  // Citizen form state
  const [citizenForm, setCitizenForm] = useState({
    name: "",
    phone: ""
  });
  
  // Admin/Municipality form state
  const [officialForm, setOfficialForm] = useState({
    userId: "",
    password: "",
    confirmPassword: ""
  });
  
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          redirectBasedOnRole(profile.role);
        }
      }
    };
    
    checkAuth();
  }, []);

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'citizen':
        navigate('/issues');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'municipality':
        navigate('/municipality-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const handleCitizenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenForm.name.trim() || !citizenForm.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both name and phone number.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // For citizen login, we'll create a temporary email and password
      const email = `${citizenForm.phone}@citizen.jharkhand.gov.in`;
      const password = `citizen_${citizenForm.phone}`;

      // Try to sign in first
      let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // If sign in fails, create new account
      if (signInError) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: citizenForm.name,
              phone: citizenForm.phone,
              role: 'citizen'
            }
          }
        });

        if (signUpError) throw signUpError;
        signInData = signUpData;
      }

      toast({
        title: "Login Successful",
        description: `Welcome, ${citizenForm.name}! Redirecting to issues page...`
      });

      setTimeout(() => {
        navigate('/issues');
      }, 1500);

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOfficialAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!officialForm.userId.trim() || !officialForm.password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both User ID and password.",
        variant: "destructive"
      });
      return;
    }

    if (isSignup && officialForm.password !== officialForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const email = `${officialForm.userId}@${userType}.jharkhand.gov.in`;
      const role = userType === 'admin' ? 'admin' : 'municipality';

      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password: officialForm.password,
          options: {
            data: {
              name: officialForm.userId,
              role: role
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account Created",
          description: "Your account has been created successfully. Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: officialForm.password
        });

        if (error) throw error;

        toast({
          title: "Login Successful",
          description: `Welcome! Redirecting to ${userType} dashboard...`
        });

        setTimeout(() => {
          redirectBasedOnRole(role);
        }, 1500);
      }

    } catch (error: any) {
      toast({
        title: isSignup ? "Signup Failed" : "Login Failed",
        description: error.message || `An error occurred during ${isSignup ? 'signup' : 'login'}.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPortalInfo = (type: string) => {
    const portals = {
      citizen: {
        title: "Citizen Portal",
        icon: Users,
        color: "accent",
        description: "Report civic issues in your area with simple name and phone registration."
      },
      admin: {
        title: "Administrator Portal", 
        icon: UserCheck,
        color: "primary",
        description: "Manage and oversee all civic issues across Jharkhand state."
      },
      municipality: {
        title: "Municipality Portal",
        icon: Building, 
        color: "secondary",
        description: "Municipal heads and coordinators managing local area issues."
      }
    };
    return portals[type as keyof typeof portals];
  };

  const portalInfo = getPortalInfo(userType);
  const PortalIcon = portalInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className={`w-20 h-20 bg-gradient-to-br from-${portalInfo.color} to-${portalInfo.color}/80 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <PortalIcon className={`h-10 w-10 text-${portalInfo.color}-foreground`} />
              </div>
              <CardTitle className="text-2xl font-bold">{portalInfo.title}</CardTitle>
              <p className="text-muted-foreground">{portalInfo.description}</p>
            </CardHeader>
            
            <CardContent>
              {userType === 'citizen' ? (
                <form onSubmit={handleCitizenLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={citizenForm.name}
                      onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={citizenForm.phone}
                      onChange={(e) => setCitizenForm({ ...citizenForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login as Citizen"}
                  </Button>
                </form>
              ) : (
                <Tabs value={isSignup ? "signup" : "login"} onValueChange={(value) => setIsSignup(value === "signup")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleOfficialAuth} className="space-y-4">
                      <div>
                        <Label htmlFor="userId">User ID</Label>
                        <Input
                          id="userId"
                          type="text"
                          placeholder="Enter your User ID"
                          value={officialForm.userId}
                          onChange={(e) => setOfficialForm({ ...officialForm, userId: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={officialForm.password}
                          onChange={(e) => setOfficialForm({ ...officialForm, password: e.target.value })}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : `Login to ${portalInfo.title}`}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleOfficialAuth} className="space-y-4">
                      <div>
                        <Label htmlFor="newUserId">User ID</Label>
                        <Input
                          id="newUserId"
                          type="text"
                          placeholder="Choose a User ID"
                          value={officialForm.userId}
                          onChange={(e) => setOfficialForm({ ...officialForm, userId: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="newPassword">Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Create a password"
                          value={officialForm.password}
                          onChange={(e) => setOfficialForm({ ...officialForm, password: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={officialForm.confirmPassword}
                          onChange={(e) => setOfficialForm({ ...officialForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating Account..." : `Create ${portalInfo.title} Account`}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;