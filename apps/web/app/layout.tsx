import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppSidebar } from "@/components/layout/AppSidebar"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Quiz Dock",
  description: "Upload a document, discuss it with an agent, and quiz yourself on it.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#3f3f46]">
        <AppSidebar />
        <div className="flex min-h-screen flex-col | lg:pl-[260px]">{children}</div>
      </body>
    </html>
  )
}
