import { handleAuth } from '@/app/actions/handle-auth'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'

interface Session {
  user: {
    name: string
    email: string
    image: string
  }
  expires: string
}

export default async function Dashboard() {
  const session = await auth()

  console.log({ session })

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
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

      {session.user?.image && (
        <div className="flex items-center">
          <div className="flex items-center justify-center aspect-square size-10 p-1">
            <img src={session.user.image} alt="G" />
          </div>
          <p className="text-sm text-gray-500">
            {session.user.name} - {session.user.email}
          </p>
        </div>
      )}
    </div>
  )
}
