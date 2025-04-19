import { env } from '@/lib/env'
import { stripe } from '@/lib/stripe'
import { handleStripeCancelSubscription } from '@/server/stripe/handle-cancel-subscription'
import { handleStripePayment } from '@/server/stripe/handle-payment'
import { handleStripeSubscription } from '@/server/stripe/handle-subscription'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headerContent = await headers()
    const secret = env.STRIPE_WEBHOOK_SECRET

    const signature = headerContent.get('stripe-signature')

    if (!signature) {
      return Response.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    switch (event.type) {
      case 'checkout.session.completed': // Pagamento realizado se status = paid
        {
          const metadata = event.data.object.metadata
          if (metadata?.priceId === env.STRIPE_PRODUCT_PRICE_ID) {
            await handleStripePayment(event)
          }
          if (metadata?.priceId === env.STRIPE_SUBSCRIPTION_PRICE_ID) {
            await handleStripeSubscription(event)
          }
        }
        break
      case 'checkout.session.expired': // Expirou tempo de pagamento
        {
          console.log('Enviar e-mail avisando que o pagamento expirou.\n')
        }
        break
      case 'checkout.session.async_payment_succeeded': // Boleto pago
        {
          console.log('Enviar e-mail avisando que o pagamento foi realizado.\n')
        }
        break
      case 'checkout.session.async_payment_failed': // Boleto falhou
        {
          console.log('Enviar e-mail avisando que o pagamento falhou.\n')
        }
        break
      case 'customer.subscription.created': // Criou assinatura
        {
          console.log('Mensagem de boas vindas porque acabou de assinar.\n')
        }
        break
      case 'customer.subscription.deleted': // Cancelou assinatura
        {
          await handleStripeCancelSubscription(event)
        }
        break
      default:
        console.info(`Ignored: ${event.type}\n`)
    }

    return Response.json({ message: 'Webhook received' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
