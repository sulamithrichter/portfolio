export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-32"
    >
      {/* Spotlight links – violett */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,60,220,0.16) 0%, transparent 70%)",
          width: 600,
          height: 500,
          top: -80,
          left: -180,
          filter: "blur(8px)",
        }}
      />
      {/* Spotlight rechts – blau */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)",
          width: 480,
          height: 420,
          top: 40,
          right: -120,
          filter: "blur(6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="section-label">
          Web-Apps · KI-Integration · Automatisierung
        </p>

        <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.6rem] md:text-[4.2rem]">
          Software, die
          <br />
          <span className="gradient-text">Prozesse vereinfacht.</span>
        </h1>

        <p
          className="mt-7 max-w-2xl text-[1rem] leading-relaxed sm:text-[1.05rem]"
          style={{ color: "var(--text-secondary)" }}
        >
          Ich entwickle massgeschneiderte Web-Applikationen und KI-Lösungen für
          Schweizer KMUs – schnell, sauber und wartbar.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">
            Meine Projekte ansehen
          </a>
          <a href="#contact" className="btn-ghost">
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
}
