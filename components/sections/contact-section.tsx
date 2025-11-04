import { Mail, Phone, MapPin, Facebook, MessageCircle, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection({ personalInfo }: any) {
  const otherContactLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      href: personalInfo?.facebook || "https://facebook.com/sakibulhasan159",
    },
    {
      icon: MessageCircle,
      label: "Messenger",
      href: personalInfo?.messenger || "https://m.me/sakibulhasan159",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      href: `https://wa.me/${(personalInfo?.whatsapp || "8801938503891").replace(/[^0-9]/g, '')}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: personalInfo?.instagram || "https://instagram.com/sakibulhasan159",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo?.linkedin || "https://linkedin.com/in/sakibulhasan159",
    },
    {
      icon: Github,
      label: "Github",
      href: personalInfo?.github || "https://github.com/sakibulhasan159",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <a
              href={`mailto:${personalInfo?.email || "sakibulhasan159@gmail.com"}`}
              className="text-muted-foreground hover:text-primary"
            >
              {personalInfo?.email || "sakibulhasan159@gmail.com"}
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <a
              href={`tel:${personalInfo?.phone || "+8801938 5038911"}`}
              className="text-muted-foreground hover:text-primary"
            >
              {personalInfo?.phone || "+880 1938 5038911"}
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-muted-foreground">{personalInfo?.location || "Mirpur 14, Dhaka"}</p>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-6">
            {otherContactLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
                title={social.label}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full bg-background hover:bg-primary transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
