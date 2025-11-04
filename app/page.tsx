import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedSkills } from "@/components/sections/featured-skills"
import { FeaturedExperience } from "@/components/sections/featured-experience"
import { FeaturedEducation } from "@/components/sections/featured-education"
import { FeaturedAchievements } from "@/components/sections/featured-achievements"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { FeaturedBlog } from "@/components/sections/featured-blog"
import { ContactSection } from "@/components/sections/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default async function Home() {
  const supabase = await createClient()

  const { data: personalInfo } = await supabase.from("personal_info").select("*").limit(1).single()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection personalInfo={personalInfo} />
      <AboutSection personalInfo={personalInfo} />
      <FeaturedSkills />
      <FeaturedExperience />
      <FeaturedEducation />
      <FeaturedAchievements />
      <FeaturedProjects />
      <FeaturedBlog />
      <ContactSection personalInfo={personalInfo} />
      <Footer />
    </main>
  )
}
