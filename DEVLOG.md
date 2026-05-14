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

## Session 2 — 2026-05-14 — Iteration: Texte, Domain, Deployment, SEO, A11y

### Ausgangslage
Die Site stand technisch nach Session 1 — lokal lauffähig, sauberer Build, aber zwei Lücken: (a) die Texte klangen an mehreren Stellen noch nach „Marketing-Generator", (b) sie war nur lokal erreichbar. Ziel dieser Session: Inhaltliche Politur, GitHub-Push, Vercel-Deployment, Anbindung der eigenen Domain, SEO-Files, OG-Image, und ein Lighthouse-Audit mit 100er-Werten.

### Block 1: Inhaltliche Politur — Texte, die nicht nach KI klingen

**Iteration 1 — Bento-Grid-Headline.** Die ursprüngliche Headline „Persönlich, regional und technisch fundiert." wurde als typisches Drei-Adjektive-Schema erkannt. Sechs Varianten wurden gegenübergestellt (konkret-sachlich, Understatement, Schweizer Direktheit, Drei-Wörter-Variante, persönlich-direkt, geschäftlich-trocken). Gewählt: **„Noch Schülerin. Trotzdem ernst zu nehmen."** — Selbstbewusstsein mit Augenzwinkern, kein einziges Adjektiv.

**Iteration 2 — Humor-Pass über alle Sections.** Sechs Stellen wurden auf trocken-schweizerischen Humor umgestellt:
- *Hero-Untertitel:* „schnell, sauber und wartbar" → „Damit Sie sich danach wieder um Ihren Alltag kümmern können – nicht um die Software." (mit erweitertem Zielpublikum, siehe Block 1, Iter. 3)
- *About Karte 1 Titel:* lange Visitenkarten-Aufzählung → „Schule in Muttenz, Studium in Basel, Kunden in der Region."
- *About Karte 2 Body:* generisches „Verantwortung übernehmen" → „falls Sie in zwei Jahren anrufen, finde ich mich auch dann noch zurecht."
- *About Karte 6 (Standort):* trockene Sprach-Aufzählung → „Schweizerdeutsch verstehe ich, beim Sprechen erspare ich es Ihnen lieber."
- *Transparency KI-Karte:* fromme „Verantwortung"-Aussage → „Und falls Anthropic je den Stecker zieht, läuft Ihre App trotzdem weiter." (echtes Verkaufsargument als Pointe)

**Iteration 3 — Zielgruppen-Erweiterung.** Ursprüngliches Briefing zielte nur auf KMUs. Im Gespräch erweitert auf „KMUs, Selbstständige und Privatpersonen in der Schweiz" — wo immer die Zielgruppe in der Site genannt wird (Hero, About Karte 1, SEO-Description, OG-Description). Hat den Haupt-Claim entschärft (statt „nur Geschäftskunden") ohne die Tonalität zu zerstören.

**Iteration 4 — Konsistenzpass.** Systematischer Durchgang durch *alle* Texte (Layout, alle Components, Footer). Drei echte Inkonsistenzen + drei stilistische Punkte gefunden und gefixt:
1. Contact-Section verwendete „du" („Schreib mir") während die ganze Seite sonst „Sie" siezt — geändert auf „Schreiben Sie mir".
2. About Karte 1 Body sprach noch von „kleine und mittlere Unternehmen … in der Region" während die Hero schon „KMUs, Selbstständige und Privatpersonen … in der Schweiz" sagte. Angeglichen.
3. Em-Dash (`—`) statt En-Dash (`–`) hatte sich in eine About-Karte eingeschlichen — die ganze Site benutzt sonst En-Dash mit Leerzeichen. Korrigiert.
4. Projects-Headline „Ausgewählte Arbeiten und Demo-Projekte" → „Was ich bisher gebaut habe." (ehrlicher, da aktuell keine bezahlten Kundenarbeiten gezeigt werden — KTI Arlesheim lebt in der About-Sektion).
5. KMU-Chatbot-Beschreibung las sich wie ein realer Auftrag („für ein Treuhandbüro") — jetzt explizit „Demo eines RAG-basierten Chatbots für Treuhand-Anwendungsfälle".
6. Workout-Tracker-Beschreibung: „Kein Supabase, kein Clerk" (Developer-Jargon, KMUs verstehen das nicht) → „Alle Komponenten selbst entwickelt, statt fertige Cloud-Bausteine zu kombinieren".

**Iteration 5 — Ehrlichkeitspass.** Auf Wunsch hinzugefügt: „Alle Komponenten selbst entwickelt **(bzw. entwickeln lassen)**, statt …" — explizite Offenlegung der KI-Assistenz beim Workout-Tracker, konsistent mit der Transparency-Sektion. Schwächt die Aussage nicht, im Gegenteil: das ehrliche „bzw." macht sie glaubwürdiger.

### Block 2: Deployment-Pipeline

- GitHub-Repo `sulamithrichter/portfolio` erstellt (public, passend zum Charakter eines Portfolios — Workout-Tracker ist auch public).
- Erst-Push über `gh repo create --public --source=. --push`.
- Vercel-Projekt wurde vom User über die Vercel-Web-UI mit dem Repo verbunden. Erst-Deploy lief automatisch.
- Verifiziert: `READY`-State, statisch prerendert, 44 KB HTML, Production-Domain `portfolio-sooty-alpha-98.vercel.app`.
- Ab Push 2 lief die Pipeline rein automatisch — jeder weitere `git push` → Build → Production-Deploy in ~30 Sek.

### Block 3: Hosting-Diskussion (für Maturaarbeit dokumentiert)

In der Session kam die Frage auf: „Vercel oder Hostpoint? Brauche ich Smart Webhosting, Positive SSL, SEO-Paket?" — ein klassischer Fall von Marketing-Sprache, die echte Funktionalität verschleiert.

**Was tatsächlich gilt:**
- **Vercel** = Anwendungs-Hosting für Next.js. Edge-CDN, Build-Pipeline, Preview-Deployments, kostenloses Let's-Encrypt-SSL automatisch.
- **Hostpoint** = primär Domain-Registrar und Shared-WordPress-Hosting.
- Die Zusatzpakete bei Hostpoint sind alle **nicht nötig**:
  - *Smart Webhosting* — überflüssig, die Site liegt auf Vercel.
  - *Positive SSL* — überflüssig, Let's-Encrypt von Vercel ist identisch im Browser sichtbar (grünes Schloss). EV-Zertifikate werden in modernen Browsern nicht mehr besonders dargestellt.
  - *Suchmaschinenoptimierung* — meist Generic-Tooling, das wenig bringt. Echte SEO-Basics (Title, Description, OpenGraph, semantisches HTML, schneller Build, Sitemap) sind selbst in der App.

**Reflexionspunkt:** Die Marketing-Sprache mehrerer Anbieter verschleiert ihre tatsächliche Funktion. Das saubere Auseinanderhalten der Begriffe „Hosting", „Domain", „SSL", „SEO" ist in 30 Sekunden erklärt — kostet ohne Erklärung Stunden falscher Recherche oder Geld für unnötige Pakete. **These:** Klare Begriffsdefinition ist ein massiver Hebel gegen Eintrittsbarrieren.

### Block 4: Domain-Anbindung — `sulamithrichter.ch`

**Vercel-Seite — drei UI-Fallen umgangen:**
1. Vercel bot proaktiv an, `sulamithrichter.ch → www.sulamithrichter.ch` umzuleiten. **Abgelehnt** — wir wollten die umgekehrte Richtung (Apex als kanonisch, `www.` als Redirect dorthin). Begründung: kürzer, moderner, konsistent mit `metadataBase`.
2. „Connect to environment" → **Production** (nicht „No environment" oder „Preview").
3. „Redirect to another domain" → leer (die Domain *ist* die Site, nicht eine Weiterleitung).

**Hostpoint-Seite — chirurgischer DNS-Eingriff:**
Hostpoint setzt bei jeder neuen Domain einen kompletten Default-Zone-Eintrag (SOA, NS, MX für Mail, autoconfig/autodiscover-CNAMEs, Wildcard-Records für Subdomains, SPF-TXT, Parking-Page-A/AAAA). Nur **drei** Aktionen waren nötig:
1. Apex-A `217.26.48.101` (Hostpoint-Parking) → `216.198.79.1` (Vercel) — geändert.
2. Apex-AAAA `2a00:d70:0:a::166` — gelöscht (Vercel braucht primär IPv4, doppelt würde Browser zur Parking-Page schicken).
3. Neuer `www`-CNAME → `cname.vercel-dns.com`.

**Alle Mail-Records (MX, autoconfig, autodiscover, lists, SPF, Wildcards) unangetastet gelassen** — sie kollidieren nicht mit dem Web-Routing, weil ein expliziter Record in DNS Vorrang vor einer Wildcard hat.

**Lernmoment — CNAME-Wert-Verwechslung:** Beim Eintragen des `www`-CNAMEs wurde zunächst der falsche Wert verwendet: `ns1.vercel-dns.com` (= Vercel-Nameserver) statt `cname.vercel-dns.com` (= CNAME-Target). Vercel bietet im UI nämlich *beide* Konfigurationspfade an („komplett zu Vercel-Nameservern wechseln" vs. „DNS bei Hostpoint behalten, nur diesen CNAME setzen"). Die zweite Variante war die richtige — Mail wäre sonst weg gewesen. → **These:** Auch klare UIs haben Mehrfach-Optionen, die unterschiedliche mentale Modelle voraussetzen. Verifikation via `dig` ist Pflicht, nicht optional.

**Verifikation:**
- `dig +short sulamithrichter.ch A` → `216.198.79.1` ✓
- `dig +short www.sulamithrichter.ch` → `cname.vercel-dns.com.` + Vercel-IPs ✓
- HTTPS-Test: Apex 200, www 307-Redirect auf Apex, Let's-Encrypt-Cert für `sulamithrichter.ch` ✓
- Gesamtzeit zwischen DNS-Speichern und Live-HTTPS: unter einer Minute.

### Block 5: Scroll-Spy in der Navigation

Funktionswunsch: Nav-Links sollen weiss leuchten, wenn die zugehörige Section im Viewport ist.

**Implementation:** IntersectionObserver in `components/Nav.tsx` mit `rootMargin: "-40% 0px -55% 0px"`. Dieser schmale horizontale Streifen in der Viewport-Mitte sorgt dafür, dass immer höchstens *eine* Section aktiv ist (kein Flackern bei überlappendem Scrolling).

**Designentscheidungen:**
- Hero und Transparency haben keinen Nav-Link → bewusst kein „immer einer ist aktiv"-Algorithmus, da das gekünstelt wirken würde.
- Aktiver Link bekommt zusätzlich `aria-current="true"` für Screenreader.
- Reagiert auf alle Scroll-Wege gleich (Klick auf Nav, Scrollrad, Anker-Links, manuelles Scrollen).

### Block 6: SEO-Files & OG-Image

- `app/robots.ts` — Next.js Metadata-API-Variante, generiert eine korrekte `robots.txt` mit Allow-All und Sitemap-Hint.
- `app/sitemap.ts` — generiert `sitemap.xml` mit der Single-Page-URL, monthly change frequency, priority 1.
- `app/opengraph-image.tsx` — dynamisches 1200×630 PNG via `next/og` (`ImageResponse`). Matched das Site-Design: dunkler Hintergrund, violetter Spotlight links / blauer rechts, Gradient-Tagline, „Sulamith Richter" und „sulamithrichter.ch" als Footer. Wird beim Build statisch generiert (125 KB).

**Stolperstein:** Direkt nach dem Push zeigten alle drei Routes 404. Ursache war **CDN-Edge-Cache**, nicht Build-Fehler — Vercel hatte vor dem neuen Deploy schon 404-Responses für diese Pfade gecached (weil sie noch nicht existierten). Mit Cache-Buster (`?b=$RANDOM`) im curl waren sie sofort sichtbar. Innerhalb von wenigen Minuten propagierte das auch normal.

### Block 7: Lighthouse-Audit & A11y-Fix

**Initialer Lauf (npx Lighthouse gegen die Live-URL):**
- Mobile: Performance 96 · Accessibility 95 · Best Practices 100 · SEO 100
- Desktop: Performance 100 · Accessibility 95 · Best Practices 100 · SEO 100

**A11y-Lücke:** Der einzige fehlgeschlagene Test war `color-contrast`. WCAG AA fordert 4.5:1 für Normaltext. Die `--text-muted`-Variable mit `rgba(255,255,255,0.28)` ergab auf `#080B14` nur 2.4:1 (auf den Karten-Hintergrund 2.47:1). Betroffen: Section-Labels („ÜBER MICH", „PROJEKTE", „TRANSPARENZ"), Card-Labels und Footer.

**Fix:**
- `--text-muted` von 0.28 auf 0.55 erhöht (komponiert zu `#909195`, ergibt ~6:1).
- Zusätzlich: `.card-label` hatte den Wert hardcoded statt über die Variable — jetzt referenziert es `var(--text-muted)`, damit künftige Änderungen zentral bleiben.

**Verifikations-Stolperstein:** Der zweite Lighthouse-Lauf zeigte noch immer 95 — Lighthouse hatte das CSS-File aus dem lokalen Browser-Cache geladen. Mit `--chrome-flags="--disable-cache --disk-cache-size=0"` und Cache-Buster in der URL: alle Werte auf 100.

**Finaler Lauf:**
- Mobile: **Performance 97 · Accessibility 100 · Best Practices 100 · SEO 100**
- Desktop: **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100**
- Core Web Vitals (Mobile): LCP 2.3s · FCP 1.1s · CLS 0 · TBT 100ms · SI 3.7s — alle „Good".

### Erledigt in dieser Session
- [x] Headline und Untertitel des Hero auf nicht-generisch umgestellt
- [x] About-, Projects-, Transparency-, Contact-Texte auf Humor + Selbstbewusstsein iteriert
- [x] Zielgruppe erweitert: KMUs + Selbstständige + Privatpersonen
- [x] Konsistenzpass über alle Sections (Sie/du, Em/En-Dash, Audience-Wording)
- [x] Honesty-Tweak beim Workout-Tracker („bzw. entwickeln lassen")
- [x] GitHub-Repo `sulamithrichter/portfolio` erstellt, gepusht
- [x] Vercel an Repo angebunden, Auto-Deploy verifiziert
- [x] Hosting-Diskussion (Vercel vs Hostpoint, Zusatzpakete nicht nötig)
- [x] Domain `sulamithrichter.ch` bei Hostpoint gekauft
- [x] DNS-Records bei Hostpoint angepasst (3 chirurgische Eingriffe, Mail-Records geschont)
- [x] CNAME-Verwechslung erkannt und behoben (`ns1` → `cname`)
- [x] HTTPS, Let's-Encrypt-Cert, www-Redirect: alles automatisch durch Vercel
- [x] Scroll-Spy in der Navigation (IntersectionObserver, aria-current)
- [x] `app/robots.ts`, `app/sitemap.ts` ergänzt
- [x] `app/opengraph-image.tsx` mit dynamischem 1200×630-PNG
- [x] Lighthouse-Audit, A11y-Fix, finale 100er-Werte

### Architektur-Entscheidungen mit Begründung (Session 2)
- **GitHub-Repo public, nicht private.** Begründung: Es ist ein Portfolio — der Sinn ist Sichtbarkeit. Konsistent mit Workout-Tracker. Sollte sich später ein Grund ergeben (z.B. ein nicht-öffentliches Projekt im selben Repo), kann man jederzeit umstellen.
- **Apex als kanonische Domain, www als Redirect dorthin.** Begründung: kürzer, moderner, KMU-freundliche Eingabe in Browser-Adressleiste. Konsistent mit `metadataBase` in `app/layout.tsx`.
- **DNS-Eingriffe minimal-invasiv.** Begründung: Mail funktioniert nur, wenn MX, SPF, autoconfig, autodiscover unangetastet bleiben. Drei Aktionen statt „alle Hostpoint-Records löschen und neu anfangen".
- **Wildcards bewusst nicht angefasst.** Begründung: DNS-Specificity-Regel — ein expliziter Record gewinnt gegen eine Wildcard. Die Wildcards (`*.sulamithrichter.ch A/AAAA`) stören das Web-Routing nicht, decken aber Mail-Subdomains ab.
- **IntersectionObserver statt Scroll-Listener für Active-State.** Begründung: passiv, kein Throttling/Debouncing nötig, browser-nativ effizient.
- **OG-Image dynamisch über `next/og`, nicht als statisches PNG im public-Ordner.** Begründung: Wenn der Titel oder die Tagline geändert wird, wird das Bild beim nächsten Build automatisch neu generiert. Keine manuelle Photoshop-Datei, die rottet.
- **A11y-Fix als globale CSS-Variable, nicht als Component-Edit.** Begründung: zentrale Anpassung greift sofort an allen 15+ Stellen, die `--text-muted` nutzen. Kein Suchen-und-Ersetzen, kein „eine Stelle vergessen"-Risiko.

### Reflexionspunkte für die Maturaarbeit (Session 2)
1. **Iteration als Kernarbeit, nicht als Polish.** Der eigentliche Bauprozess (Session 1) hat die Site funktionsfähig gemacht; die *Glaubwürdigkeit* kam erst in Session 2 durch wiederholte Text-Iteration mit menschlichem Geschmacksurteil. → **These:** Bei KI-gestützter Entwicklung verschiebt sich der Arbeitsschwerpunkt von „Bauen" zu „Auswählen und Schärfen". Das ist eine andere Kompetenz und braucht andere Trainingsroutinen als klassisches Programmieren.
2. **Audit-driven A11y statt Bauchgefühl.** Die Kontrast-Lücke wurde erst durch Lighthouse sichtbar — vorher fühlte sich das Design „elegant subtil" an. Ein automatisierter Audit hat in 30 Sekunden geliefert, was mit ungeschultem Auge nie gefunden worden wäre. → **These:** Automatisierte Audits sollten *vor* dem subjektiven Geschmacksurteil stehen, nicht danach. Sie verschieben den Standard von „sieht gut aus" zu „erfüllt nachweislich Kriterien".
3. **Marketing-Sprache als Eintrittsbarriere.** Die Hosting-Frage („Vercel oder Hostinger?") ist auf der Oberfläche eine Hosting-Frage, in Wahrheit ein Tooling-Mapping-Problem. Anbieter vermarkten ihre Produkte mit überlappenden Begriffen, sodass Einsteiger:innen nicht erkennen können, was wofür zuständig ist. Eine klare 60-Sekunden-Erklärung ersetzt stundenlange falsche Recherche oder hundertfränkische Fehlkäufe. → **Konkreter Datenpunkt für die Aktionsforschung.**
4. **CNAME-Wert-Verwechslung als Lernmoment.** Beim DNS-Setup war der erste Versuch falsch (`ns1.vercel-dns.com` statt `cname.vercel-dns.com`). Hätte man die Domain ohne Verifikation gespeichert, wäre die Site nicht erreichbar gewesen — und der Fehler hätte ohne `dig`-Kenntnis Stunden zur Diagnose gekostet. → **These:** Verifikations-Tools (dig, curl, Lighthouse) gehören in den Standard-Werkzeugkasten, *bevor* man sie braucht. Sie sind nicht nur Debugging-Tools, sondern Lern-Beschleuniger.
5. **Edge-Cache als „verschwiegenes" Feature.** Die zwei kurzen Stolpersteine (404 nach Push, gleicher Lighthouse-Score nach Fix) hatten beide dieselbe Ursache: Cache. Cache ist unsichtbar — es kommt keine Fehlermeldung, nur unerwartetes Verhalten. → **These:** Caching-Mental-Modelle gehören zu den schwierigsten Konzepten für Einsteiger:innen, weil sie keinen Trace produzieren. Hier hat KI-gestützte Diagnose („probier mal mit Cache-Buster") spürbar gegen Frust geholfen.

### Offen / Nächste Session
- **E-Mail-Setup** für `sulamith@sulamithrichter.ch` — iCloud Custom Domain als günstigste/eleganteste Variante (im iCloud+-Abo enthalten), MX-Records bei Hostpoint umstellen.
- **Google Search Console** einrichten — Domain-Property via TXT-Record verifizieren, Sitemap einreichen.
- **LinkedIn-Profil** im Header „Aktivitäten" auf `sulamithrichter.ch` verlinken.
- **Visitenkarten** (digital oder Print) mit Domain + Mail + QR.
- **Zweites bezahltes Kundenprojekt** — sobald vorhanden, in `components/Projects.tsx` ergänzen. Das Grid skaliert automatisch auf 3 Spalten ab `xl`.
- **Open-Graph-Test** mit echtem Sharing (LinkedIn, WhatsApp, iMessage) — visuell prüfen, ob das generierte PNG in den Vorschauen so wirkt wie geplant.
- **Falls statistisch sinnvoll:** Plausible Analytics einbinden (Schweizer Hosting, DSG-konform, keine Cookies).

### Bekannte Hinweise / Updates zu Session 1
- LinkedIn-URL ist jetzt der echte Profillink, nicht mehr Platzhalter.
- `metadataBase` zeigt korrekt auf `https://sulamithrichter.ch` (kein Update nötig).
- `--text-muted` wurde von 0.28 auf 0.55 erhöht — falls Section-Labels später wieder „subtiler" gewünscht sind, niedriger nicht unter 0.45 setzen, sonst kippt der Kontrast wieder unter WCAG.

---

## Session 3 — 2026-05-14 — Suchmaschinen-Indexierung via Google Search Console

### Ausgangslage
Die Site ist live, technisch sauber, OG-Image vorhanden. Damit Google die Seite findet, muss sie aber aktiv bei der **Google Search Console** angemeldet werden — Sitemap einreichen, Domain verifizieren, Crawl-Status beobachten.

### Property-Typ: Domain statt URL-Präfix

Search Console bietet zwei Verifikationswege:

| Option | Wie funktioniert die Verifikation | Was wird erfasst |
|---|---|---|
| **Domain** | DNS-TXT-Record | Alle Protokoll/Subdomain-Varianten (http/https/www/non-www) in einem |
| **URL-Präfix** | HTML-Datei, Meta-Tag oder Analytics | Nur exakt die angegebene URL-Variante |

**Entscheidung: Domain-Property.**

**Begründung:** Auch wenn das URL-Präfix-Verfahren einfacher zu verifizieren wäre (eine Datei hochladen), erfordert es separate Verifikationen pro Subdomain/Protokoll. Bei einer aktiven `https://`-Site mit `www.`-Redirect ist das mehrfacher Aufwand für den gleichen Effekt. Domain-Property ist zukunftssicher.

### Lernmoment 1 — DNS-RRset & TTL-Regel

Beim Eintragen des Google-Verification-TXT-Records bei Hostpoint kam die Fehlermeldung:

> *„Folgende Records können keine unterschiedliche TTL haben: sulamithrichter.ch TXT '...' TTL 300, sulamithrichter.ch TXT '...' TTL 3600"*

**Was ist passiert:** Der bestehende SPF-TXT (`v=spf1 redirect=spf.mail.hostpoint.ch`) hatte TTL 300, der neue Google-TXT war mit der Hostpoint-Default-TTL 3600 vorausgewählt. DNS verlangt aber, dass alle Records mit **identischem Namen UND identischem Typ** ein „RRset" bilden und denselben TTL haben.

**Fix:** TTL des neuen Records auf 300 abgesenkt, dann Speichern akzeptiert.

**Reflexionspunkt:** RRset ist ein Konzept aus dem DNS-Standard (RFC 2181), das in vielen UI-Erklärungen unterschlagen wird. Hostpoint zeigt dafür eine gute, präzise Fehlermeldung — andere Anbieter verschlucken den Fehler oder speichern inkonsistent. → **These:** Wenn ein Tool eine technisch korrekte Validierung *mit Erklärung* ausspielt, hilft das Einsteiger:innen mehr als jede Doku — der Fehler ist im Moment der Aktion, mit Kontext.

### Lernmoment 2 — Sitemap-Pfad-Eingabe bei Domain-Property

Beim Einreichen der Sitemap führte die intuitive Eingabe `https://sulamithrichter.ch/sitemap.xml` zur Fehlermeldung *„Ungültige Sitemap-Adresse"*.

**Grund:** Bei Domain-Properties hat Search Console die Domain bereits als Präfix gesetzt; das Eingabefeld erwartet nur den **relativen Pfad** (`sitemap.xml`). Die volle URL wurde intern zu `https://sulamithrichter.ch/https://sulamithrichter.ch/sitemap.xml` zusammengebaut und als ungültig abgewiesen.

**Fix:** Eingabe auf `sitemap.xml` (ohne Schrägstrich, ohne Domain) reduziert.

### Lernmoment 3 — „Konnte nicht abgerufen werden" als transientes Symptom

Nach erfolgreicher Einreichung zeigte die Tabelle:

```
Status: Konnte nicht abgerufen werden | Erkannte Seiten: 0
```

Diagnose mit `curl` (auch mit `-A "Googlebot/2.1"`-User-Agent) zeigte: HTTP 200, valides XML, korrekter `content-type: application/xml`. Die Sitemap war einwandfrei erreichbar.

**Ursache:** Google hat im Moment der Einreichung die Sitemap abzurufen versucht — dabei vermutlich noch eine 404-Antwort aus dem Vercel-Edge-Cache erhalten (wie bei den initialen Robots/Sitemap-Tests in Session 2). Status wurde gespeichert, aber **nicht automatisch erneut probiert**.

**Fix:** Sitemap-Eintrag manuell zum Re-Fetch zwingen (löschen + neu hinzufügen, oder „Erneut einreichen"). Resultat: Status auf „Erfolgreich", erste Seite erkannt.

**Reflexionspunkt:** Edge-Caching ist (wie schon in Session 2 festgestellt) ein wiederkehrender Stolperstein, weil es **kein Trace und keine sichtbare Fehlerursache** produziert. Tools wie Search Console melden Folgewirkungen („Sitemap nicht abrufbar"), nicht die Wurzel („404 aus Cache, der inzwischen invalidiert wurde"). → **These:** Beim Debugging muss man systematisch das *aktuelle* Verhalten verifizieren (curl, dig), nicht dem *gespeicherten* Status eines Drittsystems vertrauen.

### Erledigt in dieser Session
- [x] Google Search Console: Property `sulamithrichter.ch` als Domain-Type angelegt
- [x] DNS-TXT-Verification-Record bei Hostpoint hinzugefügt (TTL auf 300 angeglichen, SPF-Record geschont)
- [x] Verifikation per `dig` (beide TXT-Records sichtbar, gleicher TTL)
- [x] Search-Console-Verifikation erfolgreich durchgelaufen
- [x] Sitemap `sitemap.xml` eingereicht (nach Pfad-Korrektur)
- [x] Re-Fetch erzwungen → Status „Erfolgreich", 1 Seite erkannt

### Architektur-Entscheidungen mit Begründung (Session 3)
- **TXT-Records additiv, nicht überschrieben.** DNS erlaubt mehrere TXT-Records auf demselben Namen. Der existierende SPF *muss* bleiben (sonst landet Mail im Spam), der neue Google-Verification-Record kommt daneben. Begründung: Spezifikation erlaubt es, Praxis fordert es.
- **TTL auf 300 statt 3600.** Weniger Aufwand: nur ein Record musste angepasst werden statt zwei. Praktischer Vorteil: schnellere Änderungen möglich, falls später z.B. iCloud Custom Domain einen weiteren TXT erfordert.

### Reflexionspunkte für die Maturaarbeit (Session 3)
1. **DNS-Standards als unterschwellige Komplexität.** Drei Stolpersteine in dieser Session hatten alle ihre Ursache in präzisen DNS-Regeln (RRset-TTL, mehrere TXT pro Name, Caching-Verhalten). Keine davon ist „falsch" — alle sind Konsequenzen einer 30 Jahre alten, ausgereiften Spezifikation. Aber Einsteiger:innen treffen auf die Konsequenzen, ohne die Regeln zu kennen. → **These:** Bestimmte Technologien (DNS, HTTP, TLS) haben über Jahrzehnte gewachsene Regeln, die in UIs gar nicht erst erklärt werden — sie werden vorausgesetzt. KI-Assistenz kann diese „implizite Voraussetzung" sichtbar machen, sobald sie als Friktion auftritt.
2. **Tool-Fehlermeldungen als Lernkanal.** Die präzise Hostpoint-Fehlermeldung (mit Namen, Typ, beiden TTLs) ermöglichte das sofortige Verstehen des Problems — ohne sie hätte das gleiche Setup mit „Speichern fehlgeschlagen" mehrere Recherche-Runden gekostet. → **These:** Die Qualität der Fehlermeldungen eines Tools korreliert direkt mit der Lerngeschwindigkeit der Nutzenden. Das ist ein UX-Kriterium, das oft hinter „Hauptsache, es funktioniert" verschwindet.
3. **Asynchrone Drittsystem-Stati.** Google Search Console zeigte „Konnte nicht abgerufen werden", obwohl die Sitemap zum gleichen Zeitpunkt erreichbar war. Der gespeicherte Status spiegelt einen einzelnen vergangenen Zeitpunkt, nicht den aktuellen Zustand. → **These:** Drittsystem-Stati sind Schnappschüsse, keine Live-Wahrheit. Beim Debugging zuerst den aktuellen Zustand prüfen (curl/dig), dann die UI dazu zwingen, einen neuen Snapshot zu machen — nicht umgekehrt.

### Offen / Nächste Session
- **Indexierung beobachten:** In Search Console unter „Indexierung → Seiten" in den nächsten 1–3 Tagen prüfen, ob die Startseite tatsächlich indexiert wurde.
- **Site-Operator-Test:** Nach ~1 Woche im Google-Suchfeld `site:sulamithrichter.ch` eingeben — Erwartung: Startseite erscheint.
- **Manuelles Anstossen:** Falls die Indexierung nicht in 1 Woche da ist, in Search Console → „URL-Prüfung" → URL eingeben → „Indexierung beantragen" klicken.
- **Bing Webmaster Tools:** Optional ein zweites Mal denselben Vorgang für Bing (search.indexnow.org bzw. bing.com/webmasters) — Bing-Anteil in der Schweiz ist klein, aber kostenlos und in 5 Minuten erledigt.

---

