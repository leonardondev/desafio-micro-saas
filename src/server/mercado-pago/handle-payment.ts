import 'server-only'

import { env } from '@/lib/env'
import { resend } from '@/lib/resend'
import type { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes'
// import { db } from '@/lib/firebase'

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  // await db.collection('users').doc(userId).update({
  //   stripeSubscriptionId: event.data.object.subscription,
  //   subscriptionStatus: 'active',
  // })

  const metadata = paymentData.metadata
  const userEmail = metadata.user_email
  // const planId = metadata.plan_id

  console.log({ metadata })
  console.log('PAGAMENTO COM SUCESSO', paymentData)

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
