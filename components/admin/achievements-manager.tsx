"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"

export function AchievementsManager({ initialData, userId }: any) {
  const [achievements, setAchievements] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: "",
      description: "",
      year: new Date().getFullYear(),
      organization: "",
      order_index: achievements.length,
      admin_id: userId,
      isNew: true,
    }
    setAchievements([...achievements, newAchievement])
  }

  const moveAchievement = (index: number, direction: "up" | "down") => {
    const updated = [...achievements]
    const target = direction === "up" ? index - 1 : index + 1
    if (target < 0 || target >= updated.length) return
    const tmp = updated[target]
    updated[target] = { ...updated[index], order_index: target }
    updated[index] = { ...tmp, order_index: index }
    const normalized = updated.map((s, i) => ({ ...s, order_index: i }))
    setAchievements(normalized)
  }

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...achievements]
    updated[index][field] = value
    setAchievements(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      for (const achievement of achievements) {
        if (achievement.isNew) {
          const { isNew, ...dataToInsert } = achievement
          const { error } = await supabase.from("achievements").insert(dataToInsert)
          if (error) throw error
        } else if (achievement.id && !String(achievement.id).startsWith("temp-")) {
          const { error } = await supabase
            .from("achievements")
            .update(achievement)
            .eq("id", achievement.id)
            .eq("admin_id", userId)
          if (error) throw error
        }
      }

      setMessage({ type: "success", text: "Achievements saved successfully!" })
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
    const achievement = achievements[index]
    if (achievement.isNew || String(achievement.id).startsWith("temp-")) {
      setAchievements(achievements.filter((_: any, i: number) => i !== index))
      return
    }

    try {
      const { error } = await supabase.from("achievements").delete().eq("id", achievement.id).eq("admin_id", userId)

      if (error) throw error
      setAchievements(achievements.filter((_: any, i: number) => i !== index))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-6">
      {achievements.map((achievement: any, index: number) => (
        <Card key={achievement.id || index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <CardTitle>Achievement {index + 1}</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => moveAchievement(index, 'up')} title="Move up">
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => moveAchievement(index, 'down')} title="Move down">
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={achievement.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="e.g., Principal's Award"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Organization</Label>
                <Input
                  value={achievement.organization}
                  onChange={(e) => handleChange(index, "organization", e.target.value)}
                  placeholder="e.g., IBA Dhaka"
                />
              </div>
              <div className="grid gap-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={achievement.year}
                  onChange={(e) => handleChange(index, "year", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <textarea
                value={achievement.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Describe the achievement..."
              />
            </div>

            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={achievement.is_featured || false}
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
        <Button onClick={handleAddAchievement} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Achievement
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
