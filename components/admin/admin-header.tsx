"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/personal-info", label: "Personal Info" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/blog", label: "Blog" },
]

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border mb-4">
      <div className="flex items-center justify-between px-4 py-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} title="Back">
          <span className="sr-only">Back</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </Button>
        <div className="flex-1 text-center font-semibold text-lg">Admin Panel</div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(o => !o)} title="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      {open && (
        <div className="px-4 pb-2">
          <nav className="flex flex-col gap-1">
            {adminLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-2 text-sm font-medium transition-colors ${pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
                {pathname === link.href && <span className="ml-2 text-xs text-muted-foreground">(Current)</span>}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
