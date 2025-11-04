-- Seed script for Sakib Ul Hasan's portfolio
-- Run this AFTER running 001_create_tables.sql

-- Insert Personal Info
INSERT INTO personal_info (name, title, about, email, phone, location, profile_image_url, hero_image_url)
VALUES (
  'Sakib Ul Hasan',
  'Student | COO at Biddalap | Web Developer | Ethical Hacker',
  'Driven, adaptable, and reliable, I bring a strong work ethic, fast learning ability, and a collaborative mindset to every opportunity. I thrive in dynamic environments and take pride in delivering high-quality work that adds real value.',
  'sakibulhasan159@gmail.com',
  '+880 1938 5038911',
  'Mirpur 14, Dhaka, Bangladesh',
  NULL,
  NULL
);

-- Insert Experiences
INSERT INTO experiences (title, company, description, start_date, end_date, is_current, is_featured, order_index)
VALUES
(
  'Chief Operating Officer (COO)',
  'Biddalap',
  'Overseeing daily operations and strategy for Biddalap, an edtech initiative. Focused on process improvement, team coordination, and driving platform growth.',
  '2025-01-01',
  NULL,
  true,
  true,
  1
),
(
  'Physics Instructor',
  'Biddalap',
  'Conducting engaging online physics classes, preparing materials, and supporting student learning for HSC level.',
  '2025-01-01',
  NULL,
  true,
  true,
  2
),
(
  'Web Developer',
  'Freelance',
  'Developed a number of web-based projects for clubs, colleges, clients, and personal use. Currently working as an intern in Upturn Inc.',
  '2020-01-01',
  NULL,
  true,
  true,
  3
),
(
  'Ethical Hacker',
  'Freelance',
  'Helped figure out vulnerabilities and exploits of many known platforms. Security research and penetration testing.',
  '2024-01-01',
  NULL,
  true,
  false,
  4
),
(
  'Administrator & Central Club Prefect',
  'Adamjee Cantonment College IT Club',
  'Managed club activities, coordinated events, and supported members in technical learning and projects.',
  '2023-06-01',
  '2024-06-01',
  false,
  false,
  5
);

-- Insert Education
INSERT INTO education (degree, institution, field, gpa, year, is_featured, order_index)
VALUES
(
  'Bachelor of Business Administration',
  'IBA, Dhaka University',
  'Business Administration with focus on analytical skills, teamwork, and leadership',
  5.00,
  2025,
  true,
  1
),
(
  'Higher Secondary Certificate (HSC)',
  'Adamjee Cantonment College',
  'Science Group',
  5.00,
  2024,
  true,
  2
),
(
  'Secondary School Certificate (SSC)',
  'Bangladesh Navy School and College, Chattogram',
  'Science Group',
  5.00,
  2022,
  true,
  3
),
(
  'Junior School Certificate (JSC)',
  'Bangladesh Navy School and College, Dhaka',
  'General',
  5.00,
  2019,
  false,
  4
);

-- Insert Skills by Category
INSERT INTO skills (skill_name, category, proficiency_level, is_featured, order_index)
VALUES
-- Leadership Skills
('Leadership', 'Leadership', 'Expert', true, 1),
('Management', 'Leadership', 'Advanced', true, 2),
('Critical Thinking', 'Leadership', 'Advanced', false, 3),
('Strong Attention to Detail', 'Leadership', 'Expert', true, 4),

-- Technical Skills
('Competitive Programming', 'Technical', 'Expert', false, 5),
('Web Development', 'Technical', 'Expert', false, 6),
('Ethical Hacking', 'Technical', 'Advanced', false, 7),
('Data Analysis', 'Technical', 'Advanced', false, 8),
('Graphics Designing', 'Technical', 'Advanced', false, 9),

-- Programming Languages
('C++', 'Programming', 'Expert', false, 10),
('Python', 'Programming', 'Advanced', false, 11),
('JavaScript', 'Programming', 'Advanced', false, 12),
('HTML/CSS', 'Programming', 'Expert', false, 13),

-- Frameworks & Tools
('ReactJS', 'Frameworks', 'Advanced', false, 14),
('NodeJS', 'Frameworks', 'Advanced', false, 15),
('Firebase', 'Tools', 'Advanced', false, 16),
('Firestore', 'Tools', 'Advanced', false, 17),
('MongoDB', 'Tools', 'Advanced', false, 18),
('Adobe Photoshop', 'Tools', 'Advanced', false, 19),
('Adobe Illustrator', 'Tools', 'Advanced', false, 20),
('Canva', 'Tools', 'Intermediate', false, 21);

-- Insert Achievements
INSERT INTO achievements (title, description, year, organization, category, is_featured, order_index)
VALUES
('Principal''s Award', 'Received the prestigious Principal''s Award and 10,000 BDT prize money for securing 1st position in First Term examination', 2025, 'Adamjee Cantonment College', 'Academic', true, 1),
('Bronze Medalist in Robotics', 'Bangladesh Robotics Olympiad - Advanced robotics and engineering excellence', 2023, 'Bangladesh Olympiad Organization', 'Robotics', true, 2),
('16th National Rank', 'Bangladesh Olympiad in Informatics - Competitive programming achievement', 2024, 'Bangladesh Olympiad Organization', 'Programming', true, 3),
('Top 10 Programmer', 'Bangladesh National Programming Olympiad', 2023, 'Bangladesh Programming Community', 'Programming', false, 4),
('5 Star Gold Badge', 'Problem Solving in Competitive Programming on HackerRank with Rank 1134 out of 45000+ coders', 2023, 'HackerRank', 'Competitive Programming', false, 5),
('Champion in IT Olympiad', 'ACCITC Talent Hunt 2023', 2023, 'Adamjee Cantonment College IT Club', 'Programming', false, 6),
('2nd Runner-up in Competitive Programming', 'TechCon 2023 organized by ACCITC', 2023, 'ACCITC', 'Programming', false, 7),
('9th National Programming Contest', '9th National Ongko Olympiad Programming Contest 2023', 2023, 'HackerRank', 'Programming', false, 8),
('Runner-up in Graphics Design', 'ACCITC Talent Hunt 2023', 2023, 'ACCITC', 'Design', false, 9),
('2nd Runner-up in Idea Presentation', 'ACCITC Talent Hunt 2023', 2023, 'ACCITC', 'Innovation', false, 10),
('Regional Winner Math Olympiad', 'Bangladesh Math Olympiad Chattogram Division 2023', 2023, 'Bangladesh Math Olympiad', 'Mathematics', false, 11),
('Regional Winner Math Olympiad', 'Bangladesh Math Olympiad Chattogram Division 2022', 2022, 'Bangladesh Math Olympiad', 'Mathematics', false, 12),
('2nd Runner-up Math Olympiad', 'ACCMC Talent Hunt 2023', 2023, 'ACCMC', 'Mathematics', false, 13),
('Champion in Case Solving', 'ACCMC Talent Hunt 2023', 2023, 'ACCMC', 'Problem Solving', false, 14),
('Runner-up in IQ Olympiad', 'ACCMC Pi Romania 3.0 2023', 2023, 'ACCMC', 'Competition', false, 15),
('Young Coder Award', 'Mimo Platform', 2020, 'Mimo', 'Programming', false, 16),
('First Runner Up EcoChamps', 'International Centre for Climate Change and Development', 2024, 'ICCCAD', 'Environmental', false, 17),
('Runner-up Team Based Quiz', 'IPDC 5th BNCD Science Carnival 2019', 2019, 'IPDC', 'Quiz', false, 18);

-- Insert Projects
INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, is_featured, order_index)
VALUES
(
  'Portfolio Website',
  'A modern, animated portfolio website built with Next.js and Supabase featuring a CMS admin dashboard with dark mode support.',
  'Next.js, React, Tailwind CSS, Supabase, TypeScript',
  'https://github.com/Sakib-TheLastCosmos',
  NULL,
  NULL,
  true,
  1
),
(
  'Web Development Projects',
  'Collection of web-based projects for clubs, colleges, and clients showcasing full-stack development expertise.',
  'HTML, CSS, JavaScript, ReactJS, NodeJS, Firebase, MongoDB',
  'https://github.com/Sakib-TheLastCosmos',
  NULL,
  NULL,
  true,
  2
),
(
  'Competitive Programming Solutions',
  'Collection of solutions to competitive programming problems with optimal algorithms and explanations.',
  'C++, Python, Algorithm Design',
  'https://github.com/Sakib-TheLastCosmos',
  NULL,
  NULL,
  true,
  3
);

-- Insert Sample Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, is_published, order_index, published_at)
VALUES
(
  'Getting Started with Competitive Programming',
  'getting-started-with-competitive-programming',
  '# Getting Started with Competitive Programming\n\nCompetitive programming is a fascinating world where you solve algorithmic problems under time constraints...',
  'Learn the basics of competitive programming and how to get started on your journey.',
  'Programming',
  true,
  1,
  NOW()
),
(
  'Web Development Best Practices',
  'web-development-best-practices',
  '# Web Development Best Practices\n\nWhen building web applications, following best practices ensures your code is maintainable and scalable...',
  'Essential tips and best practices for modern web development.',
  'Web Development',
  true,
  2,
  NOW()
),
(
  'The Importance of Cybersecurity',
  'importance-of-cybersecurity',
  '# The Importance of Cybersecurity\n\nIn today''s digital world, cybersecurity is more important than ever...',
  'Understanding why cybersecurity matters and how to protect yourself.',
  'Security',
  true,
  3,
  NOW()
);
