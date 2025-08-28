-- Disable email confirmation for development
-- This allows users to sign up and log in immediately without email verification
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_confirmations = false
WHERE 1=1;