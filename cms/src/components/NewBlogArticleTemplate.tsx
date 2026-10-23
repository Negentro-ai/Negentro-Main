import { useState, useEffect } from "react"
import {
	ArrowRight,
	Check,
	Copy,
	Linkedin,
	Twitter,
	Link as LinkIcon,
} from "lucide-react"

export interface BlogArticleTemplateData {
	id?: string
	slug?: string
	title?: string
	summary?: string
	category?: string
	author?: string
	date?: string
	created_at?: string
	readTime?: string
	image?: string

	// Section 1: Introduction
	s1_title?: string
	s1_p1?: string
	s1_p2?: string

	// Section 2: Core Concept
	s2_title?: string
	s2_p1?: string
	s2_bullets?: string[]
	s2_keyIdeaQuote?: string

	// Section 3: Deep Dive & Pipeline
	s3_title?: string
	s3_p1?: string
	s3_bullets?: string[]
	s3_image?: string

	// Section 4: Architecture & Code
	s4_title?: string
	s4_p1?: string
	s4_code?: string
	s4_quote?: string

	// Section 5: Implementation & Comparison
	s5_title?: string
	s5_p1?: string
	s5_table_header_left?: string
	s5_table_header_right?: string
	s5_table?: { left: string; right: string }[]

	// Section 6: Next Steps / Conclusion
	s6_title?: string
	s6_p1?: string
}

export interface NewBlogArticleTemplateProps {
	data?: Partial<BlogArticleTemplateData>
	onNavigate?: (route: string) => void
}

export default function NewBlogArticleTemplate({
	data = {},
	onNavigate,
}: NewBlogArticleTemplateProps) {
	const [activeSection, setActiveSection] = useState("s1")
	const [hasCopiedCode, setHasCopiedCode] = useState(false)
	const [hasCopiedLink, setHasCopiedLink] = useState(false)

	const s1_title = data.s1_title || "Why context disappears"
	const s2_title = data.s2_title || "Memory is not the same as context"
	const s3_title = data.s3_title || "Retrieval and context"
	const s4_title = data.s4_title || "Architecture"
	const s5_title = data.s5_title || "Implementation"
	const s6_title = data.s6_title || "What comes next"

	const dynamicToC = [
		{ id: "s1", label: `01 ${s1_title}` },
		{ id: "s2", label: `02 ${s2_title}` },
		{ id: "s3", label: `03 ${s3_title}` },
		{ id: "s4", label: `04 ${s4_title}` },
		{ id: "s5", label: `05 ${s5_title}` },
		{ id: "s6", label: `06 ${s6_title}` },
	]

	useEffect(() => {
		const handleScroll = () => {
			const sections = dynamicToC.map((t) => document.getElementById(t.id))
			let current = dynamicToC[0].id
			for (const section of sections) {
				if (section && window.scrollY >= section.offsetTop - 150) {
					current = section.id
				}
			}
			setActiveSection(current)
		}
		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [dynamicToC])

	const copyCode = async () => {
		const code =
			data.s4_code ||
			`const context = await memory.search({ user_id: 'user_123', query: 'recent preferences' })\nconst response = await model.generate({ messages, context })\n// memory persists automatically per interaction`
		await navigator.clipboard?.writeText(code)
		setHasCopiedCode(true)
		setTimeout(() => setHasCopiedCode(false), 2000)
	}

	const copyLink = async () => {
		await navigator.clipboard?.writeText(window.location.href)
		setHasCopiedLink(true)
		setTimeout(() => setHasCopiedLink(false), 2000)
	}

	const dateStr =
		data.date ||
		(data.created_at
			? new Intl.DateTimeFormat("en", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}).format(new Date(data.created_at))
			: "Oct 2026")

	return (
		<div className="w-full bg-[#FAFAFB] font-sans text-[#0b0f17] antialiased">
			{/* Main Three Column Layout */}
			<div className="page-gutter mx-auto flex max-w-7xl flex-col gap-10 pb-24 pt-20 lg:flex-row lg:gap-16 lg:pt-32">
				{/* Left Sidebar (TOC) */}
				<aside className="hidden w-[250px] shrink-0 lg:block">
					<div className="sticky top-32">
						<p className="mb-6 pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a9a5ba]">
							On this page
						</p>
						<nav className="flex flex-col gap-4">
							{dynamicToC.map((item) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									className={`flex items-start gap-3 border-l-2 py-0.5 pl-4 transition-colors ${
										activeSection === item.id
											? "border-[#765dfb] text-[#765dfb]"
											: "border-transparent text-[#7c7792] hover:text-[#0e0b1a]"
									}`}
								>
									<span
										className={`font-mono text-[13px] ${
											activeSection === item.id
												? "text-[#765dfb]"
												: "text-[#a9a5ba]"
										}`}
									>
										{item.label.split(" ")[0]}
									</span>
									<span className="text-[14px] font-medium leading-[1.4] truncate">
										{item.label.split(" ").slice(1).join(" ")}
									</span>
								</a>
							))}
						</nav>
					</div>
				</aside>

				{/* Main Article Content */}
				<article className="min-w-0 flex-1 max-w-[720px]">
					{/* Header inside the article column */}
					<header className="mb-14">
						<p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#765DFB]">
							INSIGHTS / {data.category?.toUpperCase() || "ENGINEERING"}
						</p>
						<h1 className="mt-4 text-[38px] font-bold tracking-tight leading-[1.1] sm:text-[48px] lg:text-[56px] text-[#0e0b1a]">
							{data.title || "Building AI systems that remember beyond the prompt"}
						</h1>
						{data.summary && (
							<p className="mt-6 text-[18px] leading-[1.65] text-[#7c7792] sm:text-[20px]">
								{data.summary}
							</p>
						)}
						<div className="mt-8 font-mono text-[13px] text-[#a9a5ba] flex items-center gap-2">
							<span>{dateStr}</span>
							<span>·</span>
							<span>{data.readTime || "8 min read"}</span>
							<span>·</span>
							<span className="text-[#0e0b1a] font-sans font-medium">
								{data.author || "Negentro Research"}
							</span>
						</div>
					</header>

					{/* Hero Image */}
					{data.image ? (
						<div className="mb-16 overflow-hidden rounded-[24px] shadow-sm border border-[#e2e8f0]">
							<img
								src={data.image}
								alt={data.title || "Blog cover"}
								className="w-full object-cover max-h-[460px]"
							/>
						</div>
					) : (
						<div className="mb-16 flex aspect-[21/9] w-full items-center justify-center rounded-[24px] bg-[#0b0f17]/5 border border-[#e2e8f0]">
							<div className="text-center">
								<p className="text-[14px] font-medium text-[#7c7792]">
									Negentro Engineering & Research
								</p>
							</div>
						</div>
					)}

					{/* Section 1: Introduction */}
					<section
						id="s1"
						className="scroll-mt-28 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s1_title}
						</h2>
						<p>
							{data.s1_p1 ||
								"Most large language model interactions are stateless by default. Each request arrives as a fresh prompt with no inherent connection to what came before it, no memory of prior turns, and no awareness of the broader task the user is trying to accomplish. This is a structural limitation of how these systems are typically deployed, not a limitation of the underlying model itself."}
						</p>
						{data.s1_p2 && <p>{data.s1_p2}</p>}
					</section>

					{/* Section 2: Core Concept */}
					<section
						id="s2"
						className="scroll-mt-28 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s2_title}
						</h2>
						<p>
							{data.s2_p1 ||
								"Context is what's passed into a single model call. Memory is the durable, queryable substrate that context gets pulled from. Conflating the two leads to brittle systems that can't scale past a handful of interactions."}
						</p>
						<ul className="space-y-4 my-8">
							{(
								data.s2_bullets || [
									"Memory persists across sessions; context is assembled per request.",
									"Memory needs isolation, retrieval, and decay policies; context does not.",
									"Good retrieval turns memory into the right context, at the right time.",
								]
							).map((bullet: string, i: number) => (
								<li key={i} className="flex items-start gap-4">
									<div className="mt-2 h-2 w-2 shrink-0 bg-[#765DFB] rounded-full" />
									<span className="text-[#0e0b1a] font-medium">{bullet}</span>
								</li>
							))}
						</ul>

						{/* Key Idea Callout */}
						<div className="my-10 flex gap-6 overflow-hidden rounded-[16px] bg-[#f3e8ff]/70 border border-[#765DFB]/20 p-8 relative">
							<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#765DFB]" />
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#765DFB] mb-3">
									Key Idea
								</p>
								<p className="text-[20px] font-medium leading-[1.5] text-[#0e0b1a]">
									“
									{data.s2_keyIdeaQuote ||
										"Context becomes useful when it persists across interactions."}
									”
								</p>
							</div>
						</div>
					</section>

					{/* Section 3: Deep Dive */}
					<section
						id="s3"
						className="scroll-mt-28 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s3_title}
						</h2>
						<p>
							{data.s3_p1 ||
								"Retrieval is the bridge between raw stored memory and a model call that actually benefits from it. Building this bridge well requires attention to a handful of implementation details that are easy to overlook."}
						</p>
						<div className="space-y-6 my-8">
							{(
								data.s3_bullets || [
									"Rank retrieved memory by relevance to the current query, not recency alone.",
									"Keep retrieval latency low enough that it doesn't bottleneck the response.",
									"Isolate memory per tenant or user so retrieval never leaks across boundaries.",
								]
							).map((item: string, i: number) => (
								<div key={i} className="flex gap-5 items-start">
									<div className="text-[#765DFB] font-mono text-[14px] font-bold bg-[#765DFB]/10 px-2.5 py-1 rounded-lg border border-[#765DFB]/20">
										0{i + 1}
									</div>
									<p className="text-[#0e0b1a] font-medium mt-1">{item}</p>
								</div>
							))}
						</div>

						{/* Pipeline Card / Image */}
						{data.s3_image ? (
							<div className="my-12 overflow-hidden rounded-[16px] border border-[#e2e8f0]">
								<img
									src={data.s3_image}
									alt=""
									className="w-full object-cover shadow-lg"
								/>
							</div>
						) : (
							<div className="my-12 overflow-hidden rounded-[16px] bg-[#0b0f17] p-8 text-white shadow-xl">
								<p className="text-xs text-[#a9a5ba] mb-6 font-medium tracking-wide">
									REQUEST PIPELINE
								</p>
								<div className="flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-white/80">
									<div className="bg-white/10 px-4 py-2 rounded-full">
										INPUT
									</div>
									<ArrowRight className="h-4 w-4 text-[#765DFB]" />
									<div className="bg-white/10 px-4 py-2 rounded-full">
										EXTRACT
									</div>
									<ArrowRight className="h-4 w-4 text-[#765DFB]" />
									<div className="bg-gradient-to-r from-[#6D28D9] to-[#765DFB] px-4 py-2 rounded-full text-white shadow-[0_0_15px_rgba(118,93,251,0.5)] font-semibold">
										MEMORY
									</div>
									<ArrowRight className="h-4 w-4 text-[#765DFB]" />
									<div className="bg-white/10 px-4 py-2 rounded-full">
										MODEL
									</div>
									<ArrowRight className="h-4 w-4 text-[#765DFB]" />
									<div className="bg-white/10 px-4 py-2 rounded-full">
										OUTPUT
									</div>
								</div>
							</div>
						)}
					</section>

					{/* Section 4: Architecture */}
					<section
						id="s4"
						className="scroll-mt-28 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s4_title}
						</h2>
						<p>
							{data.s4_p1 ||
								"A minimal production-grade memory architecture separates three concerns: extraction (turning raw interactions into stored facts), storage (isolated, per-tenant vector and structured stores), and retrieval (a fast, relevance-ranked query interface that the model calls at generation time)."}
						</p>

						{/* Code Block */}
						<div className="my-10 overflow-hidden rounded-[16px] bg-[#0b0f17] text-white border border-white/10">
							<div className="flex items-center justify-between border-b border-white/10 bg-[#151a23] px-6 py-4">
								<p className="text-[11px] font-mono tracking-wider text-[#a9a5ba]">
									TYPESCRIPT
								</p>
								<button
									type="button"
									onClick={copyCode}
									className="flex items-center gap-2 text-xs text-[#a9a5ba] hover:text-white transition-colors cursor-pointer"
								>
									{hasCopiedCode ? (
										<Check className="h-3.5 w-3.5 text-green-400" />
									) : (
										<Copy className="h-3.5 w-3.5" />
									)}
									{hasCopiedCode ? "Copied" : "Copy"}
								</button>
							</div>
							<pre className="p-6 text-[14px] leading-[1.8] text-[#c4b5fd] overflow-x-auto">
								<code>
									{data.s4_code ? (
										<span className="text-[#c4b5fd] whitespace-pre-wrap">
											{data.s4_code}
										</span>
									) : (
										<>
											<span className="text-[#F472B6]">const</span> context ={" "}
											<span className="text-[#F472B6]">await</span>{" "}
											memory.search({"{"} user_id:{" "}
											<span className="text-[#34D399]">'user_123'</span>, query:{" "}
											<span className="text-[#34D399]">'recent preferences'</span>{" "}
											{"}"})
											<br />
											<span className="text-[#F472B6]">const</span> response ={" "}
											<span className="text-[#F472B6]">await</span>{" "}
											model.generate({"{"} messages, context {"}"})<br />
											<span className="text-[#6B7280]">
												{"// memory persists automatically per interaction"}
											</span>
										</>
									)}
								</code>
							</pre>
						</div>

						{data.s4_quote && (
							<blockquote className="my-12 border-l-4 border-[#765DFB] pl-8 py-2">
								<p className="text-[22px] font-medium italic leading-[1.4] text-[#0e0b1a]">
									“{data.s4_quote}”
								</p>
								<footer className="mt-4 font-semibold text-[#7c7792]">
									— Negentro Engineering
								</footer>
							</blockquote>
						)}
					</section>

					{/* Section 5: Implementation & Comparison */}
					<section
						id="s5"
						className="scroll-mt-28 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s5_title}
						</h2>
						<p>
							{data.s5_p1 ||
								"The practical difference between a stateless integration and a memory-backed one shows up immediately in production behavior."}
						</p>

						<div className="mt-10 overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-xs">
							<div className="grid grid-cols-2 bg-[#f8fafc] p-5 border-b border-[#e2e8f0]">
								<div className="text-[12px] font-bold uppercase tracking-widest text-[#7c7792]">
									{data.s5_table_header_left || "Without Memory"}
								</div>
								<div className="text-[12px] font-bold uppercase tracking-widest text-[#765DFB]">
									{data.s5_table_header_right || "With Negentro"}
								</div>
							</div>
							{(
								data.s5_table && data.s5_table.length > 0
									? data.s5_table
									: [
											{
												left: "Every request starts from zero",
												right: "Persistent context across sessions",
											},
											{
												left: "Manual context stuffing in prompts",
												right: "Automatic relevance-ranked retrieval",
											},
											{
												left: "No isolation between users",
												right: "Per-tenant memory isolation by default",
											},
										]
							).map((row, i) => (
								<div
									key={i}
									className={`grid grid-cols-2 p-5 text-[14px] sm:text-[15px] font-medium text-[#0e0b1a] ${
										i > 0 ? "border-t border-[#e2e8f0]" : ""
									}`}
								>
									<div className="pr-4 text-[#555268]">{row.left}</div>
									<div className="pl-4 text-[#0e0b1a] font-semibold">{row.right}</div>
								</div>
							))}
						</div>
					</section>

					{/* Section 6: Next Steps */}
					<section
						id="s6"
						className="scroll-mt-28 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]"
					>
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">
							{s6_title}
						</h2>
						<p>
							{data.s6_p1 ||
								"As AI systems take on longer-running, more agentic tasks, persistent memory stops being an optimization and becomes a requirement. Teams building the next generation of AI products will need infrastructure that treats context as a first-class, durable resource."}
						</p>
					</section>
				</article>

				{/* Right Sidebar (Social) */}
				<aside className="hidden w-[80px] shrink-0 lg:block">
					<div className="sticky top-32 flex flex-col items-center gap-8 text-[#a9a5ba]">
						<a
							href="#"
							aria-label="Share on LinkedIn"
							className="transition-colors hover:text-[#765dfb]"
						>
							<Linkedin className="h-5 w-5" />
						</a>
						<a
							href="#"
							aria-label="Share on X"
							className="transition-colors hover:text-[#765dfb]"
						>
							<Twitter className="h-5 w-5" />
						</a>
						<button
							type="button"
							onClick={copyLink}
							aria-label="Copy link"
							className="transition-colors hover:text-[#765dfb] cursor-pointer"
						>
							{hasCopiedLink ? (
								<Check className="h-5 w-5 text-green-500" />
							) : (
								<LinkIcon className="h-5 w-5" />
							)}
						</button>
					</div>
				</aside>
			</div>

			{/* Mobile Social Share */}
			<div className="border-y border-[#e2e8f0] bg-[#FAFAFB] py-8 lg:hidden">
				<div className="page-gutter mx-auto flex max-w-[720px] flex-col items-center gap-4">
					<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a5ba]">
						Share this article
					</p>
					<div className="flex gap-8 mt-2 text-[#a9a5ba]">
						<a href="#" className="transition-colors hover:text-[#765dfb]">
							<Linkedin className="h-5 w-5" />
						</a>
						<a href="#" className="transition-colors hover:text-[#765dfb]">
							<Twitter className="h-5 w-5" />
						</a>
						<button
							type="button"
							onClick={copyLink}
							className="transition-colors hover:text-[#765dfb]"
						>
							{hasCopiedLink ? (
								<Check className="h-5 w-5 text-green-500" />
							) : (
								<LinkIcon className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Related Articles */}
			<section className="py-20 border-t border-[#e2e8f0]">
				<div className="page-gutter mx-auto max-w-7xl">
					<h3 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-10">
						Explore other insights.
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{
								cat: "ENGINEERING",
								title: "Thinking long vs short: The limits of LLM context stuffing",
								date: "May 18, 2026 · 6 min read",
								image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
							},
							{
								cat: "RESEARCH",
								title: "Why agent memory is broken, and how to fix it",
								date: "May 10, 2026 · 7 min read",
								image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
							},
							{
								cat: "PRODUCT",
								title: "Introducing the unified context engine",
								date: "May 02, 2026 · 5 min read",
								image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
							},
						].map((item, i) => (
							<div
								onClick={() => onNavigate?.("blog")}
								key={i}
								className="group cursor-pointer rounded-[16px] border border-[#e2e8f0] flex flex-col overflow-hidden transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#765DFB]/30"
							>
								<div className="h-48 w-full overflow-hidden bg-[#f1f1f5]">
									<img
										src={item.image}
										alt=""
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								</div>
								<div className="flex flex-1 flex-col p-6 sm:p-8 bg-white">
									<p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#765DFB] mb-3">
										{item.cat}
									</p>
									<h4 className="text-[19px] font-bold leading-[1.3] text-[#0e0b1a] mb-6 group-hover:text-[#765dfb] transition-colors">
										{item.title}
									</h4>
									<div className="flex items-center justify-between mt-auto">
										<p className="text-[13px] text-[#7c7792]">{item.date}</p>
										<div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2e8f0] text-[#765dfb] transition-transform group-hover:translate-x-1 group-hover:border-[#765dfb]">
											<ArrowRight className="h-4 w-4" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Banner */}
			<section className="bg-[#0b0f17] py-24 page-gutter">
				<div className="mx-auto max-w-3xl text-center text-white">
					<p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#8B5CF6] mb-4">
						Start Building
					</p>
					<h2 className="text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[56px] mb-6">
						Build AI that remembers.
					</h2>
					<p className="mx-auto max-w-xl text-[16px] sm:text-[18px] leading-[1.6] text-white/70 mb-10">
						Give your systems persistent context, reliable retrieval and memory
						that grows with every interaction.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button
							onClick={() => onNavigate?.("pricing")}
							className="rounded-[8px] bg-[#765dfb] px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#6b52e8] active:scale-[0.98] cursor-pointer"
						>
							Start building
						</button>
						<a
							href="https://docs.negentro.tech/"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-[8px] border border-white/10 bg-white/5 px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98] inline-flex items-center justify-center text-center"
						>
							Explore the docs
						</a>
					</div>
				</div>
			</section>
		</div>
	)
}
