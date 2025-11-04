import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedProjects() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3)

  if (!projects || projects.length === 0) return null

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
          <Link href="/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-background border border-border rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-lg text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.split(",").map((tech, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                {project.github_url && (
                  <Link href={project.github_url} target="_blank">
                    <Button size="sm" variant="outline">
                      GitHub
                    </Button>
                  </Link>
                )}
                {project.live_url && (
                  <Link href={project.live_url} target="_blank">
                    <Button size="sm">Live</Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
