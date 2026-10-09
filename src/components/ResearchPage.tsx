import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./css/ResearchPage.css";

const C = {
  white: 0xffffff,
  aura: 0xf9f8ff,
  lavender: 0xeccdf5,
  gayo: 0x765dfb,
  indigo: 0x4846ac,
};

const SCORES = [
  { name: "LoCoMo", value: 92.5 },
  { name: "LongMemEval", value: 94.4 },
  { name: "BEAM 1M", value: 64.1 },
  { name: "BEAM 10M", value: 48.6 },
];

const TOKENS = [
  { name: "Negentro", value: 6900, label: "~6,900" },
  { name: "Full-context", value: 25000, label: "25,000+" },
];

// TODO: LongMemEval / BEAM breakdowns were not visible in the source capture — fill from the live page.
const BENCHMARKS = [
  {
    name: "LoCoMo",
    score: 41.2,
    meta: "1,540 questions, 5 categories",
    desc: "Tests single-hop, multi-hop, open-domain, and temporal memory recall across multi-session conversations.",
    tokens: "3,098",
    note: "Mean tokens: 6,956. Biggest gains on temporal (+29.3) and multi-hop (+25.2).",
    cats: [
      ["Single hop", 94.6],
      ["Multi-hop", 95.4],
      ["Open-domain temporal", 82.3],
      ["Temporal", 92.5],
    ],
  },
  { name: "LongMemEval", score: 94.4, meta: "", desc: "", tokens: "", note: "", cats: [] },
  { name: "BEAM (1M)", score: 64.1, meta: "", desc: "", tokens: "", note: "", cats: [] },
  { name: "BEAM (10M)", score: 48.6, meta: "", desc: "", tokens: "", note: "", cats: [] },
];

const WHY = [
  {
    title: "Recall correctness",
    figure: "1st call",
    figureNote: "right memory, first retrieval",
    body: "The ADD-only extraction never overwrites a fact, entity linking ties together mentions of the same person, place, or concept, and temporal reasoning reranks toward what's current. The right memory surfaces on the first retrieval call.",
  },
  {
    title: "Context footprint",
    figure: "~7,000",
    figureNote: "tokens per call, not 25,000+",
    body: "Three retrieval signals, semantic, keyword, and entity, are scored in parallel and fused into one ranked result. Only the top matches enter the prompt, rather than the full conversation history, which is what keeps each call near 7,000 tokens instead of 25,000+.",
  },
  {
    title: "Response time",
    figure: "+1 ms",
    figureNote: "median latency",
    body: "Memory decay's recency ranking runs fire-and-forget, and temporal reasoning does its classification at write time, so median latency stays flat at +1ms.",
  },
];

/* Pipeline diagram (SVG coordinates, viewBox 1000 x 440) */
const NODES = [
  { id: "store", label: "Store new memories", sub: "after response (async)", x: 10 },
  { id: "lookup", label: "Context lookup", sub: "find related memories", x: 208 },
  { id: "extract", label: "Extract memories", sub: "from input + context", x: 406, badge: "Add only" },
  { id: "dedupe", label: "Deduplicate + embed", sub: "vectorize new memories", x: 604 },
  { id: "entity", label: "Entity linking", sub: "identify + link memories", x: 802 },
];
const STORES = [
  { id: "sql", label: "SQL database", sub: "facts + metadata", x: 120 },
  { id: "vector", label: "Vector database", sub: "embeddings + similarity", x: 400 },
  { id: "entities", label: "Entity store", sub: "entities + relationships", x: 680 },
];
const LINKS = [
  { id: "extract-sql", d: "M494 126 V178 Q494 196 476 196 H238 Q220 196 220 214 V284", from: "extract", to: "sql" },
  { id: "dedupe-vector", d: "M692 126 V184 Q692 204 672 204 H520 Q500 204 500 224 V284", from: "dedupe", to: "vector" },
  { id: "entity-entities", d: "M890 126 V184 Q890 204 870 204 H800 Q780 204 780 224 V284", from: "entity", to: "entities" },
  { id: "sql-lookup", d: "M200 284 V226 Q200 210 216 210 H280 Q296 210 296 194 V132", from: "sql", to: "lookup", back: true },
];

// TODO: only the first feature's body was legible in the capture; 2–4 are written from the page's own "why" copy — swap in the live text.
const FEATURES = [
  {
    title: "Single-pass ADD-only extraction",
    body: "Extraction collapses to one LLM call that only adds, capturing the agent's own facts as first-class alongside the user's. No overwrite or delete step, so history survives intact with about 2x faster extraction.",
    nodes: ["extract", "dedupe", "sql", "vector"],
    links: ["extract-sql", "dedupe-vector"],
  },
  {
    title: "Multi-signal retrieval",
    body: "Three retrieval signals, semantic, keyword, and entity, are scored in parallel and fused into one ranked result. Only the top matches enter the prompt.",
    nodes: ["lookup", "sql", "vector", "entities", "entity"],
    links: ["sql-lookup", "dedupe-vector", "entity-entities"],
  },
  {
    title: "Temporal reasoning",
    body: "Temporal reasoning reranks toward what's current and does its classification at write time, so the agent can tell what was true then from what is true now.",
    nodes: ["extract", "lookup", "sql"],
    links: ["extract-sql", "sql-lookup"],
  },
  {
    title: "Memory decay",
    body: "Recency ranking runs fire-and-forget after each response, so memories that stop being used lose rank without adding latency to the call.",
    nodes: ["store", "lookup", "vector"],
    links: ["dedupe-vector", "sql-lookup"],
  },
];

const POSTS = [
  { title: "Understanding Memory Benchmark For Production AI Agents", date: "Jun 5, 2026", tag: "Library", art: "bench" },
  { title: "Introducing Temporal Reasoning in Negentro", date: "May 12, 2026", tag: "Product", art: "time" },
  { title: "Introducing Memory Decay in Negentro", date: "May 8, 2026", tag: "Product", art: "decay" },
  { title: "Introducing The Token-Efficient Memory Algorithm", date: "Apr 16, 2026", tag: "Research", art: "orb" },
];

// TODO: answers were collapsed in the capture — swap in the live answers.
const FAQ = [
  ["What is the best benchmark for AI agent memory?", "No single one. LoCoMo tests recall across multi-session conversations, LongMemEval tests long-horizon memory, and BEAM stresses retrieval at 1M and 10M tokens. Read together they give the clearest picture."],
  ["How accurate is Negentro on LongMemEval?", "Negentro scores 94.4 on LongMemEval."],
  ["What's the difference between LoCoMo and LongMemEval?", "LoCoMo covers single-hop, multi-hop, open-domain and temporal recall across multi-session conversations. LongMemEval targets memory over much longer interaction histories."],
  ["Why is BEAM a harder benchmark than LoCoMo or LongMemEval?", "BEAM runs at 1M and 10M tokens of history, so retrieval has to find the right fact in far more noise. Scores are 64.1 at 1M and 48.6 at 10M."],
  ["Is Negentro's evaluation framework open source?", "Yes. Dataset loaders, judge-model config, and the exact run configs behind every number on this page are on GitHub."],
  ["How does Negentro achieve high accuracy with fewer tokens?", "Three retrieval signals are scored in parallel and fused, and only the top matches enter the prompt. That keeps each call near 7,000 tokens instead of 25,000+."],
  ["What is temporal reasoning in AI agent memory?", "Knowing when a fact was true and whether it still is. Negentro classifies this at write time and reranks retrieval toward what's current."],
  ["How is Negentro's memory algorithm different from RAG?", "RAG retrieves document chunks. Negentro extracts facts, never overwrites them, links entities across mentions, and retrieves with semantic, keyword and entity signals together."],
];



/* =================================================================== */
/*  Utilities                                                          */
/* =================================================================== */
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

// Seeded random so the 3D forms are identical on every load
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/**
 * Mounts a three.js scene into a div; pauses when off-screen.
 * setup(scene, camera) -> update(time, mouse, camera)
 */
function useThree(setup: (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => (t: number, mouse: {x:number, y:number}, cam: THREE.PerspectiveCamera) => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL: section still reads fine without it
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const update = setup(scene, camera);
    const mouse = { x: 0, y: 0 };
    const reduced = prefersReduced();

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      if (reduced) frame(1e4);
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let raf = 0, visible = true, t0: number | null = null;
    const frame = (now: number) => {
      if (t0 === null) t0 = now;
      update(reduced ? 1e4 : (now - t0) / 1000, mouse, camera);
      renderer.render(scene, camera);
    };
    const loop = (now: number) => {
      frame(now);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o: any) => {
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [setup]);
  return ref;
}

/**
 * Lays capsule "dashes" along horizontal rings — the Negentro logomark in 3D.
 * rings: [{ y, r }]. Each ring is split into dashes of varied length, with a
 * seam gap whose angle drifts ring by ring (the offset in the logomark).
 */
function dashField(rings: {y:number, r:number}[], { seed = 7, thick = 0.034, minL = 0.16, maxL = 0.62, gap = [0.07, 0.16], seam = 0.5 } = {}) {
  const rand = rng(seed);
  const out: {ri:number, y:number, r:number, a:number, len:number, pos?:THREE.Vector3, rotY?:number}[] = [];
  rings.forEach(({ y, r }, ri) => {
    if (r < 0.05) return;
    const seamA = Math.PI * 0.5 + Math.sin(ri * 0.55) * 0.55;
    let a = rand() * 0.4;
    while (a < Math.PI * 2 - 0.05) {
      const len = minL + rand() * (maxL - minL);
      const span = Math.min(len / r, 0.9);
      const mid = a + span / 2;
      const nearSeam =
        Math.abs(Math.atan2(Math.sin(mid - seamA), Math.cos(mid - seamA))) < seam / 2 ||
        Math.abs(Math.atan2(Math.sin(mid - seamA - Math.PI), Math.cos(mid - seamA - Math.PI))) < seam / 2;
      if (!nearSeam && a + span < Math.PI * 2) {
        const chord = 2 * r * Math.sin(span / 2);
        out.push({ ri, y, r, a: mid, len: Math.max(chord - thick * 2, 0.02) });
      }
      a += span + (gap[0] + rand() * (gap[1] - gap[0])) / r;
    }
  });
  return out;
}

function makeDashMesh(dashes: any[], colorFor: (d: any)=>THREE.Color, { thick = 0.034, roughness = 0.42, metalness = 0.05, emissive = 0x000000 } = {}) {
  const geo = new THREE.CapsuleGeometry(thick, 1, 4, 10);
  geo.rotateZ(Math.PI / 2); // along X
  const mat = new THREE.MeshStandardMaterial({ roughness, metalness, emissive });
  const mesh = new THREE.InstancedMesh(geo, mat, dashes.length);
  mesh.frustumCulled = false; // instances animate in from off-screen; cached bounds would cull them
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const e = new THREE.Euler();
  dashes.forEach((d, i) => {
    d.pos = new THREE.Vector3(Math.cos(d.a) * d.r, d.y, Math.sin(d.a) * d.r);
    d.rotY = -(d.a + Math.PI / 2);
    q.setFromEuler(e.set(0, d.rotY, 0));
    s.set(d.len, 1, 1);
    m.compose(p.copy(d.pos), q, s);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, colorFor(d));
  });
  return mesh;
}

/* =================================================================== */
/*  3D scenes                                                          */
/* =================================================================== */
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

// Negentro logomark, traced from the brand guide.
// One row per dash: [x0, x1, y, halfThickness], normalized so the mark's radius is 1 (y points down).
const LOGOMARK = [
  [-0.3317, 0.5346, -0.8079, 0.0453],
  [-0.6587, -0.2076, -0.6897, 0.0465],
  [-0.0549, 0.7637, -0.5752, 0.0465],
  [-0.8687, 0.0095, -0.4618, 0.0453],
  [0.0859, 0.9308, -0.3425, 0.0453],
  [-0.9761, -0.1098, -0.2279, 0.0453],
  [0.1456, 1.0, -0.1158, 0.0453],
  [-1.0, -0.1384, 0.0, 0.0489],
  [0.1456, 1.0, 0.1169, 0.0465],
  [-0.9761, -0.1098, 0.2303, 0.0453],
  [0.0859, 0.9308, 0.3437, 0.0465],
  [-0.8687, 0.0095, 0.4642, 0.0453],
  [-0.0549, 0.7637, 0.5764, 0.0453],
  [-0.6587, -0.2053, 0.6897, 0.0442],
  [-0.3317, 0.5346, 0.8055, 0.0477]
];

// Hero: the logomark as a real globe. Every dash is a tube bent along a latitude of a sphere,
// so the front view matches the logo exactly; the back hemisphere carries a mirrored copy.
class LatitudeArc extends THREE.Curve<THREE.Vector3> {
  r: number;
  y: number;
  a0: number;
  a1: number;
  constructor(r: number, y: number, a0: number, a1: number) { super(); this.r = r; this.y = y; this.a0 = a0; this.a1 = a1; }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = this.a0 + (this.a1 - this.a0) * t;
    return target.set(Math.sin(a) * this.r, this.y, Math.cos(a) * this.r);
  }
}

function heroScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
  camera.position.set(0, 0, 9.8);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d3ff, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(C.lavender, 1.6);
  rim.position.set(-6, -1, -4);
  scene.add(rim);

  const S = 2.2; // globe radius
  // depth fog in the hero's background tint: the far side of the globe fades back
  scene.fog = new THREE.Fog(0xf6f1ff, 8.2, 13.2);
  const top = new THREE.Color(C.lavender), mid = new THREE.Color(C.gayo), bot = new THREE.Color(C.indigo);
  const rand = rng(7);
  const globe = new THREE.Group();
  scene.add(globe);
  const capGeo = new THREE.SphereGeometry(1, 16, 12);

  const dashes: {g:THREE.Group, from:THREE.Vector3, delay:number}[] = [];
  [0, Math.PI].forEach((turn, back) => {
    LOGOMARK.forEach(([x0, x1, yn, hn], i) => {
      const y = -yn * S;
      const r = Math.sqrt(Math.max(1 - yn * yn, 0.0001)) * S; // ring radius at this latitude
      const thick = hn * S;
      // front-view x -> angle on the ring (clamped at the silhouette)
      const ang = (x: number) => Math.asin(Math.max(-1, Math.min(1, (x * S) / r)));
      const a0 = ang(x0 + hn) , a1 = ang(x1 - hn);
      const k = (yn + 1) / 2;
      const color = k < 0.5 ? top.clone().lerp(mid, k * 2) : mid.clone().lerp(bot, (k - 0.5) * 2);
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.08 });
      const arc = new LatitudeArc(r, y, a0, a1);
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.TubeGeometry(arc, 48, thick, 16, false), mat));
      for (const t of [0, 1]) {
        const cap = new THREE.Mesh(capGeo, mat);
        cap.scale.setScalar(thick);
        arc.getPoint(t, cap.position);
        g.add(cap);
      }
      const holder = new THREE.Group(); // rotates the back copy to the far side
      holder.rotation.y = turn;
      holder.add(g);
      globe.add(holder);
      const side = (x0 + x1) / 2 < 0 ? -1 : 1;
      const from = new THREE.Vector3(side * (7 + rand() * 4) * (back ? -1 : 1), (rand() - 0.5) * 0.8, 0);
      g.position.copy(from);
      g.visible = false;
      dashes.push({ g, from, delay: 0.15 + i * 0.05 + back * 0.35 + (side > 0 ? 0.06 : 0) });
    });
  });

  const tilt = { x: 0, y: 0 };
  const zero = new THREE.Vector3();

  return (t: number, mouse: {x:number, y:number}, cam: THREE.PerspectiveCamera) => {
    const wide = cam.aspect > 0.9;
    globe.position.x = wide ? Math.min(0.35 * cam.aspect, 0.9) : 0;
    globe.scale.setScalar(wide ? 1 : 0.92);

    for (const d of dashes) {
      const k = Math.min(Math.max((t - d.delay) / 1.2, 0), 1);
      const v = easeOut(k);
      d.g.visible = k > 0;
      d.g.position.lerpVectors(d.from, zero, v);
    }

    // starts facing front so the logo reads, then turns slowly as a globe
    const spin = Math.max(t - 2.2, 0) * 0.28;
    tilt.x += (mouse.y * 0.2 - tilt.x) * 0.04;
    tilt.y += (mouse.x * 0.4 - tilt.y) * 0.04;
    globe.rotation.x = 0.08 + tilt.x;
    globe.rotation.y = spin + tilt.y;
  };
}

// Open-source block: a stack of rings, like a storage cylinder, in white on Gayo
function cylinderScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
  camera.position.set(0, 0.6, 8);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, C.indigo, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(2, 4, 5);
  scene.add(key);

  const N = 16;
  const rings = Array.from({ length: N }, (_, i) => ({ y: -1.5 + (i / (N - 1)) * 3, r: 1.55 }));
  const dashes = dashField(rings, { seed: 5, seam: 0.4, maxL: 0.75, thick: 0.04 });
  const a = new THREE.Color(0xffffff), b = new THREE.Color(C.lavender);
  const mesh = makeDashMesh(dashes, (d) => (d.ri % 3 === 0 ? b : a), { thick: 0.04 });
  const group = new THREE.Group();
  group.add(mesh);
  group.rotation.x = 0.28;
  scene.add(group);

  return (t: number) => {
    group.rotation.y = t * 0.18;
    group.position.y = Math.sin(t * 0.7) * 0.06;
  };
}

/* =================================================================== */
/*  Small pieces                                                       */
/* =================================================================== */


/** A score drawn as a row of capsule dashes, one dash per 2 points. */
function DashMeter({ value, max = 100, count = 50, run = true, delay = 0, label }: any) {
  const filled = Math.round((value / max) * count);
  return (
    <div className="rp-meter" role="img" aria-label={label ?? `${value} of ${max}`}>
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className={run && i < filled ? "is-on" : ""}
          style={{ transitionDelay: run ? `${delay + i * 14}ms` : "0ms" }}
        />
      ))}
    </div>
  );
}

function Btn({ kind = "primary", children, href = "#", ...rest }: any) {
  return (
    <a className={`rp-btn rp-btn--${kind}`} href={href} {...rest}>
      {children}
      <svg className="rp-btn__dash" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
    </a>
  );
}

/* =================================================================== */
/*  Sections                                                           */
/* =================================================================== */

function Hero() {
  const canvas = useThree(heroScene);
  const [ledgerRef, seen] = useInView(0.35);
  return (
    <section className="rp-hero">
      <div className="rp-hero__canvas" ref={canvas} aria-hidden="true" />
      <div className="rp-wrap rp-hero__grid">
        <div className="rp-hero__copy">

          <h1 className="rp-display">Benchmarking token efficient memory algorithm</h1>
          <p className="rp-lede">
            Benchmarked across LoCoMo, LongMemEval, and BEAM. Powered by single-pass hierarchical
            extraction and multi-signal retrieval.
          </p>
          <div className="rp-actions">
            <Btn>Get started</Btn>
          </div>
        </div>
      </div>

      <div className="rp-wrap">
        <div className="rp-ledger" ref={ledgerRef}>
          <div className="rp-ledger__scores">
            {SCORES.map((s, i) => (
              <div className="rp-ledger__row" key={s.name}>
                <span className="rp-ledger__name">{s.name}</span>
                <DashMeter value={s.value} run={seen} delay={i * 120} label={`${s.name}: ${s.value}`} />
                <span className="rp-num rp-ledger__val">{s.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="rp-ledger__tokens">
            <h2 className="rp-ledger__title">Mean tokens per retrieval call</h2>
            {TOKENS.map((t, i) => (
              <div className={`rp-tok ${i === 0 ? "is-ours" : ""}`} key={t.name}>
                <div className="rp-tok__head">
                  <span>{t.name}</span>
                  <span className="rp-num">{t.label}</span>
                </div>
                <div className="rp-tok__track">
                  <div className="rp-tok__line" style={{ width: seen ? `${(t.value / 25000) * 100}%` : 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeepDives() {
  const [idx, setIdx] = useState(0);
  const [ref, seen] = useInView(0.25);
  const b = BENCHMARKS[idx];
  return (
    <section className="rp-section rp-section--aura" aria-labelledby="dd-title">
      <div className="rp-wrap">
        <header className="rp-head">
          <h2 id="dd-title" className="rp-h2">Benchmark deep-dives</h2>
          <p className="rp-sub">AI agent memory benchmark results across LoCoMo, LongMemEval, and BEAM.</p>
        </header>

        <div className="rp-dd" ref={ref}>
          <div className="rp-dd__index" role="tablist" aria-label="Benchmarks">
            {BENCHMARKS.map((x, i) => (
              <button
                key={x.name}
                role="tab"
                id={`dd-tab-${i}`}
                aria-controls="dd-panel"
                aria-selected={i === idx}
                className={i === idx ? "is-active" : ""}
                onClick={() => setIdx(i)}
              >
                <span>{x.name}</span>
                <span className="rp-num">{x.score.toFixed(1)}</span>
              </button>
            ))}
          </div>

          <div className="rp-dd__panel" id="dd-panel" role="tabpanel" aria-labelledby={`dd-tab-${idx}`} key={b.name}>
            <div className="rp-dd__top">
              <div>
                <h3 className="rp-h3">{b.name}</h3>
                {b.meta && <p className="rp-dd__meta">{b.meta}</p>}
                {b.desc && <p className="rp-dd__desc">{b.desc}</p>}
              </div>
              <dl className="rp-dd__kpis">
                <div>
                  <dt>Negentro score</dt>
                  <dd className="rp-num">{b.score.toFixed(1)}</dd>
                </div>
                {b.tokens && (
                  <div>
                    <dt>Mean tokens</dt>
                    <dd className="rp-num">{b.tokens}</dd>
                  </div>
                )}
              </dl>
            </div>

            {b.cats.length > 0 ? (
              <div className="rp-dd__cats">
                {b.cats.map(([n, v], i) => (
                  <div className="rp-cat" key={n}>
                    <span>{n}</span>
                    <DashMeter value={v} count={40} run={seen} delay={i * 90} label={`${n}: ${v}`} />
                    <span className="rp-num">{v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rp-dd__cats">
                <div className="rp-cat">
                  <span>Overall</span>
                  <DashMeter value={b.score} count={40} run={seen} label={`${b.name}: ${b.score}`} />
                  <span className="rp-num">{b.score.toFixed(1)}</span>
                </div>
              </div>
            )}
            <div className="rp-dd__foot">
              {b.note && <p className="rp-dd__note">{b.note}</p>}
              <Btn href="#" aria-label={`Read the full ${b.name} report`}>Read full report</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="rp-section" aria-labelledby="why-title">
      <div className="rp-wrap">
        <header className="rp-head rp-head--split">
          <h2 id="why-title" className="rp-h2">Why the numbers look this way?</h2>
          <p className="rp-sub">Each score above traces back to a specific piece of the architecture, not just the model.</p>
        </header>
        <div className="rp-why">
          {WHY.map((w) => (
            <article className="rp-why__row" key={w.title}>
              <h3 className="rp-why__title">{w.title}</h3>
              <div className="rp-why__fig">
                <span className="rp-num">{w.figure}</span>
                <span>{w.figureNote}</span>
              </div>
              <p className="rp-why__body">{w.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pipeline({ feature }: any) {
  const lit = (id: string) => feature.nodes.includes(id);
  const linkLit = (id: string) => feature.links.includes(id);
  return (
    <svg className="rp-pipe" viewBox="0 0 1000 440" role="img" aria-label={`Memory pipeline, highlighting ${feature.title}`}>
      <defs>
        <marker id="rp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </marker>
        <pattern id="rp-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="rp-pipe__dot" />
        </pattern>
      </defs>
      <rect width="1000" height="440" fill="url(#rp-dots)" />

      {/* step arrows */}
      {NODES.slice(0, -1).map((n, i) => (
        <line key={n.id} x1={n.x + 178} y1="88" x2={NODES[i + 1].x - 8} y2="88" className="rp-pipe__step" markerEnd="url(#rp-arrow)" />
      ))}

      {/* storage connectors */}
      {LINKS.map((l) => (
        <path
          key={l.id}
          d={l.d}
          className={`rp-pipe__link ${linkLit(l.id) ? "is-lit" : ""} ${l.back ? "is-back" : ""}`}
          markerEnd="url(#rp-arrow)"
        />
      ))}

      {/* process nodes */}
      {NODES.map((n, i) => (
        <g key={n.id} className={`rp-node ${lit(n.id) ? "is-lit" : ""}`} transform={`translate(${n.x} 50)`}>
          <rect className="rp-node__box" width="178" height="76" rx="14" />
          <text x="16" y="32" className="rp-node__label">{n.label}</text>
          <text x="16" y="54" className="rp-node__sub">{n.sub}</text>
          <text x="162" y="32" textAnchor="end" className="rp-node__step">{i + 1}</text>
          {n.badge && (
            <g transform="translate(16 -12)">
              <rect width="66" height="22" rx="11" className="rp-node__badge" />
              <text x="33" y="15" textAnchor="middle" className="rp-node__badgeText">{n.badge}</text>
            </g>
          )}
        </g>
      ))}

      {/* storage */}
      <rect x="90" y="270" width="820" height="150" rx="22" className="rp-pipe__store" />
      <text x="500" y="404" textAnchor="middle" className="rp-pipe__storeLabel">Persistent storage</text>
      {STORES.map((s) => (
        <g key={s.id} className={`rp-node rp-node--db ${lit(s.id) ? "is-lit" : ""}`} transform={`translate(${s.x} 290)`}>
          <rect className="rp-node__box" width="200" height="76" rx="14" />
          <g transform="translate(16 22)" className="rp-node__icon">
            <ellipse cx="12" cy="5" rx="10" ry="4" />
            <path d="M2 5v20c0 2.2 4.5 4 10 4s10-1.8 10-4V5" />
            <path d="M2 15c0 2.2 4.5 4 10 4s10-1.8 10-4" />
          </g>
          <text x="50" y="34" className="rp-node__label">{s.label}</text>
          <text x="50" y="56" className="rp-node__sub">{s.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function WhatsNew() {
  const [active, setActive] = useState(0);
  return (
    <section className="rp-section" aria-labelledby="new-title">
      <div className="rp-wrap">
        <header className="rp-head">
          <h2 id="new-title" className="rp-h2">What's new on Negentro?</h2>
          <p className="rp-sub">
            Four architecture changes to long-term memory for AI agents, hierarchical fact extraction,
            multi-signal retrieval, and temporal reasoning working together.
          </p>
        </header>
        <div className="rp-new">
          <ul className="rp-new__list" role="tablist" aria-label="Architecture changes">
            {FEATURES.map((f, i) => (
              <li key={f.title}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  className={`rp-feat ${i === active ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="rp-feat__title">{f.title}</span>
                  <span className="rp-feat__body">
                    <span>
                      {f.body}
                      <a href="#" className="rp-link" tabIndex={i === active ? 0 : -1}>Read more</a>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="rp-new__diagram">
            <div className="rp-new__scroll">
              <Pipeline feature={FEATURES[active]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Generative covers built from the same dash vocabulary */
function Cover({ kind }: { kind: string }) {
  const r = rng(kind.length * 97);
  if (kind === "bench") {
    return (
      <svg viewBox="0 0 400 240" className="rp-cover rp-cover--aura" aria-hidden="true">
        {SCORES.map((s, i) => {
          const y = 52 + i * 44;
          const n = 24, on = Math.round((s.value / 100) * n);
          return (
            <g key={s.name}>
              {Array.from({ length: n }, (_, k) => (
                <rect key={k} x={40 + k * 13.5} y={y} width="9" height="9" rx="4.5" className={k < on ? "c-on" : "c-off"} />
              ))}
              <text x="370" y={y + 9} textAnchor="end" className="c-num">{s.value}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (kind === "time") {
    return (
      <svg viewBox="0 0 400 240" className="rp-cover rp-cover--lav" aria-hidden="true">
        <line x1="30" y1="190" x2="370" y2="190" className="c-axis" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 40 + i * 28;
          const h = 30 + r() * 100;
          const op = 0.25 + (i / 11) * 0.75;
          return (
            <g key={i} opacity={op}>
              {Array.from({ length: Math.floor(h / 14) }, (_, k) => (
                <rect key={k} x={x} y={180 - k * 14 - 8} width="18" height="8" rx="4" className="c-on" />
              ))}
              <line x1={x + 9} y1="186" x2={x + 9} y2="196" className="c-axis" />
            </g>
          );
        })}
      </svg>
    );
  }
  if (kind === "decay") {
    return (
      <svg viewBox="0 0 400 240" className="rp-cover rp-cover--aura" aria-hidden="true">
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) => {
            const k = col / 6;
            const w = 40 * (1 - k * 0.85);
            return (
              <rect key={`${row}-${col}`} x={36 + col * 48} y={36 + row * 20} width={w} height="8" rx="4" className="c-on" opacity={1 - k * 0.8} />
            );
          })
        )}
      </svg>
    );
  }
  // orb: the logomark, large, with the four numbers
  const rows = 11;
  return (
    <svg viewBox="0 0 640 360" className="rp-cover rp-cover--gayo" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => {
        const y = 60 + i * 22;
        const half = Math.sqrt(Math.max(1 - Math.pow((i - (rows - 1) / 2) / ((rows - 1) / 2 + 0.6), 2), 0)) * 120;
        const seam = Math.sin(i * 0.7) * 22;
        return (
          <g key={i}>
            <rect x={200 - half} y={y} width={Math.max(half + seam - 14, 10)} height="10" rx="5" className="c-w" />
            <rect x={200 + seam + 6} y={y} width={Math.max(half - seam - 6, 10)} height="10" rx="5" className="c-w2" />
          </g>
        );
      })}
      {SCORES.map((s, i) => (
        <g key={s.name} transform={`translate(400 ${78 + i * 58})`}>
          <text className="c-big">{s.value}</text>
          <text y="20" className="c-small">{s.name}</text>
        </g>
      ))}
    </svg>
  );
}

function Library() {
  // The algorithm post leads: it's the research this page reports on
  const lead = POSTS.find((p) => p.art === "orb")!;
  const others = POSTS.filter((p) => p !== lead);
  return (
    <section className="rp-section rp-section--aura" aria-labelledby="lib-title">
      <div className="rp-wrap">
        <header className="rp-head rp-head--split">
          <h2 id="lib-title" className="rp-h2">Read the research</h2>
          <a className="rp-link" href="#">All posts in the library</a>
        </header>
        <div className="rp-lib">
          <a className="rp-post rp-post--lead" href="#">
            <Cover kind={lead.art} />
            <div className="rp-post__text">
              <span className="rp-tag">{lead.tag}</span>
              <h3>{lead.title}</h3>
              <time>{lead.date}</time>
            </div>
          </a>
          <div className="rp-lib__list">
            {others.map((p) => (
              <a className="rp-post rp-post--row" href="#" key={p.title}>
                <Cover kind={p.art} />
                <div className="rp-post__text">
                  <span className="rp-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <time>{p.date}</time>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="rp-section" aria-labelledby="faq-title">
      <div className="rp-wrap rp-faq">
        <h2 id="faq-title" className="rp-h2 rp-faq__title">Frequently asked questions</h2>
        <div className="rp-faq__list">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`rp-faq__item ${isOpen ? "is-open" : ""}`} key={q}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{q}</span>
                    <span className="rp-faq__sign" aria-hidden="true" />
                  </button>
                </h3>
                <div className="rp-faq__a" id={`faq-${i}`} role="region">
                  <p>{a as React.ReactNode}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  const canvas = useThree(cylinderScene);
  return (
    <section className="rp-section rp-section--tight" aria-labelledby="oss-title">
      <div className="rp-wrap">
        <div className="rp-oss">
          <div className="rp-oss__copy">
            <h2 id="oss-title" className="rp-h2">The full evaluation framework is open source</h2>
            <p>
              Every number on this page comes from a benchmark harness anyone can run, audit, or extend:
              dataset loaders, judge-model config, and the exact run configs behind these results.
            </p>
            <Btn kind="white">View GitHub</Btn>
          </div>
          <div className="rp-oss__canvas" ref={canvas} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="rp-cta" aria-labelledby="cta-title">
      <div className="rp-wrap rp-cta__in">
        <h2 id="cta-title" className="rp-cta__title">
          Give your AI memory and <span className="rp-striped">personality</span>
        </h2>
        <div className="rp-actions">
          <Btn>Get started</Btn>
          <Btn kind="ink">See pricing</Btn>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
export default function ResearchPage() {
  return (
    <div className="rp">
      <main>
        <Hero />
        <DeepDives />
        <Why />
        <WhatsNew />
        <Library />
        <Faq />
        <OpenSource />
        <Cta />
      </main>
    </div>
  );
}
