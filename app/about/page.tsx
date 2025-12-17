"use client"

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { AchievementsSection } from "@/components/sections/achievements-section"

const tabs = [
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
  { key: "experiences", label: "Experiences" },
  { key: "projects", label: "Projects" },
  { key: "achievements", label: "Achievements" },
]

// Separate inner component that uses useSearchParams
function AboutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialTab = (searchParams?.get("tab") || "education") as string
  const [active, setActive] = useState<string>(initialTab)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonsRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  // Measure and position the indicator whenever active changes or window resizes
  useLayoutEffect(() => {
    function update() {
      const container = containerRef.current
      const btn = buttonsRef.current[active]
      if (!container || !btn) {
        setIndicator({ left: 0, width: 0 })
        return
      }

      const cRect = container.getBoundingClientRect()
      const bRect = btn.getBoundingClientRect()
      setIndicator({ left: bRect.left - cRect.left + container.scrollLeft, width: bRect.width })
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [active])

  // Recompute on mount in case fonts/images change layout
  useEffect(() => {
    const t = setTimeout(() => {
      const ev = new Event("resize")
      window.dispatchEvent(ev)
    }, 50)
    return () => clearTimeout(t)
  }, [])

  // Keep active tab in sync with URL
  useEffect(() => {
    const tabFromUrl = (searchParams?.get("tab") || "education") as string
    if (tabFromUrl && tabFromUrl !== active) {
      setActive(tabFromUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>

        <div className="mb-8">
          <div ref={containerRef} className="relative inline-flex w-full max-w-3xl items-stretch bg-card/50 rounded-lg p-2">
            {/* Animated indicator (pill) */}
            <div
              aria-hidden
              className="absolute top-1 bottom-1 left-0 rounded-md bg-foreground/95 shadow-md transition-all duration-300 ease-in-out"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />

            <div className="relative z-10 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  ref={(el) => {
                    buttonsRef.current[t.key] = el
                  }}
                  onClick={() => {
                    setActive(t.key)
                    try {
                      const url = new URL(window.location.href)
                      url.searchParams.set("tab", t.key)
                      router.replace(url.pathname + url.search, { scroll: false })
                    } catch (e) {
                      router.replace(`?tab=${t.key}`)
                    }
                  }}
                  className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap focus:outline-none ${
                    active === t.key ? "text-primary-foreground" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {active === "education" && <EducationSection />}
          {active === "skills" && <SkillsSection />}
          {active === "experiences" && <ExperienceSection />}
          {active === "projects" && <ProjectsSection />}
          {active === "achievements" && <AchievementsSection />}
        </div>
      </div>
    </main>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <AboutContent />
    </Suspense>
  )
}
