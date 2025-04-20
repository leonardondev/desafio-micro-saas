import { env } from '@/lib/env'
import { MercadoPagoConfig } from 'mercadopago'
import { createHmac } from 'node:crypto'

export const mpClient = new MercadoPagoConfig({
  accessToken: env.MP_ACCESS_TOKEN,
})

export function validateMercadoPagoWebHook(request: Request) {
  const xSignature = request.headers.get('x-signature')
  const xRequestId = request.headers.get('x-request-id')

  if (!xSignature || !xRequestId) {
    return Response.json(
      { error: 'Missing x-signature or x-request-id header' },
      { status: 400 }
    )
  }

  const signatureParts = xSignature.split(',')
  let ts = ''
  let v1 = ''
  for (const part of signatureParts) {
    const [key, value] = part.split('=')
    if (key.trim() === 'ts') {
      ts = value.trim()
    } else if (key.trim() === 'v1') {
      v1 = value.trim()
    }
  }

  if (!ts || !v1) {
    return Response.json(
      { error: 'Invalid x-signature header format' },
      { status: 400 }
    )
  }

  const url = new URL(request.url)
  const dataId = url.searchParams.get('data.id')

  let manifest = ''
  if (dataId) {
    manifest += `id:${xRequestId};`
  }
  if (xRequestId) {
    manifest += `request-id:${xRequestId};`
  }
  manifest += `ts:${ts}`

  const hmac = createHmac('sha256', env.MP_WEBHOOK_SECRET)
  const generateHash = hmac.update(manifest).digest('hex')

  if (generateHash !== v1) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }
}
