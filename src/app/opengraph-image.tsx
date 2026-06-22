import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '1,200+ Validated SaaS Ideas for Founders — SaaSIdea Pro'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #131320 55%, #1a1530 100%)',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: '#a78bfa',
            marginBottom: 28,
          }}
        >
          SaaSIdea Pro
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          1,200+ Validated SaaS Ideas for Founders
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#b4b4c8',
            marginTop: 32,
            maxWidth: 940,
            lineHeight: 1.3,
          }}
        >
          Pain-driven ideas across 100+ niches — MRR potential, build time, competition &amp; keyword research.
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 44,
            fontSize: 26,
            color: '#8b8ba7',
          }}
        >
          One-time payment · Lifetime access · saasidea.pro
        </div>
      </div>
    ),
    { ...size }
  )
}
