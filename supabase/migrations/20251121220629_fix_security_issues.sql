/*
  # Fix Security Issues

  1. Changes
    - Drop redundant indexes (unique constraints already create indexes)
      - `idx_waitlist_email` (redundant with `waitlist_email_key`)
      - `idx_waitlist_neural_id` (redundant with `waitlist_neural_id_key`)
      - `idx_waitlist_created_at` (unused for small table, can recreate if needed later)
    
    - Fix function search_path security issue
      - Add SECURITY INVOKER and explicit search_path to `is_valid_email` function
  
  2. Security Improvements
    - Removed unused indexes that provide no benefit
    - Fixed function search_path vulnerability by making it immutable
    - Function now executes with caller's privileges (SECURITY INVOKER)
*/

-- Drop redundant indexes
DROP INDEX IF EXISTS idx_waitlist_email;
DROP INDEX IF EXISTS idx_waitlist_neural_id;
DROP INDEX IF EXISTS idx_waitlist_created_at;

-- Recreate is_valid_email function with secure search_path
DROP FUNCTION IF EXISTS is_valid_email(text);

CREATE OR REPLACE FUNCTION is_valid_email(email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
STABLE
SET search_path = pg_catalog, public
AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;