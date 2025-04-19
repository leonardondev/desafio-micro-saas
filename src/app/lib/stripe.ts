import { env } from '@/app/lib/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
})
