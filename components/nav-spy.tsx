"use client";

import { useEffect } from "react";

/**
 * Scroll-spy for the header nav: the section crossing the reading zone
 * gets its link lit in copper, so a first-time visitor always knows
 * where they are and what each link points at. Progressive enhancement
 * only — the markup carries no state of its own.
 */
export function NavSpy() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')
    );
    const pairs = links
      .map((link) => ({
        link,
        section: document.querySelector<HTMLElement>(
          link.getAttribute("href") ?? ""
        ),
      }))
      .filter(
        (pair): pair is { link: HTMLAnchorElement; section: HTMLElement } =>
          pair.section !== null
      );

    if (pairs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const { link, section } of pairs) {
            const active = section === entry.target;
            link.classList.toggle("text-copper", active);
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          }
        }
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    for (const { section } of pairs) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return null;
}
