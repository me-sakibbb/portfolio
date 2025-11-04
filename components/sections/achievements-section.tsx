"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Award } from "lucide-react"

export function AchievementsSection() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAchievements() {
      const supabase = createClient()
      const { data } = await supabase.from("achievements").select("*").order("order_index", { ascending: true })
      setAchievements(data || [])
      setLoading(false)
    }
    fetchAchievements()
  }, [])

  if (loading) return null

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Achievements & Awards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4">
                <Award className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{achievement.title}</h3>
                  {achievement.organization && (
                    <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                  )}
                  {achievement.year && <p className="text-xs text-muted-foreground mt-2">{achievement.year}</p>}
                  {achievement.description && (
                    <p className="text-muted-foreground text-sm mt-2">{achievement.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
