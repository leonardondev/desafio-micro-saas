import Plans from '@/components/plans'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Payments() {
  const session = await auth()

  // console.log({ session })

  if (!session) {
    redirect('/login')
  }
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <Link href="/dashboard" className="border px-2 rounded">
        Acessar Dashboard
      </Link>
      <h1 className="text-3xl font-bold">Pagamentos</h1>

      <Suspense>{session && <Plans email={session.user?.email} />}</Suspense>
    </div>
  )
}
