-- Create enum for CMS content types
CREATE TYPE cms_content_kind AS ENUM ('articles', 'industries', 'research');

-- Create enum for CMS content status
CREATE TYPE cms_content_status AS ENUM ('Published', 'Draft');

-- Create the main CMS records table
CREATE TABLE cms_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kind cms_content_kind NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    summary TEXT,
    status cms_content_status NOT NULL DEFAULT 'Draft',
    image TEXT,
    content JSONB, -- The full JSON payload (e.g. intro, paragraphs, metrics)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add an updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cms_records_modtime
    BEFORE UPDATE ON cms_records
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Setup Row Level Security (RLS)
ALTER TABLE cms_records ENABLE ROW LEVEL SECURITY;

-- Allow public read access to Published content
CREATE POLICY "Public can view published content"
    ON cms_records FOR SELECT
    USING (status = 'Published');

-- (Optional) Allow authenticated users full access to manage CMS content.
-- You can adjust this policy to check for specific roles if you have a role-based setup.
CREATE POLICY "Authenticated users can manage CMS content"
    ON cms_records FOR ALL
    USING (auth.role() = 'authenticated');
