const primaryStack = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Python",
  "Claude API",
  "Tailwind",
  "Node.js",
];

const secondaryStack = [
  "HTML/CSS",
  "JavaScript",
  "Java",
  "PHP",
  "MySQL",
  "React",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="section-label">Über mich</p>
        <h2 className="mt-3 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]">
          Noch Schülerin.{" "}
          <span className="gradient-text">Trotzdem ernst zu nehmen.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Karte 1 – Wer ich bin (span 2) */}
          <article className="card md:col-span-2">
            <span className="badge badge-blue">
              <span aria-hidden>🎓</span>
              Informatik-Studium · Universität Basel
            </span>
            <h3 className="card-title mt-4">
              Schule in Muttenz, Studium in Basel, Kunden in der Region.
            </h3>
            <p className="body-text mt-3">
              Ich bin Schülerin am Gymnasium Muttenz und studiere parallel
              Informatik an der Universität Basel. Daneben arbeite ich als
              freischaffende Entwicklerin und baue Web-Applikationen, KI-Tools
              und Automatisierungen für KMUs, Selbstständige und Privatpersonen
              in der Schweiz.
            </p>
          </article>

          {/* Karte 2 – Mein Anspruch */}
          <article className="card">
            <p className="card-label">Mein Anspruch</p>
            <h3 className="card-title mt-3">
              Ich stehe hinter jeder Zeile Code.
            </h3>
            <p className="body-text mt-3">
              Ich übernehme Verantwortung für das, was ich abliefere: ich
              verstehe meinen Code, kann ihn erklären – und falls Sie in zwei
              Jahren anrufen, finde ich mich auch dann noch zurecht.
            </p>
          </article>

          {/* Karte 3 – Lehrtätigkeit (grün) */}
          <article className="card card-green">
            <span className="badge badge-green">
              <span aria-hidden>👩‍💻</span>
              Jetz · Muttenz
            </span>
            <h3 className="card-title mt-4">Python-Kurse für Kinder</h3>
            <p className="body-text mt-3">
              Im Verein Jetz unterrichte ich Kinder und Jugendliche im
              Programmieren mit Python – mit Fokus auf eigenen kleinen Projekten
              statt nur Theorie.
            </p>
          </article>

          {/* Karte 4 – Tech Stack (volle Breite) */}
          <article className="card md:col-span-3">
            <p className="card-label">Tech Stack</p>
            <h3 className="card-title mt-3">Womit ich arbeite</h3>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p
                  className="text-[0.74rem] font-medium uppercase tracking-[0.1em]"
                  style={{ color: "rgba(167, 139, 250, 0.85)" }}
                >
                  Primärer Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {primaryStack.map((item) => (
                    <span key={item} className="pill pill-purple">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-[0.74rem] font-medium uppercase tracking-[0.1em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Weitere Kenntnisse
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {secondaryStack.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Karte 5 – Referenz KTI (violett, span 2) */}
          <article className="card card-purple md:col-span-2">
            <p
              className="card-label"
              style={{ color: "rgba(196, 181, 253, 0.7)" }}
            >
              Referenz
            </p>
            <h3 className="card-title mt-3">
              Klinisch Therapeutisches Institut Arlesheim
            </h3>
            <p className="body-text mt-3">
              Mitarbeit an der offiziellen Website des KTI Arlesheim
              (Squarespace) – Design-Vorschläge, strukturelle Anpassungen und
              Layout­optimierungen.
            </p>
          </article>

          {/* Karte 6 – Standort */}
          <article className="card">
            <p className="card-label">Standort</p>
            <h3 className="card-title mt-3">Basel / Muttenz</h3>
            <p className="body-text mt-3">
              Vor Ort in der Region Basel oder vollständig remote. Deutsch und
              Englisch – Schweizerdeutsch verstehe ich, beim Sprechen erspare
              ich es Ihnen lieber.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
