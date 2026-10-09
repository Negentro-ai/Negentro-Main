import { useEffect, useState, type ReactNode } from "react";

const HERO_FACTS = [
  ["Base", "Isolated per-student memory"],
  ["Memory", "Context that grows across sessions"],
  ["Extract", "Lectures become searchable knowledge"],
  ["Deep search", "Course material searchable by meaning"],
];

/* Each session step adds facts to the learner's memory */
const STEPS = [
  {
    title: "First session",
    note: "The first session creates context.",
    adds: [{ k: "Interest", v: "Physics applications" }, { k: "Goal", v: "Calculus fundamentals" }],
    reply: "Let's start with limits, using motion examples from physics.",
  },
  {
    title: "Known strengths",
    note: "What the learner already handles well is kept.",
    adds: [{ k: "Strength", v: "Derivatives of polynomials" }],
    reply: "You're solid on derivatives, so we'll move faster through that part.",
  },
  {
    title: "Learning gaps",
    note: "Recurring difficulties are noticed and stored.",
    adds: [{ k: "Difficulty", v: "Struggles with substitution" }],
    reply: "Substitution tripped you up twice. Let's slow down on that step.",
  },
  {
    title: "Learning history",
    note: "Progress and habits build a timeline.",
    adds: [{ k: "Progress", v: "Module 04 complete" }, { k: "Behaviour", v: "Works late evenings" }],
    reply: "Module 04 is done. Ready for Chapter 05, integration by parts?",
  },
  {
    title: "Personalised next session",
    note: "The next interaction starts with all of it.",
    adds: [{ k: "Preference", v: "Prefers visual explanations" }],
    reply: "Here's integration by parts as a diagram, with a physics example to start.",
  },
];

const BLOCKS = [
  { title: "Tutoring copilots", text: "Remember progress, strengths, gaps and preferences so each session starts with context.", icon: "M12 4a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4ZM5 20c1-3.5 3.7-5.5 7-5.5s6 2 7 5.5" },
  { title: "Lecture & course search", text: "Make recordings searchable by meaning and help learners jump straight to the right moment.", icon: "M4 6.5h16v11H4zM10 9.5v5l4.5-2.5L10 9.5Z" },
  { title: "Queryable course libraries", text: "Let learners and agents ask questions across textbooks, notes, transcripts and course material.", icon: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 0 4 21.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5Z" },
  { title: "Adaptive learning platforms", text: "Personalise at scale with persistent memory isolated to each learner.", icon: "M4 18 9 12l4 3 7-9M15 6h5v5" },
];

const INFRA = [
  { title: "Personalisation that persists", text: "A useful tutor remembers what each learner knows, struggles with and prefers, then uses that context in the next session." },
  { title: "Isolation at learner scale", text: "Each student's memory stays separate by design, giving multi-tenant learning platforms a reliable foundation." },
  { title: "Lectures you can actually search", text: "Transcribe audio and video, then retrieve the relevant moment by meaning instead of hunting through recordings." },
  { title: "Course knowledge that answers back", text: "Retrieve relevant passages across textbooks, notes and transcripts even when the learner's wording does not match the source." },
];

const ENGINE = [
  { title: "Extract", text: "Transform interaction into reusable knowledge" },
  { title: "Search", text: "Retrieve relevant context" },
  { title: "Knowledge", text: "Course material and learner signals" },
  { title: "Retrieval system", text: "Semantic retrieval and relevant results" },
];

// Answers marked * were written for this page; check them before going live.
const FAQ = [
  { q: "How does a tutor know what a student has already learned?", a: "PiyAPI stores memory scoped to the learner, so each session can retrieve what was previously learned, what remains difficult and what should be revisited." },
  { q: "How are different students kept separate?", a: "Each learner gets an isolated memory. One student's history is never retrieved for another, which keeps multi-tenant platforms safe by design." },
  { q: "Can PiyAPI transcribe and search lectures?", a: "Yes. Audio and video are transcribed and indexed, so learners can retrieve the relevant moment by meaning instead of scrubbing through recordings." },
  { q: "Does learner memory change as the student improves?", a: "Yes. New strengths, resolved gaps and fresh progress update the memory, so the next session reflects where the learner is now." },
  { q: "Can shared course material stay separate from private learner memory?", a: "Yes. Course knowledge is shared and available for retrieval, while each learner's personal memory stays private to them." },
  { q: "Is PiyAPI a finished learning product?", a: "No. PiyAPI is the memory infrastructure. You build the tutoring copilot, search or learning platform on top of it." },
];

const OTHER = [
  "Legal & Compliance", "E-commerce & Retail", "Media & Entertainment", "HR & Recruiting", "Finance & Accounting",
  "Consulting & Enterprise", "SaaS & Dev Tools", "Customer Support", "Healthcare & Medical",
];

const Arrow = () => (
  <svg className="ed-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);
const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
function Btn({ kind = "primary", href = "#", children }: { kind?: string; href?: string; children: ReactNode }) {
  return <a className={`ed-btn ed-btn--${kind}`} href={href}>{children}<Arrow /></a>;
}

/* Signature: step through sessions and watch the learner's memory build up */
function SessionMemory() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3200);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i: number) => { setAuto(false); setStep(i); };
  const facts = STEPS.slice(0, step + 1).flatMap((s, i) => s.adds.map((f) => ({ ...f, fresh: i === step })));
  const cur = STEPS[step];

  return (
    <div className="ed-sm">
      <ol className="ed-sm__steps" aria-label="Sessions">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button type="button" className={`${i === step ? "is-on" : ""} ${i < step ? "is-done" : ""}`} aria-pressed={i === step} onClick={() => pick(i)}>
              <span className="ed-sm__dot" aria-hidden="true" />
              <span className="ed-sm__step">{s.title}</span>
              <span className="ed-sm__note">{s.note}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="ed-sm__panel">
        <div className="ed-sm__head">
          <span>Learner memory</span>
          <span className="ed-sm__count">{facts.length} signals</span>
        </div>
        <ul className="ed-sm__facts">
          {facts.map((f) => (
            <li key={f.k + f.v} className={f.fresh ? "is-fresh" : ""}>
              <span className="ed-sm__k">{f.k}</span>
              <span className="ed-sm__v">{f.v}</span>
            </li>
          ))}
        </ul>
        <div className="ed-sm__reply" aria-live="polite">
          <span className="ed-sm__label">Copilot, next reply</span>
          <p key={step}>{cur.reply}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="ed-faq">
      {FAQ.map((f, i) => (
        <div className={`ed-faq__item ${open === i ? "is-open" : ""}`} key={f.q}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <span className="ed-faq__sign" aria-hidden="true" />
          </button>
          <div className="ed-faq__body"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

export default function EducationPage() {
  return (
    <main className="ed">
      <style>{CSS}</style>

      {/* Hero */}
      <section className="ed-hero">
        <div className="ed-wrap">
          <div className="ed-hero__grid">
            <div className="ed-hero__copy">
              <h1 className="ed-title">AI infrastructure for learning systems.</h1>
              <p className="ed-lede">
                Build tutoring copilots, course search and adaptive learning products on persistent, per-student memory:
                infrastructure that lets every session build on the last.
              </p>
              <div className="ed-actions">
                <Btn>Start building</Btn>
                <Btn kind="quiet">Read the docs</Btn>
              </div>
            </div>
            <dl className="ed-hero__facts">
              {HERO_FACTS.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Every session adds useful context */}
      <section className="ed-sec" aria-labelledby="ed-sessions">
        <div className="ed-wrap">
          <div className="ed-head">
            <h2 id="ed-sessions" className="ed-h2">Every session adds useful context.</h2>
            <p className="ed-sub">PiyAPI remembers what matters across sessions, so a learning copilot can respond with a deeper understanding of each learner.</p>
          </div>
          <SessionMemory />
        </div>
      </section>

      {/* Why */}
      <section className="ed-sec ed-why" aria-labelledby="ed-why">
        <div className="ed-wrap ed-why__grid">
          <h2 id="ed-why" className="ed-h2">Personalised learning needs memory.</h2>
          <div className="ed-why__text">
            <p>A tutor cannot adapt to a learner it cannot remember. PiyAPI keeps track of what a student has learned, where they struggle, and what matters to them across sessions.</p>
            <p>Give every learner an isolated memory that evolves over time, while shared course knowledge stays available for retrieval when it is needed.</p>
          </div>
        </div>
      </section>

      {/* Building blocks */}
      <section className="ed-sec" aria-labelledby="ed-blocks">
        <div className="ed-wrap">
          <h2 id="ed-blocks" className="ed-h2 ed-head">Four building blocks, one memory layer.</h2>
          <div className="ed-blocks">
            {BLOCKS.map((b) => (
              <article className="ed-block" key={b.title}>
                <span className="ed-block__icon"><Icon d={b.icon} /></span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="ed-infra" aria-labelledby="ed-infra">
        <div className="ed-wrap">
          <h2 id="ed-infra" className="ed-h2">The infrastructure underneath adaptive learning.</h2>
          <div className="ed-infra__grid">
            <ul className="ed-infra__list">
              {INFRA.map((f) => <li key={f.title}><h3>{f.title}</h3><p>{f.text}</p></li>)}
            </ul>

            <figure className="ed-arch" aria-label="Architecture: student and session feed persistent memory, which powers extract, search, knowledge and retrieval">
              <div className="ed-arch__inputs">
                <div className="ed-arch__in"><b>Student</b><span>Learner identity</span></div>
                <div className="ed-arch__in"><b>Session</b><span>Current interaction</span></div>
              </div>
              <div className="ed-arch__core">
                <span className="ed-arch__eyebrow">Context engine</span>
                <b>Persistent Memory</b>
                <span className="ed-arch__ops">Store, retrieve, recall</span>
              </div>
              <div className="ed-arch__outs">
                {ENGINE.map((e) => <div className="ed-arch__out" key={e.title}><b>{e.title}</b><span>{e.text}</span></div>)}
              </div>
              <figcaption className="ed-arch__loop">
                {["Session", "Context", "Memory", "Next session"].map((s, i) => (
                  <span className="ed-arch__step" key={s}>{i > 0 && <Arrow />}<span>{s}</span></span>
                ))}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ed-sec" aria-labelledby="ed-faq">
        <div className="ed-wrap ed-faq__grid">
          <h2 id="ed-faq" className="ed-h2">Frequently asked about learner memory.</h2>
          <Faq />
        </div>
      </section>

      {/* Other industries */}
      <section className="ed-sec ed-other" aria-labelledby="ed-other">
        <div className="ed-wrap">
          <div className="ed-other__head">
            <h2 id="ed-other" className="ed-h2">Explore other industries.</h2>
            <a href="/industries" className="ed-link">All industries<Arrow /></a>
          </div>
          <ul className="ed-other__list">
            {OTHER.map((o) => (
              <li key={o}><a href="#">{o}<Arrow /></a></li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="ed-cta" aria-labelledby="ed-cta">
        <div className="ed-wrap ed-cta__grid">
          <h2 id="ed-cta" className="ed-cta__title">Give every learner a memory that grows with them.</h2>
          <div className="ed-cta__side">
            <p>Build tutoring and learning systems that remember context, retrieve knowledge and personalise every interaction.</p>
            <div className="ed-actions">
              <Btn kind="white">Start building</Btn>
              <Btn kind="ghost">Read the docs</Btn>
              <Btn kind="ghost" href="/company#contact">Talk to us</Btn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =================================================================== */
/*  Styles                                                             */
/* =================================================================== */
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&display=swap");

.ed {
  --white: #ffffff; --aura: #f9f8ff; --lavender: #eccdf5; --gayo: #765dfb; --indigo: #4846ac;
  --ink: #00050e; --ink-2: #444759; --ink-3: #6b6e80; --rule: #e7e3f5; --track: #e4defa; --tint: #f1eeff;
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);
  display: block; background: var(--white); color: var(--ink);
  font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif; font-size: 16px; line-height: 1.6;
  -webkit-font-smoothing: antialiased; overflow-x: clip;
}
.ed *, .ed *::before, .ed *::after { box-sizing: border-box; }
:where(.ed) :where(h1, h2, h3, p, dl, dd, ol, ul, figure) { margin: 0; padding: 0; }
:where(.ed) :where(ol, ul) { list-style: none; }
:where(.ed) :where(a) { color: inherit; text-decoration: none; }
:where(.ed) :where(button) { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; text-align: left; }
.ed :focus-visible { outline: 2px solid var(--gayo); outline-offset: 3px; border-radius: 8px; }

.ed-wrap { max-width: 1240px; margin: 0 auto; padding-inline: clamp(16px, 4vw, 40px); }
.ed-arrow { flex: none; width: 16px; height: 16px; transition: transform 0.25s var(--ease); }
.ed-sec { padding-block: clamp(64px, 8vw, 112px); }
.ed-head { display: grid; gap: 14px; max-width: 720px; margin-bottom: clamp(32px, 4vw, 52px); }

.ed-title { font-weight: 500; font-size: clamp(2.8rem, 6.2vw, 5.6rem); line-height: 0.98; letter-spacing: -0.055em; text-wrap: balance; max-width: 12ch; }
.ed-h2 { font-weight: 500; font-size: clamp(2rem, 3.8vw, 3.2rem); line-height: 1.05; letter-spacing: -0.045em; text-wrap: balance; }
.ed-lede { font-size: clamp(17px, 1.5vw, 19px); line-height: 1.6; color: var(--ink-2); max-width: 46ch; }
.ed-sub { font-size: 17px; color: var(--ink-2); max-width: 58ch; }

.ed-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.ed-btn { display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 20px; border-radius: 999px; font-size: 15px; font-weight: 500; transition: background 0.2s, box-shadow 0.2s; }
.ed-btn:hover .ed-arrow { transform: translateX(3px); }
.ed-btn--primary { background: var(--gayo); color: #fff; }
.ed-btn--primary:hover { background: var(--indigo); }
.ed-btn--quiet { color: var(--gayo); background: var(--white); box-shadow: inset 0 0 0 1px var(--rule); }
.ed-btn--quiet:hover { box-shadow: inset 0 0 0 1px var(--gayo); }
.ed-btn--white { background: #fff; color: var(--gayo); }
.ed-btn--white:hover { background: var(--tint); }
.ed-btn--ghost { color: #fff; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35); }
.ed-btn--ghost:hover { box-shadow: inset 0 0 0 1px #fff; }
.ed-link { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; color: var(--gayo); }
.ed-link:hover .ed-arrow { transform: translateX(3px); }

/* hero */
.ed-hero { padding-block: clamp(56px, 7vw, 96px) clamp(56px, 7vw, 96px); }
.ed-hero__grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: clamp(32px, 5vw, 80px); align-items: end; }
.ed-hero__copy { display: grid; gap: 26px; }
.ed-hero__facts { border-radius: 20px; padding: 6px 22px; background: var(--white); border: 1px solid var(--rule); box-shadow: 0 30px 60px -44px rgba(72, 70, 172, 0.5); }
.ed-hero__facts > div { display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 16px 0; }
.ed-hero__facts > div + div { border-top: 1px solid var(--rule); }
.ed-hero__facts dt { font-size: 14px; font-weight: 500; color: var(--gayo); }
.ed-hero__facts dd { font-size: 15px; color: var(--ink-2); }

/* session memory */
.ed-sm { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: clamp(24px, 4vw, 56px); align-items: start; }
.ed-sm__steps { position: relative; display: grid; }
.ed-sm__steps::before { content: ""; position: absolute; left: 7px; top: 22px; bottom: 22px; width: 2px; background: var(--track); }
.ed-sm__steps button { position: relative; display: grid; grid-template-columns: 16px 1fr; column-gap: 18px; width: 100%; padding: 14px 12px 14px 0; border-radius: 12px; }
.ed-sm__dot { grid-row: 1 / span 2; width: 16px; height: 16px; margin-top: 4px; border-radius: 50%; background: var(--white); box-shadow: inset 0 0 0 2px var(--track); transition: background 0.25s, box-shadow 0.25s; }
.ed-sm__step { font-size: 18px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink-3); transition: color 0.2s; }
.ed-sm__note { grid-column: 2; display: grid; grid-template-rows: 0fr; overflow: hidden; font-size: 14.5px; color: var(--ink-2); transition: grid-template-rows 0.3s var(--ease); }
.ed-sm__steps button:hover .ed-sm__step { color: var(--ink); }
.ed-sm__steps button.is-done .ed-sm__dot { background: var(--gayo); box-shadow: none; }
.ed-sm__steps button.is-done .ed-sm__step { color: var(--ink-2); }
.ed-sm__steps button.is-on .ed-sm__dot { background: var(--white); box-shadow: inset 0 0 0 5px var(--gayo), 0 0 0 5px var(--tint); }
.ed-sm__steps button.is-on .ed-sm__step { color: var(--ink); }
.ed-sm__steps button.is-on .ed-sm__note { margin-top: 4px; }

.ed-sm__panel { display: grid; border-radius: 24px; overflow: hidden; border: 1px solid var(--rule); background: var(--white); box-shadow: 0 40px 80px -56px rgba(72, 70, 172, 0.55); }
.ed-sm__head { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--rule); font-size: 14px; font-weight: 500; }
.ed-sm__count { font-size: 13px; font-weight: 500; color: var(--gayo); padding: 2px 10px; border-radius: 99px; background: var(--tint); font-variant-numeric: tabular-nums; }
.ed-sm__facts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 20px; min-height: 236px; align-content: start; background: var(--aura); }
.ed-sm__facts li { display: grid; gap: 2px; padding: 12px 14px; border-radius: 14px; background: var(--white); border: 1px solid var(--rule); }
.ed-sm__facts li.is-fresh { border-color: #cfc6f8; box-shadow: 0 0 0 3px var(--tint); animation: ed-pop 0.45s var(--ease); }
@keyframes ed-pop { from { opacity: 0; transform: translateY(6px) scale(0.98); } }
.ed-sm__k { font-size: 12.5px; font-weight: 500; color: var(--gayo); }
.ed-sm__v { font-size: 15px; }
.ed-sm__reply { display: grid; gap: 6px; padding: 20px 22px; background: var(--ink); color: #fff; }
.ed-sm__label { font-size: 12.5px; color: #b6a8ff; }
.ed-sm__reply p { font-size: 16.5px; line-height: 1.5; animation: ed-pop 0.4s var(--ease); }

/* why */
.ed-why { background: var(--aura); }
.ed-why__grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
.ed-why__text { display: grid; gap: 18px; font-size: 18px; line-height: 1.65; color: var(--ink-2); max-width: 56ch; }

/* blocks */
.ed-blocks { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.ed-block { display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: 22px; border: 1px solid var(--rule); transition: border-color 0.2s, background 0.25s; }
.ed-block:hover { border-color: #cfc6f8; background: var(--aura); }
.ed-block__icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; background: var(--tint); color: var(--gayo); margin-bottom: 12px; }
.ed-block h3 { font-size: 19px; font-weight: 500; letter-spacing: -0.025em; line-height: 1.25; }
.ed-block p { font-size: 15px; color: var(--ink-2); }

/* infrastructure */
.ed-infra { padding-block: clamp(72px, 9vw, 120px); background: var(--ink); color: #fff; }
.ed-infra .ed-h2 { max-width: 18ch; margin-bottom: clamp(36px, 5vw, 56px); }
.ed-infra__grid { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
.ed-infra__list li { display: grid; gap: 6px; padding: 22px 0; border-top: 1px solid rgba(255, 255, 255, 0.12); }
.ed-infra__list li:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.12); }
.ed-infra__list h3 { font-size: 19px; font-weight: 500; letter-spacing: -0.02em; }
.ed-infra__list p { font-size: 15px; color: rgba(255, 255, 255, 0.66); max-width: 50ch; }

.ed-arch { display: grid; gap: 0; justify-items: center; padding: clamp(20px, 3vw, 32px); border-radius: 26px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); }
.ed-arch__inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.ed-arch__in, .ed-arch__out { display: grid; gap: 2px; padding: 14px 16px; border-radius: 14px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); }
.ed-arch__in b, .ed-arch__out b { font-size: 15px; font-weight: 500; }
.ed-arch__in span, .ed-arch__out span { font-size: 13px; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
.ed-arch__core {
  position: relative; display: grid; justify-items: center; gap: 4px; width: 78%; margin-block: 34px; padding: 22px 16px; border-radius: 18px; text-align: center;
  background: radial-gradient(80% 90% at 50% 0%, rgba(236, 205, 245, 0.35), transparent 70%), linear-gradient(150deg, #8b76fc, var(--gayo) 50%, var(--indigo));
  box-shadow: 0 0 0 6px rgba(118, 93, 251, 0.18), 0 30px 60px -20px rgba(118, 93, 251, 0.6);
}
.ed-arch__core::before, .ed-arch__core::after { content: ""; position: absolute; left: 50%; width: 2px; height: 34px; background: repeating-linear-gradient(#b6a8ff 0 4px, transparent 4px 8px); }
.ed-arch__core::before { bottom: 100%; }
.ed-arch__core::after { top: 100%; }
.ed-arch__eyebrow { font-size: 12.5px; color: rgba(255, 255, 255, 0.8); }
.ed-arch__core b { font-size: clamp(22px, 2.4vw, 28px); font-weight: 500; letter-spacing: -0.03em; }
.ed-arch__ops { font-size: 13px; color: rgba(255, 255, 255, 0.8); }
.ed-arch__outs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
.ed-arch__loop { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px; margin-top: 22px; font-size: 13px; color: rgba(255, 255, 255, 0.7); }
.ed-arch__step { display: inline-flex; align-items: center; gap: 6px; }
.ed-arch__step .ed-arrow { width: 13px; height: 13px; color: #b6a8ff; }
.ed-arch__step > span { padding: 4px 12px; border-radius: 99px; border: 1px solid rgba(255, 255, 255, 0.16); }
.ed-arch__step:last-child > span { color: #fff; border-color: var(--gayo); background: rgba(118, 93, 251, 0.25); }

/* faq */
.ed-faq__grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
.ed-faq { border-bottom: 1px solid var(--rule); }
.ed-faq__item { border-top: 1px solid var(--rule); }
.ed-faq__item > button { display: flex; justify-content: space-between; align-items: center; gap: 20px; width: 100%; padding: 20px 0; font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
.ed-faq__item > button:hover { color: var(--gayo); }
.ed-faq__sign { position: relative; flex: none; width: 28px; height: 28px; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--rule); transition: background 0.2s, box-shadow 0.2s; }
.ed-faq__sign::before, .ed-faq__sign::after { content: ""; position: absolute; left: 50%; top: 50%; width: 11px; height: 1.6px; margin: -0.8px 0 0 -5.5px; border-radius: 2px; background: var(--gayo); transition: transform 0.3s var(--ease), background 0.2s; }
.ed-faq__sign::after { transform: rotate(90deg); }
.ed-faq__item.is-open .ed-faq__sign { background: var(--gayo); box-shadow: none; }
.ed-faq__item.is-open .ed-faq__sign::before, .ed-faq__item.is-open .ed-faq__sign::after { background: #fff; }
.ed-faq__item.is-open .ed-faq__sign::after { transform: rotate(0); }
.ed-faq__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s var(--ease); }
.ed-faq__body p { overflow: hidden; font-size: 16px; color: var(--ink-2); max-width: 62ch; }
.ed-faq__item.is-open .ed-faq__body { grid-template-rows: 1fr; }
.ed-faq__item.is-open .ed-faq__body p { padding-bottom: 22px; }

/* other industries */
.ed-other { padding-top: 0; }
.ed-other__head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 12px 24px; margin-bottom: 24px; padding-top: clamp(48px, 6vw, 80px); border-top: 1px solid var(--rule); }
.ed-other__list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--rule); }
.ed-other__list li { border-bottom: 1px solid var(--rule); }
.ed-other__list li:not(:nth-child(3n)) { border-right: 1px solid var(--rule); }
.ed-other__list a { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 22px 20px; font-size: 17px; font-weight: 500; letter-spacing: -0.015em; transition: background 0.2s, color 0.2s; }
.ed-other__list .ed-arrow { color: var(--ink-3); }
.ed-other__list a:hover { background: var(--aura); color: var(--gayo); }
.ed-other__list a:hover .ed-arrow { color: var(--gayo); transform: translateX(3px); }

/* cta */
.ed-cta { padding-block: clamp(72px, 9vw, 120px); background: radial-gradient(50% 80% at 90% 0%, rgba(118, 93, 251, 0.35), transparent 70%), var(--ink); color: #fff; }
.ed-cta__grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 32px 64px; align-items: end; }
.ed-cta__title { font-weight: 500; font-size: clamp(2.4rem, 5vw, 4.4rem); line-height: 1; letter-spacing: -0.05em; text-wrap: balance; }
.ed-cta__side { display: grid; gap: 22px; }
.ed-cta__side p { font-size: 17px; color: rgba(255, 255, 255, 0.72); max-width: 44ch; }

/* responsive */
@media (max-width: 1000px) {
  .ed-hero__grid, .ed-sm, .ed-why__grid, .ed-infra__grid, .ed-faq__grid, .ed-cta__grid { grid-template-columns: 1fr; }
  .ed-blocks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ed-other__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ed-other__list li:not(:nth-child(3n)) { border-right: 0; }
  .ed-other__list li:nth-child(odd) { border-right: 1px solid var(--rule); }
}
@media (max-width: 640px) {
  .ed-blocks, .ed-other__list, .ed-sm__facts, .ed-arch__outs { grid-template-columns: 1fr; }
  .ed-other__list li:nth-child(odd) { border-right: 0; }
  .ed-hero__facts > div { grid-template-columns: 1fr; gap: 2px; }
  .ed-arch__core { width: 100%; }
  .ed-sm__facts { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ed *, .ed *::before, .ed *::after { transition-duration: 0s !important; animation: none !important; }
}
`;
