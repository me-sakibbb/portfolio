"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react"

export function SkillsManager({ initialData, userId }: any) {
  const [skills, setSkills] = useState(initialData)
  const [editingCategory, setEditingCategory] = useState<Record<string, string>>({})
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Get unique categories from skills
// Get unique categories (including empty one if new)
let categories = Array.from(new Set(skills.map((s: any) => s.category))) as string[]
if (!categories.includes("")) {
  categories.push("") // ensure blank category appears for new additions
}

  const handleAddCategory = () => {
    const newSkill = {
      category: "",
      skill_name: "",
      order_index: skills.length,
      admin_id: userId,
      isNew: true,
    }
    setSkills([...skills, newSkill])
  }

  const handleCategoryNameChange = (oldCategory: string, newCategory: string) => {
    setEditingCategory(prev => ({ ...prev, [oldCategory]: newCategory }))
  }

  const handleCategoryBlur = (oldCategory: string) => {
    const newCategory = editingCategory[oldCategory] || oldCategory
    if (newCategory !== oldCategory) {
      setSkills(skills.map((skill: { category: string }) => 
        skill.category === oldCategory 
          ? { ...skill, category: newCategory }
          : skill
      ))
      setEditingCategory(prev => {
        const { [oldCategory]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleAddSkillToCategory = (category: string) => {
    const newSkill = {
      category,
      skill_name: "",
      order_index: skills.filter((s: any) => s.category === category).length,
      admin_id: userId,
      isNew: true,
    }
    setSkills([...skills, newSkill])
  }

  const moveSkill = (category: string, index: number, direction: "up" | "down") => {
    const catSkills = skills.filter((s: any) => s.category === category)
    const globalIdx = skills.findIndex((s: any) => s.category === category && catSkills.indexOf(s) === index)
    const catTarget = direction === "up" ? index - 1 : index + 1
    if (catTarget < 0 || catTarget >= catSkills.length) return
    const globalTarget = skills.findIndex((s: any) => s.category === category && catSkills.indexOf(s) === catTarget)
    const updated = [...skills]
    const tmp = updated[globalTarget]
    updated[globalTarget] = { ...updated[globalIdx], order_index: catTarget }
    updated[globalIdx] = { ...tmp, order_index: index }
    // normalize order_index within category
    let order = 0
    for (let i = 0; i < updated.length; ++i) {
      if (updated[i].category === category) {
        updated[i].order_index = order++
      }
    }
    setSkills(updated)
    setTimeout(() => {
      const el = itemRefs.current[`${category}-${catTarget}`]
      if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 220)
  }

  const handleChange = (category: string, index: number, field: string, value: any) => {
    const catSkills = skills.filter((s: any) => s.category === category)
    const globalIdx = skills.findIndex((s: any) => s.category === category && catSkills.indexOf(s) === index)
    const updated = [...skills]
    updated[globalIdx][field] = value
    setSkills(updated)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)
    try {
      // Update all skills with their current category names first
      const updatedSkills = skills.map((skill: any) => {
        const categoryIndex = initialData.findIndex((s: any) => s.category === skill.category)
        if (categoryIndex !== -1) {
          return { ...skill, category: categories[categoryIndex] }
        }
        return skill
      })
      setSkills(updatedSkills)

      // Save all skills
      for (const skill of updatedSkills) {
        if (skill.isNew) {
          const { isNew, ...dataToInsert } = skill
          const { error } = await supabase.from("skills").insert(dataToInsert)
          if (error) {
            console.log(error)
            throw error
          }
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

  const handleDelete = async (category: string, index: number) => {
    const catSkills = skills.filter((s: any) => s.category === category)
    const globalIdx = skills.findIndex((s: any) => s.category === category && catSkills.indexOf(s) === index)
    const skill = skills[globalIdx]
    if (skill.isNew || String(skill.id).startsWith("temp-")) {
      setSkills(skills.filter((_: any, i: number) => i !== globalIdx))
      return
    }
    try {
      const { error } = await supabase.from("skills").delete().eq("id", skill.id).eq("admin_id", userId)
      if (error) throw error
      setSkills(skills.filter((_: any, i: number) => i !== globalIdx))
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const catSkills = skills
          .filter((s: any) => s.category === category)
          .sort((a: any, b: any) => a.order_index - b.order_index)
        
        return (
          <Card key={category} className="border border-border rounded-lg p-2 bg-muted/20 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 pb-0">
              <div className="flex items-center gap-2">
                <Input
                  className="font-bold text-sm w-32 h-8 px-2 py-1 rounded"
                  value={editingCategory[category] ?? category}
                  onChange={e => handleCategoryNameChange(category, e.target.value)}
                  onBlur={() => handleCategoryBlur(category)}
                  placeholder="Category name"
                />
                <Button variant="outline" size="icon" onClick={() => handleAddSkillToCategory(category)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-2">
              {catSkills.length === 0 && <div className="text-muted-foreground">No skills in this category.</div>}
              {catSkills.map((skill: any, index: number) => (
                <div key={skill.name} ref={el => { itemRefs.current[`${category}-${index}`] = el }} className="border rounded-md p-2 mb-2 bg-primary-foreground flex items-center gap-2 min-h-10">
                  <Button variant="ghost" size="icon" onClick={() => moveSkill(category, index, 'up')} title="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => moveSkill(category, index, 'down')} title="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(category, index)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                  <div className="grid gap-2">
                    <Label className="sr-only">Skill Name</Label>
                    <Input
                      value={skill.skill_name}
                      onChange={e => handleChange(category, index, "skill_name", e.target.value)}
                      placeholder="e.g., JavaScript, Project Management"
                      className="rounded-md px-2 py-1 text-sm h-8"
                    />
                  </div>
                  <input
                    type="checkbox"
                    checked={skill.is_featured || false}
                    onChange={e => handleChange(category, index, "is_featured", e.target.checked)}
                    className="ml-2"
                    title="Feature on Homepage"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}

      {message && (
        <div
          className={`p-4 rounded-md text-sm ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <Button onClick={handleAddCategory} variant="outline" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          Add Category
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
