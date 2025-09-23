import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

import Home from "./pages/Home";
import About from "./pages/About";
import UnifiedLogin from "./pages/UnifiedLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MunicipalityDashboard from "./pages/MunicipalityDashboard";
import ReportIssue from "./pages/ReportIssue";
import ReportIssueForm from "./pages/ReportIssueForm";
import IssueDetail from "./pages/IssueDetail";
import IssuesList from "./pages/IssuesList";
import Map from "./pages/Map";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [localAuth, setLocalAuth] = useState<any>(null);

  useEffect(() => {
    // Check for local storage auth (for citizen/admin/municipality login)
    const citizenData = localStorage.getItem('citizen');
    const adminData = localStorage.getItem('admin');
    const municipalityData = localStorage.getItem('municipality');
    
    if (citizenData) {
      setLocalAuth({ type: 'citizen', data: JSON.parse(citizenData) });
    } else if (adminData) {
      setLocalAuth({ type: 'admin', data: JSON.parse(adminData) });
    } else if (municipalityData) {
      setLocalAuth({ type: 'municipality', data: JSON.parse(municipalityData) });
    }

    // Also check for Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = session || localAuth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<UnifiedLogin />} />
            <Route path="/dashboard" element={isAuthenticated ? <UserDashboard /> : <UnifiedLogin />} />
            <Route path="/user-dashboard" element={isAuthenticated ? <UserDashboard /> : <UnifiedLogin />} />
            <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard /> : <UnifiedLogin />} />
            <Route path="/municipality/dashboard" element={isAuthenticated ? <MunicipalityDashboard /> : <UnifiedLogin />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/issues" element={isAuthenticated ? <IssuesList /> : <UnifiedLogin />} />
            <Route path="/report-issue/:issueType" element={isAuthenticated ? <ReportIssueForm /> : <UnifiedLogin />} />
            <Route path="/issue/:id" element={<IssueDetail />} />
            <Route path="/map" element={<Map />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
