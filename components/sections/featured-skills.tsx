import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedSkills() {
  const supabase = await createClient()

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  if (!skills || skills.length === 0) return null

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
          {skills.map((skill) => (
            <div key={skill.id} className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">{skill.skill_name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{skill.category}</p>
              <span className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                {skill.proficiency_level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
