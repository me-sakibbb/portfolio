"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "./navigation"

export default function ConditionalNavigation() {
  const pathname = usePathname() || "/"

  // Hide navigation for any admin routes (e.g. /admin, /admin/*)
  if (pathname.startsWith("/admin")) return null

  return <Navigation />
}
