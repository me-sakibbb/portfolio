"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function BlogManager() {
  const [posts, setPosts] = useState<any[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    is_published: false,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            ...formData,
            published_at: formData.is_published ? new Date().toISOString() : null,
          })
          .eq("id", editingId)

        if (error) throw error
        toast({ description: "Blog post updated successfully" })
      } else {
        const { error } = await supabase.from("blog_posts").insert([
          {
            ...formData,
            published_at: formData.is_published ? new Date().toISOString() : null,
          },
        ])

        if (error) throw error
        toast({ description: "Blog post created successfully" })
      }

      setFormData({ title: "", slug: "", content: "", excerpt: "", category: "", is_published: false })
      setEditingId(null)
      setIsAddingNew(false)
      fetchPosts()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error
      toast({ description: "Blog post deleted successfully" })
      fetchPosts()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <Button onClick={() => setIsAddingNew(!isAddingNew)}>{isAddingNew ? "Cancel" : "Add New Post"}</Button>

      {(isAddingNew || editingId) && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            placeholder="Slug (e.g., my-blog-post)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Input
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
          <Textarea
            placeholder="Content (supports markdown)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">Publish this post</span>
          </label>
          <Button type="submit" disabled={loading}>
            {editingId ? "Update Post" : "Create Post"}
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-lg text-foreground mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
            <p className="text-sm text-muted-foreground mb-4">Status: {post.is_published ? "Published" : "Draft"}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setFormData(post)
                  setEditingId(post.id)
                  setIsAddingNew(false)
                }}
              >
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
