import { NextResponse } from "next/server";

import { getEmailProvider } from "@/lib/email";
import { validateContactInput } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Validates with the shared schema, then hands the message to the
 * configured email provider (mock until RESEND_API_KEY is set).
 * No credentials ever reach the client.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body must be JSON." },
      { status: 400 }
    );
  }

  const validation = validateContactInput(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 422 }
    );
  }

  const provider = getEmailProvider();
  const result = await provider.send(validation.data);

  if (!result.ok) {
    console.error(`[contact] provider=${result.provider} failed: ${result.error}`);
    return NextResponse.json(
      { ok: false, error: "The mail provider rejected the message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: result.id, provider: result.provider });
}
