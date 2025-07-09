/*
  # Initial Nerdshive Database Schema

  1. New Tables
    - `users` - User accounts and profiles
    - `plans` - Membership plans (daily, weekly, monthly)
    - `payments` - Payment records and verification
    - `join_requests` - User registration requests
    - `queries` - User questions and admin responses
    - `content` - Editable content (rules, guides, wifi info)
    - `user_sessions` - Track user workspace usage

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for users and admins
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  gender text,
  city text,
  location text,
  occupation text,
  id_type text,
  id_number text,
  id_file_url text,
  needs_reimbursement boolean DEFAULT false,
  organization_name text,
  gst_number text,
  organization_location text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  period text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]',
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id text REFERENCES plans(id),
  amount numeric NOT NULL,
  transaction_id text NOT NULL,
  payment_screenshot_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  verified_at timestamptz,
  verified_by uuid REFERENCES users(id)
);

-- Join requests table (for users who haven't completed payment)
CREATE TABLE IF NOT EXISTS join_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  profession text NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  processed_by uuid REFERENCES users(id)
);

-- Queries table
CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  question text NOT NULL,
  response text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'answered')),
  submitted_at timestamptz DEFAULT now(),
  answered_at timestamptz,
  answered_by uuid REFERENCES users(id)
);

-- Content table for editable content
CREATE TABLE IF NOT EXISTS content (
  id text PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES users(id)
);

-- User sessions table for tracking workspace usage
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id text REFERENCES plans(id),
  check_in_time timestamptz DEFAULT now(),
  check_out_time timestamptz,
  duration_hours numeric,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users" ON users
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Plans policies (public read, admin write)
CREATE POLICY "Anyone can read plans" ON plans FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage plans" ON plans FOR ALL USING (EXISTS (
  SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
));

-- Payments policies
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create own payments" ON payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all payments" ON payments
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Join requests policies
CREATE POLICY "Anyone can create join requests" ON join_requests
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Admins can manage join requests" ON join_requests
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Queries policies
CREATE POLICY "Users can read own queries" ON queries
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create own queries" ON queries
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all queries" ON queries
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Content policies
CREATE POLICY "Anyone can read content" ON content FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage content" ON content FOR ALL USING (EXISTS (
  SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
));

-- User sessions policies
CREATE POLICY "Users can read own sessions" ON user_sessions
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create own sessions" ON user_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all sessions" ON user_sessions
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Insert default plans
INSERT INTO plans (id, name, price, period, features, is_popular) VALUES
  ('daily', 'Daily', 299, '+ GST', '["8 hours access", "High-speed Wi-Fi", "Basic amenities", "Common area access"]', false),
  ('weekly', 'Weekly', 1400, '+ GST', '["Unlimited access", "High-speed Wi-Fi", "All amenities", "Priority booking", "Meeting room access"]', true),
  ('monthly', 'Monthly', 4600, '+ GST', '["24/7 access", "Dedicated desk option", "All premium amenities", "Private cabin booking", "Business address"]', false);

-- Insert default content
INSERT INTO content (id, title, content) VALUES
  ('rules', 'Community Rules & Regulations', 'Community Rules & Regulations 📋

1. Maintain silence in designated quiet zones 🤫
2. Clean up after yourself in common areas ✨
3. No outside food in meeting rooms 🚫🍕
4. Register guests at the front desk 📋
5. Respect others'' workspace and belongings 🤝
6. Keep phone conversations brief in common areas 📱'),
  ('guide', 'Your Nerdshive Guide', '🌟 Your Nerdshive Guide

🚀 Getting Started:
• Check in at the front desk with your membership
• Collect your access card and locker key
• Download our mobile app for bookings

🏢 Facilities:
• Meeting rooms (bookable via app)
• Phone booths for private calls
• Printing station (₹2 per page)
• Coffee & snacks available 24/7

⏰ Operating Hours:
Monday - Saturday: 9 AM - 10 PM
Sunday: 10 AM - 8 PM'),
  ('wifi', 'WiFi Information', '📶 WiFi Information

Network: NERDSHIVE_GUEST
Password: Welcome2024!

🔐 Secure Network: NERDSHIVE_MEMBERS
Password: Member@2024 (For monthly members only)

📡 Speeds:
• Guest Network: Up to 100 Mbps
• Members Network: Up to 500 Mbps');

-- Create admin user (you'll need to update this with actual auth user ID)
-- INSERT INTO users (id, email, full_name, role, status) VALUES
--   ('admin-uuid-here', 'admin@nerdshive.com', 'Admin User', 'admin', 'approved');