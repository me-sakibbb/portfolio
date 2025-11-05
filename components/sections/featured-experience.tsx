import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"

export async function FeaturedExperience() {
  const supabase = await createClient()

  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  if (!experiences || experiences.length === 0) return null

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Experience</h2>

        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{exp.title}</h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                </div>
                {exp.is_current ? (
                  <span className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                    Current
                  </span>
                ) : (
                  <span className="bg-gray-500/20 text-gray-700 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </span>
                )}


              </div>
              <p className="text-muted-foreground text-sm">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 flex items-center justify-center">
          <Link href="/about?tab=experience">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>


      </div>
    </section>
  )
}
