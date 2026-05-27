import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { CompanyProvider } from '@/contexts/company-context'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'bAppoint',
  description: 'Book in your favorite bussiness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <CompanyProvider>
        <Toaster richColors position="top-right" />
        <html lang="en">
          <head>
            <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
          </head>
          <body>{children}</body>
        </html>
      </CompanyProvider>
    </ClerkProvider>
  )
}
