export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      {/* Spotlight von oben – violett */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(109,74,234,0.22) 0%, transparent 70%)",
          width: 760,
          height: 560,
          top: -200,
          filter: "blur(10px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="section-label">Kontakt</p>
        <h2 className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
          Projekt im Kopf?
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed sm:text-[1.05rem]"
          style={{ color: "var(--text-secondary)" }}
        >
          Schreib mir – ich melde mich innerhalb von 24 Stunden.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:sulamitheos@icloud.com?subject=Anfrage%20%C3%BCber%20deine%20Website"
            className="btn-primary"
          >
            Nachricht schreiben
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <a
            href="https://github.com/sulamithrichter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] transition-colors hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12.01c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.69 1.25 3.34.95.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55 4.56-1.52 7.85-5.83 7.85-10.9C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/sulamithrichter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] transition-colors hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
