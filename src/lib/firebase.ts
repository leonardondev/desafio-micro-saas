import 'server-only'

import { env } from '@/lib/env'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const firebaseCredentials = cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY_BASE64.toString('utf-8'),
})

if (!getApps().length) {
  initializeApp({
    credential: firebaseCredentials,
    // storageBucket: env.FIREBASE_STORAGE_BUCKET,
  })
}

export const db = getFirestore()
// export const storage = getStorage().bucket
