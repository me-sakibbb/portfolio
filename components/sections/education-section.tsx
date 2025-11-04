"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function EducationSection() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      const supabase = createClient()
      const { data } = await supabase.from("education").select("*").order("order_index", { ascending: true })
      setEducation(data || [])
      setLoading(false)
    }
    fetchEducation()
  }, [])

  if (loading) return null

  return (
    <section id="education" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="p-6 rounded-lg border border-border bg-card/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                </div>
                {edu.year && <span className="text-sm font-semibold text-primary">{edu.year}</span>}
              </div>
              {edu.gpa && <p className="text-sm text-muted-foreground mt-2">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-muted-foreground mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
