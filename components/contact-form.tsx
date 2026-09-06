"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  validateContactInput,
  type FieldErrors,
} from "@/lib/validation";

type SubmissionState = "idle" | "sending" | "sent" | "error";

interface ToastState {
  kind: "success" | "error";
  text: string;
}

/**
 * Contact form with client + server validation, loading state, and toast
 * feedback. Posts to /api/contact; the server-side provider is abstracted
 * so a real email backend can be enabled with env vars only.
 */
export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<ToastState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((next: ToastState) => {
    setToast(next);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4500);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    },
    []
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const clientCheck = validateContactInput(payload);
    if (!clientCheck.ok) {
      setErrors(clientCheck.errors);
      return;
    }
    setErrors({});
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientCheck.data),
      });
      const body = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (response.ok && body.ok) {
        setState("sent");
        form.reset();
        showToast({
          kind: "success",
          text: "Message logged — I read every one. Expect a reply from Kabirnar10@gmail.com.",
        });
      } else if (response.status === 422 && body.errors) {
        setState("idle");
        setErrors(body.errors);
      } else {
        setState("error");
        showToast({
          kind: "error",
          text: body.error ?? "Sending failed on the server. Email me directly instead.",
        });
      }
    } catch {
      setState("error");
      showToast({
        kind: "error",
        text: "Network error — your message never left this tab. Please try again.",
      });
    }
  }

  return (
    <div className="relative">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 max-w-xl space-y-6"
      >
        <Field
          id="contact-name"
          label="Name"
          error={errors.name}
          input={
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={inputClass(Boolean(errors.name))}
              placeholder="Ada Lovelace"
            />
          }
        />
        <Field
          id="contact-email"
          label="Email"
          error={errors.email}
          input={
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={inputClass(Boolean(errors.email))}
              placeholder="you@company.com"
            />
          }
        />
        <Field
          id="contact-message"
          label="Message"
          error={errors.message}
          input={
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              className={`${inputClass(Boolean(errors.message))} resize-y`}
              placeholder="What are you building, and where does it hurt?"
            />
          }
        />

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={state === "sending"}
            className="group inline-flex items-center gap-2.5 rounded-sm border border-ink bg-ink px-5 py-2.5 font-mono text-[12px] tracking-wide text-paper transition-all duration-200 ease-ledger hover:bg-copper hover:border-copper disabled:cursor-wait disabled:opacity-60"
          >
            {state === "sending" ? (
              <>
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 animate-spin rounded-full border border-paper/40 border-t-paper"
                />
                Sending…
              </>
            ) : (
              <>
                Send message
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-ledger group-hover:translate-x-0.5"
                >
                  →
                </span>
              </>
            )}
          </button>
          <p className="font-mono text-[10.5px] text-ink-faint">
            Validated here and on the server.
          </p>
        </div>
      </form>

      {/* Toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50"
      >
        {toast ? (
          <p
            role="status"
            className={`pointer-events-auto max-w-sm rounded-sm border px-4 py-3 font-mono text-[12px] leading-relaxed shadow-[0_16px_40px_-16px_oklch(0.2_0.02_60/0.4)] ${
              toast.kind === "success"
                ? "border-mineral/40 bg-paper-raised text-ink"
                : "border-copper/50 bg-paper-raised text-ink"
            }`}
          >
            <span
              aria-hidden="true"
              className={toast.kind === "success" ? "text-mineral" : "text-copper"}
            >
              {toast.kind === "success" ? "✓ " : "✕ "}
            </span>
            {toast.text}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  input,
}: {
  id: string;
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-ledger text-ink-faint"
      >
        {label}
      </label>
      {input}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 font-mono text-[11px] text-copper">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-sm border bg-paper-raised px-3.5 py-2.5 text-[14px] text-ink",
    "placeholder:text-ink-faint/60 transition-colors duration-150",
    "focus:outline-none focus:border-copper",
    hasError ? "border-copper" : "border-hairline hover:border-hairline-strong",
  ].join(" ");
}
