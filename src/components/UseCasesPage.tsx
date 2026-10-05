import type React from "react"
import { useState } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { Footer } from "./Footer"

export const UseCasesPage: React.FC = () => {
	const baseCases = [
		{
			title: "Customer knowledge that compounds",
			desc: "Bring conversations, documents, emails and calls into one persistent customer memory.",
			img: "/assets/use-cases/uc_enterprise_knowledge.jpg",
		},
		{
			title: "Onboarding that picks up where it left off",
			desc: "Every interaction starts with the customer context your AI already knows.",
			img: "/assets/use-cases/uc_onboarding.jpg",
		},
		{
			title: "Documents agents can actually remember",
			desc: "Extract, store and retrieve the knowledge inside long-running document workflows.",
			img: "/assets/use-cases/uc_doc_analysis.jpg",
		},
		{
			title: "Workflows with shared state",
			desc: "Let multiple agents and steps work from the same persistent context.",
			img: "/assets/use-cases/uc_workflow_automation.jpg",
		},
		{
			title: "Search across audio and video",
			desc: "Turn recordings into searchable knowledge your AI can retrieve by meaning.",
			img: "/assets/use-cases/uc_asset_search.jpg",
		},
		{
			title: "Coding agents with memory",
			desc: "Keep project context, decisions and patterns available across sessions.",
			img: "/assets/use-cases/uc_coding_agents.jpg",
		},
	]

	// Generate exactly 26 items by cycling through the base cases
	const cases = Array.from({ length: 26 }, (_, i) => ({
		...baseCases[i % baseCases.length],
		// Optional: Append an index if we want titles to feel slightly unique,
		// but since we want the exact UI, we just duplicate them.
	}))

	const [visibleCount, setVisibleCount] = useState(6)

	const loadMore = () => {
		setVisibleCount((prev) => Math.min(prev + 6, cases.length))
	}

	return (
		<div className="w-full min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#6320EE] selection:text-white pt-6">
			<div className="container-universal mx-auto px-6 mb-16">
				{/* Hero Section */}
				<div className="relative w-full min-h-115 md:min-h-130 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 sm:p-12">
					<img
						src="/assets/use-cases/hero_server_room.jpg"
						alt="Server Room"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-[#160B24]/80 mix-blend-multiply" />
					<div className="absolute inset-0 bg-linear-to-b from-[#160B24]/40 to-[#160B24]/80" />

					<div className="relative z-10 max-w-250 mx-auto text-white">
						<h1 className="text-4xl sm:text-6xl md:text-[68px] lg:text-[80px] font-medium tracking-[-0.035em] text-[#eef0f6] leading-[0.98] mb-6">
							Persistent memory for AI that
							<br />
							gets better over time.
						</h1>
						<p className="text-base sm:text-xl md:text-[22px] text-[#b9becf] font-normal max-w-3xl mx-auto leading-relaxed mt-5 sm:mt-7 mb-10 tracking-[-0.01em]">
							PiyApi gives agents, copilots and AI products a durable memory
							layer — so every interaction can build on what came before.
						</p>

						<div className="flex items-center justify-center gap-4 mt-8">
							<a
								href="https://piyapi.cloud"
								target="_blank"
								rel="noopener noreferrer"
								className="relative inline-flex items-center justify-center text-sm font-medium h-11 px-6 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden bg-[#765DFB] hover:bg-[#6349E0] text-white select-none"
							>
								Try Piyapi
							</a>
							<a
								href="#"
								className="relative inline-flex items-center justify-center text-sm font-medium h-11 px-6 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden bg-white text-neutral-950 hover:bg-neutral-50 select-none"
							>
								Read the docs
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="container-universal mx-auto mb-24">
				{/* Filter */}
				<div className="flex mb-8">
					<button className="relative inline-flex items-center justify-center gap-2 text-sm font-medium h-9 px-4 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden bg-[#765DFB] hover:bg-[#6349E0] text-white">
						All <ArrowRight className="w-4 h-4 opacity-80" />
					</button>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{cases.slice(0, visibleCount).map((c, i) => (
						<div
							key={i}
							className="group flex flex-col bg-white border border-neutral-200/60 rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
						>
							<div className="w-full h-55 overflow-hidden relative bg-neutral-100">
								<img
									src={c.img}
									alt={c.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
								/>
							</div>
							<div className="p-6 sm:p-8 flex flex-col flex-1 relative min-h-40">
								<h3 className="text-[20px] font-medium text-neutral-900 mb-3 leading-snug pr-4">
									{c.title}
								</h3>
								<p className="text-[15px] text-neutral-500/90 leading-[1.6] mb-8 pr-4">
									{c.desc}
								</p>

								<div className="absolute bottom-6 right-6">
									<div className="w-8 h-8 rounded-full bg-[#765DFB] flex items-center justify-center text-white shadow-sm transform group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300">
										<ArrowUpRight className="w-4 h-4" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load More */}
				{visibleCount < cases.length && (
					<div className="flex justify-center">
						<button
							onClick={loadMore}
							className="text-[17px] font-semibold text-neutral-900 hover:text-[#765DFB] transition-colors"
						>
							Load More...
						</button>
					</div>
				)}
			</div>

			{/* CTA Section from Figma */}
			<div className="w-full bg-[#fafafa] py-32 border-t border-neutral-100">
				<div className="container-universal max-w-200 mx-auto text-center">
					<p className="text-[11px] font-mono font-bold text-[#765DFB] tracking-[0.15em] mb-4 uppercase">
						GET STARTED
					</p>
					<h2 className="text-4xl md:text-[48px] font-medium text-neutral-900 mb-6 tracking-tight leading-[1.1]">
						Build AI that remembers.
					</h2>
					<p className="text-base text-[#765DFB] font-medium leading-relaxed max-w-125 mx-auto mb-10">
						Start with PiyApi's memory infrastructure and give your AI products
						the context they need to become more useful with every interaction.
					</p>

					<div className="flex items-center justify-center gap-4">
						<button className="relative inline-flex items-center justify-center text-sm font-medium h-11 px-6 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden bg-[#765DFB] hover:bg-[#6349E0] text-white">
							Start building <ArrowRight className="w-4 h-4 ml-1" />
						</button>
						<button className="relative inline-flex items-center justify-center text-sm font-medium h-11 px-6 rounded-lg transition-all duration-250 ease-out shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer overflow-hidden bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900">
							Talk to us
						</button>
					</div>
				</div>
			</div>

			<Footer onOpenConsole={() => {}} />
		</div>
	)
}
