import 'server-only'

import { db } from '@/lib/firebase'
import type Stripe from 'stripe'

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  console.log('Cancelou a assinatura. Remover acesso.\n')

  const customerId = event.data.object.customer

  const usersCollection = await db
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .get()

  if (usersCollection.empty) {
    console.log('User not found')
    return
  }

  const userId = usersCollection.docs[0].id

  await db.collection('users').doc(userId).update({
    subscriptionStatus: 'inactive',
  })
}
