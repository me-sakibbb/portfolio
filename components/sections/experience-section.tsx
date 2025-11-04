"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiences() {
      const supabase = createClient()
      const { data } = await supabase.from("experiences").select("*").order("order_index", { ascending: true })
      setExperiences(data || [])
      setLoading(false)
    }
    fetchExperiences()
  }, [])

  if (loading) return null

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-8 pb-8 border-l-2 border-primary last:border-l-transparent last:pb-0"
            >
              <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>

              <div>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
                {exp.start_date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(exp.start_date).toLocaleDateString()}
                    {exp.end_date ? ` - ${new Date(exp.end_date).toLocaleDateString()}` : " - Present"}
                  </p>
                )}
                {exp.description && <p className="text-muted-foreground mt-2">{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
