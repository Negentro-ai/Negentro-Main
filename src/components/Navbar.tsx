import { useEffect, useRef, useState } from "react";
import "./css/Navbar.css";

export interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTryPiyApi?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const NAV = [
  { label: "Research", href: "/research", tab: "research" },
  { label: "Pricing", href: "/pricing", tab: "pricing" },
  { label: "Initiatives", menu: true, tab: "initiatives" },
  { label: "Resources", href: "/resources", tab: "resources" },
  { label: "Company", href: "/company", tab: "company" },
];

/* Initiatives: Use Cases is one page; Industries opens its list inside the same panel */
const USE_CASES = {
  title: "Use Cases",
  text: "Explore the real-world workflows powered by persistent memory architecture.",
  href: "/use-cases",
  tab: "use-cases"
};
const INDUSTRIES = {
  title: "Industries",
  text: "Discover how persistent intelligence can transform different industries.",
  all: { label: "All industries", href: "/industries", tab: "industry:all" },
  items: [
    { label: "Education & EdTech", href: "/industries/education", tab: "industry:education" },
    { label: "E-commerce & Retail", href: "/industries/ecommerce", tab: "industry:ecommerce" },
    { label: "Media & Entertainment", href: "/industries/media", tab: "industry:media" },
    { label: "HR & Recruiting", href: "/industries/hr", tab: "industry:hr" },
    { label: "Finance & Accounting", href: "/industries/finance", tab: "industry:finance" },
    { label: "Consulting & Enterprise", href: "/industries/consulting", tab: "industry:consulting" },
    { label: "Legal & Compliance", href: "/industries/legal", tab: "industry:legal" },
    { label: "SaaS & Dev Tools", href: "/industries/saas", tab: "industry:saas" },
    { label: "Healthcare & Medical", href: "/industries/healthcare", tab: "industry:healthcare" },
    { label: "Customer Support", href: "/industries/support", tab: "industry:support" },
  ],
};

// Negentro logomark, traced from the brand guide: [x0, x1, y, halfThickness], radius 1
const LOGOMARK = [
  [-0.332, 0.535, -0.808, 0.045], [-0.659, -0.208, -0.69, 0.046], [-0.055, 0.764, -0.575, 0.046],
  [-0.869, 0.009, -0.462, 0.045], [0.086, 0.931, -0.343, 0.045], [-0.976, -0.11, -0.228, 0.045],
  [0.146, 1.0, -0.116, 0.045], [-1.0, -0.138, 0.0, 0.049], [0.146, 1.0, 0.117, 0.046],
  [-0.976, -0.11, 0.23, 0.045], [0.086, 0.931, 0.344, 0.046], [-0.869, 0.009, 0.464, 0.045],
  [-0.055, 0.764, 0.576, 0.045], [-0.659, -0.205, 0.69, 0.044], [-0.332, 0.535, 0.805, 0.048],
];

function Mark({ size = 24 }: any) {
  return (
    <svg width={size} height={size} viewBox="-1.06 -1.06 2.12 2.12" aria-hidden="true">
      {LOGOMARK.map(([a, b, y, h], i) => (
        <rect key={i} x={a} y={y - h} width={b - a} height={h * 2} rx={h} fill="currentColor" />
      ))}
    </svg>
  );
}

const Arrow = ({ className = "nb-arrow" }: any) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

const Chevron = () => (
  <svg className="nb-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M2 3.5 5 6.5l3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Initiatives dropdown: hovering a group swaps the list in place     */
/* ------------------------------------------------------------------ */
function InitiativesMenu({ current, setActiveTab }: any) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<any>(null);

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 160); };

  useEffect(() => {
    const onKey = (e: any) => e.key === "Escape" && setOpen(false);
    const onDown = (e: any) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); clearTimeout(timer.current); };
  }, []);

  const tab = open ? 0 : -1;
  const nav = (e: any, targetTab: string) => { e.preventDefault(); setActiveTab(targetTab); setOpen(false); };

  return (
    <div className="nb-dd" ref={wrap} onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className={`nb-link nb-link--menu ${open ? "is-open" : ""} ${current === "Initiatives" ? "is-current" : ""}`}
        aria-expanded={open}
        aria-controls="nb-initiatives"
        onClick={() => setOpen((o) => !o)}
      >
        Initiatives <Chevron />
      </button>

      <div id="nb-initiatives" className={`nb-panel ${open ? "is-open" : ""}`} onFocus={show} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}>
        <div className="nb-panel__inner">
          {/* left: Use Cases is a page, Industries labels the list on the right */}
          <div className="nb-groups">
            <a href={USE_CASES.href} onClick={(e) => nav(e, USE_CASES.tab)} className="nb-group nb-group--link" tabIndex={tab}>
              <span className="nb-group__title">{USE_CASES.title}<Arrow className="nb-group__arrow" /></span>
              <span className="nb-group__text">{USE_CASES.text}</span>
            </a>
            <div className="nb-group is-on" id="nb-ind-title">
              <span className="nb-group__title">{INDUSTRIES.title}</span>
              <span className="nb-group__text">{INDUSTRIES.text}</span>
            </div>
          </div>

          {/* right: industries */}
          <div className="nb-list" aria-labelledby="nb-ind-title">
            <ul className="nb-items nb-items--two">
              {INDUSTRIES.items.map((it) => (
                <li key={it.label}>
                  <a href={it.href} onClick={(e) => nav(e, it.tab)} className="nb-item" tabIndex={tab}>
                    <span>{it.label}</span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mobile: Initiatives expands to Use Cases (a page) and the industries list */
function MobileInitiatives({ setActiveTab }: any) {
  const [open, setOpen] = useState(false);
  const nav = (e: any, targetTab: string) => { e.preventDefault(); setActiveTab(targetTab); setOpen(false); };
  
  return (
    <>
      <button type="button" className="nb-m-link" aria-expanded={open} onClick={() => setOpen(!open)}>
        Initiatives <Chevron />
      </button>
      <div className={`nb-m-sub ${open ? "is-open" : ""}`}>
        <div>
          <a href={USE_CASES.href} onClick={(e) => nav(e, USE_CASES.tab)} className="nb-m-item nb-m-item--page">{USE_CASES.title}<Arrow /></a>
          <p className="nb-m-head">{INDUSTRIES.title}</p>
          {INDUSTRIES.items.map((it) => <a key={it.label} href={it.href} onClick={(e) => nav(e, it.tab)} className="nb-m-item">{it.label}</a>)}
        </div>
      </div>
    </>
  );
}

export function Navbar({ activeTab, setActiveTab, onTryPiyApi }: NavbarProps) {
  const [mobile, setMobile] = useState(false);
  const brand = "Negentro";

  const getLabel = (tab: string) => {
    if (tab === 'company') return 'Company';
    if (tab === 'research') return 'Research';
    if (tab === 'pricing') return 'Pricing';
    if (tab === 'use-cases' || tab.startsWith('industry:')) return 'Initiatives';
    if (tab === 'resources') return 'Resources';
    return '';
  };
  const current = getLabel(activeTab);

  const onNav = (e: any, targetTab: string) => { 
    e.preventDefault(); 
    setActiveTab(targetTab); 
    setMobile(false); 
  };

  return (
    <header className={`nb ${activeTab === 'overview' ? 'nb--transparent' : ''}`}>
      <div className="nb-wrap">
        <a href="/" onClick={(e) => onNav(e, 'overview')} className="nb-logo" aria-label="Home">
          <Mark />
          <span>{brand}</span>
        </a>

        <nav className="nb-links" aria-label="Main">
          {NAV.map((n) =>
            n.menu ? (
              <InitiativesMenu key={n.label} current={current} setActiveTab={setActiveTab} />
            ) : (
              <a key={n.label} href={n.href} onClick={(e) => onNav(e, n.tab!)} className={`nb-link ${current === n.label ? "is-current" : ""}`} aria-current={current === n.label ? "page" : undefined}>
                {n.label}
              </a>
            )
          )}
        </nav>

        <div className="nb-end">
          <button className="nb-try-btn" onClick={onTryPiyApi}>Try Piyapi</button>
          <button className="nb-burger" aria-label="Menu" aria-expanded={mobile} aria-controls="nb-mobile" onClick={() => setMobile(!mobile)}>
            <i /><i /><i />
          </button>
        </div>
      </div>

      <div className={`nb-mobile ${mobile ? "is-open" : ""}`} id="nb-mobile">
        <div className="nb-mobile__inner">
          {NAV.map((n) =>
            n.menu ? (
              <MobileInitiatives key={n.label} setActiveTab={setActiveTab} />
            ) : (
              <a key={n.label} href={n.href} onClick={(e) => onNav(e, n.tab!)} className={`nb-m-link ${current === n.label ? "is-current" : ""}`} aria-current={current === n.label ? "page" : undefined}>
                {n.label}<Arrow />
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
}
