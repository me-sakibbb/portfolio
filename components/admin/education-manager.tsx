"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"

export function EducationManager({ initialData, userId }: any) {
  const [education, setEducation] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: new Date().getFullYear(),
      gpa: "",
      description: "",
      order_index: education.length,
      admin_id: userId,
      isNew: true,
    }
    setEducation([...education, newEducation])
  }

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      for (const edu of education) {
        if (edu.isNew) {
          const { isNew, ...dataToInsert } = edu
          const { error } = await supabase.from("education").insert(dataToInsert)
          if (error) throw error
        } else if (edu.id && !String(edu.id).startsWith("temp-")) {
          const { error } = await supabase.from("education").update(edu).eq("id", edu.id).eq("admin_id", userId)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Education saved successfully!" })
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
    const edu = education[index]
    if (edu.isNew || String(edu.id).startsWith("temp-")) {
      setEducation(education.filter((_: any, i: number) => i !== index))
      return
    }

    try {
      const { error } = await supabase.from("education").delete().eq("id", edu.id).eq("admin_id", userId)

      if (error) throw error
      setEducation(education.filter((_: any, i: number) => i !== index))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-6">
      {education.map((edu: any, index: number) => (
        <Card key={edu.id || index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Education {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  placeholder="e.g., Bachelor of Business Administration"
                />
              </div>
              <div className="grid gap-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => handleChange(index, "institution", e.target.value)}
                  placeholder="e.g., IBA Dhaka University"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={edu.year}
                  onChange={(e) => handleChange(index, "year", Number.parseInt(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label>GPA</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, "gpa", Number.parseFloat(e.target.value))}
                  placeholder="e.g., 5.00"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <textarea
                value={edu.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={edu.is_featured || false}
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
        <Button onClick={handleAddEducation} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Education
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
