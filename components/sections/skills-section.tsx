"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function SkillsSection() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      const supabase = createClient()
      const { data } = await supabase.from("skills").select("*").order("order_index", { ascending: true })
      setSkills(data || [])
      setLoading(false)
    }
    fetchSkills()
  }, [])

  const groupedSkills = skills.reduce((acc: any, skill) => {
    const category = skill.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  if (loading) return null

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]: any) => (
            <div key={category} className="p-6 rounded-lg border border-border bg-card/50">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill: any) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
