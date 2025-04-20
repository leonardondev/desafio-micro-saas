import { SignInButton } from '@/components/sign-in'
import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Auth Page',
}

export default async function Login() {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>

      <SignInButton />
    </div>
  )
}
