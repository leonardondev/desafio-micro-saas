import 'server-only'

import { db } from '@/lib/firebase'
import type Stripe from 'stripe'

export async function handleStripeUpdateSubscription(
  event: Stripe.CustomerSubscriptionUpdatedEvent
) {
  console.log('Modificou a assinatura.\n')

  const customerId = event.data.object.customer

  // console.log({ event: event.data.object })

  const usersCollection = await db
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .get()

  if (usersCollection.empty) {
    console.log('User not found')
    return
  }

  const userId = usersCollection.docs[0].id

  await db
    .collection('users')
    .doc(userId)
    .update({
      stripeSubscriptionId: event.data.object.id,
      subscriptionStatus: event.data.object.canceled_at ? 'inactive' : 'active',
    })
}
