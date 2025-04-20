import { env } from '@/lib/env'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type CheckoutData = {
  planId: string
  userEmail?: string | null
}

export function useMercadoPago() {
  const router = useRouter()

  useEffect(() => {
    initMercadoPago(env.NEXT_PUBLIC_MP_PUBLIC_KEY)
  }, [])

  async function createMercadoPagoCheckout({
    planId,
    userEmail,
  }: CheckoutData) {
    try {
      const response = await fetch('/api/mercado-pago/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userEmail }),
      })

      const { initPoint /*, preferenceId */ } = await response.json()

      router.push(initPoint)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    createMercadoPagoCheckout,
  }
}
