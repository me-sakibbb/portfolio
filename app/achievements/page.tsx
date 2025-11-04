import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default async function AchievementsPage() {
  const supabase = await createClient()

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("order_index", { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-12">Achievements</h1>

          <div className="space-y-4">
            {achievements?.map((achievement) => (
              <div key={achievement.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-foreground">{achievement.title}</h3>
                  <span className="text-xs text-muted-foreground">{achievement.year}</span>
                </div>
                <p className="text-sm text-primary mb-2">{achievement.organization}</p>
                {achievement.category && (
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mb-2">
                    {achievement.category}
                  </span>
                )}
                {achievement.description && <p className="text-muted-foreground text-sm">{achievement.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
