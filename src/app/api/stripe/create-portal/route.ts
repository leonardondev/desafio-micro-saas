import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      return Response.json({ error: 'User not found.' }, { status: 404 })
    }
    const user = userDoc.data()

    if (!user?.stripeCustomerId) {
      return Response.json({ error: 'Customer not found.' }, { status: 404 })
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${request.headers.get('origin')}/dashboard`,
    })

    return Response.json({ url: portalSession.url }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
