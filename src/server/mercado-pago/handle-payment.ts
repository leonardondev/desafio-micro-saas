import 'server-only'

import type { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes'
// import { db } from '@/lib/firebase'

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  // await db.collection('users').doc(userId).update({
  //   stripeSubscriptionId: event.data.object.subscription,
  //   subscriptionStatus: 'active',
  // })

  const metadata = paymentData.metadata

  // const userEmail = metadata.user_email
  // const planId = metadata.plan_id
  console.log({ metadata })
  console.log('PAGAMENTO COM SUCESSO', paymentData)
}
