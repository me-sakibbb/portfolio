"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection({ personalInfo }: any) {
  const quickLinks = [
    {
      icon: Github,
      href: personalInfo?.github || "https://github.com/me-sakibbb",
      external: true,
      label: "Github",
    },
    {
      icon: Linkedin,
      href: personalInfo?.linkedin || "https://www.linkedin.com/in/me-sakibbb/",
      external: true,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo?.email || "sakibulhasan159@gmail.com"}`,
      external: false,
      label: "Email",
    },
  ]
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10">
        <Image src="/hero-bg.jpg" alt="Hero background" fill className="object-cover" priority quality={90} />
        {/* Gradient overlay blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95"></div>

        {/* Floating blur effects */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Image container with blending background */}
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                {/* Gradient blur background for blending effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-3xl"></div>

                {/* Profile Image */}
                {personalInfo?.profile_image_url ? (
                  <Image
                    src={personalInfo.profile_image_url || "/placeholder.svg"}
                    alt={personalInfo?.name}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                    quality={90}
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-primary/60 border-4 border-primary/30 flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-bold text-primary-foreground">SH</span>
                  </div>
                )}

                {/* Decorative rings around image */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/20"></div>
                <div className="absolute -inset-4 rounded-3xl border-2 border-primary/10"></div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="text-center lg:text-left order-2 lg:order-2 lg:mt-0 mt-5">
            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 text-balance bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              {personalInfo?.name || "Sakib Ul Hasan"}
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {(personalInfo?.title || ["Student", "COO at Biddalap", "Web Developer", "Ethical Hacker"]).map((title: string, index: number) => (
                <Badge key={index} className="text-lg" variant="border">
                  {title}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground mb-12 text-balance leading-relaxed">
              {personalInfo?.about ||
                "Driven, adaptable, and reliable. Strong work ethic with fast learning ability and collaborative mindset."}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-5">
              <Link href="#contact">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow text-white">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="shadow-md hover:shadow-lg transition-shadow bg-transparent cursor-pointer"
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </Button>
                </a>
              ))}
            </div>

            <div className="lg:hidden animate-bounce relative top-10">
              <div className="text-4xl ">↓</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
