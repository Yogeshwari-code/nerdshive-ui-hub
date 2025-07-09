import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  gender?: string;
  city?: string;
  location?: string;
  occupation?: string;
  id_type?: string;
  id_number?: string;
  id_file_url?: string;
  needs_reimbursement: boolean;
  organization_name?: string;
  gst_number?: string;
  organization_location?: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  is_popular: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  transaction_id: string;
  payment_screenshot_url?: string;
  status: 'pending' | 'verified' | 'rejected';
  submitted_at: string;
  verified_at?: string;
  verified_by?: string;
  user?: User;
  plan?: Plan;
}

export interface JoinRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  profession: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  processed_at?: string;
  processed_by?: string;
}

export interface Query {
  id: string;
  user_id: string;
  user_name: string;
  question: string;
  response?: string;
  status: 'pending' | 'answered';
  submitted_at: string;
  answered_at?: string;
  answered_by?: string;
}

export interface Content {
  id: string;
  title: string;
  content: string;
  updated_at: string;
  updated_by?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  plan_id: string;
  check_in_time: string;
  check_out_time?: string;
  duration_hours?: number;
  created_at: string;
}