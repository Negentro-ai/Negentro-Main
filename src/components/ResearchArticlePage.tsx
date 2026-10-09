// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  white: 0xffffff,
  aura: 0xf9f8ff,
  lavender: 0xeccdf5,
  gayo: 0x765dfb,
  indigo: 0x4846ac,
};

const NAV = ["Developers", "Resources", "Pricing"];

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

const FOOTER = {
  Developers: ["Developer Docs", "API Reference", "MCP Integration", "OpenMemory", "Gateway", "CLI", "Trust Center", "Status"],
  Product: ["Research", "Blog", "Library", "Guide", "Integrations", "Release notes", "GitHub"],
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Seeded random so the 3D forms are identical on every load
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/**
 * Mounts a three.js scene into a div; pauses when off-screen.
 * setup(scene, camera) -> update(time, mouse, camera)
 */
function useThree(setup) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let renderer;
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
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let raf = 0, visible = true, t0 = null;
    const frame = (now) => {
      if (t0 === null) t0 = now;
      update(reduced ? 1e4 : (now - t0) / 1000, mouse, camera);
      renderer.render(scene, camera);
    };
    const loop = (now) => {
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
      scene.traverse((o) => {
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
function dashField(rings, { seed = 7, thick = 0.034, minL = 0.16, maxL = 0.62, gap = [0.07, 0.16], seam = 0.5 } = {}) {
  const rand = rng(seed);
  const out = [];
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

function makeDashMesh(dashes, colorFor, { thick = 0.034, roughness = 0.42, metalness = 0.05, emissive = 0x000000 } = {}) {
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
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

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
class LatitudeArc extends THREE.Curve {
  constructor(r, y, a0, a1) { super(); this.r = r; this.y = y; this.a0 = a0; this.a1 = a1; }
  getPoint(t, target = new THREE.Vector3()) {
    const a = this.a0 + (this.a1 - this.a0) * t;
    return target.set(Math.sin(a) * this.r, this.y, Math.cos(a) * this.r);
  }
}

function heroScene(scene, camera) {
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

  const dashes = [];
  [0, Math.PI].forEach((turn, back) => {
    LOGOMARK.forEach(([x0, x1, yn, hn], i) => {
      const y = -yn * S;
      const r = Math.sqrt(Math.max(1 - yn * yn, 0.0001)) * S; // ring radius at this latitude
      const thick = hn * S;
      // front-view x -> angle on the ring (clamped at the silhouette)
      const ang = (x) => Math.asin(Math.max(-1, Math.min(1, (x * S) / r)));
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

  return (t, mouse, cam) => {
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
function cylinderScene(scene, camera) {
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

  return (t) => {
    group.rotation.y = t * 0.18;
    group.position.y = Math.sin(t * 0.7) * 0.06;
  };
}

/* =================================================================== */
/*  Small pieces                                                       */
/* =================================================================== */
function Mark({ size = 22 }) {
  const rows = [
    [5, 9], [2, 11], [1, 6, 9, 13], [0, 5, 8, 14], [0, 5, 9, 14], [1, 6, 8, 13], [2, 11], [5, 9],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" aria-hidden="true">
      {rows.map((r, i) =>
        r.length === 2 ? (
          <rect key={i} x={r[0]} y={i * 1.85 + 0.2} width={r[1] - r[0] + 1} height="1.1" rx="0.55" fill="currentColor" />
        ) : (
          <g key={i}>
            <rect x={r[0]} y={i * 1.85 + 0.2} width={r[1] - r[0]} height="1.1" rx="0.55" fill="currentColor" />
            <rect x={r[2]} y={i * 1.85 + 0.2} width={r[3] - r[2] + 1} height="1.1" rx="0.55" fill="currentColor" />
          </g>
        )
      )}
    </svg>
  );
}

function Logo() {
  return (
    <a href="/" className="rp-logo" aria-label="Negentro home">
      <Mark size={24} />
      <span>Negentro</span>
    </a>
  );
}

/** A score drawn as a row of capsule dashes, one dash per 2 points. */
function DashMeter({ value, max = 100, count = 50, run = true, delay = 0, label }) {
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

function Btn({ kind = "primary", children, href = "#", ...rest }) {
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
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="rp-nav">
      <div className="rp-wrap rp-nav__in">
        <Logo />
        <nav id="rp-menu" className={`rp-nav__links ${open ? "is-open" : ""}`} aria-label="Main">
          {NAV.map((n) => (
            <a key={n} href="#">{n}</a>
          ))}
        </nav>
        <div className="rp-nav__end">
          <a className="rp-gh" href="#">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>
            Star <span>66,594</span>
          </a>
          <Btn>Get started</Btn>
          <button className="rp-burger" aria-label="Menu" aria-controls="rp-menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <i /><i /><i />
          </button>
        </div>
      </div>
    </header>
  );
}

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

function Pipeline({ feature }) {
  const lit = (id) => feature.nodes.includes(id);
  const linkLit = (id) => feature.links.includes(id);
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
function Cover({ kind }) {
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
  const lead = POSTS.find((p) => p.art === "orb");
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
                  <p>{a}</p>
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

function Footer() {
  return (
    <footer className="rp-footer">
      <div className="rp-wrap">
        <div className="rp-footer__top">
          <div className="rp-footer__brand">
            <Logo />
            <p>Drop-in memory infrastructure for AI agents and apps. Context that persists. Built for production.</p>
            <div className="rp-socials">
              {[
                ["X", "M4 4l16 16M20 4L4 20"],
                ["LinkedIn", "M6 9v9M6 6v.01M10 18v-5a3 3 0 0 1 6 0v5M10 9v9"],
                ["GitHub", "M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-1-2.5c3 0 6-1.5 6-6a4.5 4.5 0 0 0-1.2-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.1 2.8 5.1 3.1 5.1 3.1a4.2 4.2 0 0 0-.1 3.2A4.5 4.5 0 0 0 3.8 9.5c0 4.5 3 6 6 6a3 3 0 0 0-1 2.5V22"],
                ["Discord", "M8 12h.01M16 12h.01M7 17c-3 0-4-1-4-1 0-6 2-10 2-10s2-1.5 5-2l.5 1h3l.5-1c3 .5 5 2 5 2s2 4 2 10c0 0-1 1-4 1l-1-2"],
                ["YouTube", "M3 8c0-2 1-3 3-3h12c2 0 3 1 3 3v8c0 2-1 3-3 3H6c-2 0-3-1-3-3zM10 9l5 3-5 3z"],
              ].map(([n, d]) => (
                <a key={n} href="#" aria-label={n}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div className="rp-compliance">
            <h4>Compliance</h4>
            <ul>
              {["HIPAA Ready", "SOC 2 Type I", "GDPR Ready"].map((c) => (
                <li key={c}><Mark size={14} />{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rp-footer__cols">
          {Object.entries(FOOTER).map(([h, links]) => (
            <div key={h}>
              <h4>{h}</h4>
              <ul>
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" aria-current={l === "Research" ? "page" : undefined}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rp-footer__bottom">
          <span>© 2026 Negentro</span>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =================================================================== */
export default function ResearchPage(props: any) {
  return (
    <div className="rp">
      <style>{CSS}</style>
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

/* =================================================================== */
/*  Styles (kept in this file, injected by <style> above)              */
/* =================================================================== */
const CSS = `
/* ---------------------------------------------------------------------
   Research page — Negentro theme, white mode
--------------------------------------------------------------------- */

.rp {
  /* palette */
  --white: #ffffff;
  --aura: #f9f8ff;
  --lavender: #eccdf5;
  --gayo: #765dfb;
  --indigo: #4846ac;
  --ink: #00050e;

  /* derived */
  --ink-2: #4a4d5e;           /* body text on white, 8.7:1 */
  --ink-3: #6b6e80;           /* secondary, 5.1:1 */
  --rule: #e6e2f6;
  --track: #ebe6fb;           /* empty dash */
  --gayo-tint: #f1eeff;

  /* type */
  --display: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --text: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --mono: "DM Sans", ui-sans-serif, system-ui, sans-serif;

  /* scale: 1.333 */
  --t-12: 0.75rem;
  --t-14: 0.875rem;
  --t-16: 1rem;
  --t-18: 1.125rem;
  --t-21: 1.333rem;
  --t-28: 1.777rem;
  --t-37: 2.369rem;
  --t-50: 3.157rem;

  --wrap: 1240px;
  --gutter: clamp(16px, 4vw, 40px);
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);

  background: var(--white);
  color: var(--ink);
  font-family: var(--text);
  font-size: var(--t-16);
  line-height: 1.6;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: clip;
}
.rp *, .rp *::before, .rp *::after { box-sizing: border-box; }
:where(.rp) :where(a) { color: inherit; text-decoration: none; }
:where(.rp) :where(button) { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; text-align: inherit; }
:where(.rp) :where(h1, h2, h3, h4, p, ul, dl, dd) { margin: 0; padding: 0; }
:where(.rp) :where(ul) { list-style: none; }
.rp :focus-visible { outline: 2px solid var(--gayo); outline-offset: 3px; border-radius: 6px; }
.rp ::selection { background: var(--lavender); color: var(--ink); }

.rp-wrap { width: 100%; max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter); }
.rp-num { font-family: var(--mono); font-feature-settings: "tnum"; letter-spacing: -0.01em; }

/* ---------- type ---------- */
.rp-display {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(2.6rem, 6.4vw, 5.6rem);
  line-height: 0.98;
  letter-spacing: -0.045em;
  max-width: 11ch;
  text-wrap: balance;
}
.rp-h2 {
  font-family: var(--display);
  font-weight: 400;
  font-size: clamp(2rem, 4vw, var(--t-50));
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.rp-h3 {
  font-family: var(--display);
  font-weight: 400;
  font-size: var(--t-37);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.rp-sub { color: var(--ink-3); max-width: 52ch; font-size: var(--t-16); }
.rp-lede { color: var(--ink-2); font-size: var(--t-18); line-height: 1.6; max-width: 44ch; }

/* ---------- buttons ---------- */
.rp-btn {
  --bg: var(--gayo); --fg: #fff; --dash: rgba(255,255,255,.75);
  display: inline-flex; align-items: center; gap: 12px;
  height: 48px; padding: 0 22px;
  border-radius: 8px;
  background: var(--bg); color: var(--fg) !important;
  font-family: var(--text); font-weight: 400; font-size: var(--t-14);
  white-space: nowrap;
  transition: background .2s, color .2s, box-shadow .2s;
}
.rp-btn__dash { flex: none; width: 16px; height: 16px; color: var(--dash); transition: transform .25s var(--ease); }
.rp-btn:hover .rp-btn__dash { transform: translateX(3px); }
.rp-btn--primary:hover { --bg: var(--indigo); }
.rp-btn--quiet { --bg: transparent; --fg: var(--gayo); --dash: var(--gayo); box-shadow: inset 0 0 0 1px var(--rule); }
.rp-btn--quiet:hover { box-shadow: inset 0 0 0 1px var(--gayo); }
.rp-btn--ink { --bg: var(--ink); }
.rp-btn--ink:hover { --bg: #1d2030; }
.rp-btn--white { --bg: #fff; --fg: var(--gayo); --dash: var(--gayo); }
.rp-btn--white:hover { --bg: var(--aura); }
.rp-actions { display: flex; flex-wrap: wrap; gap: 10px; }

.rp-link { display: inline-flex; align-items: center; gap: 10px; color: var(--gayo) !important; font-size: var(--t-14); font-weight: 400; }
.rp-link::after { content: ""; width: 16px; height: 16px; background: currentColor; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12h15M13 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12h15M13 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat; transition: transform .25s var(--ease); }
.rp-link:hover::after { transform: translateX(3px); }

/* ---------- nav ---------- */
.rp-nav {
  position: sticky; top: 0; z-index: 40;
  background: rgba(255,255,255,.82);
  backdrop-filter: saturate(160%) blur(16px);
  -webkit-backdrop-filter: saturate(160%) blur(16px);
  border-bottom: 1px solid var(--rule);
}
.rp-nav__in { height: 68px; display: flex; align-items: center; gap: 32px; }
.rp-logo { display: inline-flex; align-items: center; gap: 10px; color: var(--gayo); }
.rp-logo span { font-family: var(--display); font-size: 1.4rem; letter-spacing: -0.04em; color: var(--ink); font-weight: 400; }
.rp-nav__links { display: flex; gap: 28px; margin-right: auto; font-size: var(--t-14); font-weight: 400; }
.rp-nav__links a { color: var(--ink-2); transition: color .2s; }
.rp-nav__links a:hover { color: var(--gayo); }
.rp-nav__end { display: flex; align-items: center; gap: 10px; }
.rp-nav__end .rp-btn { height: 40px; padding: 0 18px; }
.rp-gh { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--rule); font-size: var(--t-14); font-weight: 400; }
.rp-gh span { font-family: var(--mono); color: var(--gayo); padding-left: 10px; border-left: 1px solid var(--rule); }
.rp-burger { display: none; width: 40px; height: 40px; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--rule); flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.rp-burger i { display: block; height: 2px; border-radius: 2px; background: var(--ink); }
.rp-burger i:nth-child(1) { width: 16px; }
.rp-burger i:nth-child(2) { width: 10px; margin-left: 6px; }
.rp-burger i:nth-child(3) { width: 14px; margin-right: 2px; }

/* ---------- hero ---------- */
.rp-hero {
  position: relative;
  background:
    radial-gradient(60% 70% at 78% 38%, rgba(236,205,245,.55), transparent 70%),
    linear-gradient(180deg, var(--aura), var(--white) 85%);
  padding-bottom: 72px;
}
.rp-hero__canvas { position: absolute; top: 0; right: 0; width: 58%; height: 720px; }
.rp-hero__canvas canvas { display: block; width: 100% !important; height: 100% !important; }
.rp-hero__grid { position: relative; min-height: 640px; display: flex; align-items: center; padding-top: 48px; padding-bottom: 40px; pointer-events: none; }
.rp-hero__copy { pointer-events: auto; display: grid; gap: 28px; }
.rp-crumb { display: flex; gap: 10px; font-size: var(--t-14); color: var(--ink-3); font-weight: 400; }
.rp-crumb a { color: var(--gayo); }

/* score ledger */
.rp-ledger {
  position: relative;
  display: grid; grid-template-columns: 1.35fr 1fr; gap: 0;
  background: var(--white);
  border: 1px solid var(--rule);
  border-radius: 28px;
  box-shadow: 0 30px 60px -40px rgba(72,70,172,.35);
}
.rp-ledger__scores { padding: 28px 32px; display: grid; gap: 14px; }
.rp-ledger__row { display: grid; grid-template-columns: 112px 1fr 56px; align-items: center; gap: 20px; }
.rp-ledger__name { font-size: var(--t-14); font-weight: 400; color: var(--ink-2); }
.rp-ledger__val { font-size: var(--t-28); color: var(--gayo); text-align: right; line-height: 1; }
.rp-ledger__tokens { padding: 28px 32px; border-left: 1px solid var(--rule); display: grid; align-content: center; gap: 18px; }
.rp-ledger__title { font-family: var(--text); font-size: var(--t-14); font-weight: 400; color: var(--ink-3); }
.rp-tok__head { display: flex; justify-content: space-between; font-size: var(--t-14); font-weight: 400; margin-bottom: 8px; }
.rp-tok__head .rp-num { font-size: var(--t-18); }
.rp-tok__track { height: 8px; }
.rp-tok__line {
  height: 8px; border-radius: 8px;
  background: repeating-linear-gradient(90deg, var(--ink-3) 0 18px, transparent 18px 23px);
  opacity: .45;
  transition: width 1.4s var(--ease) .3s;
}
.rp-tok.is-ours .rp-tok__line { background: repeating-linear-gradient(90deg, var(--gayo) 0 18px, transparent 18px 23px); opacity: 1; }
.rp-tok.is-ours .rp-tok__head .rp-num { color: var(--gayo); }

/* dash meter: one capsule per 2 points */
.rp-meter { display: flex; gap: 3px; align-items: center; min-width: 0; }
.rp-meter i { flex: 1 1 0; min-width: 2px; height: 8px; border-radius: 8px; background: var(--track); transition: background .25s; }
.rp-meter i.is-on { background: var(--gayo); }

/* ---------- sections ---------- */
.rp-section { padding: clamp(80px, 11vw, 140px) 0; }
.rp-section--aura { background: var(--aura); }
.rp-section--tight { padding-top: 0; }
.rp-head { display: grid; gap: 16px; margin-bottom: clamp(40px, 5vw, 64px); max-width: 760px; }
.rp-head--split { max-width: none; grid-template-columns: 1fr auto; align-items: end; gap: 24px 64px; }
.rp-head--split .rp-h2 { max-width: 14ch; }
.rp-head--split .rp-sub { max-width: 40ch; }

/* ---------- deep dives ---------- */
.rp-dd { display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; }
.rp-dd__index { display: grid; gap: 4px; position: sticky; top: 92px; }
.rp-dd__index > button {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 16px 18px; border-radius: 16px;
  font-family: var(--display); font-size: var(--t-21); letter-spacing: -0.02em; font-weight: 400;
  color: var(--ink-3);
  transition: background .2s, color .2s;
}
.rp-dd__index > button .rp-num { font-size: var(--t-14); }
.rp-dd__index > button:hover { color: var(--ink); }
.rp-dd__index > button.is-active { background: var(--white); color: var(--ink); box-shadow: inset 0 0 0 1px var(--rule); }
.rp-dd__index > button.is-active .rp-num { color: var(--gayo); }


.rp-dd__panel {
  background: var(--white); border: 1px solid var(--rule); border-radius: 28px;
  padding: clamp(24px, 4vw, 48px);
  display: grid; gap: 36px;
  animation: rp-in .4s var(--ease);
}
@keyframes rp-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.rp-dd__top { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: start; }
.rp-dd__meta { margin-top: 10px; color: var(--gayo); font-size: var(--t-14); font-weight: 400; }
.rp-dd__desc { margin-top: 12px; color: var(--ink-2); max-width: 46ch; }
.rp-dd__kpis { display: flex; gap: 12px; }
.rp-dd__kpis > div { padding: 16px 20px; border-radius: 18px; background: var(--aura); min-width: 140px; }
.rp-dd__kpis dt { font-size: var(--t-12); color: var(--ink-3); font-weight: 400; }
.rp-dd__kpis dd { font-size: var(--t-37); line-height: 1.1; letter-spacing: -0.03em; }
.rp-dd__kpis > div:first-child dd { color: var(--gayo); }
.rp-dd__cats { display: grid; gap: 14px; }
.rp-cat { display: grid; grid-template-columns: 180px 1fr 48px; gap: 20px; align-items: center; font-size: var(--t-14); font-weight: 400; }
.rp-cat > .rp-num { text-align: right; color: var(--gayo); font-size: var(--t-16); }
.rp-dd__foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px; padding-top: 20px; border-top: 1px solid var(--rule); }
.rp-dd__note { flex: 1 1 280px; color: var(--ink-3); font-size: var(--t-14); }
.rp-dd__foot .rp-btn { flex: none; }

/* ---------- why ---------- */
.rp-why { border-top: 1px solid var(--rule); }
.rp-why__row {
  display: grid; grid-template-columns: 1fr 1fr 1.5fr; gap: 24px 48px;
  padding: 36px 0; border-bottom: 1px solid var(--rule);
  align-items: start;
}
.rp-why__title { font-family: var(--display); font-weight: 400; font-size: var(--t-28); letter-spacing: -0.03em; line-height: 1.1; }
.rp-why__fig { display: grid; gap: 4px; }
.rp-why__fig .rp-num { font-size: var(--t-37); line-height: 1; color: var(--gayo); letter-spacing: -0.04em; }
.rp-why__fig span:last-child { font-size: var(--t-14); color: var(--ink-3); }
.rp-why__body { color: var(--ink-2); max-width: 54ch; }

/* ---------- what's new ---------- */
.rp-new { display: grid; grid-template-columns: 340px 1fr; gap: 24px; align-items: stretch; }
.rp-new__list { display: grid; gap: 4px; align-content: start; }
.rp-feat {
  width: 100%; display: grid; padding: 20px 22px; border-radius: 18px;
  transition: background .2s;
}
.rp-feat:hover { background: var(--aura); }
.rp-feat.is-active { background: var(--gayo-tint); }
.rp-feat__title { font-family: var(--display); font-size: var(--t-21); letter-spacing: -0.02em; line-height: 1.2; color: var(--ink-3); font-weight: 400; transition: color .2s; }
.rp-feat.is-active .rp-feat__title, .rp-feat:hover .rp-feat__title { color: var(--ink); }
.rp-feat__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s var(--ease); }
.rp-feat__body > span { overflow: hidden; color: var(--ink-2); font-size: var(--t-14); line-height: 1.65; }
.rp-feat.is-active .rp-feat__body { grid-template-rows: 1fr; }
.rp-feat.is-active .rp-feat__body > span { padding-top: 12px; }
.rp-feat .rp-link { display: flex; margin-top: 14px; width: max-content; }

.rp-new__diagram { border-radius: 28px; background: var(--aura); border: 1px solid var(--rule); padding: clamp(16px, 2.5vw, 32px); display: flex; align-items: center; }
.rp-new__scroll { width: 100%; overflow-x: auto; }
.rp-pipe { display: block; width: 100%; min-width: 680px; height: auto; font-family: var(--text); color: var(--gayo); }
.rp-pipe__dot { fill: #dcd6f5; }
.rp-pipe__step { stroke: #c9c1f0; stroke-width: 1.5; color: #c9c1f0; }
.rp-pipe__link { fill: none; stroke: #d3cdee; stroke-width: 1.6; color: #d3cdee; transition: stroke .3s, color .3s; }
.rp-pipe__link.is-back { stroke-dasharray: 4 5; }
.rp-pipe__link.is-lit { stroke: var(--gayo); color: var(--gayo); stroke-width: 2.2; stroke-dasharray: 10 6; animation: rp-flow 0.9s linear infinite; }
@keyframes rp-flow { to { stroke-dashoffset: -16; } }
.rp-pipe__store { fill: none; stroke: #cfc8f2; stroke-width: 1.4; stroke-dasharray: 6 6; }
.rp-pipe__storeLabel { fill: var(--ink-3); font-size: 13px; }

.rp-node__box { fill: #fff; stroke: var(--rule); stroke-width: 1.2; transition: stroke .3s, fill .3s; }
.rp-node__label { fill: var(--ink-3); font-size: 15px; font-weight: 400; transition: fill .3s; }
.rp-node__sub { fill: #9a9cab; font-size: 12px; }
.rp-node__step { fill: #b9b3d8; font-family: var(--mono); font-size: 12px; }
.rp-node__badge { fill: var(--gayo); }
.rp-node__badgeText { fill: #fff; font-size: 11px; font-weight: 400; }
.rp-node__icon { fill: none; stroke: #b9b3d8; stroke-width: 1.6; transition: stroke .3s; }
.rp-node.is-lit .rp-node__box { stroke: var(--gayo); stroke-width: 1.8; }
.rp-node.is-lit .rp-node__label { fill: var(--ink); }
.rp-node.is-lit .rp-node__sub { fill: var(--gayo); }
.rp-node.is-lit .rp-node__icon { stroke: var(--gayo); }
.rp-node--db.is-lit .rp-node__box { fill: var(--gayo-tint); }

/* ---------- library ---------- */
.rp-lib { display: grid; grid-template-columns: 1.25fr 1fr; gap: 24px; }
.rp-post { display: grid; gap: 18px; }
.rp-cover { display: block; width: 100%; height: auto; border-radius: 20px; transition: transform .5s var(--ease); }
.rp-post:hover .rp-cover { transform: scale(1.015); }
.rp-post__text { display: grid; gap: 8px; justify-items: start; }
.rp-post h3 { font-family: var(--display); font-weight: 400; letter-spacing: -0.025em; line-height: 1.15; transition: color .2s; }
.rp-post:hover h3 { color: var(--gayo); }
.rp-post time { font-size: var(--t-14); color: var(--ink-3); }
.rp-tag { font-size: var(--t-12); font-weight: 400; color: var(--gayo); padding: 3px 10px; border-radius: 99px; background: var(--gayo-tint); }
.rp-post--lead h3 { font-size: var(--t-37); max-width: 18ch; }
.rp-lib__list { display: grid; gap: 0; align-content: start; }
.rp-post--row { grid-template-columns: 180px 1fr; align-items: center; gap: 22px; padding: 18px 0; border-bottom: 1px solid var(--rule); }
.rp-post--row:first-child { padding-top: 0; }
.rp-post--row h3 { font-size: var(--t-21); }
.rp-post--row .rp-cover { border-radius: 14px; }

.rp-cover--aura { background: #fff; box-shadow: inset 0 0 0 1px var(--rule); }
.rp-cover--lav { background: var(--lavender); }
.rp-cover--gayo { background: radial-gradient(120% 120% at 0% 100%, var(--lavender) 0%, var(--gayo) 45%, var(--indigo) 100%); }
.rp-cover .c-on { fill: var(--gayo); }
.rp-cover .c-off { fill: var(--track); }
.rp-cover .c-num { fill: var(--ink-3); font-family: var(--mono); font-size: 12px; }
.rp-cover .c-axis { stroke: var(--indigo); stroke-width: 1.5; opacity: .5; }
.rp-cover .c-w { fill: #fff; }
.rp-cover .c-w2 { fill: rgba(255,255,255,.72); }
.rp-cover .c-big { fill: #fff; font-family: var(--mono); font-size: 34px; letter-spacing: -1px; }
.rp-cover .c-small { fill: rgba(255,255,255,.8); font-family: var(--text); font-size: 13px; }

/* ---------- faq ---------- */
.rp-faq { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
.rp-faq__title { position: sticky; top: 100px; max-width: 10ch; }
.rp-faq__list { border-top: 1px solid var(--rule); }
.rp-faq__item { border-bottom: 1px solid var(--rule); }
.rp-faq__item h3 { font: inherit; }
.rp-faq__item button { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 24px 0; font-size: var(--t-18); font-weight: 400; transition: color .2s; }
.rp-faq__item button:hover, .rp-faq__item.is-open button { color: var(--gayo); }
.rp-faq__sign { position: relative; flex: none; width: 22px; height: 22px; }
.rp-faq__sign::before, .rp-faq__sign::after { content: ""; position: absolute; left: 3px; right: 3px; top: 50%; height: 3px; margin-top: -1.5px; border-radius: 3px; background: var(--gayo); transition: transform .3s var(--ease); }
.rp-faq__sign::after { transform: rotate(90deg); }
.rp-faq__item.is-open .rp-faq__sign::after { transform: rotate(0); }
.rp-faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s var(--ease); }
.rp-faq__a p { overflow: hidden; color: var(--ink-2); max-width: 60ch; }
.rp-faq__item.is-open .rp-faq__a { grid-template-rows: 1fr; }
.rp-faq__item.is-open .rp-faq__a p { padding-bottom: 26px; }

/* ---------- open source ---------- */
.rp-oss {
  display: grid; grid-template-columns: 1.1fr 1fr; align-items: center;
  border-radius: 32px; overflow: hidden;
  background: radial-gradient(90% 120% at 100% 50%, #8a75fc 0%, var(--gayo) 45%, var(--indigo) 130%);
  color: #fff;
}
.rp-oss__copy { padding: clamp(32px, 5vw, 72px); display: grid; gap: 22px; justify-items: start; }
.rp-oss__copy .rp-h2 { max-width: 15ch; }
.rp-oss__copy p { color: rgba(255,255,255,.86); max-width: 46ch; }
.rp-oss__canvas { height: 100%; min-height: 380px; }
.rp-oss__canvas canvas { display: block; width: 100% !important; height: 100% !important; }

/* ---------- cta ---------- */
.rp-cta { padding: clamp(80px, 12vw, 160px) 0; }
.rp-cta__in { display: grid; gap: 36px; justify-items: start; }
.rp-cta__title {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(2.6rem, 7vw, 6.2rem); line-height: 1; letter-spacing: -0.045em;
  max-width: 13ch;
}
.rp-striped {
  color: transparent;
  background: repeating-linear-gradient(180deg, var(--gayo) 0 0.07em, transparent 0.07em 0.12em);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-stroke: 1px var(--gayo);
}

/* ---------- footer ---------- */
.rp-footer { background: var(--gayo); color: #fff; padding: 72px 0 28px; font-size: var(--t-14); }
.rp-footer .rp-logo, .rp-footer .rp-logo span { color: #fff; }
.rp-footer__top { display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; padding-bottom: 48px; }
.rp-footer__brand { display: grid; gap: 18px; max-width: 360px; }
.rp-footer__brand p { color: rgba(255,255,255,.85); }
.rp-socials { display: flex; gap: 8px; }
.rp-socials a { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,.35); transition: background .2s; }
.rp-socials a:hover { background: rgba(255,255,255,.14); }
.rp-compliance h4, .rp-footer__cols h4 { font-family: var(--display); font-weight: 400; font-size: var(--t-16); margin-bottom: 14px; }
.rp-compliance ul { display: flex; flex-wrap: wrap; gap: 8px; }
.rp-compliance li { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 99px; background: rgba(255,255,255,.12); color: #fff; }
.rp-footer__cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 40px 0; border-top: 1px solid rgba(255,255,255,.25); }
.rp-footer__cols li a { display: inline-block; padding: 4px 0; color: rgba(255,255,255,.8); transition: color .2s; }
.rp-footer__cols li a:hover { color: #fff; }
.rp-footer__cols a[aria-current="page"] { color: #fff; display: inline-flex; align-items: center; gap: 8px; }
.rp-footer__cols a[aria-current="page"]::before { content: ""; width: 14px; height: 14px; background: var(--lavender); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12h15M13 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12h15M13 6l6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat; }
.rp-footer__bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.25); color: rgba(255,255,255,.8); }
.rp-footer__bottom div { display: flex; gap: 22px; }
.rp-footer__bottom a:hover { color: #fff; }

/* ---------- responsive ---------- */
@media (max-width: 1100px) {
  .rp-new { grid-template-columns: 1fr; }
  .rp-new__list { grid-template-columns: repeat(2, 1fr); }
  .rp-dd { grid-template-columns: 240px 1fr; }
  .rp-dd__top { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .rp-nav__links {
    display: none; position: absolute; top: 68px; left: 0; right: 0;
    flex-direction: column; gap: 0; padding: 8px var(--gutter) 20px;
    background: #fff; border-bottom: 1px solid var(--rule);
  }
  .rp-nav__links.is-open { display: flex; }
  .rp-nav__links a { padding: 14px 0; font-size: var(--t-18); border-bottom: 1px solid var(--rule); }
  .rp-burger { display: flex; }
  .rp-gh { display: none; }
  .rp-nav__in { justify-content: space-between; }

  .rp-hero__canvas { position: relative; width: 100%; height: 360px; }
  .rp-hero__grid { min-height: 0; padding-top: 0; }
  .rp-hero__copy { gap: 22px; }

  .rp-ledger { grid-template-columns: 1fr; }
  .rp-ledger__tokens { border-left: 0; border-top: 1px solid var(--rule); }

  .rp-head--split { grid-template-columns: 1fr; }
  .rp-dd { grid-template-columns: 1fr; }
  .rp-dd__index { position: static; grid-template-columns: repeat(2, 1fr); }
    .rp-why__row { grid-template-columns: 1fr; gap: 14px; }
  .rp-lib { grid-template-columns: 1fr; }
  .rp-faq { grid-template-columns: 1fr; gap: 24px; }
  .rp-faq__title { position: static; max-width: none; }
  .rp-oss { grid-template-columns: 1fr; }
  .rp-oss__canvas { order: -1; min-height: 280px; }
  .rp-footer__cols { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .rp-nav__end .rp-btn { display: none; }
  .rp-hero__canvas { height: 300px; }
  .rp-ledger__scores, .rp-ledger__tokens { padding: 22px 18px; }
  .rp-ledger__row { grid-template-columns: 1fr auto; gap: 8px 12px; }
  .rp-ledger__row .rp-meter { grid-column: 1 / -1; grid-row: 2; }
  .rp-ledger__val { font-size: var(--t-21); }
  .rp-meter { gap: 2px; }
  .rp-cat { grid-template-columns: 1fr auto; gap: 8px; }
  .rp-cat .rp-meter { grid-column: 1 / -1; grid-row: 2; }
  .rp-dd__kpis { flex-wrap: wrap; }
  .rp-dd__kpis > div { flex: 1; min-width: 0; }
  .rp-new__list { grid-template-columns: 1fr; }
  .rp-post--row { grid-template-columns: 110px 1fr; gap: 16px; }
  .rp-post--row h3 { font-size: var(--t-18); }
  .rp-post--lead h3 { font-size: var(--t-28); }
  .rp-faq__item button { font-size: var(--t-16); }
}
@media (prefers-reduced-motion: reduce) {
  .rp *, .rp *::before, .rp *::after { transition-duration: 0s !important; animation: none !important; }
}
`;
