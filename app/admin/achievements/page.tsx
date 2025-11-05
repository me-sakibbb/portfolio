import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AchievementsManager } from "@/components/admin/achievements-manager"
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default async function AchievementsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/admin/login")
  }

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("admin_id", user.id)
    .order("order_index", { ascending: true })

  return (
    <div className="min-h-screen bg-background p-0 md:p-0">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <AdminNavbar />
        <AdminBreadcrumbs />
        <h1 className="text-xl font-bold mb-8 mt-2">Manage Achievements</h1>
        <AchievementsManager initialData={achievements || []} userId={user.id} />
      </div>
    </div>
  )
}
