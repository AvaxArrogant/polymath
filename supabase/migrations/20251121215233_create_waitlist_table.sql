/*
  # Polymath Waitlist Database Schema

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, unique, not null) - User's email address
      - `neural_id` (text, unique, not null) - Generated unique neural identifier
      - `created_at` (timestamptz) - Timestamp of signup
      - `metadata` (jsonb) - Stores interaction tracking data (hover events, focus time, etc.)
      - `status` (text) - Signup status (pending, confirmed, etc.)
  
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public inserts (early access signup)
    - Add policy for authenticated admins to read all data
  
  3. Indexes
    - Index on email for fast duplicate checking
    - Index on created_at for analytics queries
  
  4. Functions
    - Add trigger to auto-generate neural_id on insert
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  neural_id text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz DEFAULT now() NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'pending' NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_neural_id ON waitlist(neural_id);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their email (public signup)
CREATE POLICY "Anyone can sign up for waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all waitlist entries (for admin dashboard)
CREATE POLICY "Authenticated users can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to validate email format
CREATE OR REPLACE FUNCTION is_valid_email(email text)
RETURNS boolean AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;