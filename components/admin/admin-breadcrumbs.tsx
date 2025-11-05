"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const adminLabels: Record<string, string> = {
  dashboard: "Dashboard",
  "personal-info": "Personal Info",
  skills: "Skills",
  experiences: "Experiences",
  education: "Education",
  projects: "Projects",
  achievements: "Achievements",
  blog: "Blog",
}

export function AdminBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const adminIdx = segments.indexOf("admin")
  const crumbs = segments.slice(adminIdx, adminIdx + 2)

  return (
    <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-2" aria-label="Breadcrumb">
      <Link href="/admin/dashboard" className="hover:underline text-primary font-medium">Admin</Link>
      {crumbs[1] && (
        <>
          <span className="mx-1">&rarr;</span>
          <span className="text-foreground font-semibold">{adminLabels[crumbs[1]] || crumbs[1]}</span>
        </>
      )}
    </nav>
  )
}
