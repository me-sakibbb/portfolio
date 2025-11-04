-- Add is_featured column to experiences table
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Add is_featured column to education table
ALTER TABLE education ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE education ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Add is_featured column to skills table
ALTER TABLE skills ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Add is_featured column to achievements table
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Add is_featured column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  author VARCHAR(255) DEFAULT 'Sakib Ul Hasan',
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS policy for blog_posts (public can read published posts)
CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- RLS policy for blog_posts (authenticated users can manage all posts)
CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create index for blog_posts queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
