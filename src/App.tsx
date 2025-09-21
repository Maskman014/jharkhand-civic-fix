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
import Map from "./pages/Map";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
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
            <Route path="/dashboard" element={session ? <UserDashboard /> : <UnifiedLogin />} />
            <Route path="/user-dashboard" element={session ? <UserDashboard /> : <UnifiedLogin />} />
            <Route path="/admin-dashboard" element={session ? <AdminDashboard /> : <UnifiedLogin />} />
            <Route path="/municipality-dashboard" element={session ? <MunicipalityDashboard /> : <UnifiedLogin />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/report-issue/:issueType" element={<ReportIssueForm />} />
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
