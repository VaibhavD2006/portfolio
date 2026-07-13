import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

// JupyterLab-style fonts: SF Pro for UI, JetBrains Mono for code, SF Mono for terminal
export const metadata: Metadata = {
  title: 'Vaibhav R. Dandala',
  description: 'ML Engineer · AI Researcher · NCSU · Building agentic LLM pipelines, edge ML systems, and production AI tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full"
    >
      <body className="h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
