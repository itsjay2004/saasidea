import crypto from 'crypto'

export function getCheckoutUrl(email: string, userId: string): string {
  const productId = process.env.NEXT_PUBLIC_DODO_PRODUCT_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  return `https://checkout.dodopayments.com/buy/${productId}?quantity=1&email=${encodeURIComponent(email)}&metadata[user_id]=${userId}&redirect_url=${encodeURIComponent(`${appUrl}/dashboard?payment=success`)}`
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  )
}
