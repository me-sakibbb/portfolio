"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import SkillsCategoryCard from "../SkillsCategoryCard"

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
    <section id="skills" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]: any) => (
            <SkillsCategoryCard key={category} category={category} categorySkills={categorySkills} />
          ))}
        </div>
      </div>
    </section>
  )
}
