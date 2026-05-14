import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Transparency from "@/components/Transparency";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Transparency />
        <Contact />
      </main>
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
          <p className="text-[0.78rem] text-[var(--text-muted)]">
            © {new Date().getFullYear()} Sulamith Richter
          </p>
          <p className="text-[0.78rem] text-[var(--text-muted)]">
            Basel / Muttenz · Schweiz
          </p>
        </div>
      </footer>
    </>
  );
}
