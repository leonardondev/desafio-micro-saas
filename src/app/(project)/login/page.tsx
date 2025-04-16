import { SignInButton } from '@/app/components/sign-in'

export default function Login() {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>

      <SignInButton />
    </div>
  )
}
