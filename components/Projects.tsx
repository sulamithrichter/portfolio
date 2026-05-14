type Project = {
  tag: string;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  accent: "purple" | "blue";
};

const projects: Project[] = [
  {
    tag: "Web-App",
    name: "Workout Tracker",
    description:
      "Vollständige Web-App mit eigener Authentifizierung, Datenbank, Progress-Tracking und mobil-optimiertem Design. Kein Supabase, kein Clerk – alles selbst implementiert.",
    stack: ["Next.js 16", "PostgreSQL", "TypeScript", "Tailwind"],
    github: "https://github.com/sulamithrichter/workout-tracker-1",
    accent: "purple",
  },
  {
    tag: "KI-Integration",
    name: "KMU-Chatbot Demo",
    description:
      "RAG-basierter Chatbot für ein Treuhandbüro: Dokumente werden hochgeladen, Fragen werden gestellt – die Antworten kommen direkt aus den eigenen Unterlagen.",
    stack: ["Python", "Claude API", "Flask"],
    accent: "blue",
  },
];

const accentBar: Record<Project["accent"], string> = {
  purple: "linear-gradient(90deg, #6d4aea 0%, #a78bfa 100%)",
  blue: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)",
};

const tagColor: Record<Project["accent"], string> = {
  purple: "rgba(196, 181, 253, 0.85)",
  blue: "rgba(147, 197, 253, 0.9)",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="section-label">Projekte</p>
        <h2 className="mt-3 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]">
          Ausgewählte Arbeiten und{" "}
          <span className="gradient-text">Demo-Projekte.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="card relative overflow-hidden p-0"
              style={{ paddingTop: 0 }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: accentBar[p.accent] }}
              />
              <div className="p-[1.4rem]">
                <p
                  className="text-[0.7rem] font-medium uppercase tracking-[0.14em]"
                  style={{ color: tagColor[p.accent] }}
                >
                  {p.tag}
                </p>
                <h3 className="card-title mt-3">{p.name}</h3>
                <p className="body-text mt-3">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.github ? (
                    <a
                      className="btn-small"
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  ) : (
                    <span className="btn-small" aria-disabled="true">
                      <GithubIcon />
                      Repo folgt
                    </span>
                  )}
                  {p.demo ? (
                    <a
                      className="btn-small"
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live-Demo
                      <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="btn-small" aria-disabled="true">
                      Live-Demo · coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 .5C5.65.5.5 5.65.5 12.01c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.69 1.25 3.34.95.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55 4.56-1.52 7.85-5.83 7.85-10.9C23.5 5.65 18.35.5 12 .5z"
        fill="currentColor"
      />
    </svg>
  );
}
