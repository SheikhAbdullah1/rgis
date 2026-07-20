"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

/**
 * RGIS Homepage Hero Slider
 * ---------------------------------------------------------
 * Design tokens
 * Color:  ink #0F1B2D · panel #16273D · brass #C89B3C (grants/prestige)
 *         teal #2E9C8F (discovery/growth) · paper #F5F3EC · slate #8FA3B8
 * Type:   display = Fraunces (institutional serif, used sparingly)
 *         body    = Inter
 *         utility = IBM Plex Mono (eyebrows, counters — "intelligence" feel)
 * Signature: a recurring node-network motif, redrawn per slide, standing
 *            literally for "Intelligence System" — nodes are funding
 *            sources/grant types/partners, lines are the connections RGIS
 *            makes between a researcher and an opportunity.
 * ---------------------------------------------------------
 * Drop-in notes for Next.js:
 *  - Swap the <a href> CTAs for <Link href="..."> from "next/link" once
 *    your real routes are wired in (currently placeholder "#" anchors).
 *  - Load fonts via next/font (Fraunces, Inter, IBM Plex Mono) and wire
 *    the CSS variables below to those font objects, or keep the Google
 *    Fonts <link> approach in layout.tsx.
 */

type MotifType = "globe" | "seals" | "match" | "institutions" | "path";

interface Slide {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  motif: MotifType;
}

const SLIDES: Slide[] = [
  {
    id: "global",
    eyebrow: "01 — Worldwide Reach",
    headline: "Connecting researchers with global funding",
    body: "Search and discover grants, scholarships, fellowships and research funds from HEC, government bodies, industry and international agencies — in one place.",
    cta: { label: "Search Grants", href: "#search" },
    secondary: { label: "Register Free", href: "#register" },
    motif: "globe",
  },
  {
    id: "opportunities",
    eyebrow: "02 — Every Opportunity",
    headline: "One platform. Unlimited opportunities.",
    body: "Grants, scholarships, fellowships, research funds and awards — filtered by discipline, funding size, deadline and eligibility.",
    cta: { label: "Explore Grants", href: "#grants" },
    secondary: { label: "View Scholarships", href: "#scholarships" },
    motif: "seals",
  },
  {
    id: "ai",
    eyebrow: "03 — Intelligent Matching",
    headline: "AI-powered grant intelligence",
    body: "RGIS matches your research profile and priorities with the funding opportunities most likely to fund it — automatically, and before the deadline passes.",
    cta: { label: "Find Your Next Grant", href: "#match" },
    secondary: { label: "How Matching Works", href: "#how-it-works" },
    motif: "match",
  },
  {
    id: "partnerships",
    eyebrow: "04 — Shared Networks",
    headline: "Building research partnerships worldwide",
    body: "Universities, industry, government and NGOs — connected through a single hub for joint research, consultancy and technology transfer.",
    cta: { label: "Find Collaborators", href: "#collaborate" },
    secondary: { label: "Become a Member", href: "#membership" },
    motif: "institutions",
  },
  {
    id: "proposal",
    eyebrow: "05 — From Idea to Impact",
    headline: "From research proposal to funded innovation",
    body: "Discover the right opportunity, build a stronger proposal with guided templates, and track it through to funding and impact.",
    cta: { label: "Submit a Proposal", href: "#proposal" },
    secondary: { label: "Start Your Journey", href: "#start" },
    motif: "path",
  },
];

const AUTO_ADVANCE_MS = 7000;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ---------- Signature motif: node-network SVGs, one per theme ---------- */

function NodeMotif({ type, reduced }: { type: MotifType; reduced: boolean }) {
  const cls = reduced ? "" : "motif-animate";
  switch (type) {
    case "globe":
      return (
        <svg viewBox="0 0 600 600" className={`motif ${cls}`} aria-hidden="true">
          <circle cx="300" cy="300" r="190" className="motif-ring" />
          <ellipse cx="300" cy="300" rx="190" ry="70" className="motif-ring-thin" />
          <ellipse cx="300" cy="300" rx="190" ry="130" className="motif-ring-thin" />
          <line x1="110" y1="300" x2="490" y2="300" className="motif-ring-thin" />
          {(
            [
              [300, 110], [430, 190], [470, 340], [370, 470],
              [210, 460], [130, 320], [180, 170], [300, 490],
            ] as [number, number][]
          ).map(([x, y], i) => (
            <g key={i}>
              <line x1="300" y1="300" x2={x} y2={y} className="motif-line" style={{ animationDelay: `${i * 0.18}s` }} />
              <circle cx={x} cy={y} r="6" className="motif-node" style={{ animationDelay: `${i * 0.18}s` }} />
            </g>
          ))}
          <circle cx="300" cy="300" r="10" className="motif-node-core" />
        </svg>
      );
    case "seals":
      return (
        <svg viewBox="0 0 600 600" className={`motif ${cls}`} aria-hidden="true">
          {[
            { cx: 220, cy: 230, r: 95 },
            { cx: 390, cy: 210, r: 70 },
            { cx: 360, cy: 380, r: 110 },
            { cx: 190, cy: 400, r: 60 },
          ].map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} className="motif-ring" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          <line x1="220" y1="230" x2="390" y2="210" className="motif-line" />
          <line x1="220" y1="230" x2="360" y2="380" className="motif-line" style={{ animationDelay: "0.2s" }} />
          <line x1="360" y1="380" x2="190" y2="400" className="motif-line" style={{ animationDelay: "0.4s" }} />
          {(
            [[220, 230], [390, 210], [360, 380], [190, 400]] as [number, number][]
          ).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" className="motif-node" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </svg>
      );
    case "match":
      return (
        <svg viewBox="0 0 600 600" className={`motif ${cls}`} aria-hidden="true">
          {[120, 200, 280, 360, 440].map((y, i) => (
            <g key={i}>
              <line x1="90" y1={y} x2="300" y2="300" className="motif-line" style={{ animationDelay: `${i * 0.15}s` }} />
              <circle cx="90" cy={y} r="6" className="motif-node" style={{ animationDelay: `${i * 0.15}s` }} />
            </g>
          ))}
          {[150, 300, 450].map((y, i) => (
            <g key={i}>
              <line x1="300" y1="300" x2="510" y2={y} className="motif-line" style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
              <circle cx="510" cy={y} r="6" className="motif-node" style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
            </g>
          ))}
          <circle cx="300" cy="300" r="14" className="motif-node-core" />
        </svg>
      );
    case "institutions":
      return (
        <svg viewBox="0 0 600 600" className={`motif ${cls}`} aria-hidden="true">
          {(() => {
            const pts: [number, number][] = [];
            const cx = 300, cy = 300, r = 150;
            for (let i = 0; i < 6; i++) {
              const a = (Math.PI / 3) * i - Math.PI / 2;
              pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
            }
            return (
              <>
                {pts.map((p, i) => {
                  const n = pts[(i + 1) % pts.length];
                  return <line key={i} x1={p[0]} y1={p[1]} x2={n[0]} y2={n[1]} className="motif-line" style={{ animationDelay: `${i * 0.12}s` }} />;
                })}
                {pts.map((p, i) => (
                  <line key={`s${i}`} x1={cx} y1={cy} x2={p[0]} y2={p[1]} className="motif-line" style={{ animationDelay: `${0.4 + i * 0.12}s` }} />
                ))}
                {pts.map((p, i) => (
                  <rect key={`r${i}`} x={p[0] - 9} y={p[1] - 9} width="18" height="18" className="motif-node-sq" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
                <circle cx={cx} cy={cy} r="11" className="motif-node-core" />
              </>
            );
          })()}
        </svg>
      );
    case "path":
    default:
      return (
        <svg viewBox="0 0 600 600" className={`motif ${cls}`} aria-hidden="true">
          {(() => {
            const pts: [number, number][] = [
              [80, 470], [190, 400], [270, 430], [360, 300], [440, 320], [520, 150],
            ];
            return (
              <>
                <polyline points={pts.map((p) => p.join(",")).join(" ")} className="motif-path" />
                {pts.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 12 : 7} className={i === pts.length - 1 ? "motif-node-core" : "motif-node"} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </>
            );
          })()}
        </svg>
      );
  }
}

/* ---------------------------- Main component ---------------------------- */

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length),
    []
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (!playing || reduced) return;
    timerRef.current = setTimeout(next, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, playing, reduced, next]);

  const slide = SLIDES[index];

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Research Grant Intelligence System — featured highlights"
    >
      <style>{`
        .hero {
          --ink: #0F1B2D;
          --panel: #16273D;
          --brass: #C89B3C;
          --teal: #2E9C8F;
          --paper: #F5F3EC;
          --slate: #8FA3B8;
          position: relative;
          background: radial-gradient(ellipse at 20% -10%, #1C3350 0%, var(--ink) 55%);
          color: var(--paper);
          overflow: hidden;
          min-height: 560px;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .hero-eyebrow {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brass);
        }
        .hero-headline {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.9rem, 4.2vw, 3.4rem);
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0.6rem 0 1rem;
          max-width: 16ch;
        }
        .hero-body {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          line-height: 1.6;
          color: var(--slate);
          max-width: 46ch;
          margin-bottom: 2rem;
        }
        .hero-cta-primary {
          background: var(--brass);
          color: var(--ink);
          font-weight: 600;
          padding: 0.85rem 1.6rem;
          border-radius: 2px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: transform 0.15s ease, background 0.15s ease;
          display: inline-block;
        }
        .hero-cta-primary:hover { background: #dcae52; transform: translateY(-1px); }
        .hero-cta-secondary {
          color: var(--paper);
          border: 1px solid rgba(245,243,236,0.28);
          padding: 0.85rem 1.6rem;
          border-radius: 2px;
          text-decoration: none;
          font-size: 0.95rem;
          margin-left: 0.75rem;
          display: inline-block;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .hero-cta-secondary:hover { border-color: var(--teal); background: rgba(46,156,143,0.1); }

        .motif { width: 100%; height: 100%; max-width: 460px; max-height: 460px; }
        .motif-ring { fill: none; stroke: rgba(200,155,60,0.35); stroke-width: 1.2; }
        .motif-ring-thin { fill: none; stroke: rgba(143,163,184,0.25); stroke-width: 1; }
        .motif-line { stroke: rgba(46,156,143,0.55); stroke-width: 1.2; }
        .motif-path { fill: none; stroke: var(--teal); stroke-width: 2; }
        .motif-node { fill: var(--teal); }
        .motif-node-sq { fill: var(--brass); }
        .motif-node-core { fill: var(--brass); }

        .motif-animate .motif-line,
        .motif-animate .motif-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: draw 1.1s ease forwards;
        }
        .motif-animate .motif-node,
        .motif-animate .motif-node-sq {
          opacity: 0;
          transform-origin: center;
          animation: pop 0.5s ease forwards;
        }
        .motif-animate .motif-node-core { animation: pulse 2.6s ease-in-out infinite; }
        .motif-animate .motif-ring { animation: fade-in 1s ease forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes pop { to { opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

        .hero-progress-track {
          height: 2px;
          background: rgba(245,243,236,0.14);
          position: relative;
          overflow: hidden;
        }
        .hero-progress-fill {
          position: absolute; inset: 0 auto 0 0;
          width: 0%;
          background: var(--teal);
        }
        .hero-progress-fill.animate {
          animation: fill-bar ${AUTO_ADVANCE_MS}ms linear forwards;
        }
        @keyframes fill-bar { from { width: 0%; } to { width: 100%; } }

        .hero-dot {
          width: 22px; height: 2px; background: rgba(245,243,236,0.3);
          border: none; cursor: pointer; transition: background 0.2s ease;
        }
        .hero-dot[aria-current="true"] { background: var(--brass); }
        .hero-arrow {
          background: rgba(245,243,236,0.06);
          border: 1px solid rgba(245,243,236,0.18);
          color: var(--paper);
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.15s ease;
        }
        .hero-arrow:hover { background: rgba(245,243,236,0.14); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-motif-wrap { display: none !important; }
        }
      `}</style>

      <div
        className="hero-grid"
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "1.1fr 0.9fr",
        //   alignItems: "center",
        //   gap: "2rem",
        //   padding: "clamp(2rem, 6vw, 5rem)",
        //   padding: "clamp(2rem, 6vw, 3rem)",
        //   minHeight: "500px",
        // }}
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: "2rem",
          padding: "clamp(2rem, 6vw, 3rem)",
          paddingLeft: "clamp(4rem, 10vw, 8rem)",
          minHeight: "500px",
        }}
      >
        <div>
          <p className="hero-eyebrow">{slide.eyebrow}</p>
          <h1 className="hero-headline">{slide.headline}</h1>
          <p className="hero-body">{slide.body}</p>
          <div>
            <a href={slide.cta.href} className="hero-cta-primary">{slide.cta.label}</a>
            <a href={slide.secondary.href} className="hero-cta-secondary">{slide.secondary.label}</a>
          </div>
        </div>

        <div className="hero-motif-wrap" style={{ display: "flex", justifyContent: "center" }}>
          <NodeMotif key={slide.id} type={slide.motif} reduced={reduced} />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0 clamp(2rem, 6vw, 5rem) 1.5rem", paddingLeft: "clamp(4rem, 8vw, 8rem)", }}>
        <button className="hero-arrow" onClick={prev} aria-label="Previous slide">
          <ArrowLeft size={16} />
        </button>
        <button className="hero-arrow" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button className="hero-arrow" onClick={next} aria-label="Next slide">
          <ArrowRight size={16} />
        </button>

        <div style={{ display: "flex", gap: "0.4rem", marginLeft: "0.5rem" }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className="hero-dot"
              aria-current={i === index}
              aria-label={`Go to slide ${i + 1}: ${s.headline}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "var(--slate)", marginLeft: "auto" }}>
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="hero-progress-track">
        <div key={index} className={`hero-progress-fill ${playing && !reduced ? "animate" : ""}`} />
      </div>
    </section>
  );
}