import 'server-only'

import { db } from '@/lib/firebase'
import type Stripe from 'stripe'

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === 'paid') {
    console.log('Enviar e-mail e liberar acesso.\n')

    const userId = event.data.object.metadata?.userId

    if (!userId) {
      console.log('user ID not found.')
      return
    }

    await db.collection('users').doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: 'active',
    })
  }
}
