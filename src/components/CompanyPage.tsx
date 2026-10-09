import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./css/CompanyPage.css";

/* Principles + demo content (PiyAPI README) */
const PRINCIPLES = [
  { title: "Remember like people do", text: "Memory should know when something was true, notice when it stops being true, and let go of what no longer matters." },
  { title: "Memory you own", text: "The same API runs in our cloud or as a single binary on your own machine, fully offline if you need it to be." },
  { title: "Private by default", text: "PII and PHI redaction, namespace isolation and data residency are part of the core, not an add-on." },
];

/* Hero demo: one user, three sessions */
const SESSIONS = [
  { when: "Session 1, January", said: "I'm vegetarian, and I live in Pune." },
  { when: "Session 6, March", said: "We just moved to Berlin." },
];
const ASK = "Can you find a dinner place near home?";
const ANSWER = {
  on: "Here are three vegetarian places close to you in Berlin.",
  off: "Sure. Which city are you in, and do you have any dietary needs?",
};
const FACTS = [
  { k: "diet", v: "vegetarian", span: "January to now" },
  { k: "city", v: "Pune", span: "January to March", old: true },
  { k: "city", v: "Berlin", span: "March to now" },
];

/* Negentro logomark, traced from the brand guide: [x0, x1, y, halfThickness] */
const LOGOMARK = [
  [-0.3317, 0.5346, -0.8079, 0.0453], [-0.6587, -0.2076, -0.6897, 0.0465], [-0.0549, 0.7637, -0.5752, 0.0465],
  [-0.8687, 0.0095, -0.4618, 0.0453], [0.0859, 0.9308, -0.3425, 0.0453], [-0.9761, -0.1098, -0.2279, 0.0453],
  [0.1456, 1.0, -0.1158, 0.0453], [-1.0, -0.1384, 0.0, 0.0489], [0.1456, 1.0, 0.1169, 0.0465],
  [-0.9761, -0.1098, 0.2303, 0.0453], [0.0859, 0.9308, 0.3437, 0.0465], [-0.8687, 0.0095, 0.4642, 0.0453],
  [-0.0549, 0.7637, 0.5764, 0.0453], [-0.6587, -0.2053, 0.6897, 0.0442], [-0.3317, 0.5346, 0.8055, 0.0477],
];

/* =================================================================== */
/*  Helpers                                                            */
/* =================================================================== */
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

class LatitudeArc extends THREE.Curve<THREE.Vector3> {
  r!: number; y!: number; a0!: number; a1!: number;
  constructor(r: number, y: number, a0: number, a1: number) { super(); Object.assign(this, { r, y, a0, a1 }); }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = this.a0 + (this.a1 - this.a0) * t;
    return target.set(Math.sin(a) * this.r, this.y, Math.cos(a) * this.r);
  }
}

/* =================================================================== */
/*  3D: the logomark globe assembles out of loose dashes, on black.    */
/*  Plays once, the first time the manifesto scrolls into view.        */
/* =================================================================== */
function useGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x00050e, 9.6, 14.8);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    scene.add(new THREE.HemisphereLight(0xf3eaff, 0x1a1640, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(3, 5, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0xeccdf5, 2.4); rim.position.set(-6, 2, -4); scene.add(rim);

    const S = 2.2, rand = rng(23);
    const top = new THREE.Color(0xeccdf5), mid = new THREE.Color(0x8f7afc), bot = new THREE.Color(0x765dfb);
    const globe = new THREE.Group();
    scene.add(globe);
    const capGeo = new THREE.SphereGeometry(1, 14, 10);
    const pieces: any[] = [];

    [0, Math.PI].forEach((turn, back) => {
      LOGOMARK.forEach(([x0, x1, yn, hn], i) => {
        const y = -yn * S, r = Math.sqrt(Math.max(1 - yn * yn, 1e-4)) * S, thick = hn * S;
        const ang = (x: number) => Math.asin(Math.max(-1, Math.min(1, (x * S) / r)));
        const arc = new LatitudeArc(r, y, ang(x0 + hn), ang(x1 - hn));
        const k = (yn + 1) / 2;
        const color = k < 0.5 ? top.clone().lerp(mid, k * 2) : mid.clone().lerp(bot, (k - 0.5) * 2);
        const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.1, emissive: color, emissiveIntensity: 0.08 });
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.TubeGeometry(arc, 40, thick, 14, false), mat));
        for (const t of [0, 1]) { const c = new THREE.Mesh(capGeo, mat); c.scale.setScalar(thick); arc.getPoint(t, c.position); g.add(c); }
        const holder = new THREE.Group(); holder.rotation.y = turn; holder.add(g); globe.add(holder);
        pieces.push({ g, order: i + back * 15 });
      });
    });

    const noiseGeo = new THREE.CapsuleGeometry(0.03, 0.26, 4, 8); noiseGeo.rotateZ(Math.PI / 2);
    const noiseMat = new THREE.MeshStandardMaterial({ color: 0xb6a8ff, roughness: 0.4, transparent: true, opacity: 0.7 });
    const NOISE = 150;
    const noise = new THREE.InstancedMesh(noiseGeo, noiseMat, NOISE);
    noise.frustumCulled = false;
    const nData = Array.from({ length: NOISE }, (_, i) => {
      const a = (i / NOISE) * Math.PI * 2, rr = 2.85 + (rand() - 0.5) * 0.2;
      return {
        from: new THREE.Vector3((rand() - 0.5) * 16, (rand() - 0.5) * 9, (rand() - 0.5) * 6),
        fromRot: new THREE.Euler(rand() * 6, rand() * 6, rand() * 6),
        to: new THREE.Vector3(Math.cos(a) * rr, (rand() - 0.5) * 0.1, Math.sin(a) * rr),
        toRot: new THREE.Euler(0, -a + Math.PI / 2, 0),
        delay: rand() * 0.8,
      };
    });
    const ring = new THREE.Group(); ring.add(noise); ring.rotation.x = 0.4; ring.rotation.z = -0.2; scene.add(ring);

    pieces.forEach((p) => {
      p.from = new THREE.Vector3((rand() - 0.5) * 14, (rand() - 0.5) * 8, (rand() - 0.5) * 5);
      p.fromQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(rand() * 6, rand() * 6, rand() * 6));
      p.delay = 0.2 + p.order * 0.03 + rand() * 0.25;
    });

    const q0 = new THREE.Quaternion(), qa = new THREE.Quaternion(), qb = new THREE.Quaternion();
    const m = new THREE.Matrix4(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);
    const mouse = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
    const onMove = (e: any) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      const s = Math.min(1, camera.aspect) * 0.95;
      globe.scale.setScalar(s); ring.scale.setScalar(s);
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    const still = reducedMotion();
    let raf = 0, t0: number | null = null, visible = false;
    const frame = (now: number) => {
      if (t0 === null) t0 = now;
      const t = still ? 100 : (now - t0) / 1000;
      for (const p of pieces) {
        const k = ease(Math.min(Math.max((t - p.delay) / 1.8, 0), 1));
        p.g.position.lerpVectors(p.from, v.set(0, 0, 0), k);
        p.g.quaternion.slerpQuaternions(p.fromQ, q0, k);
      }
      nData.forEach((d, i) => {
        const k = ease(Math.min(Math.max((t - d.delay) / 2.4, 0), 1));
        v.lerpVectors(d.from, d.to, k);
        qa.setFromEuler(d.fromRot); qb.setFromEuler(d.toRot); qa.slerp(qb, k);
        m.compose(v, qa, one); noise.setMatrixAt(i, m);
      });
      noise.instanceMatrix.needsUpdate = true;
      tilt.x += (mouse.y * 0.18 - tilt.x) * 0.04;
      tilt.y += (mouse.x * 0.35 - tilt.y) * 0.04;
      globe.rotation.set(0.08 + tilt.x, Math.max(t - 2.6, 0) * 0.2 + tilt.y, 0);
      ring.rotation.y = -t * 0.05;
      renderer.render(scene, camera);
      if (!still && visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]: any) => {
      visible = e.isIntersecting; cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    }, { threshold: 0.25 });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o: any) => { o.geometry?.dispose(); o.material?.dispose?.(); });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return ref;
}

/* =================================================================== */
/*  Small pieces                                                       */
/* =================================================================== */
/* Arrow used on every link and button (replaces the old dash) */
const Dash = () => (
  <svg className="ab-dash" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);

function Btn({ kind = "primary", href = "#", children }: any) {
  return <a className={`ab-btn ab-btn--${kind}`} href={href}>{children}<Dash /></a>;
}

function Mark({ size = 22 }: any) {
  return (
    <svg viewBox="-1.1 -1.1 2.2 2.2" width={size} height={size} aria-hidden="true">
      {LOGOMARK.map(([a, b, y, h], i) => <rect key={i} x={a} y={y - h} width={b - a} height={h * 2} rx={h} fill="currentColor" />)}
    </svg>
  );
}

/* Hero demo: the same question with memory on and off */
function MemoryDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className={`ab-demo ${on ? "is-on" : "is-off"}`}>
      <div className="ab-demo__bar">
        <span className="ab-demo__title">One user, three sessions</span>
        <button type="button" className="ab-switch" role="switch" aria-checked={on} onClick={() => setOn(!on)}>
          <span className="ab-switch__track"><span className="ab-switch__thumb" /></span>
          Memory {on ? "on" : "off"}
        </button>
      </div>

      <div className="ab-demo__body">
        <ol className="ab-demo__chat">
          {SESSIONS.map((s) => (
            <li key={s.when} className="ab-turn">
              <span className="ab-turn__when">{s.when}</span>
              <p className="ab-bubble ab-bubble--user">{s.said}</p>
            </li>
          ))}
          <li className="ab-turn ab-turn--now">
            <span className="ab-turn__when">Session 14, today</span>
            <p className="ab-bubble ab-bubble--user">{ASK}</p>
            <p className="ab-bubble ab-bubble--ai" aria-live="polite">
              <span className="ab-bubble__mark"><Mark size={12} /></span>
              {on ? ANSWER.on : ANSWER.off}
            </p>
          </li>
        </ol>

        <div className="ab-demo__mem" aria-label="What the agent remembers">
          <span className="ab-demo__memhead">What the agent remembers</span>
          {on ? (
            <ul className="ab-facts">
              {FACTS.map((f) => (
                <li key={f.k + f.v} className={f.old ? "is-old" : ""}>
                  <span className="ab-facts__k">{f.k}</span>
                  <span className="ab-facts__v">{f.v}</span>
                  <span className="ab-facts__span">{f.span}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="ab-demo__empty">Nothing. Every session starts from zero.</p>
          )}
        </div>
      </div>
    </div>
  );
}


/* =================================================================== */
/*  Company page content                                               */
/* =================================================================== */

/* RAG vs PiyAPI: each row shows the claim and what the agent actually gets back */
const VERSUS = [
  {
    feature: "What it keeps",
    edge: "Facts, not fragments",
    rag: { text: "Document chunks", eg: ["chunk_0412.txt", "chunk_1187.txt"] },
    mem: { text: "Facts about each user, over time", eg: ["diet: vegetarian", "city: Berlin"] },
  },
  {
    feature: "When facts change",
    edge: "One answer, not two",
    rag: { text: "Old and new chunks both come back", eg: ["“Lives in Pune”", "“Moved to Berlin”"], warn: "Conflict" },
    mem: { text: "Contradictions are resolved", eg: ["city: Berlin"], note: "Pune superseded" },
  },
  {
    feature: "Time",
    edge: "Answers about the past",
    rag: { text: "No sense of when", eg: ["Where did they live in February?", "Unknown"] },
    mem: { text: "Knows when a fact was true and when it was learned", eg: ["Pune, valid Jan to Mar", "learned Jan 14"] },
  },
  {
    feature: "Forgetting",
    edge: "Context stays clean",
    rag: { text: "Keeps everything forever", eg: ["Expired offer still retrieved"] },
    mem: { text: "Expired information is actively forgotten", eg: ["Expired offer dropped"] },
  },
];

const CODE = `import { PiyAPIClient } from '@piyapi/sdk';

const client = new PiyAPIClient({ apiKey: process.env.PIYAPI_API_KEY });

// Session 6: the user tells the agent something new
await client.memories.create({
  content: 'We just moved to Berlin.',
  metadata: { user_id: 'usr_9918' }
});

// Session 14: the agent asks memory, not the whole history
const { results } = await client.search({
  query: 'Where does the user live?'
});`;

function highlight(code: string) {
  const re = /(\/\/.*$)|('(?:[^'\\]|\\.)*')|([A-Za-z_$][\w$]*)|(\s+)|(.)/gm;
  const out: any[] = [];
  let m, i = 0;
  while ((m = re.exec(code))) {
    const [t, c, s, w] = m;
    let cls = null;
    if (c) cls = "c";
    else if (s) cls = "s";
    else if (w) {
      if (/^(import|from|const|new|await)$/.test(w)) cls = "kw";
      else if (/^[A-Z]/.test(w)) cls = "t";
      else if (code[re.lastIndex] === "(") cls = "f";
      else if (code[re.lastIndex] === ":") cls = "k";
    }
    out.push(cls ? <span key={i++} className={`tk-${cls}`}>{t}</span> : t);
  }
  return out;
}

/* Hero visual: real code, and what the agent gets back */
function HeroCode() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(CODE); } catch { /* ignore */ }
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  return (
    <figure className="cp-code" aria-label="Storing and recalling a memory with the PiyAPI SDK">
      <div className="cp-code__bar">
        <span className="cp-code__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="cp-code__file">agent.ts</span>
        <button type="button" className="cp-code__copy" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre><code>{highlight(CODE)}</code></pre>
      <figcaption className="cp-code__out">
        <span className="cp-code__outhead">results[0]</span>
        <div className="cp-recall">
          <span className="cp-recall__k">city</span>
          <b>Berlin</b>
          <span className="cp-recall__meta">valid since March</span>
          <span className="cp-recall__old">supersedes Pune</span>
        </div>
      </figcaption>
    </figure>
  );
}

const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Cross = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
);

function Versus() {
  return (
    <div className="cp-vs" role="table" aria-label="Retrieval (RAG) compared with memory (PiyAPI)">
      <div className="cp-vs__head" role="row">
        <span role="columnheader">Feature</span>
        <span role="columnheader" className="cp-vs__rag">Retrieval (RAG)</span>
        <span role="columnheader" className="cp-vs__mem"><Mark size={16} />Memory (PiyAPI)</span>
      </div>
      {VERSUS.map((r) => (
        <div className="cp-vs__row" role="row" key={r.feature}>
          <div role="rowheader" className="cp-vs__feat">
            <b>{r.feature}</b>
            <span>{r.edge}</span>
          </div>
          <div role="cell" className="cp-vs__cell cp-vs__cell--rag">
            <p><span className="cp-vs__icon"><Cross /></span>{r.rag.text}</p>
            <span className="cp-vs__eg">
              {r.rag.eg.map((e) => <span key={e}>{e}</span>)}
              {r.rag.warn && <em className="cp-vs__warn">{r.rag.warn}</em>}
            </span>
          </div>
          <div role="cell" className="cp-vs__cell cp-vs__cell--mem">
            <p><span className="cp-vs__icon"><Check /></span>{r.mem.text}</p>
            <span className="cp-vs__eg">
              {r.mem.eg.map((e) => <span key={e}>{e}</span>)}
              {r.mem.note && <em className="cp-vs__note">{r.mem.note}</em>}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Contact form */
const TOPICS = ["Product question", "Partnerships", "Self-hosting help", "Something else"];

function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<any>({});
  const [sent, setSent] = useState(false);
  const set = (k: string) => (e: any) => { setForm({ ...form, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }); };

  const submit = (e: any) => {
    e.preventDefault();
    const err: any = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter an email we can reply to.";
    setErrors(err);
    if (Object.keys(err).length) return;
    // Connect this to your backend or form service.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="cp-form cp-form--sent" role="status">
        <span className="cp-form__ok"><Check /></span>
        <b>Submitted</b>
        <p>The team will reply to {form.email}.</p>
        <button type="button" className="ab-btn ab-btn--quiet" onClick={() => { setSent(false); setForm({ name: "", email: "", company: "" }); }}>
          Send another<Dash />
        </button>
      </div>
    );
  }

  return (
    <form className="cp-form" onSubmit={submit} noValidate>
      <fieldset className="cp-topics">
        <legend>What's this about?</legend>
        <div>
          {TOPICS.map((t) => (
            <label key={t} className={`cp-chip ${topic === t ? "is-on" : ""}`}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />{t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="cp-fields">
        <label className="cp-field">
          <span>Name</span>
          <input value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <em>{errors.name}</em>}
        </label>
        <label className="cp-field">
          <span>Work email</span>
          <input type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <em>{errors.email}</em>}
        </label>
        <label className="cp-field cp-field--wide">
          <span>Company <small>optional</small></span>
          <input value={form.company} onChange={set("company")} autoComplete="organization" />
        </label>
      </div>
      <button type="submit" className="ab-btn ab-btn--primary cp-submit">Submit<Dash /></button>
    </form>
  );
}

/* =================================================================== */
/*  Page                                                               */
/* =================================================================== */
export function CompanyPage() {
  const globe = useGlobe();

  return (
    <main className="ab cp">
      <div className="cp-shell">
        <article className="cp-doc">

          {/* Hero */}
          <header className="cp-hero">
            <div className="cp-hero__copy">
              <h1 className="cp-title">Building memory for AI.</h1>
              <p className="cp-lede">
                We are an open-source infrastructure company transitioning AI from stateless text generators into stateful,
                reasoning agents. Who we are, where we're going, and how to work with us, all on one page.
              </p>
              <div className="ab-actions">
                <Btn>View GitHub repo</Btn>
                <Btn kind="quiet" href="#vision">Read the manifesto</Btn>
              </div>
            </div>
            <HeroCode />
          </header>

          {/* About us */}
          <section id="about" className="cp-sec" aria-labelledby="cp-about">
            <p className="cp-tag">About us</p>
            <h2 id="cp-about" className="cp-h2">Giving AI a persistent mind.</h2>
            <div className="cp-cols">
              <p className="cp-body">
                Most AI applications bolt on basic retrieval (RAG) and call it memory. But retrieval only finds documents.
                True memory understands a person, tracks a project, and updates its worldview as facts change. That
                architectural difference is what we are building.
              </p>
              <p className="cp-body">
                We build PiyAPI, the memory infrastructure for human-like AI. It gives agents the ability to remember, learn
                from experience, and build a continuous understanding of the world around them.
              </p>
            </div>

            <div className="cp-sub">
              <h3 className="cp-h3">Retrieval (RAG) vs. Memory (PiyAPI)</h3>
              <p className="cp-note">Same user, same question. Here is what each approach hands to the model.</p>
            </div>
            <Versus />

            <div className="cp-sub">
              <h3 className="cp-h3">See it remember</h3>
              <p className="cp-note">Switch memory off to see what an agent without it gets.</p>
            </div>
            <MemoryDemo />
          </section>

          {/* Vision & mission */}
          <section id="vision" className="vm cp-sec" aria-labelledby="vm-title">
            <div className="vm__wrap">
              <div className="vm__panel">
                <p className="vm__tag">Our vision &amp; mission</p>
                <div className="vm__grid">
                  <div className="vm__copy">
                    <h2 id="vm-title" className="vm__title">Continuity for AI.</h2>
                    <p className="vm__text">
                      In a world of complex data, we provide the clarity that reveals true potential. We believe the next step for
                      AI is continuity: agents that know who they work with, notice when facts change, and get better with every
                      conversation instead of starting over.
                    </p>
                    <p className="vm__statement">
                      <span>So our mission is to</span> build the memory layer for human-like AI, and keep it accurate, open, and private.
                    </p>
                  </div>
                  <div className="vm__side">
                    <div className="vm__canvas" ref={globe} aria-hidden="true" />
                    <ul className="vm__tenets">
                      {PRINCIPLES.map((p) => (
                        <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Careers */}
          <section id="careers" className="cp-sec" aria-labelledby="cp-careers">
            <p className="cp-tag">Careers</p>
            <div className="cp-split">
              <div>
                <h2 id="cp-careers" className="cp-h2">Help build memory for AI.</h2>
                <p className="cp-body">
                  We are a remote-first team of distributed systems engineers and ML researchers tackling one of the hardest
                  infrastructure problems in AI. Join the core team and help shape the future of stateful agents.
                </p>
                <div className="ab-actions"><Btn>View open roles</Btn></div>
              </div>
              <ul className="cp-facts" aria-label="The team">
                <li><b>Remote-first</b><span>Work from where you do your best work.</span></li>
                <li><b>Distributed systems</b><span>Storage, retrieval and a bitemporal knowledge graph.</span></li>
                <li><b>ML research</b><span>Extraction, ranking and how agents decide what to recall.</span></li>
              </ul>
            </div>
          </section>

          {/* Community */}
          <section id="community" className="cp-sec" aria-labelledby="cp-community">
            <p className="cp-tag">Our community</p>
            <div className="cp-split">
              <div>
                <h2 id="cp-community" className="cp-h2">Builders, events, and open source.</h2>
                <p className="cp-body">
                  PiyAPI is being actively built and supported by a global network of engineers, researchers, and open-source
                  contributors. Join our community to share workflows, get help with self-hosting, and contribute to the core protocol.
                </p>
                <div className="ab-actions">
                  <Btn>Join the Discord</Btn>
                  <Btn kind="quiet">Contribute on GitHub</Btn>
                </div>
              </div>
              <ul className="cp-facts cp-facts--cards" aria-label="Ways to take part">
                <li><b>Share workflows</b><span>Show how you use memory in your agents and learn from others.</span></li>
                <li><b>Self-hosting help</b><span>Get answers from people running PiyAPI on their own infrastructure.</span></li>
                <li><b>Core protocol</b><span>Open issues, review changes and send pull requests.</span></li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="cp-sec" aria-labelledby="cp-contact">
            <p className="cp-tag">Contact us</p>
            <div className="cp-split cp-split--contact">
              <div>
                <h2 id="cp-contact" className="cp-h2">Tell us what you're building.</h2>
                <p className="cp-body">
                  Have questions about the product, enterprise partnerships, or running PiyAPI on your own infrastructure?
                  The core engineering team reads every message.
                </p>
              </div>
              <ContactForm />
            </div>
          </section>

          <div className="cp-feedback">
            <a href="#" className="cp-ghost">Suggest edits</a>
            <a href="#" className="cp-ghost">Raise issue</a>
          </div>
        </article>
      </div>
    </main>
  );
}
