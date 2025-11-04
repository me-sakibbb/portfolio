import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AboutSection({ personalInfo }: any) {
  const stats = [
    { value: "4+", label: "Years of Experience in Web Development"},
    { value: "15+", label: "Projects Completed" },
    { value: "16th", label: "in Bangladesh Olympiad in Informatics" }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-4">
          <h2 className="text-4xl font-bold">About Me</h2>
          <Link href="/about">
            <Button variant="outline" size="lg" className="gap-2 cursor-pointer">
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {personalInfo?.about ||
              `I'm a dedicated student at IBA Dhaka University with a strong passion for technology and leadership. With experience as COO at Biddalap edtech initiative and expertise in competitive programming, web development, and ethical hacking, I bring a unique combination of technical skills and operational excellence to every project.`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-background border border-border">
              <div className="font-semibold text-primary text-6xl">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
