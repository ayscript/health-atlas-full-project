import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "Health Atlas - Healthcare Chatbot in Your Language",
  description:
    "AI-powered healthcare assistance in Yoruba, Igbo, Hausa, and Pidgin. Get instant medical guidance in your native language.",
  generator: "v0.app",
  keywords: ["healthcare", "AI", "chatbot", "Yoruba", "Igbo", "Hausa", "Pidgin", "Nigeria", "Africa", "telemedicine"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "Health Atlas - Healthcare Chatbot in Your Language",
    description: "AI-powered healthcare assistance in Yoruba, Igbo, Hausa, and Pidgin.",
    type: "website",
  },
  manifest: "/manifest.json",
}

export const viewport = {
  themeColor: "#0A4D8C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}