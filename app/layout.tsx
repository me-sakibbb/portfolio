import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalNavigation from "@/components/conditional-navigation"
import "./globals.css"

const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sakib Ul Hasan - Portfolio",
  description:
    "Tech-driven student and leader showcasing competitive programming, web development, and leadership experience",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ConditionalNavigation />
          <div className="pt-6">
            {children}

          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
