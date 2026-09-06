/**
 * Shared contact-form validation. Used by the client form and by the
 * /api/contact route handler — one source of truth, no schema dependency.
 */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 120 },
  message: { min: 10, max: 4000 },
} as const;

export function validateContactInput(raw: unknown): ValidationResult {
  const errors: FieldErrors = {};

  if (typeof raw !== "object" || raw === null) {
    return { ok: false, errors: { message: "Malformed request body." } };
  }

  const candidate = raw as Record<string, unknown>;
  const name = typeof candidate["name"] === "string" ? candidate["name"].trim() : "";
  const email = typeof candidate["email"] === "string" ? candidate["email"].trim() : "";
  const message =
    typeof candidate["message"] === "string" ? candidate["message"].trim() : "";

  if (name.length < LIMITS.name.min) {
    errors.name = "Please give your name (at least 2 characters).";
  } else if (name.length > LIMITS.name.max) {
    errors.name = "Name is too long.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email address does not look valid.";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = "A few more words would help (at least 10 characters).";
  } else if (message.length > LIMITS.message.max) {
    errors.message = "Message is too long.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, data: { name, email, message } };
}
