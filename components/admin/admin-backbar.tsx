"use client"

import { useRouter } from "next/navigation"

export function AdminBackBar() {
  const router = useRouter()
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="rounded bg-muted hover:bg-muted-foreground/20 text-foreground px-2 py-1 text-sm font-medium flex items-center gap-1 border border-border"
        title="Back"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        <span>Back</span>
      </button>
      <span className="font-bold text-lg ml-2">Admin Dashboard</span>
    </div>
  )
}
