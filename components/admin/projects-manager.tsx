"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"

export function ProjectsManager({ initialData, userId }: any) {
  const [projects, setProjects] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      image_url: "",
      github_url: "",
      live_url: "",
      order_index: projects.length,
      admin_id: userId,
      isNew: true,
    }
    setProjects([...projects, newProject])
  }

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...projects]
    updated[index][field] = value
    setProjects(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      for (const project of projects) {
        if (project.isNew) {
          const { isNew, ...dataToInsert } = project
          const { error } = await supabase.from("projects").insert(dataToInsert)
          if (error) throw error
        } else if (project.id && !String(project.id).startsWith("temp-")) {
          const { error } = await supabase.from("projects").update(project).eq("id", project.id).eq("admin_id", userId)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Projects saved successfully!" })
      setTimeout(() => router.push("/admin/dashboard"), 1500)
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (index: number) => {
    const project = projects[index]
    if (project.isNew || String(project.id).startsWith("temp-")) {
      setProjects(projects.filter((_: any, i: number) => i !== index))
      return
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", project.id).eq("admin_id", userId)

      if (error) throw error
      setProjects(projects.filter((_: any, i: number) => i !== index))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-6">
      {projects.map((project: any, index: number) => (
        <Card key={project.id || index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Project {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Project Title</Label>
              <Input
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="e.g., E-Commerce Platform"
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Describe your project..."
              />
            </div>

            <div className="grid gap-2">
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={project.technologies}
                onChange={(e) => handleChange(index, "technologies", e.target.value)}
                placeholder="e.g., React, Node.js, PostgreSQL"
              />
            </div>

            <div className="grid gap-2">
              <Label>Image URL</Label>
              <Input
                value={project.image_url}
                onChange={(e) => handleChange(index, "image_url", e.target.value)}
                placeholder="https://example.com/project.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>GitHub URL</Label>
                <Input
                  value={project.github_url}
                  onChange={(e) => handleChange(index, "github_url", e.target.value)}
                  placeholder="https://github.com/user/project"
                />
              </div>
              <div className="grid gap-2">
                <Label>Live URL</Label>
                <Input
                  value={project.live_url}
                  onChange={(e) => handleChange(index, "live_url", e.target.value)}
                  placeholder="https://project.com"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={project.is_featured || false}
                  onChange={(e) => handleChange(index, "is_featured", e.target.checked)}
                />
                <span>Feature on Homepage</span>
              </label>
            </div>
          </CardContent>
        </Card>
      ))}

      {message && (
        <div
          className={`p-4 rounded-md text-sm ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={handleAddProject} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save All"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
