import { handleAuth } from '@/app/actions/handle-auth'

export function SignInButton() {
  return (
    <form
      action={handleAuth}
      className="m-2 w-fit flex border-[1.5px] border-blue-400 rounded-sm"
    >
      <div className="flex items-center justify-center aspect-square size-10 p-1">
        <img
          src="https://avatars.githubusercontent.com/u/1342004?s=200&v=4"
          alt="G"
        />
      </div>
      <button
        type="submit"
        className="h-10 flex items-center bg-blue-400 text-white font-semibold p-2 text-sm cursor-pointer"
      >
        Entrar com Google
      </button>
    </form>
  )
}
