import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { stripe } from '@/lib/stripe'
import { getOrCreateCustomer } from '@/server/stripe/get-customer-id'

export async function POST(request: Request) {
  const { planId } = await request.json()

  const priceId = env.STRIPE_SUBSCRIPTION_PRICE_ID

  if (!priceId) {
    return Response.json(
      { error: 'Subscription id not found.' },
      { status: 500 }
    )
  }

  // Precisamos criar um cliente na STRIPE para ter referência dele quando for criar o portal
  const session = await auth()
  const userId = session?.user?.id
  const userEmail = session?.user?.email

  if (!userId || !userEmail) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { stripeCustomerId } = await getOrCreateCustomer({ userId, userEmail })

  const metadata = {
    priceId,
    planId,
    userId,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      metadata,
    })

    if (!session.url) {
      return Response.json({ error: 'Session URL not found.' }, { status: 500 })
    }

    return Response.json({ sessionId: session.id }, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
