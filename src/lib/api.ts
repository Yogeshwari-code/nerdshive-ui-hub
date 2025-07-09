import { supabase } from './supabase';
import type { Payment, JoinRequest, Query, Content, Plan, UserSession } from './supabase';

export const api = {
  // Plans
  async getPlans(): Promise<Plan[]> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price');
    
    if (error) throw error;
    return data || [];
  },

  // Payments
  async createPayment(payment: {
    plan_id: string;
    amount: number;
    transaction_id: string;
    payment_screenshot_url?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        ...payment,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPendingPayments(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:users(*),
        plan:plans(*)
      `)
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updatePaymentStatus(paymentId: string, status: 'verified' | 'rejected') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('payments')
      .update({
        status,
        verified_at: new Date().toISOString(),
        verified_by: user.id,
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Join Requests
  async createJoinRequest(request: {
    full_name: string;
    email: string;
    phone: string;
    profession: string;
    reason: string;
  }) {
    const { data, error } = await supabase
      .from('join_requests')
      .insert(request)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPendingJoinRequests(): Promise<JoinRequest[]> {
    const { data, error } = await supabase
      .from('join_requests')
      .select('*')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateJoinRequestStatus(requestId: string, status: 'approved' | 'rejected') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('join_requests')
      .update({
        status,
        processed_at: new Date().toISOString(),
        processed_by: user.id,
      })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Queries
  async createQuery(question: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get user profile for name
    const { data: profile } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const { data, error } = await supabase
      .from('queries')
      .insert({
        user_id: user.id,
        user_name: profile?.full_name || 'Unknown User',
        question,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserQueries(): Promise<Query[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllQueries(): Promise<Query[]> {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async respondToQuery(queryId: string, response: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('queries')
      .update({
        response,
        status: 'answered',
        answered_at: new Date().toISOString(),
        answered_by: user.id,
      })
      .eq('id', queryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Content Management
  async getContent(): Promise<Content[]> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('id');

    if (error) throw error;
    return data || [];
  },

  async updateContent(id: string, content: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('content')
      .update({
        content,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // User Management
  async getApprovedUsers() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        user_sessions(*)
      `)
      .eq('status', 'approved')
      .eq('role', 'user')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // File Upload
  async uploadFile(file: File, bucket: string = 'uploads'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  },

  // User Sessions
  async createUserSession(planId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        user_id: user.id,
        plan_id: planId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserSessions(): Promise<UserSession[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};