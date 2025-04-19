import { env } from '@/lib/env'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const { planId, userEmail } = await request.json()

  const priceId = env.STRIPE_PRODUCT_PRICE_ID

  if (!priceId) {
    return Response.json({ error: 'Price id not found.' }, { status: 500 })
  }

  const metadata = {
    priceId,
    planId,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'boleto'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/`,
      ...(userEmail && { customer_email: userEmail }),
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
