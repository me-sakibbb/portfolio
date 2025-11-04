"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data } = await supabase.from("projects").select("*").order("order_index", { ascending: true })
      setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) return null

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-border overflow-hidden bg-card/50 hover:shadow-lg transition-all"
            >
              {project.image_url && (
                <img
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}

                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.split(",").map((tech: string) => (
                      <span key={tech.trim()} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Github className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
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
