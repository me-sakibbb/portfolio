'use client'

import { useRouter } from "next/navigation"

export function AdminNavbar() {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border mb-6 py-4 px-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded bg-muted hover:bg-muted-foreground/20 text-foreground px-2 py-1 text-base font-medium flex items-center gap-1 border border-border"
          title="Back"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <span className="font-extrabold text-2xl md:text-3xl ml-4 tracking-tight">Admin Dashboard</span>
      </div>
    </div>
  )
}