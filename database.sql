-- Run this SQL in your Supabase SQL Editor to set up the database table

CREATE TABLE IF NOT EXISTS facebook_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email_or_phone TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, -- Note: In production, always hash passwords!
  birthday DATE NOT NULL,
  gender TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE facebook_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (Sign Up)
CREATE POLICY "Allow public signup" ON facebook_users 
FOR INSERT WITH CHECK (true);

-- Allow public select for the login demo (Normally restricted to authenticated users)
CREATE POLICY "Allow public read for login" ON facebook_users 
FOR SELECT USING (true);