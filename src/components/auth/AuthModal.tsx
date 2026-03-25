'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, ArrowRight, RotateCcw, ChevronLeft, Mail, User, Zap, CheckCircle2, Rocket } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getCheckoutUrl } from '@/lib/dodo'

interface AuthModalProps {
  onClose: () => void
}

const OTP_LENGTH = 6

type Step = 'form' | 'otp' | 'success'
type Mode = 'signup' | 'login'

export default function AuthModal({ onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [mode, setMode] = useState<Mode>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [redirectCountdown, setRedirectCountdown] = useState(3)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const supabase = createClient()

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  useEffect(() => {
    if (step !== 'success') return
    if (redirectCountdown <= 0) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          window.location.href = getCheckoutUrl(user.email!, user.id)
        }
      })
      return
    }
    const t = setTimeout(() => setRedirectCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, redirectCountdown])

  const resetOtp = () => setOtp(Array(OTP_LENGTH).fill(''))

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    if (error) {
      setError(error.message)
    } else {
      setStep('otp')
      setResendTimer(60)
      setTimeout(() => inputRefs.current[0]?.focus(), 120)
    }
    setLoading(false)
  }

  const handleVerifyOtp = useCallback(async (code: string) => {
    if (code.length < OTP_LENGTH) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })
    if (error) {
      setError(error.message)
      resetOtp()
      setTimeout(() => inputRefs.current[0]?.focus(), 50)
      setLoading(false)
      return
    }

    if (mode === 'signup' && name.trim()) {
      await supabase.auth.updateUser({ data: { full_name: name.trim() } })
      setStep('success')
      setRedirectCountdown(3)
      setLoading(false)
    } else {
      onClose()
      window.location.href = '/dashboard'
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, name, mode, supabase, onClose])

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    if (next.every(d => d)) {
      handleVerifyOtp(next.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(''))
      handleVerifyOtp(pasted)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    setError('')
    resetOtp()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    if (error) setError(error.message)
    else setResendTimer(60)
    setLoading(false)
  }

  const stepIndex = step === 'form' ? 0 : step === 'otp' ? 1 : 2

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4"
      onClick={step === 'success' ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-[400px] animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -inset-8 rounded-3xl bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative bg-surface border border-border rounded-[28px] overflow-hidden shadow-card-lg">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="px-7 pt-6 pb-7">

            {step !== 'success' && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-subtle hover:text-text-primary hover:bg-surface-2 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Step indicator */}
            <div className="flex items-center gap-1.5 mb-6">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i <= stepIndex ? 'bg-accent' : 'bg-border'
                  } ${i === stepIndex ? 'w-7' : 'w-2'}`}
                />
              ))}
            </div>

            {/* ─── STEP 1: Email / Name form ─── */}
            {step === 'form' && (
              <div className="animate-fade-in">

                {/* Mode tabs */}
                <div className="flex bg-surface-2 rounded-full p-0.5 mb-6 border border-border/60">
                  {(['signup', 'login'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setError('') }}
                      className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                        mode === m
                          ? 'bg-surface text-text-primary shadow-card'
                          : 'text-text-subtle hover:text-text-muted'
                      }`}
                    >
                      {m === 'signup' ? 'Create account' : 'Sign in'}
                    </button>
                  ))}
                </div>

                <div className="w-11 h-11 rounded-2xl bg-accent-subtle border border-accent/20 flex items-center justify-center mb-5">
                  <Zap className="w-5 h-5 text-accent" fill="currentColor" />
                </div>

                {mode === 'signup' ? (
                  <>
                    <h2 className="text-[1.55rem] font-bold font-heading text-text-primary leading-[1.2] tracking-tight mb-2">
                    Get Instant Access to 1000+ Validated SaaS Ideas
                    </h2>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      Built from real customer complaints &amp; pain points.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[1.55rem] font-bold font-heading text-text-primary leading-[1.2] tracking-tight mb-2">
                      Welcome back
                    </h2>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      Sign in to access your ideas and dashboard.
                    </p>
                  </>
                )}

                <form onSubmit={handleSendOtp} className="space-y-3">
                  {mode === 'signup' && (
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-button text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoFocus={mode === 'login'}
                      className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-border rounded-button text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
                    />
                  </div>

                  {error && <ErrorBanner message={error} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-button transition-all shadow-accent disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <><Spinner /> Sending code…</>
                    ) : (
                      <>
                        {mode === 'signup' ? 'Send verification code' : 'Send sign-in code'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-[11px] text-text-subtle mt-5 leading-relaxed">
                  By continuing you agree to our{' '}
                  <span className="text-text-muted hover:text-accent cursor-pointer transition-colors underline underline-offset-2 decoration-dashed">
                    Terms
                  </span>
                  {' '}and{' '}
                  <span className="text-text-muted hover:text-accent cursor-pointer transition-colors underline underline-offset-2 decoration-dashed">
                    Privacy Policy
                  </span>
                </p>
              </div>
            )}

            {/* ─── STEP 2: OTP verification ─── */}
            {step === 'otp' && (
              <div className="animate-fade-in">

                <button
                  onClick={() => { setStep('form'); setError(''); resetOtp() }}
                  className="flex items-center gap-0.5 text-xs text-text-subtle hover:text-text-muted mb-5 transition-colors group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>

                <div className="w-11 h-11 rounded-2xl bg-accent-subtle border border-accent/20 flex items-center justify-center mb-5">
                  <Mail className="w-5 h-5 text-accent" />
                </div>

                <h2 className="text-[1.55rem] font-bold font-heading text-text-primary leading-[1.2] tracking-tight mb-2">
                  Enter your code
                </h2>
                <p className="text-sm text-text-muted leading-relaxed mb-1">
                  We sent a 6-digit verification code to
                </p>
                <p className="text-sm font-semibold text-text-primary mb-6 truncate">{email}</p>

                <div className="flex gap-2.5 mb-2" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { inputRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleDigitChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      disabled={loading}
                      className={[
                        'w-full aspect-square text-center text-2xl font-bold',
                        'border rounded-2xl',
                        'focus:outline-none focus:ring-2 focus:ring-accent/50',
                        'transition-all duration-150 disabled:opacity-40',
                        digit
                          ? 'border-accent/50 bg-accent-subtle text-accent'
                          : 'border-border bg-surface-2 text-text-primary',
                      ].join(' ')}
                    />
                  ))}
                </div>

                <p className="text-[11px] text-text-subtle mb-4">
                  Tip: You can paste the full code from your email.
                </p>

                {error && <ErrorBanner message={error} />}

                <button
                  onClick={() => handleVerifyOtp(otp.join(''))}
                  disabled={loading || otp.some(d => !d)}
                  className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-button transition-all shadow-accent disabled:opacity-50 disabled:cursor-not-allowed mt-1 mb-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner /> Verifying…
                    </span>
                  ) : mode === 'signup' ? 'Verify & create account' : 'Verify & sign in'}
                </button>

                <div className="flex items-center justify-center text-xs">
                  {resendTimer > 0 ? (
                    <span className="text-text-subtle">
                      Didn&apos;t get it? Resend in{' '}
                      <span className="text-text-muted font-semibold tabular-nums">{resendTimer}s</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={loading}
                      className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors font-medium"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Send a new code
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ─── STEP 3: Success (signup only) ─── */}
            {step === 'success' && (
              <div className="animate-fade-in text-center py-2">

                <div className="relative mx-auto w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full bg-success/20 animate-[ping_1.5s_ease-in-out]" />
                  <div className="relative w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                </div>

                <h2 className="text-[1.55rem] font-bold font-heading text-text-primary leading-[1.2] tracking-tight mb-2">
                  You&apos;re all set{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}!
                </h2>
                <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-[280px] mx-auto">
                  Your account is ready. Taking you to checkout to unlock 1,200+ validated SaaS ideas.
                </p>

                <div className="flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-2 border border-border rounded-2xl mb-6">
                  <Rocket className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-text-primary font-medium">
                    Redirecting in{' '}
                    <span className="text-accent font-bold tabular-nums">{redirectCountdown}s</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    supabase.auth.getUser().then(({ data: { user } }) => {
                      if (user) window.location.href = getCheckoutUrl(user.email!, user.id)
                    })
                  }}
                  className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-button transition-all shadow-accent group"
                >
                  Go to checkout now
                  <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 text-xs text-danger bg-danger/10 border border-danger/20 rounded-xl px-3 py-2.5">
      <span className="mt-px shrink-0">⚠</span>
      <span>{message}</span>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
    </svg>
  )
}
