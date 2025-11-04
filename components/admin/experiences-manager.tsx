"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"

export function ExperiencesManager({ initialData, userId }: any) {
  const [experiences, setExperiences] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      description: "",
      start_date: "",
      end_date: "",
      is_current: false,
      order_index: experiences.length,
      admin_id: userId,
      isNew: true,
    }
    setExperiences([...experiences, newExperience])
  }

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...experiences]
    updated[index][field] = value
    setExperiences(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      for (const exp of experiences) {
        if (exp.isNew) {
          const { isNew, ...dataToInsert } = exp
          const { error } = await supabase.from("experiences").insert(dataToInsert)
          if (error) throw error
        } else if (exp.id && !String(exp.id).startsWith("temp-")) {
          const { error } = await supabase.from("experiences").update(exp).eq("id", exp.id).eq("admin_id", userId)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Experiences saved successfully!" })
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
    const exp = experiences[index]
    if (exp.isNew || String(exp.id).startsWith("temp-")) {
      setExperiences(experiences.filter((_: any, i: number) => i !== index))
      return
    }

    try {
      const { error } = await supabase.from("experiences").delete().eq("id", exp.id).eq("admin_id", userId)

      if (error) throw error
      setExperiences(experiences.filter((_: any, i: number) => i !== index))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-6">
      {experiences.map((exp: any, index: number) => (
        <Card key={exp.id || index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Experience {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Job Title</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  placeholder="e.g., Chief Operating Officer"
                />
              </div>
              <div className="grid gap-2">
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  placeholder="e.g., Biddalap"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Describe your role and responsibilities..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={exp.start_date}
                  onChange={(e) => handleChange(index, "start_date", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={exp.end_date}
                  onChange={(e) => handleChange(index, "end_date", e.target.value)}
                />
              </div>
              <div className="grid gap-2 flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.is_current}
                    onChange={(e) => handleChange(index, "is_current", e.target.checked)}
                  />
                  <span>Currently Working</span>
                </label>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.is_featured || false}
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
        <Button onClick={handleAddExperience} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Experience
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
