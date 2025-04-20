import { mpClient, validateMercadoPagoWebHook } from '@/lib/mercado-pago'
import { handleMercadoPagoPayment } from '@/server/mercado-pago/handle-payment'
import { Payment } from 'mercadopago'

export async function POST(request: Request) {
  try {
    validateMercadoPagoWebHook(request)

    const { type, data } = await request.json()

    switch (type) {
      case 'payment':
        {
          const payment = new Payment(mpClient)
          const paymentData = await payment.get({ id: data.id })
          if (
            paymentData.status === 'approved' || // Cartão
            paymentData.date_approved !== null // PIX
          ) {
            await handleMercadoPagoPayment(paymentData)
          }
        }
        break
      case 'subscription_preapproval': // Eventos de assinatura
        break

      default:
        console.info('Ignored event\n')
    }

    return Response.json({ message: 'Webhook received' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
