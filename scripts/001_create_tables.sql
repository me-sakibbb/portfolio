-- Create admin user table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create personal info table
CREATE TABLE IF NOT EXISTS public.personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  about TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  profile_image_url TEXT,
  hero_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  field TEXT,
  year INT,
  gpa DECIMAL(3, 2),
  description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  proficiency_level TEXT DEFAULT 'Intermediate',
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  year INT,
  organization TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create blog table for blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  featured_count INT DEFAULT 0,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "admin_users_select" ON public.admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admin_users_insert" ON public.admin_users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "admin_users_update" ON public.admin_users FOR UPDATE USING (auth.uid() = id);

-- Personal info policies
CREATE POLICY "personal_info_select_own" ON public.personal_info FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "personal_info_insert_own" ON public.personal_info FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "personal_info_update_own" ON public.personal_info FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "personal_info_select_public" ON public.personal_info FOR SELECT USING (true);

-- Experiences policies
CREATE POLICY "experiences_select_own" ON public.experiences FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "experiences_insert_own" ON public.experiences FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "experiences_update_own" ON public.experiences FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "experiences_delete_own" ON public.experiences FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "experiences_select_public" ON public.experiences FOR SELECT USING (true);

-- Education policies
CREATE POLICY "education_select_own" ON public.education FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "education_insert_own" ON public.education FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "education_update_own" ON public.education FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "education_delete_own" ON public.education FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "education_select_public" ON public.education FOR SELECT USING (true);

-- Skills policies
CREATE POLICY "skills_select_own" ON public.skills FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "skills_insert_own" ON public.skills FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "skills_update_own" ON public.skills FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "skills_delete_own" ON public.skills FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "skills_select_public" ON public.skills FOR SELECT USING (true);

-- Achievements policies
CREATE POLICY "achievements_select_own" ON public.achievements FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "achievements_insert_own" ON public.achievements FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "achievements_update_own" ON public.achievements FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "achievements_delete_own" ON public.achievements FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "achievements_select_public" ON public.achievements FOR SELECT USING (true);

-- Projects policies
CREATE POLICY "projects_select_own" ON public.projects FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "projects_insert_own" ON public.projects FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "projects_update_own" ON public.projects FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "projects_delete_own" ON public.projects FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "projects_select_public" ON public.projects FOR SELECT USING (true);

-- Blog posts policies
CREATE POLICY "blog_posts_select_own" ON public.blog_posts FOR SELECT USING (auth.uid() = admin_id);
CREATE POLICY "blog_posts_insert_own" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "blog_posts_update_own" ON public.blog_posts FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "blog_posts_delete_own" ON public.blog_posts FOR DELETE USING (auth.uid() = admin_id);
CREATE POLICY "blog_posts_select_public" ON public.blog_posts FOR SELECT USING (is_published = true);
