import { type Stripe, loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { env } from '../lib/env'

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function executeLoadStripe() {
      const stripeInstance = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUB_KEY)

      setStripe(stripeInstance)
    }

    executeLoadStripe()
  }, [])

  async function createStripePaymentCheckout(checkoutData: unknown) {
    if (!stripe) {
      return
    }

    try {
      const response = await fetch('/api/stripe/create-payment-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      })

      const { sessionId } = await response.json()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  async function createSubscriptionCheckout(checkoutData: unknown) {
    if (!stripe) {
      return
    }

    try {
      const response = await fetch('/api/stripe/create-subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      })

      const { sessionId } = await response.json()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal() {
    const response = await fetch('/api/stripe/create-portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const { url } = await response.json()

    window.location.href = url
  }

  return {
    createStripePaymentCheckout,
    createSubscriptionCheckout,
    handleCreateStripePortal,
  }
}
