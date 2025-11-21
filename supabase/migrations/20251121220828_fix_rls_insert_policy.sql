/*
  # Fix RLS Insert Policy for Waitlist

  1. Problem
    - Anonymous users cannot insert into waitlist table
    - RLS policy exists but is not working correctly
  
  2. Solution
    - Drop existing INSERT policy
    - Recreate with proper permissions for both anon and public roles
    - Ensure WITH CHECK clause is properly set
  
  3. Security
    - Maintains RLS protection
    - Allows public signups (necessary for waitlist functionality)
    - Keeps SELECT restricted to authenticated users
*/

-- Drop existing policies to recreate them fresh
DROP POLICY IF EXISTS "Anyone can sign up for waitlist" ON waitlist;
DROP POLICY IF EXISTS "Authenticated users can view waitlist" ON waitlist;

-- Recreate INSERT policy for anonymous users (waitlist signups)
CREATE POLICY "Allow anonymous waitlist signups"
  ON waitlist
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- Recreate SELECT policy for authenticated users (admin view)
CREATE POLICY "Allow authenticated users to view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);