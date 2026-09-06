"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark register switch. The blocking init script in layout.tsx sets
 * data-theme before first paint; this button only flips the attribute and
 * persists the choice. Icon is a half-filled circle — the ledger's
 * two-register mark, not a sun/moon cliché.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset["theme"] === "dark" ? "dark" : "light"
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset["theme"] = next;
    try {
      window.localStorage.setItem("kn-theme", next);
    } catch {
      /* private mode — theme just won't persist */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-7 w-7 items-center justify-center rounded-sm border border-hairline text-[13px] text-ink-soft transition-colors hover:border-copper/60 hover:text-copper"
    >
      <span aria-hidden="true">{theme === "dark" ? "◑" : "◐"}</span>
    </button>
  );
}
