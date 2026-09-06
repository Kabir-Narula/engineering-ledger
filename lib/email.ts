import type { ContactInput } from "@/lib/validation";

/**
 * Email provider abstraction.
 *
 * The route handler depends only on the EmailProvider interface. With no
 * credentials configured the app uses MockEmailProvider (logs the message,
 * always succeeds). Set RESEND_API_KEY and CONTACT_TO_EMAIL to switch to
 * the real Resend API without touching any UI or route code.
 */

export interface SendResult {
  ok: boolean;
  provider: string;
  id?: string;
  error?: string;
}

export interface EmailProvider {
  readonly name: string;
  send(message: ContactInput): Promise<SendResult>;
}

class MockEmailProvider implements EmailProvider {
  readonly name = "mock";

  async send(message: ContactInput): Promise<SendResult> {
    // Intentionally visible in server logs so submissions are auditable
    // while no real provider is configured.
    console.info(
      `[contact/mock] ${message.name} <${message.email}> — ${message.message.length} chars`
    );
    return { ok: true, provider: this.name, id: `mock_${Date.now().toString(36)}` };
  }
}

class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";

  constructor(
    private readonly apiKey: string,
    private readonly to: string,
    private readonly from: string
  ) {}

  async send(message: ContactInput): Promise<SendResult> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: this.from,
          to: [this.to],
          reply_to: message.email,
          subject: `Portfolio contact — ${message.name}`,
          text: `From: ${message.name} <${message.email}>\n\n${message.message}`,
        }),
      });

      if (!response.ok) {
        return {
          ok: false,
          provider: this.name,
          error: `Resend responded ${response.status}`,
        };
      }
      const body = (await response.json()) as { id?: string };
      return { ok: true, provider: this.name, id: body.id };
    } catch (error) {
      return {
        ok: false,
        provider: this.name,
        error: error instanceof Error ? error.message : "Unknown provider error",
      };
    }
  }
}

export function getEmailProvider(): EmailProvider {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["CONTACT_TO_EMAIL"];
  const from = process.env["CONTACT_FROM_EMAIL"] ?? "portfolio@resend.dev";

  if (apiKey && to) {
    return new ResendEmailProvider(apiKey, to, from);
  }
  return new MockEmailProvider();
}
