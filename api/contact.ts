import { Resend } from 'resend'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type ContactPayload = {
  name: string
  email: string
  company?: string
  revenue?: string
  message: string
  website?: string
  startedAt?: string
}

type ApiRequest = {
  method?: string
  body?: unknown
  headers?: Record<string, string | string[] | undefined>
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => {
    json: (payload: unknown) => void
  }
}

const FORM_LIMITS = {
  nameMax: 80,
  emailMax: 160,
  companyMax: 120,
  messageMin: 10,
  messageMax: 1200,
} as const

const ANTISPAM_LIMITS = {
  minSubmitDelayMs: 2500,
  maxFormLifetimeMs: 1000 * 60 * 60 * 6,
  rateLimitWindowMs: 1000 * 60 * 10,
  maxSubmissionsPerWindow: 5,
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type RateLimitEntry = {
  windowStartedAt: number
  count: number
}

const rateLimitStore = globalThis as typeof globalThis & {
  __clozrContactRateLimit?: Map<string, RateLimitEntry>
}
const contactRateLimit =
  rateLimitStore.__clozrContactRateLimit ??
  (rateLimitStore.__clozrContactRateLimit = new Map<string, RateLimitEntry>())

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const readEnvFromLocalFile = (key: string): string => {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    if (!existsSync(envPath)) return ''

    const lines = readFileSync(envPath, 'utf-8').split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex < 0) continue

      const envKey = trimmed.slice(0, separatorIndex).trim()
      let envValue = trimmed.slice(separatorIndex + 1).trim()

      if (
        (envValue.startsWith('"') && envValue.endsWith('"')) ||
        (envValue.startsWith("'") && envValue.endsWith("'"))
      ) {
        envValue = envValue.slice(1, -1)
      }

      if (envKey === key) {
        return envValue
      }
    }
  } catch (error) {
    console.error('Failed to read .env.local:', error)
  }

  return ''
}

const normalizePayload = (payload: unknown): ContactPayload | null => {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const source = payload as Record<string, unknown>

  if (
    !isNonEmptyString(source.name) ||
    !isNonEmptyString(source.email) ||
    !isNonEmptyString(source.message)
  ) {
    return null
  }

  return {
    name: source.name.trim(),
    email: source.email.trim(),
    company: isNonEmptyString(source.company) ? source.company.trim() : '',
    revenue: isNonEmptyString(source.revenue) ? source.revenue.trim() : '',
    message: source.message.trim(),
    website: typeof source.website === 'string' ? source.website.trim() : '',
    startedAt: typeof source.startedAt === 'string' ? source.startedAt.trim() : '',
  }
}

const validatePayload = (payload: ContactPayload): string => {
  if (!payload.name) return 'Please enter your full name.'
  if (payload.name.length > FORM_LIMITS.nameMax) {
    return 'Full name must be 80 characters or fewer.'
  }
  if (!payload.email) return 'Please enter your work email.'
  if (payload.email.length > FORM_LIMITS.emailMax) {
    return 'Email must be 160 characters or fewer.'
  }
  if (!EMAIL_PATTERN.test(payload.email)) {
    return 'Please enter a valid email address.'
  }
  if ((payload.company || '').length > FORM_LIMITS.companyMax) {
    return 'Company name must be 120 characters or fewer.'
  }
  if (!payload.message) return 'Please tell us how we can help.'
  if (payload.message.length < FORM_LIMITS.messageMin) {
    return 'Message must be at least 10 characters.'
  }
  if (payload.message.length > FORM_LIMITS.messageMax) {
    return 'Message must be 1200 characters or fewer.'
  }

  return ''
}

const getHeaderValue = (
  headers: ApiRequest['headers'],
  name: string,
): string => {
  if (!headers) return ''

  const value = headers[name] ?? headers[name.toLowerCase()]
  if (Array.isArray(value)) {
    return value[0]?.trim() || ''
  }
  return typeof value === 'string' ? value.trim() : ''
}

const getClientIp = (req: ApiRequest): string => {
  const forwardedFor = getHeaderValue(req.headers, 'x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp) return firstIp
  }

  const realIp = getHeaderValue(req.headers, 'x-real-ip')
  if (realIp) return realIp

  const cloudflareIp = getHeaderValue(req.headers, 'cf-connecting-ip')
  if (cloudflareIp) return cloudflareIp

  return 'unknown'
}

const isRateLimited = (ip: string, now: number): boolean => {
  const existing = contactRateLimit.get(ip)
  if (!existing) {
    contactRateLimit.set(ip, { windowStartedAt: now, count: 1 })
    return false
  }

  if (now - existing.windowStartedAt > ANTISPAM_LIMITS.rateLimitWindowMs) {
    contactRateLimit.set(ip, { windowStartedAt: now, count: 1 })
    return false
  }

  if (existing.count >= ANTISPAM_LIMITS.maxSubmissionsPerWindow) {
    return true
  }

  existing.count += 1
  contactRateLimit.set(ip, existing)
  return false
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY || readEnvFromLocalFile('RESEND_API_KEY')
  const toEmails = (process.env.CONTACT_TO_EMAIL || readEnvFromLocalFile('CONTACT_TO_EMAIL'))
    .split(',')
    .map((email) => email.trim())
    .filter((email) => email.length > 0)

  if (!apiKey || toEmails.length === 0) {
    const missing = [
      !apiKey ? 'RESEND_API_KEY' : null,
      toEmails.length === 0 ? 'CONTACT_TO_EMAIL' : null,
    ]
      .filter(Boolean)
      .join(', ')

    return res
      .status(500)
      .json({ error: `Missing email service configuration: ${missing}` })
  }

  try {
    const now = Date.now()
    const clientIp = getClientIp(req)
    if (isRateLimited(clientIp, now)) {
      res.setHeader(
        'Retry-After',
        String(Math.ceil(ANTISPAM_LIMITS.rateLimitWindowMs / 1000)),
      )
      return res.status(429).json({
        error: 'Too many requests. Please wait a few minutes and try again.',
      })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const payload = normalizePayload(body)

    if (!payload) {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    if (payload.website) {
      return res.status(200).json({ ok: true })
    }

    if (!payload.startedAt) {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    const startedAt = Number(payload.startedAt)
    if (!Number.isFinite(startedAt)) {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    const submitDuration = now - startedAt
    if (submitDuration < ANTISPAM_LIMITS.minSubmitDelayMs) {
      return res
        .status(429)
        .json({ error: 'Please wait a few seconds before sending the form.' })
    }

    if (submitDuration > ANTISPAM_LIMITS.maxFormLifetimeMs) {
      return res.status(400).json({
        error: 'This form expired. Please refresh the page and submit again.',
      })
    }

    const validationMessage = validatePayload(payload)
    if (validationMessage) {
      return res.status(400).json({ error: validationMessage })
    }

    const resend = new Resend(apiKey)

    const subject = `[CLOZR] New contact request from ${payload.name}`
    const safeName = escapeHtml(payload.name)
    const safeEmail = escapeHtml(payload.email)
    const safeCompany = escapeHtml(payload.company || 'N/A')
    const safeRevenue = escapeHtml(payload.revenue || 'N/A')
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br/>')
    const details = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || 'N/A'}`,
      `Monthly Revenue: ${payload.revenue || 'N/A'}`,
      '',
      'Message:',
      payload.message,
    ].join('\n')

    await resend.emails.send({
      from: 'CLOZR <onboarding@resend.dev>',
      to: toEmails,
      replyTo: payload.email,
      subject,
      text: details,
      html: `
        <div style="margin:0;padding:32px 0;background:#06080d;font-family:Satoshi,'Avenir Next','Segoe UI',sans-serif;color:#f6f3ee;">
          <div style="max-width:680px;margin:0 auto;padding:0 20px;">
            <div style="border:1px solid rgba(201,154,91,0.22);border-radius:18px;overflow:hidden;background:linear-gradient(142deg,rgba(8,11,17,0.96) 0%,rgba(14,18,27,0.95) 48%,rgba(17,21,29,0.95) 100%);box-shadow:inset 0 1px 0 rgba(246,232,209,0.16),inset 0 -1px 0 rgba(102,74,45,0.44),0 10px 26px rgba(0,0,0,0.4);">
              <div style="padding:28px 28px 22px;background:
                radial-gradient(90% 75% at 12% 10%, rgba(216,170,99,0.18) 0%, transparent 72%),
                radial-gradient(85% 85% at 88% 14%, rgba(120,165,255,0.16) 0%, transparent 74%);">
                <div style="display:inline-block;padding:7px 12px;border-radius:999px;border:1px solid rgba(216,170,99,0.35);background:rgba(216,170,99,0.08);font-size:12px;letter-spacing:0.18em;color:#d8aa63;">
                  CLOZR CONTACT
                </div>
                <h1 style="margin:18px 0 8px;font-size:30px;line-height:1.08;font-weight:600;color:#f6f3ee;">
                  New inbound lead
                </h1>
                <p style="margin:0;font-size:16px;line-height:1.7;color:#ddd7cc;">
                  A new contact request has been submitted through the CLOZR website.
                </p>
              </div>

              <div style="padding:0 28px 28px;">
                <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:18px;">
                  <div style="padding:16px;border:1px solid rgba(201,154,91,0.16);border-radius:14px;background:rgba(8,11,17,0.72);">
                    <div style="font-size:11px;letter-spacing:0.16em;color:#a69f93;margin-bottom:6px;">NAME</div>
                    <div style="font-size:16px;line-height:1.5;color:#f6f3ee;">${safeName}</div>
                  </div>
                  <div style="padding:16px;border:1px solid rgba(201,154,91,0.16);border-radius:14px;background:rgba(8,11,17,0.72);">
                    <div style="font-size:11px;letter-spacing:0.16em;color:#a69f93;margin-bottom:6px;">EMAIL</div>
                    <div style="font-size:16px;line-height:1.5;color:#f6f3ee;">${safeEmail}</div>
                  </div>
                  <div style="padding:16px;border:1px solid rgba(201,154,91,0.16);border-radius:14px;background:rgba(8,11,17,0.72);">
                    <div style="font-size:11px;letter-spacing:0.16em;color:#a69f93;margin-bottom:6px;">COMPANY</div>
                    <div style="font-size:16px;line-height:1.5;color:#f6f3ee;">${safeCompany}</div>
                  </div>
                  <div style="padding:16px;border:1px solid rgba(201,154,91,0.16);border-radius:14px;background:rgba(8,11,17,0.72);">
                    <div style="font-size:11px;letter-spacing:0.16em;color:#a69f93;margin-bottom:6px;">MONTHLY REVENUE</div>
                    <div style="font-size:16px;line-height:1.5;color:#f6f3ee;">${safeRevenue}</div>
                  </div>
                </div>

                <div style="padding:18px 18px 20px;border:1px solid rgba(201,154,91,0.16);border-radius:16px;background:rgba(8,11,17,0.72);">
                  <div style="font-size:11px;letter-spacing:0.16em;color:#a69f93;margin-bottom:10px;">MESSAGE</div>
                  <div style="font-size:16px;line-height:1.7;color:#ddd7cc;">${safeMessage}</div>
                </div>

                <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(201,154,91,0.12);font-size:13px;line-height:1.6;color:#a69f93;">
                  Reply directly to this email to answer ${safeName}.
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('Contact email error:', error)
    return res.status(500).json({ error: message })
  }
}
