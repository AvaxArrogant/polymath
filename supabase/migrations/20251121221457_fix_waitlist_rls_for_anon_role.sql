/*
  # Fix Waitlist RLS for Anonymous Users

  This migration properly configures Row Level Security for the waitlist table
  to allow anonymous (unauthenticated) users to insert their email addresses.

  1. Changes
    - Drop existing INSERT policy
    - Create new INSERT policy that explicitly targets the anon role
    - Ensure anon role has proper INSERT permissions

  2. Security
    - RLS remains enabled
    - Only INSERT is allowed for anonymous users
    - Authenticated users can still view the waitlist
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Allow anonymous waitlist signups" ON waitlist;

-- Create INSERT policy explicitly for anon role
CREATE POLICY "Allow anonymous waitlist signups"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure anon role has INSERT grant (should already exist but being explicit)
GRANT INSERT ON waitlist TO anon;
