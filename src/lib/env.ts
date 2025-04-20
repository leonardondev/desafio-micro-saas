import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('production'),
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string().email(),
    FIREBASE_PRIVATE_KEY_BASE64: z
      .string()
      .transform(value => Buffer.from(value, 'base64')),
    FIREBASE_STORAGE_BUCKET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_PRODUCT_PRICE_ID: z.string(),
    STRIPE_SUBSCRIPTION_PRICE_ID: z.string(),
    MP_ACCESS_TOKEN: z.string(),
    MP_WEBHOOK_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUB_KEY: z.string(),
    NEXT_PUBLIC_MP_PUBLIC_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY_BASE64: process.env.FIREBASE_PRIVATE_KEY_BASE64,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRODUCT_PRICE_ID: process.env.STRIPE_PRODUCT_PRICE_ID,
    STRIPE_SUBSCRIPTION_PRICE_ID: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
    MP_WEBHOOK_SECRET: process.env.MP_WEBHOOK_SECRET,

    NEXT_PUBLIC_STRIPE_PUB_KEY: process.env.NEXT_PUBLIC_STRIPE_PUB_KEY,
    NEXT_PUBLIC_MP_PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
  },
})
