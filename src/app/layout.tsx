import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import type { ReactNode } from 'react'

const interSans = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Micro SaaS',
  description: 'Código do desafio de Micro SaaS',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${interSans.variable}`}>
      <body className="flex flex-col min-h-svh bg-zinc-50 text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  )
}
