import { mpClient } from '@/lib/mercado-pago'
import { Payment } from 'mercadopago'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('payment_id')
  const planId = searchParams.get('external_reference')

  if (!paymentId || !planId) {
    return Response.json(
      { error: 'Payment ID or plan ID not found.' },
      { status: 400 }
    )
  }

  try {
    const payment = new Payment(mpClient)

    const paymentData = await payment.get({
      id: paymentId,
    })

    if (
      paymentData.status === 'approved' || // Cartão
      paymentData.date_approved !== null // PIX
    ) {
      console.log(request.url)
      return Response.redirect(new URL('/success', request.url))
    }

    return Response.redirect(new URL('/', request.url))
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
