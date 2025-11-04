import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-12">Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-lg p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-foreground mb-2">{project.title}</h2>
                <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.split(",").map((tech, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank">
                      <Button variant="outline">GitHub</Button>
                    </Link>
                  )}
                  {project.live_url && (
                    <Link href={project.live_url} target="_blank">
                      <Button>Live Demo</Button>
                    </Link>
                  )}
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
