"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"

export function SkillsManager({ initialData, userId }: any) {
  const [skills, setSkills] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      category: "",
      skill_name: "",
      proficiency_level: 5,
      order_index: skills.length,
      admin_id: userId,
      isNew: true,
    }
    setSkills([...skills, newSkill])
  }

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...skills]
    updated[index][field] = value
    setSkills(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      for (const skill of skills) {
        if (skill.isNew) {
          const { isNew, ...dataToInsert } = skill
          const { error } = await supabase.from("skills").insert(dataToInsert)
          if (error) throw error
        } else if (skill.id && !String(skill.id).startsWith("temp-")) {
          const { error } = await supabase.from("skills").update(skill).eq("id", skill.id).eq("admin_id", userId)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Skills saved successfully!" })
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
    const skill = skills[index]
    if (skill.isNew || String(skill.id).startsWith("temp-")) {
      setSkills(skills.filter((_: any, i: number) => i !== index))
      return
    }

    try {
      const { error } = await supabase.from("skills").delete().eq("id", skill.id).eq("admin_id", userId)

      if (error) throw error
      setSkills(skills.filter((_: any, i: number) => i !== index))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-6">
      {skills.map((skill: any, index: number) => (
        <Card key={skill.id || index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Skill {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                  placeholder="e.g., Leadership, Technical, Programming"
                />
              </div>
              <div className="grid gap-2">
                <Label>Skill Name</Label>
                <Input
                  value={skill.skill_name}
                  onChange={(e) => handleChange(index, "skill_name", e.target.value)}
                  placeholder="e.g., JavaScript, Project Management"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Proficiency Level (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={skill.proficiency_level}
                onChange={(e) => handleChange(index, "proficiency_level", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={skill.is_featured || false}
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
        <Button onClick={handleAddSkill} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Skill
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
