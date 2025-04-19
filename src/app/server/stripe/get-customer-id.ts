import 'server-only'

import { db } from '@/app/lib/firebase'
import { stripe } from '@/app/lib/stripe'

type data = {
  userId: string
  userEmail: string
}

export async function getOrCreateCustomer({ userId, userEmail }: data) {
  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      throw new Error('User not found')
    }
    const user = userDoc.data()

    /* Usuário já cadastrado */
    if (user?.stripeCustomerId) {
      return {
        stripeCustomerId: user.stripeCustomerId,
      }
    }

    /* Cadastrar o usuário no Stripe */
    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      ...(user?.name && { name: user.name }),
      metadata: {
        userId,
      },
    })

    /* Guardara cópia no banco de dados */
    await userRef.update({
      stripeCustomerId: stripeCustomer.id,
    })

    return {
      stripeCustomerId: stripeCustomer.id,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to get or create customer.')
  }
}
