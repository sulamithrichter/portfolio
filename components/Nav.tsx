"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#about", label: "Über mich" },
  { href: "#projects", label: "Projekte" },
  { href: "#contact", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: scrolled
          ? "rgba(8, 11, 20, 0.78)"
          : "rgba(8, 11, 20, 0.55)",
        backdropFilter: "saturate(150%) blur(14px)",
        WebkitBackdropFilter: "saturate(150%) blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "background-color 200ms ease",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="#top"
          className="text-[0.95rem] font-semibold tracking-tight text-white"
        >
          Sulamith Richter
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-[0.82rem] transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="btn-small hidden sm:inline-flex"
          style={{
            background: "rgba(109, 74, 234, 0.14)",
            borderColor: "rgba(109, 74, 234, 0.32)",
            color: "#c4b5fd",
          }}
        >
          Kontakt aufnehmen
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}
