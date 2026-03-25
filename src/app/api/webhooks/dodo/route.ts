import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

function verifyStandardWebhook(
  body: string,
  headers: { id: string; signature: string; timestamp: string },
  secret: string
): boolean {
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const signedContent = `${headers.id}.${headers.timestamp}.${body}`
  const computed = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64')

  const expectedSig = `v1,${computed}`

  const parts = headers.signature.split(' ')
  return parts.some(sig => {
    try {
      return sig.length === expectedSig.length &&
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))
    } catch {
      return false
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.text()

    const webhookId = request.headers.get('webhook-id') || ''
    const webhookSignature = request.headers.get('webhook-signature') || ''
    const webhookTimestamp = request.headers.get('webhook-timestamp') || ''

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json({ error: 'Missing webhook headers' }, { status: 401 })
    }

    const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET!
    const isValid = verifyStandardWebhook(body, {
      id: webhookId,
      signature: webhookSignature,
      timestamp: webhookTimestamp,
    }, secret)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.type === 'payment.succeeded') {
      const data = event.data || {}
      const metadata = data.metadata || {}
      const userId = metadata.user_id

      if (!userId) {
        console.error('No user_id in webhook metadata')
        return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
      }

      const email = data.customer?.email || ''
      const orderId = data.payment_id || ''
      const amount = data.total_amount || 4900
      const currency = data.currency || 'USD'

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
