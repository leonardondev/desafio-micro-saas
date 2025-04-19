'use client'

import { useStripe } from '@/app/hooks/useStripe'

export default function Payments() {
  const {
    createStripePaymentCheckout,
    createSubscriptionCheckout,
    handleCreateStripePortal,
  } = useStripe()

  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Pagamentos</h1>
      <div className="flex gap-4">
        <button
          className="py-2 px-4 border rounded-md"
          type="button"
          onClick={() => createStripePaymentCheckout({ planId: 'on-off-01' })}
        >
          Criar pagamento Stripe
        </button>
        <button
          className="py-2 px-4 border rounded-md"
          type="button"
          onClick={() => createSubscriptionCheckout({ planId: 'recurring-01' })}
        >
          Criar assinatura Stripe
        </button>
        <button
          className="py-2 px-4 border rounded-md"
          type="button"
          onClick={() => handleCreateStripePortal()}
        >
          Criar portal de Pagamentos
        </button>
      </div>
    </div>
  )
}
