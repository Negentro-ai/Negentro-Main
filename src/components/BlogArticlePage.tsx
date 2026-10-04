import { useState, useEffect } from "react"
import { ArrowRight, Check, Copy, Linkedin, Twitter, Link as LinkIcon } from "lucide-react"

interface BlogArticlePageProps {
	articleId: string
	onNavigate: (route: string) => void
}

const tableOfContents = [
	{ id: "context", label: "01 What is persistent context?" },
	{ id: "memory", label: "02 Why memory matters" },
	{ id: "retrieval", label: "03 Retrieval and context" },
	{ id: "architecture", label: "04 Architecture" },
	{ id: "implementation", label: "05 Implementation" },
	{ id: "next", label: "06 What comes next" },
]

export const BlogArticlePage = ({ onNavigate }: BlogArticlePageProps) => {
	const [activeSection, setActiveSection] = useState("context")
	const [hasCopiedCode, setHasCopiedCode] = useState(false)
	const [hasCopiedLink, setHasCopiedLink] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
		
		const handleScroll = () => {
			const sections = tableOfContents.map((t) => document.getElementById(t.id))
			let current = tableOfContents[0].id
			for (const section of sections) {
				if (section && window.scrollY >= section.offsetTop - 150) {
					current = section.id
				}
			}
			setActiveSection(current)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const copyCode = async () => {
		const code = `const context = await memory.search({ user_id: 'user_123', query: 'recent preferences' })\nconst response = await model.generate({ messages, context })\n// memory persists automatically per interaction`
		await navigator.clipboard?.writeText(code)
		setHasCopiedCode(true)
		setTimeout(() => setHasCopiedCode(false), 2000)
	}

	const copyLink = async () => {
		await navigator.clipboard?.writeText(window.location.href)
		setHasCopiedLink(true)
		setTimeout(() => setHasCopiedLink(false), 2000)
	}

	return (
		<div className="w-full bg-[#FAFAFB] font-sans text-[#0b0f17] antialiased">
			{/* Main Three Column Layout */}
			<div className="page-gutter mx-auto flex max-w-7xl flex-col gap-10 pb-24 pt-20 lg:flex-row lg:gap-16 lg:pt-32">
				
				{/* Left Sidebar (TOC) */}
				<aside className="hidden w-[240px] shrink-0 lg:block">
					<div className="sticky top-32">
						<p className="mb-6 pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a9a5ba]">On this page</p>
						<nav className="flex flex-col gap-4">
							{tableOfContents.map((item) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									className={`flex items-start gap-3 border-l-2 py-0.5 pl-4 transition-colors ${activeSection === item.id ? "border-[#765dfb] text-[#765dfb]" : "border-transparent text-[#7c7792] hover:text-[#0e0b1a]"}`}
								>
									<span className={`font-mono text-[13px] ${activeSection === item.id ? "text-[#765dfb]" : "text-[#a9a5ba]"}`}>
										{item.label.split(" ")[0]}
									</span>
									<span className="text-[14px] font-medium leading-[1.4]">
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
					<header className="mb-16">
						<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a5ba]">
							INSIGHTS / ENGINEERING
						</p>
						<h1 className="mt-5 text-[40px] font-bold tracking-tight leading-[1.1] sm:text-[52px] lg:text-[60px] text-[#0e0b1a]">
							Building AI systems that remember beyond the prompt
						</h1>
						<p className="mt-6 text-[18px] leading-[1.65] text-[#7c7792] sm:text-[20px]">
							Why persistent context changes how AI systems retrieve knowledge, maintain state and reason across interactions.
						</p>
						<div className="mt-8 font-mono text-[13px] text-[#a9a5ba]">
							Sep 25, 2026 &nbsp;&nbsp;·&nbsp;&nbsp; 8 min read &nbsp;&nbsp;·&nbsp;&nbsp; Engineering
						</div>
						<div className="mt-8 flex items-center gap-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#0e0b1a]">
								<div className="h-3 w-3 rounded-[2px] border border-white/50" />
							</div>
							<span className="text-[14px] font-medium text-[#0e0b1a]">Negentro Research</span>
						</div>
					</header>

					{/* Section 1 */}
					<section id="context" className="scroll-mt-24 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">Why context disappears</h2>
						<p>
							Most large language model interactions are stateless by default. Each request arrives as a fresh prompt with no inherent connection to what came before it, no memory of prior turns, and no awareness of the broader task the user is trying to accomplish. This is a structural limitation of how these systems are typically deployed, not a limitation of the underlying model itself.
						</p>
						<p>
							When teams try to solve this by simply appending conversation history to the prompt, they run into hard limits quickly — context windows fill up, latency increases, and irrelevant history dilutes the signal the model needs to reason well. The result is systems that feel forgetful, repeat themselves, or lose track of long-running tasks entirely.
						</p>
					</section>

					{/* Section 2 */}
					<section id="memory" className="scroll-mt-24 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">Memory is not the same as context</h2>
						<p>
							Context is what's passed into a single model call. Memory is the durable, queryable substrate that context gets pulled from. Conflating the two leads to brittle systems that can't scale past a handful of interactions.
						</p>
						<ul className="space-y-4 my-8">
							{[
								"Memory persists across sessions; context is assembled per request.",
								"Memory needs isolation, retrieval, and decay policies; context does not.",
								"Good retrieval turns memory into the right context, at the right time."
							].map((bullet, i) => (
								<li key={i} className="flex items-start gap-4">
									<div className="mt-2 h-2 w-2 shrink-0 bg-[#8B5CF6]" />
									<span className="text-[#0e0b1a] font-medium">{bullet}</span>
								</li>
							))}
						</ul>

						{/* Key Idea Callout */}
						<div className="my-10 flex gap-6 overflow-hidden rounded-[16px] bg-[#f3e8ff] p-8 relative">
							<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8B5CF6]" />
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8B5CF6] mb-3">Key Idea</p>
								<p className="text-[20px] font-medium leading-[1.5] text-[#0e0b1a]">
									“Context becomes useful when it persists across interactions.”
								</p>
							</div>
						</div>
					</section>

					{/* Section 3 */}
					<section id="retrieval" className="scroll-mt-24 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">Retrieval and context</h2>
						<p>
							Retrieval is the bridge between raw stored memory and a model call that actually benefits from it. Building this bridge well requires attention to a handful of implementation details that are easy to overlook.
						</p>
						<div className="space-y-6 my-8">
							{[
								"Rank retrieved memory by relevance to the current query, not recency alone.",
								"Keep retrieval latency low enough that it doesn't bottleneck the response.",
								"Isolate memory per tenant or user so retrieval never leaks across boundaries."
							].map((item, i) => (
								<div key={i} className="flex gap-5 items-start">
									<div className="text-[#8B5CF6] font-mono text-[14px] font-bold bg-[#f3e8ff] px-2 py-1 rounded">0{i + 1}</div>
									<p className="text-[#0e0b1a] font-medium mt-1">{item}</p>
								</div>
							))}
						</div>

						{/* Pipeline Card */}
						<div className="my-12 overflow-hidden rounded-[16px] bg-[#0b0f17] p-8 text-white shadow-xl">
							<p className="text-xs text-[#a9a5ba] mb-6 font-medium tracking-wide">REQUEST PIPELINE</p>
							<div className="flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-white/80">
								<div className="bg-white/10 px-4 py-2 rounded-full">INPUT</div>
								<ArrowRight className="h-4 w-4 text-[#8B5CF6]" />
								<div className="bg-white/10 px-4 py-2 rounded-full">EXTRACT</div>
								<ArrowRight className="h-4 w-4 text-[#8B5CF6]" />
								<div className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] px-4 py-2 rounded-full text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]">MEMORY</div>
								<ArrowRight className="h-4 w-4 text-[#8B5CF6]" />
								<div className="bg-white/10 px-4 py-2 rounded-full">MODEL</div>
								<ArrowRight className="h-4 w-4 text-[#8B5CF6]" />
								<div className="bg-white/10 px-4 py-2 rounded-full">OUTPUT</div>
							</div>
						</div>
					</section>

					{/* Section 4 */}
					<section id="architecture" className="scroll-mt-24 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">Architecture</h2>
						<p>
							A minimal production-grade memory architecture separates three concerns: extraction (turning raw interactions into stored facts), storage (isolated, per-tenant vector and structured stores), and retrieval (a fast, relevance-ranked query interface that the model calls at generation time). Each layer can be swapped independently as requirements evolve.
						</p>
						
						{/* Code Block */}
						<div className="my-10 overflow-hidden rounded-[16px] bg-[#0b0f17] text-white">
							<div className="flex items-center justify-between border-b border-white/10 bg-[#151a23] px-6 py-4">
								<p className="text-[11px] font-mono tracking-wider text-[#a9a5ba]">TYPESCRIPT</p>
								<button type="button" onClick={copyCode} className="flex items-center gap-2 text-xs text-[#a9a5ba] hover:text-white transition-colors">
									{hasCopiedCode ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
									{hasCopiedCode ? "Copied" : "Copy"}
								</button>
							</div>
							<pre className="p-6 text-[14px] leading-[1.8] text-[#c4b5fd] overflow-x-auto">
								<code>
									<span className="text-[#F472B6]">const</span> context = <span className="text-[#F472B6]">await</span> memory.search({`{`} user_id: <span className="text-[#34D399]">'user_123'</span> {`}`})<br/>
									<span className="text-[#F472B6]">const</span> response = <span className="text-[#F472B6]">await</span> model.generate({`{`} messages, context {`}`})<br/>
									<span className="text-[#6B7280]">{"// memory persists automatically per interaction"}</span>
								</code>
							</pre>
						</div>

						<blockquote className="my-12 border-l-4 border-[#0b0f17] pl-8 py-2">
							<p className="text-[24px] font-medium italic leading-[1.4] text-[#0e0b1a]">
								“The systems that feel intelligent aren't the ones with the biggest models — they're the ones that remember what matters and forget what doesn't.”
							</p>
							<footer className="mt-4 font-semibold text-[#7c7792]">
								— Negentro Engineering
							</footer>
						</blockquote>
					</section>

					{/* Section 5 */}
					<section id="implementation" className="scroll-mt-24 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">Implementation</h2>
						<p>
							The practical difference between a stateless integration and a memory-backed one shows up immediately in production behavior.
						</p>

						<div className="mt-10 overflow-hidden rounded-[16px] border border-[#e2e8f0]">
							<div className="grid grid-cols-2 bg-[#f8fafc] p-5 border-b border-[#e2e8f0]">
								<div className="text-[12px] font-bold uppercase tracking-widest text-[#7c7792]">Without Memory</div>
								<div className="text-[12px] font-bold uppercase tracking-widest text-[#8B5CF6]">With Negentro</div>
							</div>
							{[
								["Every request starts from zero", "Persistent context across sessions"],
								["Manual context stuffing in prompts", "Automatic relevance-ranked retrieval"],
								["No isolation between users", "Per-tenant memory isolation by default"]
							].map(([left, right], i) => (
								<div key={i} className={`grid grid-cols-2 p-5 text-[14px] sm:text-[15px] font-medium text-[#0e0b1a] ${i > 0 ? "border-t border-[#e2e8f0]" : ""}`}>
									<div className="pr-4">{left}</div>
									<div className="pl-4">{right}</div>
								</div>
							))}
						</div>
					</section>

					{/* Section 6 */}
					<section id="next" className="scroll-mt-24 mt-16 space-y-6 text-[17px] leading-[1.7] text-[#4a5568]">
						<h2 className="text-[28px] font-bold leading-[1.2] text-[#0e0b1a] mb-6">What comes next</h2>
						<p>
							As AI systems take on longer-running, more agentic tasks, persistent memory stops being an optimization and becomes a requirement. Teams building the next generation of AI products will need infrastructure that treats context as a first-class, durable resource — not an afterthought bolted onto a stateless API call.
						</p>
					</section>

				</article>

				{/* Right Sidebar (Social) */}
				<aside className="hidden w-[80px] shrink-0 lg:block">
					<div className="sticky top-32 flex flex-col items-center gap-8 text-[#a9a5ba]">
						<a href="#" aria-label="Share on LinkedIn" className="transition-colors hover:text-[#765dfb]">
							<Linkedin className="h-5 w-5" />
						</a>
						<a href="#" aria-label="Share on X" className="transition-colors hover:text-[#765dfb]">
							<Twitter className="h-5 w-5" />
						</a>
						<button onClick={copyLink} aria-label="Copy link" className="transition-colors hover:text-[#765dfb]">
							{hasCopiedLink ? <Check className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
						</button>
					</div>
				</aside>
			</div>

			{/* Mobile Social Share */}
			<div className="border-y border-[#e2e8f0] bg-[#FAFAFB] py-8 lg:hidden">
				<div className="page-gutter mx-auto flex max-w-[720px] flex-col items-center gap-4">
					<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a5ba]">Share this article</p>
					<div className="flex gap-8 mt-2 text-[#a9a5ba]">
						<a href="#" className="transition-colors hover:text-[#765dfb]"><Linkedin className="h-5 w-5" /></a>
						<a href="#" className="transition-colors hover:text-[#765dfb]"><Twitter className="h-5 w-5" /></a>
						<button onClick={copyLink} className="transition-colors hover:text-[#765dfb]">
							{hasCopiedLink ? <Check className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
						</button>
					</div>
				</div>
			</div>

			{/* Related Articles */}
			<section className="py-20 border-t border-[#e2e8f0]">
				<div className="page-gutter mx-auto max-w-7xl">
					<h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a9a5ba] mb-10">Continue reading</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{ cat: "ENGINEERING", title: "Designing memory systems for stateful AI agents", date: "Sep 18, 2026 · 6 min read" },
							{ cat: "RESEARCH", title: "Why persistent context matters for reliable AI", date: "Sep 10, 2026 · 7 min read" },
							{ cat: "PRODUCT", title: "Building a context layer for production AI", date: "Aug 30, 2026 · 5 min read" }
						].map((item, i) => (
							<div onClick={() => onNavigate("blog-article:new")} key={i} className="group cursor-pointer rounded-[16px] border border-[#e2e8f0] flex flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#d1d5db]">
								<div className="h-48 w-full overflow-hidden bg-[#f1f1f5]">
									<img src={`https://images.unsplash.com/photo-${["1620712943543-bcc4688e7485", "1633356122544-f134324a6cee", "1451187580459-43490279c0fa"][i]}?q=80&w=800&auto=format&fit=crop`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
								</div>
								<div className="flex flex-1 flex-col p-6 sm:p-8 bg-white">
									<p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a9a5ba] mb-3">{item.cat}</p>
									<h4 className="text-[20px] font-bold leading-[1.3] text-[#0e0b1a] mb-8 group-hover:text-[#765dfb] transition-colors">{item.title}</h4>
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
					<p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#8B5CF6] mb-4">Start Building</p>
					<h2 className="text-[36px] font-bold leading-[1.1] sm:text-[48px] lg:text-[56px] mb-6">Build AI that remembers.</h2>
					<p className="mx-auto max-w-xl text-[16px] sm:text-[18px] leading-[1.6] text-white/70 mb-10">
						Give your systems persistent context, reliable retrieval and memory that grows with every interaction.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button className="rounded-[8px] bg-[#765dfb] px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#6b52e8] active:scale-[0.98]">
							Start building
						</button>
						<button className="rounded-[8px] border border-white/10 bg-white/5 px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]">
							Explore the docs
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
