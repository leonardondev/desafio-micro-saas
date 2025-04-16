import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Landing Page</h1>

      <Link href="/login" className="border px-2 rounded">
        Fazer Login
      </Link>
    </div>
  )
}
