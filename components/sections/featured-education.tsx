import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

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
          <Link href="/education">
            <Button variant="outline">View All Education</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu) => (
            <div key={edu.id} className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">{edu.degree}</h3>
              <p className="text-sm text-primary mb-2">{edu.institution}</p>
              {edu.field && <p className="text-xs text-muted-foreground mb-3">{edu.field}</p>}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">{edu.year}</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">GPA: {edu.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
