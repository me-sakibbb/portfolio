"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function PersonalInfoForm({ initialData, userId }: any) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || [],
    about: initialData?.about || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    profile_image_url: initialData?.profile_image_url || "",
  })
  const [newTitle, setNewTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    try {
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(`profile_photo/${userId}`)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from(`profile_photo/${userId}/`)
        .getPublicUrl(fileName)

      if (publicUrlData) {
        setFormData(prev => ({
          ...prev,
          profile_image_url: publicUrlData.publicUrl
        }))
        setMessage({ type: "success", text: "Image uploaded successfully!" })
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.message || "Error uploading image"
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name !== 'title') {  // title is now handled separately
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      if (initialData?.id) {
        const { error } = await supabase
          .from("personal_info")
          .update(formData)
          .eq("id", initialData.id)
          .eq("admin_id", userId)

        if (error) throw error
      } else {
        const { error } = await supabase.from("personal_info").insert({
          ...formData,
          admin_id: userId,
        })

        if (error) throw error
      }

      setMessage({ type: "success", text: "Personal information updated successfully!" })
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Professional Titles</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.title.map((title: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      title: prev.title.filter((_: string, i: number) => i !== index)
                    }))
                  }}
                >
                  {title}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a professional title"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newTitle.trim()) {
                      setFormData(prev => ({
                        ...prev,
                        title: [...prev.title, newTitle.trim()]
                      }));
                      setNewTitle('');
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (newTitle.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      title: [...prev.title, newTitle.trim()]
                    }));
                    setNewTitle('');
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="grid gap-4">
            <Label>Profile Photo</Label>
            <div className="flex items-start gap-4">
              {/* Preview current image */}
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                {formData.profile_image_url ? (
                  <Image
                    src={formData.profile_image_url}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                {/* Upload button and input */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleImageUpload(file)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading ({Math.round(uploadProgress)}%)
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Photo
                      </>
                    )}
                  </Button>
                </div>

                {/* Help text */}
                <p className="text-sm text-muted-foreground">
                  Recommended: Square image, at least 400x400px
                </p>

                {/* Clear button */}
                {formData.profile_image_url && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        profile_image_url: ""
                      }))
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Photo
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile_image_url">Profile Image URL</Label>
            <Input
              id="profile_image_url"
              name="profile_image_url"
              value={formData.profile_image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="about">About Me</Label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="Tell us about yourself..."
            />
          </div>

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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
