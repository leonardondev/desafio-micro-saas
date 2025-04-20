import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Micro SaaS',
  description: 'Landing Page',
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Landing Page</h1>

      <div className="flex gap-4">
        <Link href="/dashboard" className="border px-2 rounded">
          Acessar Dashboard
        </Link>
        <Link href="/login" className="border px-2 rounded">
          Fazer Login
        </Link>
      </div>
    </div>
  )
}
