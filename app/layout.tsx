import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'History Timeline Game',
  description: 'A project designed to organize events from WW1 to Post-WW2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
