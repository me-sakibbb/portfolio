import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default async function ExperiencePage() {
  const supabase = await createClient()

  const { data: experiences } = await supabase.from("experiences").select("*").order("order_index", { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-12">Experience</h1>

          <div className="space-y-6">
            {experiences?.map((exp) => (
              <div key={exp.id} className="bg-card border border-border rounded-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{exp.title}</h2>
                    <p className="text-lg text-primary">{exp.company}</p>
                  </div>
                  {exp.is_current && (
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                {exp.start_date && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(exp.start_date).toLocaleDateString()} -{" "}
                    {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : "Present"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
