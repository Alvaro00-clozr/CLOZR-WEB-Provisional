import { Resend } from 'resend'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type ContactPayload = {
  name: string
  email: string
  company?: string
  revenue?: string
  message: string
}

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => {
    json: (payload: unknown) => void
  }
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

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
  }
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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const payload = normalizePayload(body)

    if (!payload) {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    const resend = new Resend(apiKey)

    const subject = `[CLOZR] New contact request from ${payload.name}`
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
        <h2>New contact request</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Company:</strong> ${payload.company || 'N/A'}</p>
        <p><strong>Monthly Revenue:</strong> ${payload.revenue || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('Contact email error:', error)
    return res.status(500).json({ error: message })
  }
}
