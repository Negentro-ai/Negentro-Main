import { useEffect, useRef, useState } from "react"
import type React from "react"
import { NegentroLogo } from "./Logos"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"




export interface NavbarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
	onTryPiyApi?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
	const { t } = useLanguage()
	const [mobileOpen, setMobileOpen] = useState(false)






	/* useEffect(() => {
		const fetchIndustries = async () => {
			const client = await getSupabase()
			if (client) {
				const { data } = await client
					.from("cms_records")
					.select("title, slug, status")
					.eq("kind", "industries")
					.eq("status", "Published")
					.order("created_at", { ascending: true })
				if (data && data.length > 0) {
					const mapped = data.map((d) => ({
						name: d.title,
						slug: d.slug,
					}))
					setIndustryPages(mapped)
				}
			}
		}
		fetchIndustries()
	}, []) */

	const navItems = [
		{ key: "research", label: t.nav.research },
		{ key: "pricing", label: t.nav.pricing },
		{ key: "initiatives", label: t.nav.initiatives },
		{ key: "resources", label: t.nav.resources },
		{ key: "company", label: t.nav.company },
	]
	const isOverview = activeTab === "overview"

	return (
		<header
			className={`w-full transition-all duration-300 ${
				isOverview
					? "absolute top-0 inset-x-0 z-50 bg-transparent border-b border-white/10"
					: "relative z-50 bg-white border-b border-[#e5e7eb]"
			}`}
		>
			<div className="container-universal h-19 flex items-center justify-between relative">
				{/* Left: Negentro Brand Logo */}
				<div className="flex items-center z-10">
					<button
						onClick={() => setActiveTab("overview")}
						className="flex items-center transition-all duration-300 ease-out hover:opacity-85 hover:scale-[1.03] active:scale-[0.97] cursor-pointer focus:outline-none"
						title="Negentro Home"
						aria-label="Negentro Home"
					>
						<NegentroLogo
							className={`h-8 sm:h-8.5 transition-all duration-300 ${
								isOverview ? "brightness-0 invert" : ""
							}`}
						/>
					</button>
				</div>

				{/* Center: Soft Rounded Rectangle Nav Container */}
				<div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
					<nav
						className={`flex items-center rounded-[10px] h-11.5 px-8 gap-7 sm:gap-8 transition-all duration-300 ${
							isOverview
								? "bg-white/10 border border-white/15 backdrop-blur-md text-white"
								: "bg-secondary text-neutral-950"
						}`}
					>
						{navItems.map((item) => {
							const isActive = activeTab === item.key

							if (item.key === "initiatives") {
								return (
									<InitiativesDropdown
										key={item.key}
										label={item.label}
										current={
											activeTab === "use-cases" ||
											activeTab.startsWith("industry:")
										}
										dark={isOverview}
										onNavigate={setActiveTab}
									/>
								)
							}

							if (item.key === "resources") {
								return (
									<ResourcesDropdown
										key={item.key}
										label={item.label}
										dark={isOverview}
										current={
											activeTab === "docs" ||
											activeTab === "blog" ||
											activeTab.startsWith("blog-article:")
										}
										onNavigate={setActiveTab}
									/>
								)
							}

							return (
								<div
									key={item.key}
									className="relative flex items-center h-full group"
								>
									<button
										onClick={() => setActiveTab(item.key)}
										className={`relative py-1 text-[14px] transition-all duration-200 ease-out cursor-pointer select-none active:scale-[0.96] ${
											isOverview
												? isActive
													? "text-white font-semibold"
													: "text-white/70 font-normal hover:text-white"
												: isActive
													? "text-[#765DFB] font-semibold"
													: "text-[#666666] font-normal hover:text-[#765DFB]"
										}`}
									>
										<span>{item.label}</span>
										<span
											className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-250 ease-out ${
												isOverview ? "bg-white" : "bg-[#765DFB]"
											} ${
												isActive
													? "opacity-100 scale-x-100"
													: "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75"
											}`}
										/>
									</button>
								</div>
							)
						})}
					</nav>
				</div>

				{/* Right: Try PiyApi Button */}
				<div className="hidden md:flex items-center z-10">
					<a
						href="https://piyapi.cloud"
						target="_blank"
						rel="noopener noreferrer"
						className={`relative inline-flex items-center justify-center text-sm font-medium h-10.5 px-5 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden group ${
							isOverview
								? "bg-white text-neutral-950 hover:bg-white/90"
								: "bg-[#232323] hover:bg-neutral-950 text-white"
						}`}
					>
						<span className="relative z-10">{t.nav.tryPiyApi}</span>
						<span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
					</a>
				</div>

				{/* Mobile Hamburger Button */}
				<div className="flex md:hidden">
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
							isOverview
								? "text-white hover:bg-white/10"
								: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
						}`}
						aria-label="Toggle Navigation"
					>
						{mobileOpen ? (
							<X className="w-5 h-5 transition-transform duration-200 rotate-90" />
						) : (
							<Menu className="w-5 h-5 transition-transform duration-200" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Drawer with smooth animation */}
			{mobileOpen && (
				<div
					className={`md:hidden border-t px-6 py-4 space-y-3 animate-fade-in ${
						isOverview
							? "border-white/15 bg-[#04050c]/95 backdrop-blur-xl"
							: "border-neutral-200 bg-white"
					}`}
				>
					<div
						className={`rounded-[10px] p-2 space-y-1 ${
							isOverview ? "bg-white/10" : "bg-secondary"
						}`}
					>
						{navItems.map((item) => {
							return (
								<button
									key={item.key}
									onClick={() => {
										setActiveTab(item.key)
										setMobileOpen(false)
									}}
									className={`block w-full text-left px-4 py-2.5 text-sm font-normal rounded-md transition-all duration-200 ease-out ${
										activeTab === item.key
											? isOverview
												? "bg-white/20 text-white font-semibold"
												: "bg-[#765DFB]/10 text-[#765DFB] font-semibold shadow-xs"
											: isOverview
												? "text-white/70 hover:text-white hover:bg-white/10"
												: "text-[#666666] hover:text-[#765DFB] hover:bg-[#765DFB]/5"
									}`}
								>
									{item.label}
								</button>
							)
						})}
					</div>

					<div className="pt-2">
						<a
							href="https://piyapi.cloud"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setMobileOpen(false)}
							className={`w-full flex items-center justify-center text-sm font-medium py-3 rounded-lg transition-all duration-250 active:scale-[0.98] shadow-xs hover:shadow-md ${
								isOverview
									? "bg-white text-neutral-950 hover:bg-white/90"
									: "bg-[#232323] hover:bg-neutral-950 text-white"
							}`}
						>
							<span>{t.nav.tryPiyApi}</span>
						</a>
					</div>
				</div>
			)}
		</header>
	)
}

/* Initiatives dropdown: Use Cases is one page, Industries lists in the panel. */
const USE_CASES = {
	title: "Use Cases",
	text: "Explore the real-world workflows powered by persistent memory architecture.",
	href: "/use-cases",
}

const INDUSTRIES = {
	title: "Industries",
	text: "Discover how persistent intelligence can transform different industries.",
	items: [
		{ label: "Education & EdTech", href: "/industries/education", icon: "M3 9.5 12 5l9 4.5-9 4.5-9-4.5ZM7 11.5V16c0 1.1 2.2 2.5 5 2.5s5-1.4 5-2.5v-4.5" },
		{ label: "E-commerce & Retail", href: "/industries/ecommerce", icon: "M5 8h14l-1.2 11H6.2L5 8Zm4 0V6.5a3 3 0 0 1 6 0V8" },
		{ label: "Media & Entertainment", href: "/industries/media", icon: "M4 6.5h16v11H4zM10 9.5v5l4.5-2.5L10 9.5Z" },
		{ label: "HR & Recruiting", href: "/industries/hr", icon: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 8c.8-3 2.6-4.5 5-4.5s4.2 1.5 5 4.5M16 8.5h5M18.5 6v5" },
		{ label: "Finance & Accounting", href: "/industries/finance", icon: "M4 19h16M6 16v-5M10 16V8M14 16v-6M18 16V5" },
		{ label: "Consulting & Enterprise", href: "/industries/consulting", icon: "M4 20V9l8-4 8 4v11M9 20v-5h6v5M8 11h.01M12 11h.01M16 11h.01" },
		{ label: "Legal & Compliance", href: "/industries/legal", icon: "M12 4v16M7 20h10M5 8h14M7.5 8 5 13a2.5 2.5 0 0 0 5 0L7.5 8Zm9 0L14 13a2.5 2.5 0 0 0 5 0l-2.5-5Z" },
		{ label: "SaaS & Dev Tools", href: "/industries/saas", icon: "m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" },
		{ label: "Healthcare & Medical", href: "/industries/healthcare", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10ZM9 11h2V9h2v2h2v2h-2v2h-2v-2H9z" },
		{ label: "Customer Support", href: "/industries/support", icon: "M5 13v-1a7 7 0 0 1 14 0v1M5 13h2.5v5H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm14 0h-2.5v5H19a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1ZM16.5 18c0 1.5-1.8 2.5-4.5 2.5" },
	],
}

// Maps a dropdown href onto the tab keys App.tsx routes on
const hrefToTab = (href: string) =>
	href.startsWith("/industries/")
		? `industry:${href.slice("/industries/".length)}`
		: href.slice(1)

const Arrow = ({ className = "ini-arrow" }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M4 12h15M13 6l6 6-6 6" />
	</svg>
)

const Icon = ({ d }: { d: string }) => (
	<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d={d} />
	</svg>
)

interface InitiativesDropdownProps {
	label: string
	current?: boolean
	dark?: boolean
	onNavigate: (tab: string) => void
}

function InitiativesDropdown({ label, current = false, dark = false, onNavigate }: InitiativesDropdownProps) {
	const [open, setOpen] = useState(false)
	const wrap = useRef<HTMLDivElement>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

	const show = () => { clearTimeout(timer.current); setOpen(true) }
	const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 160) }

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
		const onDown = (e: PointerEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false)
		document.addEventListener("keydown", onKey)
		document.addEventListener("pointerdown", onDown)
		return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); clearTimeout(timer.current) }
	}, [])

	// In-app navigation; modified clicks still open the href in a new tab
	const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
		e.preventDefault()
		setOpen(false)
		onNavigate(hrefToTab(href))
	}

	const tab = open ? 0 : -1

	return (
		<div className="ini group" ref={wrap} onMouseEnter={show} onMouseLeave={hide}>
			<style>{CSS}</style>

			{/* Same look as the other nav tabs */}
			<button
				type="button"
				className={`relative py-1 text-[14px] transition-all duration-200 ease-out cursor-pointer select-none active:scale-[0.96] ${
					dark
						? current
							? "text-white font-semibold"
							: "text-white/70 font-normal hover:text-white"
						: current
							? "text-[#765DFB] font-semibold"
							: "text-[#666666] font-normal hover:text-[#765DFB]"
				}`}
				aria-expanded={open}
				aria-controls="ini-panel"
				onClick={() => setOpen((o) => !o)}
			>
				<span>{label}</span>
				<span
					className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-250 ease-out ${
						dark ? "bg-white" : "bg-[#765DFB]"
					} ${
						current
							? "opacity-100 scale-x-100"
							: open
								? "opacity-40 scale-x-75"
								: "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75"
					}`}
				/>
			</button>

			<div id="ini-panel" className={`ini-panel ${open ? "is-open" : ""}`} onFocus={show} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}>
				<div className="ini-inner">
					<span className="ini-glow ini-glow--a" aria-hidden="true" />
					<span className="ini-glow ini-glow--b" aria-hidden="true" />

					{/* left: Use Cases page + Industries label card */}
					<div className="ini-side">
						<a href={USE_CASES.href} onClick={go(USE_CASES.href)} className="ini-card ini-card--link" tabIndex={tab}>
							<span className="ini-card__title">{USE_CASES.title}<Arrow className="ini-card__arrow" /></span>
							<span className="ini-card__text">{USE_CASES.text}</span>
						</a>
						<div className="ini-card ini-card--active" id="ini-ind">
							<span className="ini-card__title">{INDUSTRIES.title}</span>
							<span className="ini-card__text">{INDUSTRIES.text}</span>
							<span className="ini-card__count">{INDUSTRIES.items.length} industries</span>
						</div>
					</div>

					{/* right: industries */}
					<div className="ini-list" aria-labelledby="ini-ind">
						<ul>
							{INDUSTRIES.items.map((it, i) => (
								<li key={it.label} style={{ "--i": i } as React.CSSProperties}>
									<a href={it.href} onClick={go(it.href)} className="ini-item" tabIndex={tab}>
										<span className="ini-item__icon"><Icon d={it.icon} /></span>
										<span className="ini-item__label">{it.label}</span>
										<Arrow />
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&display=swap");

.ini {
  --white: #ffffff; --aura: #f9f8ff; --lavender: #eccdf5; --gayo: #765dfb; --indigo: #4846ac;
  --ink: #00050e; --ink-2: #444759; --ink-3: #6b6e80; --rule: #e7e3f5; --tint: #f1eeff;
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);
  position: relative; display: inline-block;
  font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased;
}
.ini *, .ini *::before, .ini *::after { box-sizing: border-box; }
:where(.ini) :where(a) { color: inherit; text-decoration: none; }
:where(.ini) :where(ul) { list-style: none; margin: 0; padding: 0; }
.ini :focus-visible { outline: 2px solid var(--gayo); outline-offset: 2px; border-radius: 10px; }
/* bridge so the panel doesn't close while the pointer moves down */
.ini::after { content: ""; position: absolute; left: -24px; right: -24px; top: 100%; height: 22px; }

/* panel */
.ini-panel {
  position: absolute; top: calc(100% + 16px); left: 50%; z-index: 60;
  width: 880px; max-width: calc(100vw - 32px);
  transform: translate(-50%, -8px) scale(0.985); transform-origin: 50% 0;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity 0.2s var(--ease), transform 0.3s var(--ease), visibility 0s linear 0.3s;
}
.ini-panel.is-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translate(-50%, 0) scale(1); transition-delay: 0s; }

/* gradient border + soft colour glows */
.ini-inner {
  position: relative; overflow: hidden; isolation: isolate;
  display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 10px; padding: 10px;
  border-radius: 24px; border: 1px solid transparent;
  background:
    linear-gradient(var(--white), var(--white)) padding-box,
    linear-gradient(135deg, var(--lavender), rgba(118, 93, 251, 0.55) 45%, var(--rule) 70%, var(--lavender)) border-box;
  box-shadow: 0 40px 80px -36px rgba(72, 70, 172, 0.45), 0 6px 16px rgba(72, 70, 172, 0.08);
}
.ini-glow { position: absolute; z-index: -1; border-radius: 50%; filter: blur(40px); pointer-events: none; }
.ini-glow--a { width: 320px; height: 220px; right: -60px; top: -90px; background: rgba(236, 205, 245, 0.9); }
.ini-glow--b { width: 260px; height: 200px; right: 160px; bottom: -120px; background: rgba(118, 93, 251, 0.22); }

/* left cards */
.ini-side { display: grid; gap: 8px; align-content: start; }
.ini-card { position: relative; display: grid; gap: 6px; padding: 18px; border-radius: 16px; overflow: hidden; transition: background 0.3s, box-shadow 0.3s, transform 0.3s var(--ease); }
.ini-card__title { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 18px; font-weight: 500; letter-spacing: -0.02em; }
.ini-card__text { font-size: 13px; line-height: 1.5; }
.ini-card__arrow { width: 16px; height: 16px; transition: transform 0.25s var(--ease), color 0.2s; }

.ini-card--link { background: var(--aura); box-shadow: inset 0 0 0 1px var(--rule); }
.ini-card--link .ini-card__text { color: var(--ink-3); }
.ini-card--link .ini-card__arrow { color: var(--ink-3); }
.ini-card--link:hover {
  background: linear-gradient(135deg, #fbf3fd 0%, var(--tint) 100%);
  box-shadow: inset 0 0 0 1px #d9cdfb, 0 14px 28px -20px rgba(118, 93, 251, 0.7);
  transform: translateY(-1px);
}
.ini-card--link:hover .ini-card__title { color: var(--gayo); }
.ini-card--link:hover .ini-card__arrow { color: var(--gayo); transform: translateX(3px); }

.ini-card--active {
  color: #fff;
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(236, 205, 245, 0.45), transparent 60%),
    linear-gradient(150deg, #8b76fc 0%, var(--gayo) 45%, var(--indigo) 100%);
  box-shadow: 0 18px 34px -20px rgba(72, 70, 172, 0.9);
}
.ini-card--active::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px); background-size: 14px 14px;
  -webkit-mask-image: linear-gradient(200deg, #000, transparent 70%); mask-image: linear-gradient(200deg, #000, transparent 70%);
}
.ini-card--active .ini-card__text { color: rgba(255, 255, 255, 0.82); }
.ini-card__count { justify-self: start; margin-top: 6px; padding: 3px 10px; border-radius: 99px; background: rgba(255, 255, 255, 0.16); font-size: 12px; font-weight: 500; }

/* right list */
.ini-list { display: grid; grid-template-rows: 1fr auto; gap: 4px; padding: 6px 6px 4px; }
.ini-list ul { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; align-content: start; }
.ini-list li { opacity: 0; transform: translateY(4px); }
.ini-panel.is-open .ini-list li { animation: ini-in 0.35s var(--ease) forwards; animation-delay: calc(var(--i) * 22ms + 40ms); }
@keyframes ini-in { to { opacity: 1; transform: none; } }

.ini-item {
  position: relative; display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 12px;
  font-size: 14.5px; color: var(--ink-2); transition: background 0.25s, color 0.2s;
}
.ini-item::before {
  content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px; border-radius: 3px;
  background: linear-gradient(180deg, var(--lavender), var(--gayo)); transform: scaleY(0); transition: transform 0.25s var(--ease);
}
.ini-item__icon {
  display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 10px;
  background: var(--aura); color: var(--ink-3); box-shadow: inset 0 0 0 1px var(--rule);
  transition: background 0.25s, color 0.25s, box-shadow 0.25s;
}
.ini-item__label { flex: 1; min-width: 0; }
.ini-item .ini-arrow { flex: none; width: 15px; height: 15px; color: transparent; transform: translateX(-4px); transition: transform 0.25s var(--ease), color 0.2s; }
.ini-item:hover, .ini-item:focus-visible { background: linear-gradient(90deg, var(--tint), rgba(241, 238, 255, 0)); color: var(--ink); }
.ini-item:hover::before, .ini-item:focus-visible::before { transform: scaleY(1); }
.ini-item:hover .ini-item__icon, .ini-item:focus-visible .ini-item__icon {
  color: #fff; box-shadow: none; background: linear-gradient(135deg, #8b76fc, var(--gayo) 55%, var(--indigo));
}
.ini-item:hover .ini-arrow, .ini-item:focus-visible .ini-arrow { color: var(--gayo); transform: none; }

@media (max-width: 820px) {
  .ini-inner { grid-template-columns: 1fr; }
  .ini-list ul { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .ini *, .ini *::before, .ini *::after { transition-duration: 0s !important; animation-duration: 0s !important; animation-delay: 0s !important; }
}
`

/* Resources dropdown: Docs and Blog cards. */
const DOCS = {
	title: "Docs",
	text: "Explore technical guides, API references, and tutorials for building with PiyAPI.",
	href: "/docs",
}

const BLOG = {
	title: "Blog",
	text: "Discover our latest research, engineering deep dives, and product updates.",
	href: "/blog",
}

interface ResourcesDropdownProps {
	label: string
	current?: boolean
	dark?: boolean
	onNavigate: (tab: string) => void
}

function ResourcesDropdown({ label, current = false, dark = false, onNavigate }: ResourcesDropdownProps) {
	const [open, setOpen] = useState(false)
	const wrap = useRef<HTMLDivElement>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

	const show = () => { clearTimeout(timer.current); setOpen(true) }
	const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 160) }

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
		const onDown = (e: PointerEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false)
		document.addEventListener("keydown", onKey)
		document.addEventListener("pointerdown", onDown)
		return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); clearTimeout(timer.current) }
	}, [])

	// In-app navigation; modified clicks still open the href in a new tab
	const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
		e.preventDefault()
		setOpen(false)
		onNavigate(hrefToTab(href))
	}

	const tab = open ? 0 : -1

	return (
		<div className="res group" ref={wrap} onMouseEnter={show} onMouseLeave={hide}>
			<style>{RES_CSS}</style>

			{/* Same look as the other nav tabs */}
			<button
				type="button"
				className={`relative py-1 text-[14px] transition-all duration-200 ease-out cursor-pointer select-none active:scale-[0.96] ${
					dark
						? current
							? "text-white font-semibold"
							: "text-white/70 font-normal hover:text-white"
						: current
							? "text-[#765DFB] font-semibold"
							: "text-[#666666] font-normal hover:text-[#765DFB]"
				}`}
				aria-expanded={open}
				aria-controls="res-panel"
				onClick={() => setOpen((o) => !o)}
			>
				<span>{label}</span>
				<span
					className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-250 ease-out ${
						dark ? "bg-white" : "bg-[#765DFB]"
					} ${
						current
							? "opacity-100 scale-x-100"
							: open
								? "opacity-40 scale-x-75"
								: "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-75"
					}`}
				/>
			</button>

			<div id="res-panel" className={`res-panel ${open ? "is-open" : ""}`} onFocus={show} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}>
				<div className="res-inner">
					<span className="res-glow" aria-hidden="true" />

					{/* Docs */}
					<div className="res-col">
						<a href={DOCS.href} onClick={go(DOCS.href)} className="res-card res-card--docs" tabIndex={tab}>
							<span className="res-card__preview" aria-hidden="true">
								<span className="res-code">
									<i className="res-code__bar"><b /><b /><b /></i>
									<i className="res-code__l res-code__l--kw" style={{ "--w": "62%" } as React.CSSProperties} />
									<i className="res-code__l" style={{ "--w": "44%", "--x": "14px" } as React.CSSProperties} />
									<i className="res-code__l res-code__l--hl" style={{ "--w": "70%", "--x": "14px" } as React.CSSProperties} />
									<i className="res-code__l" style={{ "--w": "38%" } as React.CSSProperties} />
								</span>
							</span>
							<span className="res-card__title">{DOCS.title}<Arrow className="res-card__arrow" /></span>
							<span className="res-card__text">{DOCS.text}</span>
						</a>
					</div>

					{/* Blog */}
					<div className="res-col">
						<a href={BLOG.href} onClick={go(BLOG.href)} className="res-card res-card--blog" tabIndex={tab}>
							<span className="res-card__preview" aria-hidden="true">
								<span className="res-paper"><i /><i /><i /></span>
								<span className="res-paper res-paper--front"><b /><i /><i /><i /></span>
							</span>
							<span className="res-card__title">{BLOG.title}<Arrow className="res-card__arrow" /></span>
							<span className="res-card__text">{BLOG.text}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

const RES_CSS = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&display=swap");

.res {
  --white: #ffffff; --aura: #f9f8ff; --lavender: #eccdf5; --gayo: #765dfb; --indigo: #4846ac;
  --ink: #00050e; --ink-2: #444759; --ink-3: #6b6e80; --rule: #e7e3f5; --tint: #f1eeff;
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);
  position: relative; display: inline-block;
  font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased;
}
.res *, .res *::before, .res *::after { box-sizing: border-box; }
:where(.res) :where(a) { color: inherit; text-decoration: none; }
:where(.res) :where(ul) { list-style: none; margin: 0; padding: 0; }
.res :focus-visible { outline: 2px solid var(--gayo); outline-offset: 2px; border-radius: 10px; }
.res::after { content: ""; position: absolute; left: -24px; right: -24px; top: 100%; height: 22px; }

/* panel */
.res-panel {
  position: absolute; top: calc(100% + 16px); left: 50%; z-index: 60;
  width: 640px; max-width: calc(100vw - 32px);
  transform: translate(-50%, -8px) scale(0.985); transform-origin: 50% 0;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity 0.2s var(--ease), transform 0.3s var(--ease), visibility 0s linear 0.3s;
}
.res-panel.is-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translate(-50%, 0) scale(1); transition-delay: 0s; }
.res-inner {
  position: relative; overflow: hidden; isolation: isolate;
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px;
  border-radius: 24px; border: 1px solid transparent;
  background:
    linear-gradient(var(--white), var(--white)) padding-box,
    linear-gradient(135deg, var(--lavender), rgba(118, 93, 251, 0.55) 45%, var(--rule) 70%, var(--lavender)) border-box;
  box-shadow: 0 40px 80px -36px rgba(72, 70, 172, 0.45), 0 6px 16px rgba(72, 70, 172, 0.08);
}
.res-glow { position: absolute; z-index: -1; width: 280px; height: 200px; left: 50%; bottom: -150px; transform: translateX(-50%); border-radius: 50%; background: rgba(118, 93, 251, 0.18); filter: blur(40px); pointer-events: none; }

.res-col { display: grid; gap: 6px; align-content: start; }

/* cards */
.res-card { display: grid; gap: 6px; padding: 10px 10px 16px; border-radius: 18px; transition: background 0.3s, box-shadow 0.3s; }
.res-card:hover { background: var(--aura); box-shadow: inset 0 0 0 1px var(--rule); }
.res-card__preview { position: relative; display: block; height: 104px; margin-bottom: 8px; border-radius: 12px; overflow: hidden; transition: transform 0.35s var(--ease); }
.res-card--docs .res-card__preview { background: radial-gradient(80% 90% at 100% 0%, rgba(236, 205, 245, 0.5), transparent 60%), linear-gradient(150deg, #8b76fc, var(--gayo) 50%, var(--indigo)); }
.res-card--blog .res-card__preview { background: linear-gradient(160deg, #fbf3fd, var(--tint)); box-shadow: inset 0 0 0 1px var(--rule); }
.res-card__title { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-inline: 6px; font-size: 18px; font-weight: 500; letter-spacing: -0.02em; transition: color 0.2s; }
.res-card__arrow { width: 16px; height: 16px; color: var(--ink-3); transition: transform 0.25s var(--ease), color 0.2s; }
.res-card__text { padding-inline: 6px; font-size: 13.5px; line-height: 1.5; color: var(--ink-3); }
.res-card:hover .res-card__title { color: var(--gayo); }
.res-card:hover .res-card__arrow { color: var(--gayo); transform: translateX(3px); }

/* docs preview: a small code window */
.res-code { position: absolute; left: 18px; right: 18px; top: 16px; bottom: -12px; display: grid; align-content: start; gap: 8px; padding: 26px 14px 0; border-radius: 10px; background: rgba(0, 5, 14, 0.82); box-shadow: 0 16px 30px -14px rgba(20, 10, 80, 0.7); transition: transform 0.35s var(--ease); }
.res-code__bar { position: absolute; left: 10px; top: 9px; display: flex; gap: 4px; }
.res-code__bar b { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.25); }
.res-code__l { display: block; height: 5px; width: var(--w); margin-left: var(--x, 0); border-radius: 5px; background: rgba(255, 255, 255, 0.18); }
.res-code__l--kw { background: #b6a8ff; }
.res-code__l--hl { background: linear-gradient(90deg, var(--lavender), #b6a8ff); }
.res-card--docs:hover .res-code { transform: translateY(-4px); }

/* blog preview: stacked articles */
.res-paper { position: absolute; display: grid; align-content: start; gap: 6px; width: 46%; padding: 12px; border-radius: 10px; background: rgba(255, 255, 255, 0.7); border: 1px solid var(--rule); left: 22%; top: 22px; height: 100px; transform: rotate(-6deg); transition: transform 0.35s var(--ease); }
.res-paper i { display: block; height: 4px; border-radius: 4px; background: var(--rule); }
.res-paper i:nth-child(2) { width: 80%; }
.res-paper i:nth-child(3) { width: 60%; }
.res-paper--front { left: 34%; top: 14px; background: var(--white); transform: rotate(3deg); box-shadow: 0 14px 26px -16px rgba(72, 70, 172, 0.6); }
.res-paper--front b { display: block; height: 26px; border-radius: 6px; margin-bottom: 4px; background: linear-gradient(135deg, var(--lavender), var(--gayo)); }
.res-card--blog:hover .res-paper { transform: rotate(-9deg) translateX(-6px); }
.res-card--blog:hover .res-paper--front { transform: rotate(5deg) translateY(-4px); }

@media (max-width: 680px) {
  .res-inner { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .res *, .res *::before, .res *::after { transition-duration: 0s !important; }
}
`
