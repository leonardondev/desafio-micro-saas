import { mpClient } from '@/lib/mercado-pago'
import { Preference } from 'mercadopago'

export async function POST(request: Request) {
  const { planId, userEmail } = await request.json()

  try {
    const preference = new Preference(mpClient)

    const createPreferences = await preference.create({
      body: {
        external_reference: planId, // Isso impacta na pontuação do Mercado Pago
        metadata: {
          planId, // Essa variável é convertida para snake_case
          userEmail,
        },
        ...(userEmail && { payer: { email: userEmail } }), // também pontuação do Mercado Pago
        items: [
          {
            id: '',
            title: '',
            description: '',
            quantity: 1,
            unit_price: 1,
            currency_id: 'BRL',
            category_id: 'service',
          },
        ],
        payment_methods: {
          installments: 12,
          // excluded_payment_methods: [{ id: 'bolbradesco' }, { id: 'pec' }],
          // excluded_payment_types: [{ id: 'debit_card' }, { id: 'credit_card' }],
        },
        auto_return: 'approved',
        back_urls: {
          success: `${request.headers.get('origin')}/api/mercado-pago/pending`,
          failure: `${request.headers.get('origin')}/api/mercado-pago/pending`,
          pending: `${request.headers.get('origin')}/api/mercado-pago/pending`,
        },
      },
    })

    if (!createPreferences) {
      return Response.json({ error: 'Create checkout error.' }, { status: 500 })
    }

    return Response.json(
      {
        preferenceId: createPreferences.id,
        initPoint: createPreferences.init_point,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
