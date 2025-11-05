import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import SkillsCategoryCard from "@/components/SkillsCategoryCard"

export async function FeaturedSkills() {
  const supabase = await createClient()

  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })

  if (error) {
    console.error("Error fetching featured skills:", error)
    return null
  }

  if (!skills || skills.length === 0) return null

  // 🧩 Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, any[]>, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Skills</h2>
          <Link href="/skills">
            <Button variant="outline">View All Skills</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <SkillsCategoryCard
              key={category}
              category={category}
              categorySkills={categorySkills}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
