import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EducationCard } from "@/components/EducationCard"

export default async function EducationPage() {
  const supabase = await createClient()

  const { data: education } = await supabase.from("education").select("*").order("order_index", { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-12">Education</h1>

          <div className="space-y-6">
            {education?.map((edu) => (
              <EducationCard key={edu.id} {...edu} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
