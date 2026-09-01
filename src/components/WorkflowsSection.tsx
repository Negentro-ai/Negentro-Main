import type React from "react"

export const WorkflowsSection: React.FC = () => {
	const workflows = [
		{
			id: "01",
			title: "AI Agents",
			desc: "Persistent memory for autonomous, multi-step decision making.",
			image: "/assets/AI Agents.svg",
		},
		{
			id: "02",
			title: "Conversational AI",
			desc: "Maintain long-term context across customer support, sales, and personal assistants.",
			image: "/assets/Conversational AI.svg",
		},
		{
			id: "03",
			title: "RAG Systems",
			desc: "Retrieve exact knowledge with deterministic provenance instead of semantic similarity.",
			image: "/assets/RAG Systems.svg",
		},
		{
			id: "04",
			title: "Enterprise Knowledge",
			desc: "Preserve organizational knowledge across teams, documents, and workflows.",
			image: "/assets/Enterprise Knowledge.svg",
		},
		{
			id: "05",
			title: "High-Stakes AI",
			desc: "Power legal, financial, healthcare, and regulated systems where exact recall matters.",
			image: "/assets/High-Stakes.svg",
		},
		{
			id: "06",
			title: "Multi-Agent Systems",
			desc: "Provide a shared, persistent memory layer across collaborating AI agents.",
			image: "/assets/Multi-Agents.svg",
		},
	]

	return (
		<section className="w-full bg-white pt-8 sm:pt-10 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 font-['DM_Sans',sans-serif]">
			<div className="container-universal space-y-12 sm:space-y-16">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
					<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1123] tracking-[-0.03em] leading-[1.15]">
						Built for Every{" "}
						<span className="text-[#765DFB]">AI Workflow.</span>
					</h2>

					<p className="text-base sm:text-lg text-[#5A5D7A] leading-relaxed font-normal max-w-2xl mx-auto">
						<span className="block sm:whitespace-nowrap">
							Empower your specialized infrastructure with deterministic memory
						</span>
						<span className="block">
							management optimized for high-scale, context-aware production models.
						</span>
					</p>
				</div>

				{/* 6 Workflow Isometric Cards Grid (2 Rows x 3 Columns) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
					{workflows.map((wf) => (
						<div
							key={wf.id}
							className="group relative flex flex-col justify-between rounded-[18px] bg-white border border-[#E5E2F4] p-6 sm:p-7 shadow-[0_4px_20px_rgba(35,25,105,0.03)] transition-all duration-300 hover:shadow-xl hover:border-[#765DFB]/40 hover:-translate-y-1 overflow-hidden"
						>
							{/* Card Header: Title on Left, Number Tag on Right */}
							<div>
								<div className="flex items-start justify-between gap-2 mb-2">
									<h3 className="text-xl sm:text-[23px] font-bold text-[#0F1123] tracking-tight group-hover:text-[#5146B8] transition-colors">
										{wf.title}
									</h3>
									<span className="font-mono text-xs sm:text-sm font-semibold text-[#5146B8] shrink-0 pt-0.5">
										{wf.id}
									</span>
								</div>

								{/* Description */}
								<p className="text-sm sm:text-[14.5px] text-[#5A5D7A] leading-relaxed font-normal mb-5 min-h-[42px]">
									{wf.desc}
								</p>
							</div>

							{/* Isometric Graphic Container */}
							<div className="relative w-full overflow-hidden flex items-center justify-center aspect-[446/276]">
								<img
									src={wf.image}
									alt={wf.title}
									className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
