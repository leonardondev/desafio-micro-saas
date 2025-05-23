import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { firebaseCredentials } from './firebase'
export type { Session } from '@auth/core/types'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter({
    credential: firebaseCredentials,
  }),
})
