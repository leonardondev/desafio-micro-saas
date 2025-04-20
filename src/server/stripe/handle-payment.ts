import 'server-only'

import { env } from '@/lib/env'
import { db } from '@/lib/firebase'
import { resend } from '@/lib/resend'
import type Stripe from 'stripe'

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === 'paid') {
    console.log('Enviar e-mail e liberar acesso.\n')

    const userId = event.data.object.metadata?.userId
    const userEmail =
      event.data.object.customer_email ||
      event.data.object.customer_details?.email

    if (!userId || !userEmail) {
      console.log('user ID or e-mail not found.')
      return
    }

    await db.collection('users').doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: 'active',
    })

    const { data, error } = await resend.emails.send({
      from: `Leonardo do Nascimento <me@${env.RESEND_DOMAIN}`,
      to: [userEmail],
      subject: 'Pagamento SaaS',
      text: 'Pagamento realizado com sucesso',
    })

    if (error) {
      console.error(error)
    }

    console.log(data)
  }
}
