"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { EducationCard } from "../EducationCard"

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
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  )
}
