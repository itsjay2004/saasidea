import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-dodo-signature') || ''
    const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET!

    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(body)
    const expectedSignature = hmac.digest('hex')

    const isValid = signature.length === expectedSignature.length &&
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.type === 'payment.succeeded' || event.event_type === 'payment.succeeded') {
      const metadata = event.data?.metadata || event.metadata || {}
      const userId = metadata.user_id
      const email = event.data?.customer?.email || metadata.email || ''
      const orderId = event.data?.payment_id || event.payment_id || event.data?.id || ''
      const amount = event.data?.amount || event.amount || 4900
      const currency = event.data?.currency || event.currency || 'USD'

      if (!userId) {
        console.error('No user_id in webhook metadata')
        return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
      )

      const { error } = await supabase
        .from('purchases')
        .upsert(
          {
            user_id: userId,
            email,
            dodo_order_id: orderId,
            amount,
            currency,
            status: 'active',
          },
          { onConflict: 'dodo_order_id' }
        )

      if (error) {
        console.error('Error inserting purchase:', error)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
