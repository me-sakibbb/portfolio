import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PersonalInfoForm } from "@/components/admin/personal-info-form"
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default async function PersonalInfoPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/admin/login")
  }

  const { data: personalInfo } = await supabase
    .from("personal_info")
    .select("*")
    .eq("admin_id", user.id)
    .limit(1)
    .single()

  return (
    <div className="min-h-screen bg-background p-0 md:p-0">
      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <AdminNavbar />
        <AdminBreadcrumbs />
        <h1 className="text-xl font-bold mb-8 mt-2">Personal Information</h1>
        <PersonalInfoForm initialData={personalInfo} userId={user.id} />
      </div>
    </div>
  )
}
