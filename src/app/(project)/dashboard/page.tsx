import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { handleAuth } from '@/app/actions/handle-auth'
import { auth } from '@/app/lib/auth'

export default async function Dashboard() {
  const session = await auth()

  console.log({ session })

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form
        action={handleAuth}
        className="m-2 w-fit flex border-[1.5px] rounded-sm"
      >
        <button
          type="submit"
          className="flex items-center font-semibold py-1 px-4 text-sm cursor-pointer"
        >
          Sair
        </button>
      </form>

      <Link
        href="/payments"
        className="py-3 px-5 bg-green-500 rounded-lg text-green-50 hover:bg-green-600 transition"
      >
        Ir para Pagamentos
      </Link>

      {session.user?.image && (
        <div className="flex items-center">
          <div className="flex items-center justify-center aspect-square size-10 p-1">
            <Image
              width={96}
              height={96}
              src={session.user.image}
              alt="User avatar"
            />
          </div>
          <p className="text-sm text-gray-500">
            {session.user.name} - {session.user.email}
          </p>
        </div>
      )}
    </div>
  )
}
