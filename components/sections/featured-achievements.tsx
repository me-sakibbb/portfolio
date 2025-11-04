import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedAchievements() {
  const supabase = await createClient()

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  if (!achievements || achievements.length === 0) return null

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Achievements</h2>
          <Link href="/achievements">
            <Button variant="outline">View All Achievements</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground">{achievement.title}</h3>
                <span className="text-xs text-muted-foreground">{achievement.year}</span>
              </div>
              <p className="text-sm text-primary mb-2">{achievement.organization}</p>
              {achievement.description && <p className="text-sm text-muted-foreground">{achievement.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
