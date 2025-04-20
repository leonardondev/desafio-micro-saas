'use client'

import { useMercadoPago } from '@/hooks/useMercadoPago'
import { useStripe } from '@/hooks/useStripe'

interface PlansProps {
  email?: string | null
}

export default function Plans({ email }: PlansProps) {
  const {
    createStripePaymentCheckout,
    createSubscriptionCheckout,
    handleCreateStripePortal,
  } = useStripe()
  const { createMercadoPagoCheckout } = useMercadoPago()
  return (
    <>
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

      <div className="flex gap-4">
        {email && (
          <button
            className="py-2 px-4 border rounded-md"
            type="button"
            onClick={() =>
              createMercadoPagoCheckout({
                planId: 'on-off-02',
                userEmail: email,
              })
            }
          >
            Criar pagamento Mercado Pago
          </button>
        )}
      </div>
    </>
  )
}
