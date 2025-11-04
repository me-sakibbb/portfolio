import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLogoutButton } from "@/components/admin-logout-button"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect("/admin/login")
  }

  const [
    { data: personalInfo },
    { data: experiences },
    { data: education },
    { data: skills },
    { data: achievements },
    { data: projects },
  ] = await Promise.all([
    supabase.from("personal_info").select("*").eq("admin_id", user.id).limit(1).single(),
    supabase.from("experiences").select("*").eq("admin_id", user.id),
    supabase.from("education").select("*").eq("admin_id", user.id),
    supabase.from("skills").select("*").eq("admin_id", user.id),
    supabase.from("achievements").select("*").eq("admin_id", user.id),
    supabase.from("projects").select("*").eq("admin_id", user.id),
  ])

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your portfolio content</p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{personalInfo ? "Configured" : "Not set"}</span>
                <Link href="/admin/personal-info">
                  <Button size="sm">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{experiences?.length || 0}</span>
                <Link href="/admin/experiences">
                  <Button size="sm">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{education?.length || 0}</span>
                <Link href="/admin/education">
                  <Button size="sm">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{skills?.length || 0}</span>
                <Link href="/admin/skills">
                  <Button size="sm">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{achievements?.length || 0}</span>
                <Link href="/admin/achievements">
                  <Button size="sm">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{projects?.length || 0}</span>
                <Link href="/admin/projects">
                  <Button size="sm">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">View Live Portfolio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
