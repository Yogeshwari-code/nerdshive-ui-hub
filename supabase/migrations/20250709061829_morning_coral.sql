/*
  # Update content with current application data

  1. Content Updates
    - Update rules with current community guidelines
    - Update guide with comprehensive user information
    - Update WiFi information with current details
  
  2. Sample Data
    - Add sample admin user
    - Add sample payments for testing
    - Add sample queries for demonstration
*/

-- Update content with current application data
UPDATE content SET content = 'Community Rules & Regulations 📋

1. Maintain silence in designated quiet zones 🤫
2. Clean up after yourself in common areas ✨
3. No outside food in meeting rooms 🚫🍕
4. Register guests at the front desk 📋
5. Respect others'' workspace and belongings 🤝
6. Keep phone conversations brief in common areas 📱

Additional Guidelines:
• Respect working hours and other members'' schedules
• Use headphones for audio/video calls in open areas
• Keep personal belongings secure and organized
• Report any issues to the front desk immediately
• Follow COVID-19 safety protocols when applicable' 
WHERE id = 'rules';

UPDATE content SET content = '🌟 Your Nerdshive Guide

🚀 Getting Started:
• Check in at the front desk with your membership
• Collect your access card and locker key
• Download our mobile app for bookings
• Complete your profile setup

🏢 Facilities Available:
• High-speed WiFi (up to 500 Mbps for members)
• Meeting rooms (bookable via app or front desk)
• Phone booths for private calls
• Printing & scanning station (₹2 per page)
• Coffee, tea & snacks available 24/7
• Dedicated workstations and private cabins
• Locker facilities for personal storage
• Reception and mail handling services

⏰ Operating Hours:
Monday - Saturday: 9:00 AM - 10:00 PM
Sunday: 10:00 AM - 8:00 PM
24/7 access available for monthly members

💡 Pro Tips:
• Book meeting rooms in advance during peak hours
• Use the members WiFi network for better speeds
• Keep your access card with you at all times
• Network with other professionals during coffee breaks

📱 Need Help?
• Contact our friendly staff at the front desk
• Use the Query Panel in your dashboard
• Call us at +91 98765 43210
• Email: support@nerdshive.com

🎯 Making the Most of Your Membership:
• Attend our weekly networking events
• Join skill-sharing sessions
• Participate in community discussions
• Use our business address for official correspondence' 
WHERE id = 'guide';

UPDATE content SET content = '📶 WiFi Information

🌐 Guest Network:
Network: NERDSHIVE_GUEST
Password: Welcome2024!
Speed: Up to 100 Mbps
Usage: General browsing, emails

🔐 Members Network:
Network: NERDSHIVE_MEMBERS  
Password: Member@2024
Speed: Up to 500 Mbps
Usage: Video calls, large downloads, streaming
Access: Monthly members only

📡 Network Specifications:
• Fiber optic connection with 99.9% uptime
• Dedicated bandwidth for members
• Enterprise-grade security
• Content filtering for safe browsing
• Regular speed monitoring and optimization

💻 Connection Tips:
• Use Members network for video conferencing
• Guest network is perfect for basic browsing
• Restart your device if experiencing connectivity issues
• Contact IT support for network troubleshooting

🛠️ Technical Support:
• IT Helpdesk: Available 9 AM - 6 PM
• Emergency IT Support: +91 98765 43211
• Email: tech@nerdshive.com
• Remote assistance available via TeamViewer

🔒 Security Guidelines:
• Never share WiFi passwords with non-members
• Use VPN for sensitive business communications
• Report suspicious network activity immediately
• Keep your devices updated with latest security patches

📊 Usage Monitoring:
• Fair usage policy applies to all users
• Heavy bandwidth usage may be throttled during peak hours
• Monthly data usage reports available for members' 
WHERE id = 'wifi';

-- Insert sample admin user (this will need to be updated with actual auth UUID)
-- You'll need to replace 'actual-admin-uuid' with the real UUID from Supabase Auth
INSERT INTO users (id, email, full_name, role, status, phone, city, occupation) 
VALUES (
  'admin-demo-uuid', 
  'admin@nerdshive.com', 
  'Admin User', 
  'admin', 
  'approved',
  '+91 98765 43210',
  'Bangalore',
  'System Administrator'
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'approved';

-- Insert sample user for testing
INSERT INTO users (id, email, full_name, role, status, phone, city, occupation, gender) 
VALUES (
  'user-demo-uuid', 
  'user@nerdshive.com', 
  'Arjun Singh', 
  'user', 
  'approved',
  '+91 98765 43211',
  'Bangalore',
  'Software Engineer',
  'male'
) ON CONFLICT (id) DO UPDATE SET
  status = 'approved';

-- Insert sample payments for demo
INSERT INTO payments (id, user_id, plan_id, amount, transaction_id, status, submitted_at) VALUES
  (uuid_generate_v4(), 'user-demo-uuid', 'monthly', 4600, 'TXN123456789', 'verified', now() - interval '5 days'),
  (uuid_generate_v4(), 'user-demo-uuid', 'weekly', 1400, 'TXN987654321', 'pending', now() - interval '1 day');

-- Insert sample queries for demo
INSERT INTO queries (id, user_id, user_name, question, response, status, submitted_at, answered_at) VALUES
  (uuid_generate_v4(), 'user-demo-uuid', 'Arjun Singh', 'What are the working hours for the coworking space?', 'Our coworking space is open Monday to Saturday from 9 AM to 10 PM. Sunday hours are 10 AM to 8 PM. Monthly members get 24/7 access.', 'answered', now() - interval '3 days', now() - interval '2 days'),
  (uuid_generate_v4(), 'user-demo-uuid', 'Arjun Singh', 'Can I book a private cabin for meetings?', 'Yes, private cabins can be booked in advance through our app or at the front desk. Monthly members get priority booking.', 'answered', now() - interval '2 days', now() - interval '1 day'),
  (uuid_generate_v4(), 'user-demo-uuid', 'Arjun Singh', 'Is there parking available?', '', 'pending', now() - interval '1 hour', null);

-- Insert sample join requests for demo
INSERT INTO join_requests (id, full_name, email, phone, profession, reason, status, submitted_at) VALUES
  (uuid_generate_v4(), 'Priya Sharma', 'priya.sharma@email.com', '+91 98765 43212', 'UI/UX Designer', 'Looking for a creative workspace with good networking opportunities', 'pending', now() - interval '2 hours'),
  (uuid_generate_v4(), 'Rahul Kumar', 'rahul.kumar@email.com', '+91 98765 43213', 'Digital Marketer', 'Need a professional environment for client meetings and focused work', 'pending', now() - interval '1 hour');

-- Insert sample user sessions for demo
INSERT INTO user_sessions (id, user_id, plan_id, check_in_time, check_out_time, duration_hours) VALUES
  (uuid_generate_v4(), 'user-demo-uuid', 'monthly', now() - interval '8 hours', now() - interval '1 hour', 7),
  (uuid_generate_v4(), 'user-demo-uuid', 'monthly', now() - interval '2 days', now() - interval '2 days' + interval '6 hours', 6),
  (uuid_generate_v4(), 'user-demo-uuid', 'monthly', now() - interval '3 days', now() - interval '3 days' + interval '8 hours', 8);

-- Create storage buckets (run these in Supabase dashboard if not already created)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('id-documents', 'id-documents', true);

-- Create storage policies for uploads bucket
CREATE POLICY "Anyone can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Anyone can view uploaded files" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for id-documents bucket
CREATE POLICY "Authenticated users can upload ID documents" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'id-documents');

CREATE POLICY "Users can view own ID documents" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'id-documents' AND 
    (auth.uid()::text = (storage.foldername(name))[1] OR 
     EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'))
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();