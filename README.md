# Welcome to your Lovable project

## Nerdshive - Full Stack Coworking Space Management System

A complete coworking space management application with user registration, payment processing, admin dashboard, and real-time features.

### Features
- **User Authentication**: Secure signup/signin with Supabase Auth
- **Payment Management**: Upload payment screenshots and admin verification
- **Admin Dashboard**: Manage users, payments, content, and queries
- **Real-time Queries**: Users can ask questions and get responses from admins
- **Content Management**: Admins can update rules, guides, and WiFi information
- **User Sessions**: Track workspace usage and hours
- **File Uploads**: Secure file storage for payment screenshots and ID documents

### Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **State Management**: React Query, Context API
- **Routing**: React Router
- **UI Components**: Radix UI primitives with custom styling

### Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   npm install
   ```

2. **Setup Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Update `.env` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

3. **Setup Database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and run the SQL from `supabase/migrations/001_initial_schema.sql`
   - This will create all necessary tables, policies, and initial data

4. **Create Storage Buckets**
   - Go to Storage in your Supabase dashboard
   - Create two buckets:
     - `uploads` (for payment screenshots)
     - `id-documents` (for ID document uploads)
   - Make both buckets public

5. **Create Admin User**
   - Sign up through the app with email: `admin@nerdshive.com`
   - Go to Authentication in Supabase dashboard
   - Find the user and copy their UUID
   - Run this SQL to make them admin:
     ```sql
     UPDATE users SET role = 'admin', status = 'approved' WHERE id = 'user-uuid-here';
     ```

6. **Start Development**
   ```bash
   npm run dev
   ```

### Database Schema

- **users**: User profiles and authentication data
- **plans**: Membership plans (daily, weekly, monthly)
- **payments**: Payment records and verification status
- **join_requests**: User registration requests
- **queries**: User questions and admin responses
- **content**: Editable content (rules, guides, wifi info)
- **user_sessions**: Track workspace usage and hours

### API Endpoints

All API calls are handled through Supabase client with Row Level Security (RLS) policies:

- Authentication: Supabase Auth
- Database: Supabase PostgreSQL with RLS
- File Storage: Supabase Storage
- Real-time: Supabase Realtime subscriptions

## Project info

**URL**: https://lovable.dev/projects/a44f7ba9-8e9d-446d-ac06-c4f9e414a605

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a44f7ba9-8e9d-446d-ac06-c4f9e414a605) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend as a Service)
- React Query (Data fetching)
- React Router (Routing)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a44f7ba9-8e9d-446d-ac06-c4f9e414a605) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
