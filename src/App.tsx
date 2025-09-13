import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnifiedLogin from "./pages/UnifiedLogin";
import UserDashboard from "./pages/UserDashboard";
import ReportIssueForm from "./pages/ReportIssueForm";
import AdminDashboard from "./pages/AdminDashboard";
import MunicipalityDashboard from "./pages/MunicipalityDashboard";
import HelpPage from "./pages/HelpPage";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import Map from "./pages/Map";
import About from "./pages/About";
import IssueDetail from "./pages/IssueDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* New Unified Login System */}
          <Route path="/" element={<UnifiedLogin />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/report-issue/:issueId" element={<ReportIssueForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/municipality-dashboard" element={<MunicipalityDashboard />} />
          <Route path="/help" element={<HelpPage />} />
          
          {/* Original Routes (keeping for backward compatibility) */}
          <Route path="/home" element={<Home />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
