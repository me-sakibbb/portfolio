import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { EducationCard } from "../EducationCard"

export async function FeaturedEducation() {
  const supabase = await createClient()

  const { data: education } = await supabase
    .from("education")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  if (!education || education.length === 0) return null

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Education</h2>
          <Link href="/about?tab=education">
            <Button variant="outline" className="cursor-pointer">View All Education</Button>
          </Link>
        </div>

        <div>
          {education.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  )
}
