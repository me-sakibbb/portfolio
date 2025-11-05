"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname() || "/"

  // refs for animated active indicator
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false, padX: 12, padY: 8, height: 40 })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update the active indicator position when pathname changes or on resize
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // find the matching nav item by href (longest match)
    let matchedKey: string | null = null
    for (const item of navItems) {
      if (item.href === "/") {
        if (pathname === "/") matchedKey = item.label
      } else if (item.href === "/about") {
        // match /about and /about?tab=...
        if (pathname === "/about") matchedKey = item.label
      } else if (pathname.startsWith(item.href)) {
        matchedKey = item.label
      }
    }

    if (matchedKey && itemRefs.current[matchedKey]) {
      const btn = itemRefs.current[matchedKey]!
      const cRect = container.getBoundingClientRect()
      const bRect = btn.getBoundingClientRect()
  const padX = 12 // horizontal padding in px
  const padY = 8 // vertical padding in px (increase for a taller pill)
  const left = bRect.left - cRect.left + container.scrollLeft - padX
  const width = bRect.width + padX * 2
  const height = Math.round(bRect.height + padY * 2)
  setIndicator({ left, width, visible: true, padX, padY, height })
    } else {
      setIndicator((s) => ({ ...s, visible: false }))
    }

    function onResize() {
      // recompute
      const currentKey = matchedKey
      if (currentKey && itemRefs.current[currentKey] && containerRef.current) {
        const btn = itemRefs.current[currentKey]!
        const cRect = containerRef.current.getBoundingClientRect()
        const bRect = btn.getBoundingClientRect()
        const padX = 12
        const padY = 8
        const left = bRect.left - cRect.left + containerRef.current.scrollLeft - padX
        const width = bRect.width + padX * 2
        const height = Math.round(bRect.height + padY * 2)
        setIndicator({ left, width, visible: true, padX, padY, height })
      }
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [pathname])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Sakib
          </Link>

          <div ref={containerRef} className="hidden md:flex gap-12 relative">
            {/* animated indicator behind active menu */}
            <div
              aria-hidden
              className={`absolute left-0 rounded-lg bg-primary/95 shadow transition-all duration-300 ease-in-out z-0 ${
                indicator.visible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                transform: `translateX(${indicator.left}px) translateY(-50%)`,
                width: indicator.width,
                height: indicator.height,
                top: '50%'
              }}
            />

            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-foreground transition-colors text-sm relative z-10">
                <span ref={(el) => { itemRefs.current[item.label] = el }} className={`px-0 py-0`}>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark") }>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
