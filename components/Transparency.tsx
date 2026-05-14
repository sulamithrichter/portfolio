export default function Transparency() {
  return (
    <section id="transparency" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="section-label">Transparenz</p>
        <h2 className="mt-3 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]">
          Ehrlich, wie ich arbeite – und{" "}
          <span className="gradient-text">was mit Projekten passiert.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="card">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(109, 74, 234, 0.14)",
                border: "1px solid rgba(109, 74, 234, 0.28)",
                color: "#c4b5fd",
              }}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="card-title mt-5">KI-gestützte Entwicklung</h3>
            <p className="body-text mt-3">
              Ich arbeite intensiv mit Claude Code (Anthropic). Das bedeutet
              schnellere Umsetzung – und ich stehe trotzdem vollständig hinter
              jedem Projekt: ich verstehe, erkläre und warte alles selbst.
            </p>
          </article>

          <article className="card">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.28)",
                color: "#93c5fd",
              }}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M14 2v6h6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <h3 className="card-title mt-5">Projekte in Dokumentation</h3>
            <p className="body-text mt-3">
              Meine Projekte werden laufend dokumentiert und fliessen
              möglicherweise als Fallmaterial in eine wissenschaftliche Arbeit
              ein. Kundendaten bleiben vollständig anonym. Nur mit expliziter
              Zustimmung werden Kunden namentlich erwähnt – das ist keine
              Voraussetzung für eine Zusammenarbeit.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
