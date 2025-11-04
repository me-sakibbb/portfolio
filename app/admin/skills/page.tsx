import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SkillsManager } from "@/components/admin/skills-manager"

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
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>
        <SkillsManager initialData={skills || []} userId={user.id} />
      </div>
    </div>
  )
}
