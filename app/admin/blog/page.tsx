import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLogoutButton } from "@/components/admin-logout-button"
import { BlogManager } from "@/components/admin/blog-manager"

export default async function AdminBlogPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin - Manage Blog Posts</h1>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogManager />
      </div>
    </div>
  )
}
