# DEVLOG — Portfolio Sulamith Richter

Lern- und Entwicklungsjournal für die persönliche Portfolio-Website. Material für die Maturaarbeit (Aktionsforschung): jede Entscheidung mit Begründung, jeder Lernpunkt protokolliert.

---

## Session 1 — 2026-05-14 — Briefing, Stack, Initialaufbau

### Ausgangslage
Nach dem Workout-Tracker (Lernprojekt) und der Mitarbeit am KTI-Arlesheim-Webauftritt (Squarespace, externer Kunde) fehlt eine eigene öffentliche Bühne: eine Website, auf der das Profil als Freelance-Entwicklerin sichtbar ist und potenzielle Kund:innen einen Eindruck von Stil, Niveau und Kommunikation bekommen.

Zielgruppe ist bewusst nicht die Developer-Community, sondern **Schweizer KMUs** — Treuhandbüros, Anwaltskanzleien, Handwerksbetriebe. Geschäftsleute, die einen vertrauenswürdigen Ansprechpartner suchen, nicht ein technisches Showcase.

### Tech-Stack-Diskussion und Entscheidung

Drei realistische Optionen standen zur Auswahl:

- **A** — Statisches HTML/CSS, kein Framework. Maximal schlank, deploybar auf jedem Hosting.
- **B** — Astro. Optimiert für Content-Sites, sehr kleine Bundles.
- **C** — Next.js (App Router) + TypeScript + Tailwind. Gleicher Stack wie Workout-Tracker.

**Entscheidung: Option C.**

**Begründung:**
1. **Stack-Kohärenz:** Der Workout-Tracker läuft bereits auf Next.js + TS + Tailwind. Denselben Stack zu verwenden, vertieft den Lerneffekt aus dem ersten Projekt, statt eine zweite Toolchain parallel pflegen zu müssen.
2. **Anschlussfähigkeit:** Falls später dynamische Elemente dazukommen (Kontaktformular mit Backend, Admin-Bereich, kleines CMS), ist Next.js darauf vorbereitet. Mit Astro müsste man auf SSR-Mode wechseln oder migrieren.
3. **Zielgruppen-Signal:** Schweizer KMUs schauen nicht auf den Stack, aber andere Entwickler:innen (potenzielle Kollaborationen) tun das. „Portfolio in Next.js“ ist ein neutrales, ernst zu nehmendes Signal — kein Astro-Hype, kein WordPress-Eindruck.
4. **Deployment-Pfad:** Vercel hat First-Class-Support für Next.js (Build-Cache, Edge-Routing, automatisches Preview pro Branch). Mit Astro funktioniert das auch, aber Next.js + Vercel ist der reibungsärmste Pfad.

**Verworfene Annahmen:**
- „Reines HTML/CSS“ wurde verworfen: kein Komponenten-System bedeutet, dass jede Karte und jeder Button kopiert wird. Bei sechs Karten im Bento-Grid ist das schon grenzwertig; spätestens beim nächsten Projekt-Eintrag wird es teuer.
- „shadcn/ui einbinden“ wurde verworfen: der ganze Punkt der Portfolio-Seite ist eigenes Design, nicht generische Komponenten. Eigenes Design-System (CSS Custom Properties + ein paar Utility-Klassen) ist hier der ehrlichere Weg.
- „Kontaktformular mit eigenem Backend“ wurde verworfen: ein `mailto:`-Link erfüllt den Zweck, kostet null Wartung, bringt keine Spam-Risiken. Backend nur, wenn nachweislich gebraucht.

### Design-Konzept
Dunkel, modern, Violett-Blau-Akzente. Inspiration: High-End-Developer-Portfolios, aber bewusst eigenes Design.

Zentrale visuelle Bausteine:
- **Spotlights** im Hero und Kontakt-Bereich — zwei radiale Gradienten (links violett, rechts blau), die wie Scheinwerfer von den Rändern reinkommen.
- **Bento-Grid** für die „Über mich“-Sektion: sechs Karten unterschiedlicher Spaltenbreite, statt einer langen Text-Liste.
- **Akzentbalken** auf Projektkarten (2px Gradient), statt großer Cover-Bilder. Reduziert visuelles Rauschen.
- **Gradient-Text** im Titel (`linear-gradient(135deg, #a78bfa, #818cf8)`), kein Drop-Shadow, keine Outline.

Farbsystem als CSS Custom Properties in `:root`, damit später z.B. ein Light-Mode oder ein Re-Theme nicht das halbe CSS umschreibt.

### Architektur-Entscheidungen mit Begründung

- **CSS Custom Properties statt Tailwind-Theme-Erweiterung.** Tailwind v4 macht Theme-Variablen ohnehin über CSS — direkt im `:root` zu schreiben ist transparenter und framework-unabhängig. Falls das Projekt später migriert wird, sind die Farbentscheidungen leichter lesbar.
- **Eigene Utility-Klassen (`.card`, `.btn-primary`, `.pill`, `.gradient-text`) statt rein-Tailwind.** Das ist eine bewusste Abweichung vom Tailwind-Purismus. Begründung: die Karten-Variante (`.card` + `.card-purple`) und die Button-Variante (`.btn-primary` + `.btn-ghost`) wiederholen sich; eine einzelne Stelle, an der „so sehen unsere Karten aus“ definiert ist, ist langfristig wartbarer als bei jeder Karte zehn Tailwind-Klassen zu kopieren.
- **Inter als einzige Schriftart.** Geist (Vercels Default) wurde verworfen, weil sie für ein Personal-Brand zu generisch wirkt. Inter ist in der Schweizer Designszene etabliert, hat exzellente Lesbarkeit auf Mobilgeräten und ist über `next/font/google` mit `display: "swap"` performant geladen.
- **Server Components als Default.** Nur `Nav.tsx` ist `"use client"`, weil dort der Scroll-State gelesen wird. Alle anderen Komponenten sind statisch — kein JavaScript fürs Rendering nötig, schnellerer First Paint.
- **Smooth Scroll über CSS (`html { scroll-behavior: smooth }`) statt JS-Lösung.** Kein zusätzlicher JS-Code, respektiert automatisch `prefers-reduced-motion`.
- **Keine externen UI-Libraries (kein shadcn, kein MUI).** Bewusst eigenes Design-System. Das passt zur Aussage „ich verstehe meinen Code“ — wenn das Portfolio selbst eine fremde Komponentenbibliothek nutzt, ist die Aussage unglaubwürdig.

### Vergleich: was wird *anders* als beim Workout-Tracker

| Punkt | Workout-Tracker | Portfolio |
|---|---|---|
| Persistenz | PostgreSQL + next-auth | Keine — rein statisch |
| Routing | Auth-Flows, Listen, Detail-Pages | Single-Page mit Anker-Sektionen |
| Komponenten-Granularität | Viele kleine (WorkoutCard, FilterBar, …) | Eine pro Section, plus Nav |
| Zielgruppe | Entwicklerin selbst (Eigenbedarf) | Schweizer KMUs (B2B) |
| Tonalität | Funktional, neutral | Vertrauenswürdig, ruhig, „erwachsen“ |
| Tracking / Analytics | Keins | Keins (bewusst, DSGVO-/DSG-freundlich) |
| Deployment | Lokal (noch nicht deployed) | Vercel + Custom Domain (Plan) |

### Komponenten-Struktur

```
app/
├── layout.tsx        → Inter, Metadata (DE, OG-Tags), Body-Reset
├── page.tsx          → Nav + Hero + About + Projects + Transparency + Contact + Footer
└── globals.css       → CSS-Variablen, Utility-Klassen, .reveal, prefers-reduced-motion

components/
├── Nav.tsx           → Sticky, blurred Background, scroll-state ('use client')
├── Hero.tsx          → Spotlights links/rechts, Gradient-Title, CTAs
├── About.tsx         → Bento-Grid (3 Spalten, 6 Karten)
├── Projects.tsx      → 2→3-Spalten-Grid, Akzentbalken, GitHub-/Demo-Buttons
├── Transparency.tsx  → KI-Disclaimer + Doku-Hinweis (zwei Karten)
└── Contact.tsx       → Spotlight-Glow von oben, mailto-CTA, GitHub/LinkedIn

public/
└── favicon.svg       → SVG-Favicon mit „SR“-Mono auf Violett-Blau-Gradient
```

### Inhaltliche Entscheidungen

- **„Software, die Prozesse vereinfacht.“** als Haupt-Claim. Vorher diskutiert: „Web-Entwicklung mit Schweizer Standards“, „Code, der mit dir mitwächst“. Verworfen: zu generisch / zu marketing-lastig. „Prozesse vereinfachen“ ist konkret und spricht KMUs an, die nicht nach „Software“ suchen, sondern nach einer Lösung für ihren Alltag.
- **Eigene Lehrtätigkeit (Jetz, Python für Kinder) als eigene Karte.** Begründung: Lehrerfahrung kommuniziert „kann erklären, kann Wissen weitergeben, kommuniziert mit Laien“ — genau das, was ein KMU vom Gegenüber erwartet, wenn es um Code geht, den es selbst nicht beurteilen kann.
- **KTI Arlesheim explizit als Referenz.** Eine echte Schweizer Institution, namentlich genannt mit Zustimmung des Kunden. Stärker als drei anonyme „Kunde A / Kunde B“-Boxen.
- **Transparenz-Sektion über KI-Nutzung.** Das ist ein Risiko (Kund:innen könnten denken „dann brauche ich keinen Menschen mehr“), aber Verschweigen wäre langfristig schlimmer. Klare Aussage: KI = Werkzeug; Verantwortung = bei mir. Zusätzlich der ehrliche Hinweis, dass Projekte als Fallmaterial für die Maturaarbeit dienen könnten (anonymisiert, oder mit Zustimmung namentlich).
- **Kein Preis, keine Stundensätze.** Bewusst: Preise gehören ins Gespräch, nicht auf die Startseite. Statisch genannte Preise werden entweder zu hoch (Kunde springt ab) oder zu niedrig (Kunde erwartet Wunder).

### Erledigt in dieser Session
- [x] Briefing mit Claude Code durchgegangen, offene Fragen geklärt (Schriftart, Tonalität, Hosting-Pfad)
- [x] Next.js initialisiert (TypeScript, Tailwind v4, App Router, Turbopack, kein ESLint, Alias `@/*`)
- [x] Design-System in `app/globals.css` aufgebaut: CSS Custom Properties für Farben, Utility-Klassen für Karten, Buttons, Pills, Badges, Gradient-Text
- [x] `app/layout.tsx`: Inter-Font geladen, deutsche Metadaten + OpenGraph/Twitter-Tags, `<html lang="de">`
- [x] `components/Nav.tsx`: sticky, blurred Background, scroll-abhängige Opacity, Smooth-Scroll-Anker
- [x] `components/Hero.tsx`: Eyebrow + zweizeiliger Titel mit Gradient + zwei CTAs + zwei radiale Spotlights
- [x] `components/About.tsx`: Bento-Grid mit 6 Karten (Wer ich bin / Mein Anspruch / Jetz-Lehrtätigkeit / Tech Stack / KTI-Referenz / Standort)
- [x] `components/Projects.tsx`: 2-Spalten-Grid, skaliert auf 3 Spalten ab `xl`; Workout-Tracker mit GitHub-Link, KMU-Chatbot mit Platzhalter-Buttons
- [x] `components/Transparency.tsx`: zwei Karten (KI-Nutzung, Doku-Hinweis), jeweils mit farbigem Icon-Container
- [x] `components/Contact.tsx`: zentrierter CTA mit Spotlight-Glow von oben, `mailto:`-Link, GitHub-/LinkedIn-Icons
- [x] `app/page.tsx`: alle Sektionen + Footer zusammengesetzt
- [x] `public/favicon.svg`: SVG-Favicon „SR“ auf Violett-Blau-Gradient
- [x] `next build` erfolgreich (TypeScript clean, statisch prerendered)
- [x] Dev-Server lokal verifiziert (HTTP 200, alle Sections im HTML)

### Hosting-Diskussion (für Maturaarbeit dokumentiert)

In der Session kam die Frage auf: „Vercel oder Hostinger?“. Das ist eine häufige Verwechslung, weil beide auf den ersten Blick als „Hoster“ vermarktet werden — aber sie lösen unterschiedliche Probleme.

- **Vercel:** Anwendungs-Hosting für moderne JS-Frameworks. Build-Pipeline, Edge-CDN, automatische HTTPS-Zertifikate, Preview-Deployments pro Git-Branch. First-Class-Support für Next.js. Kostenlos in der Hobby-Stufe.
- **Hostinger:** primär Domain-Registrar und Shared-Hosting-Anbieter, optimiert für WordPress. Für Next.js müsste man einen VPS mieten, Node manuell betreiben, Nginx als Reverse-Proxy konfigurieren, Let's-Encrypt-Zertifikate erneuern. Mehr Aufwand, kein Build-Vorteil.

**Entscheidung: Vercel als Hosting, Custom Domain separat.**

Für Domain-Kauf:
- **CH-Registrar (Hostpoint, Infomaniak, Cyon)** — passt zur Zielgruppe (Schweizer KMUs), Geschäftsadresse in der Schweiz, deutscher Support. ~CHF 14–20/Jahr für `.ch`.
- **Vercel selbst** — kann auch Domains verkaufen, etwas teurer, aber One-Stop.
- **Hostinger** geht technisch, ist aber kein CH-Anbieter — wirkt für die Zielgruppe weniger lokal verankert.

Empfehlung: `.ch`-Domain bei einem Schweizer Registrar (Infomaniak oder Hostpoint), DNS auf Vercel zeigen lassen.

**Reflexionspunkt:** Die Frage „Vercel oder Hostinger?“ ist auf den ersten Blick eine Hosting-Frage, in Wirklichkeit aber ein Tooling-Mapping-Problem. Eine wichtige Eintrittsbarriere für Einsteiger:innen ist, dass die Marketing-Sprache vieler Anbieter ihre tatsächliche Funktion verschleiert. Ein konkreter Datenpunkt für die Aktionsforschung: das saubere Auseinanderhalten der beiden Begriffe „Hosting“ und „Domain“ ist mit klarer Erklärung in 30 Sekunden erledigt, ohne Erklärung kostet es Stunden falscher Recherche.

### Reflexionspunkte für die Maturaarbeit
1. **Briefing als Werkzeug.** Vor dem Schreiben einer einzigen Zeile Code wurde ein vollständiges Briefing-Dokument an Claude Code gegeben — mit Zielgruppe, Farbsystem, Komponenten-Liste, Wording-Vorgaben. Das Resultat: ein Build, der beim ersten Anlauf durchgelaufen ist, keine Nacharbeit am Stil. → These: Die Qualität eines KI-gestützten Bauprozesses hängt linear an der Qualität des Briefings, nicht an der Modellgrösse.
2. **Bewusste Selbstbeschreibung als KI-Nutzerin.** Eine eigene „Transparenz“-Sektion auf einer Geschäfts-Website ist ungewöhnlich. Die Entscheidung wurde getroffen, weil im KMU-Kontext der Verschweige-Pfad mittelfristig grösseres Risiko trägt als der offene Pfad. → These: KI-Disclosure ist eine Vertrauens-Investition, kein Vertrauens-Verlust — sofern sie mit einer klaren Verantwortungs-Aussage gekoppelt ist.
3. **Stack-Kohärenz vs. Best-Tool-for-the-Job.** Theoretisch wäre Astro für eine statische Portfolio-Site etwas effizienter (kleineres Bundle). Trotzdem fiel die Wahl auf Next.js, weil Stack-Kohärenz mit dem Workout-Tracker den eigenen Lerngewinn erhöht. → These: Für eine Einsteiger:in ist Stack-Kohärenz wertvoller als marginale technische Optimierung. Das Hopping zwischen Stacks erzeugt künstliche Eintrittsbarrieren.
4. **Tonalität als Design-Entscheidung.** Die Site ist bewusst *nicht* in der typischen „Hi, I'm a developer who loves React and coffee“-Tonalität geschrieben. Sprache, Struktur, Bildsprache zielen auf jemanden, der noch nie ein Portfolio gelesen hat. Das ist eine inhaltliche, keine technische Entscheidung — wird aber durch das technische Design (ruhige Farben, keine animierten Spielereien) gestützt.

### Offen / Nächste Session
- Domain kaufen (`sulamithrichter.ch` bei Hostpoint oder Infomaniak)
- GitHub-Repo `portfolio` (public) unter `sulamithrichter` anlegen, Erst-Push
- Vercel-Projekt anlegen, Repo verbinden, Auto-Deploy auf `main` testen
- Vercel-Domain mit der CH-Domain verbinden (DNS-Records)
- Lighthouse-Audit fahren (Performance, A11y, Best Practices, SEO — Ziel: alle > 95)
- `robots.txt` und `sitemap.xml` ergänzen
- OG-Image (1200×630) bauen — aktuell nur Text in den Meta-Tags
- Hover- und Reveal-Animationen feinjustieren (subtile Fade-ins beim Scrollen, IntersectionObserver-basiert)
- Falls Bedarf: kleinen „Leistungen“-Bereich ergänzen, der konkret aufzählt, was angeboten wird (Web-App / Automatisierung / KI-Integration / Bestehende Site überarbeiten)
- Kontaktformular *nur* dann, wenn `mailto:` nachweislich zu wenig Anfragen erzeugt — vorher nicht.

### Bekannte Hinweise
- LinkedIn-Profil-URL in `components/Contact.tsx` ist aktuell ein Platzhalter (`linkedin.com/in/sulamithrichter`). Falls die tatsächliche URL anders lautet, dort anpassen.
- `metadataBase` in `app/layout.tsx` zeigt auf `https://sulamithrichter.ch`. Falls die Domain doch anders heisst (z.B. `.com` oder Subdomain), nach dem Kauf an *einer* Stelle ändern.
- `npm audit` meldet zwei moderate Vulnerabilities in den Dev-Dependencies — Standard bei frisch erzeugten Next-Projekten, nicht produktionskritisch.
- Next.js 16 + Turbopack: Build läuft, aber `next/font` lädt Inter über Google Fonts. Falls DSG-Strenge gefordert wird (kein Drittland-Transfer), kann auf Self-Hosted-Variante umgestellt werden (`@fontsource/inter`).

---
