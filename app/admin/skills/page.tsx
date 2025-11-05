import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SkillsManager } from "@/components/admin/skills-manager"
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default async function SkillsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/admin/login")
  }

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("admin_id", user.id)
    .order("order_index", { ascending: true })

  return (
    <div className="min-h-screen bg-background p-0 md:p-0">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <AdminNavbar />
        <AdminBreadcrumbs />
        <h1 className="text-xl font-bold mb-8 mt-2">Manage Skills</h1>
        <SkillsManager initialData={skills || []} userId={user.id} />
      </div>
    </div>
  )
}
