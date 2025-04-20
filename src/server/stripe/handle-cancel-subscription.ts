import 'server-only'

import { env } from '@/lib/env'
import { db } from '@/lib/firebase'
import { resend } from '@/lib/resend'
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
  const userEmail = usersCollection.docs[0].data().email

  await db.collection('users').doc(userId).update({
    subscriptionStatus: 'inactive',
  })

  const { data, error } = await resend.emails.send({
    from: `Leonardo do Nascimento <me@${env.RESEND_DOMAIN}>`,
    to: [userEmail],
    subject: 'Pagamento SaaS',
    text: 'Pagamento realizado com sucesso',
  })

  if (error) {
    console.error(error)
  }

  console.log(data)
}
