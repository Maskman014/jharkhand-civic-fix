import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AIEvent {
  event: "new_report" | "image_upload" | "signup_click" | "about_help_request" | "admin_login" | "other";
  report?: {
    id?: string;
    title?: string;
    description?: string;
    address?: string;
    coordinates?: { lat: number; lon: number };
    images?: string[];
    user_id?: string;
    timestamp?: string;
  };
  recent_reports?: Array<{
    id: string;
    title: string;
    description: string;
    address: string;
    coordinates?: { lat: number; lon: number };
    images: string[];
    timestamp: string;
  }>;
  user_role?: "citizen" | "guest" | "administration" | "municipality_head" | null;
  ui_version?: string;
}

export interface AIResponse {
  status: "success" | "error";
  error_message?: string;
  report_id?: string;
  category: string;
  category_confidence: number;
  priority: "low" | "medium" | "high" | "urgent";
  priority_score: number;
  duplicate: boolean;
  duplicate_of?: string;
  auto_description?: string;
  image_objects: Array<{ label: string; confidence: number }>;
  ocr_text?: string;
  address?: string;
  coordinates_returned?: { lat: number; lon: number };
  need_reverse_geocode: boolean;
  fraud_score: number;
  fraud_reasons: string[];
  auto_reject: boolean;
  ui_actions: {
    show_signup_modal: string[];
    hide_elements_on_admin_login: string[];
    about_content?: string;
    help_content?: string;
  };
  explainability?: string;
  timestamp: string;
}

export const useAIAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);

  const processEvent = async (event: AIEvent): Promise<AIResponse> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('civic-fix-assistant', {
        body: event
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = data as AIResponse;
      setLastResponse(response);
      return response;
    } catch (error) {
      console.error('AI Assistant Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reportNewIssue = async (reportData: {
    title: string;
    description: string;
    address?: string;
    coordinates?: { lat: number; lon: number };
    images?: string[];
    user_id?: string;
  }) => {
    const event: AIEvent = {
      event: "new_report",
      report: {
        ...reportData,
        timestamp: new Date().toISOString()
      }
    };

    return processEvent(event);
  };

  const handleSignupClick = async (userRole?: string) => {
    const event: AIEvent = {
      event: "signup_click",
      user_role: userRole as any
    };

    return processEvent(event);
  };

  const getAboutHelp = async () => {
    const event: AIEvent = {
      event: "about_help_request"
    };

    return processEvent(event);
  };

  const handleAdminLogin = async () => {
    const event: AIEvent = {
      event: "admin_login"
    };

    return processEvent(event);
  };

  return {
    loading,
    lastResponse,
    processEvent,
    reportNewIssue,
    handleSignupClick,
    getAboutHelp,
    handleAdminLogin
  };
};