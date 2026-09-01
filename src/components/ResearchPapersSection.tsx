import type React from "react"
import { ChevronRight } from "lucide-react"

export const ResearchPapersSection: React.FC = () => {
	const articles = [
		{
			id: "01",
			overlayTag: "Memory",
			title: "Memory Is the Missing Layer of Intelligence",
			status: "Coming soon",
			category: "Research Papers",
			image: "/assets/research-butterfly.svg",
		},
		{
			id: "02",
			overlayTag: "Memory",
			title: "Deterministic Memory for Probabilistic AI",
			status: "Coming Soon",
			category: "Experiments",
			image: "/assets/research-image-2.svg",
		},
		{
			id: "03",
			overlayTag: "Memory",
			title: "Measuring Long-Term Memory in AI Systems",
			status: "Coming Soon",
			category: "Engineering",
			image: "/assets/research-image-3.svg",
		},
	]

	return (
		<section className="w-full bg-white pt-8 sm:pt-10 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 font-['DM_Sans',sans-serif]">
			<div className="container-universal space-y-10 sm:space-y-12">
				{/* Top-Left Category Tag */}
				<div className="w-full flex items-center justify-start">
					<div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.08em] text-[#888E94] uppercase select-none">
						<ChevronRight className="w-3.5 h-3.5 text-[#0562EF] stroke-[3]" />
						<span>INSIGHTS AND BLOGS</span>
					</div>
				</div>

				{/* Centered Main Title */}
				<div className="text-center max-w-3xl mx-auto">
					<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#000410] tracking-[-0.03em] leading-[1.12]">
						Research &amp; Insights
					</h2>
				</div>

				{/* 3 Research Article Cards (3-Column Grid) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
					{articles.map((article, idx) => (
						<article
							key={`${article.id}-${idx}`}
							className="group flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1"
						>
							{/* Graphic Image Banner with 'Memory' Overlay */}
							<div className="relative w-full aspect-[315/169] rounded-[10px] overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 group-hover:shadow-md">
								<img
									src={article.image}
									alt={article.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{/* Subtle overlay gradient to ensure white text readability */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

								{/* 'Memory' Overlay Text in bottom-left */}
								<div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10">
									<span className="text-white font-bold text-lg sm:text-[22px] tracking-tight drop-shadow-sm">
										{article.overlayTag}
									</span>
								</div>
							</div>

							{/* Article Metadata & Title */}
							<div className="pt-4 space-y-1.5">
								<h3 className="text-lg sm:text-[20px] font-bold text-[#000410] tracking-tight leading-snug group-hover:text-[#765DFB] transition-colors">
									{article.title}
								</h3>

								<p className="text-xs sm:text-[13.5px] text-[#888E94] font-normal">
									<span>{article.status}</span>
									<span className="mx-1.5">&middot;</span>
									<span>{article.category}</span>
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
