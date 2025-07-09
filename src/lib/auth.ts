import { supabase } from './supabase';
import type { User } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  gender?: string;
  city?: string;
  location?: string;
  occupation?: string;
  id_type?: string;
  id_number?: string;
  needs_reimbursement?: boolean;
  organization_name?: string;
  gst_number?: string;
  organization_location?: string;
}

export const authService = {
  // Sign up new user
  async signUp(data: SignUpData) {
    const { email, password, full_name, ...profileData } = data;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });

    if (authError) throw authError;

    // Create user profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          full_name,
          ...profileData,
        });

      if (profileError) throw profileError;
    }

    return authData;
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return profile;
  },

  // Get current auth session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};