import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestEvent {
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

interface AIResponse {
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestData: RequestEvent = await req.json();
    console.log('Processing event:', requestData.event);

    const response: AIResponse = {
      status: "success",
      error_message: null,
      report_id: null,
      category: "Other",
      category_confidence: 0.5,
      priority: "medium",
      priority_score: 0.5,
      duplicate: false,
      duplicate_of: null,
      auto_description: null,
      image_objects: [],
      ocr_text: null,
      address: null,
      coordinates_returned: null,
      need_reverse_geocode: false,
      fraud_score: 0.0,
      fraud_reasons: [],
      auto_reject: false,
      ui_actions: {
        show_signup_modal: [],
        hide_elements_on_admin_login: [],
        about_content: null,
        help_content: null
      },
      explainability: null,
      timestamp: new Date().toISOString()
    };

    // Process based on event type
    switch (requestData.event) {
      case "new_report":
      case "image_upload":
        if (requestData.report) {
          await processReport(requestData, response, supabase);
        }
        break;

      case "signup_click":
        response.ui_actions.show_signup_modal = ["administration", "municipality_head"];
        response.explainability = "Showing signup modals for admin and municipality roles";
        break;

      case "about_help_request":
        response.ui_actions.about_content = "Jharkhand Civic Fix is a citizen-centric platform that empowers residents to report civic issues directly to local authorities. Our mission is to bridge the gap between citizens and government to create better communities across Jharkhand.";
        response.ui_actions.help_content = "To report an issue: 1) Select the issue type from the dashboard 2) Fill in details with photos and location 3) Submit your report 4) Track progress via email updates. For urgent emergencies, contact local emergency services directly.";
        response.explainability = "Provided about and help content for user information";
        break;

      case "admin_login":
        response.ui_actions.hide_elements_on_admin_login = ["report_issue", "about_us", "view_map", "admin_button"];
        response.explainability = "Admin login detected - hiding citizen interface elements";
        break;

      default:
        response.explainability = "Processing generic event with default response";
    }

    console.log('Response generated:', response);
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing request:', error);
    const errorResponse: AIResponse = {
      status: "error",
      error_message: error.message || "An unexpected error occurred",
      report_id: null,
      category: "Other",
      category_confidence: 0.0,
      priority: "low",
      priority_score: 0.0,
      duplicate: false,
      duplicate_of: null,
      auto_description: null,
      image_objects: [],
      ocr_text: null,
      address: null,
      coordinates_returned: null,
      need_reverse_geocode: false,
      fraud_score: 0.0,
      fraud_reasons: [],
      auto_reject: false,
      ui_actions: {
        show_signup_modal: [],
        hide_elements_on_admin_login: [],
        about_content: null,
        help_content: null
      },
      explainability: null,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processReport(requestData: RequestEvent, response: AIResponse, supabase: any) {
  const { report, recent_reports } = requestData;
  
  if (!report) {
    throw new Error("Report data is required for new_report events");
  }

  console.log('Processing report:', report);

  // Generate report ID
  response.report_id = crypto.randomUUID();

  // Analyze category based on description and title
  const categoryAnalysis = analyzeCategoryFromText(report.title || "", report.description || "");
  response.category = categoryAnalysis.category;
  response.category_confidence = categoryAnalysis.confidence;

  // Analyze priority
  const priorityAnalysis = analyzePriority(report.title || "", report.description || "", report.images || []);
  response.priority = priorityAnalysis.priority;
  response.priority_score = priorityAnalysis.score;

  // Generate auto description
  response.auto_description = generateAutoDescription(report, categoryAnalysis.category);

  // Check for duplicates
  if (recent_reports && recent_reports.length > 0) {
    const duplicateCheck = checkForDuplicates(report, recent_reports);
    response.duplicate = duplicateCheck.isDuplicate;
    response.duplicate_of = duplicateCheck.duplicateId;
  }

  // Analyze images if present
  if (report.images && report.images.length > 0) {
    response.image_objects = analyzeImages(report.images);
  }

  // Fraud detection
  const fraudAnalysis = detectFraud(report, recent_reports || []);
  response.fraud_score = fraudAnalysis.score;
  response.fraud_reasons = fraudAnalysis.reasons;
  response.auto_reject = fraudAnalysis.score >= 0.90;

  // Handle address/coordinates
  if (report.coordinates && !report.address) {
    response.address = "GEOCODE_REQUIRED";
    response.coordinates_returned = report.coordinates;
    response.need_reverse_geocode = true;
  } else {
    response.address = report.address || null;
    response.need_reverse_geocode = false;
  }

  response.explainability = `Category: ${response.category} (${(response.category_confidence * 100).toFixed(0)}% confidence), Priority: ${response.priority} based on content analysis`;

  // Save to database if not duplicate and not auto-rejected
  if (!response.duplicate && !response.auto_reject && report.user_id) {
    try {
      const { error } = await supabase.from('reports').insert({
        id: response.report_id,
        user_id: report.user_id,
        title: report.title || 'Untitled Report',
        description: report.description || '',
        category: response.category,
        priority: response.priority,
        priority_score: response.priority_score,
        address: response.address,
        coordinates: report.coordinates,
        images: report.images || [],
        auto_description: response.auto_description,
        image_objects: response.image_objects,
        fraud_score: response.fraud_score,
        fraud_reasons: response.fraud_reasons,
        auto_rejected: response.auto_reject
      });

      if (error) {
        console.error('Database error:', error);
      } else {
        console.log('Report saved to database:', response.report_id);
      }
    } catch (dbError) {
      console.error('Failed to save report:', dbError);
    }
  }
}

function analyzeCategoryFromText(title: string, description: string): { category: string; confidence: number } {
  const text = `${title} ${description}`.toLowerCase();
  
  const categoryKeywords = {
    "Roads": ["pothole", "road", "street", "pavement", "crack", "damage", "traffic", "signal"],
    "Water": ["water", "pipe", "leak", "supply", "tap", "drainage", "flood"],
    "Electricity": ["power", "electricity", "light", "cable", "outage", "transformer"],
    "Sanitation": ["sewage", "drain", "toilet", "bathroom", "waste water"],
    "Garbage": ["garbage", "waste", "trash", "rubbish", "dump", "litter"],
    "Streetlight": ["streetlight", "lamp", "lighting", "dark", "bulb"],
    "Health": ["hospital", "clinic", "medical", "health", "medicine"],
    "Education": ["school", "education", "teacher", "student", "classroom"]
  };

  let bestMatch = "Other";
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const matches = keywords.filter(keyword => text.includes(keyword));
    const score = matches.length / keywords.length;
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = category;
    }
  }

  return {
    category: bestMatch,
    confidence: Math.min(0.95, Math.max(0.1, bestScore * 2))
  };
}

function analyzePriority(title: string, description: string, images: string[]): { priority: "low" | "medium" | "high" | "urgent"; score: number } {
  const text = `${title} ${description}`.toLowerCase();
  
  let score = 0.4; // Base score
  
  // High priority keywords
  const urgentKeywords = ["emergency", "urgent", "dangerous", "broken", "accident", "injury", "flood"];
  const highKeywords = ["major", "severe", "large", "blocking", "traffic"];
  const mediumKeywords = ["moderate", "issue", "problem", "concern"];
  
  urgentKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 0.3;
  });
  
  highKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 0.2;
  });
  
  mediumKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 0.1;
  });

  // Images increase priority slightly
  if (images.length > 0) {
    score += 0.1;
  }

  score = Math.min(1.0, Math.max(0.0, score));

  let priority: "low" | "medium" | "high" | "urgent";
  if (score >= 0.85) priority = "urgent";
  else if (score >= 0.65) priority = "high";
  else if (score >= 0.40) priority = "medium";
  else priority = "low";

  return { priority, score };
}

function generateAutoDescription(report: any, category: string): string {
  const title = report.title || "Issue";
  const location = report.address || "reported location";
  
  return `${category} issue reported: ${title} at ${location}. Requires attention from local authorities.`.substring(0, 300);
}

function checkForDuplicates(report: any, recentReports: any[]): { isDuplicate: boolean; duplicateId?: string } {
  if (!recentReports || recentReports.length === 0) {
    return { isDuplicate: false };
  }

  for (const existing of recentReports) {
    // Check text similarity
    const titleSimilarity = calculateTextSimilarity(report.title || "", existing.title || "");
    const descSimilarity = calculateTextSimilarity(report.description || "", existing.description || "");
    
    // Check location similarity
    let locationSimilar = false;
    if (report.address && existing.address) {
      locationSimilar = report.address.toLowerCase() === existing.address.toLowerCase();
    }

    // Determine if duplicate
    const avgTextSimilarity = (titleSimilarity + descSimilarity) / 2;
    
    if (avgTextSimilarity >= 0.85 || 
        (locationSimilar && avgTextSimilarity >= 0.7)) {
      return { isDuplicate: true, duplicateId: existing.id };
    }
  }

  return { isDuplicate: false };
}

function calculateTextSimilarity(text1: string, text2: string): number {
  if (!text1 || !text2) return 0;
  
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

function analyzeImages(images: string[]): Array<{ label: string; confidence: number }> {
  // Simple image analysis based on filename/content patterns
  const objects = [];
  
  for (const img of images) {
    const imgLower = img.toLowerCase();
    
    if (imgLower.includes('pothole') || imgLower.includes('road')) {
      objects.push({ label: "pothole", confidence: 0.8 });
    }
    if (imgLower.includes('garbage') || imgLower.includes('waste')) {
      objects.push({ label: "garbage", confidence: 0.8 });
    }
    if (imgLower.includes('light')) {
      objects.push({ label: "streetlight", confidence: 0.7 });
    }
    if (imgLower.includes('water') || imgLower.includes('pipe')) {
      objects.push({ label: "water_issue", confidence: 0.7 });
    }
  }
  
  return objects.length > 0 ? objects : [{ label: "general_issue", confidence: 0.6 }];
}

function detectFraud(report: any, recentReports: any[]): { score: number; reasons: string[] } {
  let score = 0;
  const reasons = [];

  // Check for very generic descriptions
  const text = `${report.title || ""} ${report.description || ""}`.toLowerCase();
  if (text.length < 10) {
    score += 0.3;
    reasons.push("very_short_description");
  }

  // Check for repeated exact text in recent reports
  const exactMatches = recentReports.filter(r => 
    r.description === report.description || r.title === report.title
  );
  
  if (exactMatches.length > 0) {
    score += 0.4;
    reasons.push("duplicate_text_across_reports");
  }

  // Check for suspicious patterns
  if (text.includes("test") && text.length < 50) {
    score += 0.5;
    reasons.push("test_content_detected");
  }

  return {
    score: Math.min(1.0, score),
    reasons
  };
}