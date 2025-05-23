import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagamento Finalizado',
  description: 'Success Feedback Page',
}

export default function Success() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <h1 className="text-3xl font-bold">Pagamento finalizado!</h1>
    </div>
  )
}
