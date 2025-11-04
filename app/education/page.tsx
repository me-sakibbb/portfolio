import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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
              <div key={edu.id} className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground">{edu.degree}</h2>
                <p className="text-lg text-primary mb-4">{edu.institution}</p>
                {edu.description && <p className="text-muted-foreground mb-4">{edu.description}</p>}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{edu.year}</span>
                  <span>GPA: {edu.gpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
