import type React from "react"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export interface MemoryParadigmSectionProps {
	onOpenConsole?: () => void
}

type TabType = "context" | "wrappers" | "native"

export const MemoryParadigmSection: React.FC<MemoryParadigmSectionProps> = ({
	onOpenConsole: _,
}) => {
	const { t } = useLanguage()
	const [activeTab, setActiveTab] = useState<TabType>("context")

	const tabData: Record<TabType, { id: TabType; label: string; cardTitle: string; cardDescription: string; imageSrc: string }> = {
		context: {
			id: "context",
			label: t.paradigm.problem1Title,
			cardTitle: t.paradigm.problem1Title,
			cardDescription: t.paradigm.problem1Desc,
			imageSrc: "/assets/context-problem.svg",
		},
		wrappers: {
			id: "wrappers",
			label: t.paradigm.problem2Title,
			cardTitle: t.paradigm.problem2Title,
			cardDescription: t.paradigm.problem2Desc,
			imageSrc: "/assets/wrappers-problem.svg",
		},
		native: {
			id: "native",
			label: t.paradigm.problem3Title,
			cardTitle: t.paradigm.problem3Title,
			cardDescription: t.paradigm.problem3Desc,
			imageSrc: "/assets/native-problem.svg",
		},
	}

	const activeContent = tabData[activeTab]

	return (
		<section className="w-full bg-white pt-8 sm:pt-10 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 font-['DM_Sans',sans-serif]">
			<div className="container-universal">
				{/* Category Tag */}
				<div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.08em] text-[#888E94] uppercase mb-6 sm:mb-8 select-none">
					<ChevronRight className="w-3.5 h-3.5 text-[#0562EF] stroke-[3]" />
					<span>{t.paradigm.tag}</span>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
					{/* Left Column: Headline, Subtitle & Interactive Selector */}
					<div className="lg:col-span-6 flex flex-col justify-between space-y-7 sm:space-y-8">
						<div className="space-y-4 sm:space-y-5">
							<h2 className="text-[34px] sm:text-[48px] lg:text-[60px] font-bold text-black tracking-[-0.03em] leading-[1.08] font-['DM_Sans',sans-serif]">
								{t.paradigm.titlePre}
								<br />
								<span className="bg-gradient-to-r from-[#4846AC] to-[#765DFB] bg-clip-text text-transparent">
									{t.paradigm.titleHighlight}
								</span>
							</h2>

							<p className="text-[18px] sm:text-[22px] lg:text-[28px] font-normal text-black leading-[1.25] tracking-[-0.02em] max-w-[620px] font-['DM_Sans',sans-serif]">
								{t.paradigm.subline}
							</p>
						</div>

						{/* Interactive 3-Tab Selector */}
						<div className="space-y-1.5 pt-2 max-w-md">
							{/* Item 1: Context Stuffing */}
							<div className="border-t border-black/[0.08] pt-1.5">
								<button
									type="button"
									onClick={() => setActiveTab("context")}
									className={`w-full text-left font-['DM_Sans',sans-serif] font-bold text-[18px] sm:text-[21px] lg:text-[24px] rounded-xl transition-all duration-200 cursor-pointer ${
										activeTab === "context"
											? "bg-[#765DFB] text-white py-3.5 px-6 shadow-md"
											: "text-[#0B1015] py-3.5 px-4 hover:bg-black/[0.04]"
									}`}
								>
									{t.paradigm.problem1Title}
								</button>
							</div>

							{/* Item 2: AI Memory Wrappers */}
							<div className="border-t border-black/[0.08] pt-1.5">
								<button
									type="button"
									onClick={() => setActiveTab("wrappers")}
									className={`w-full text-left font-['DM_Sans',sans-serif] font-bold text-[18px] sm:text-[21px] lg:text-[24px] rounded-xl transition-all duration-200 cursor-pointer ${
										activeTab === "wrappers"
											? "bg-[#765DFB] text-white py-3.5 px-6 shadow-md"
											: "text-[#0B1015] py-3.5 px-4 hover:bg-black/[0.04]"
									}`}
								>
									{t.paradigm.problem2Title}
								</button>
							</div>

							{/* Item 3: Native Model Memory */}
							<div className="border-t border-black/[0.08] pt-1.5">
								<button
									type="button"
									onClick={() => setActiveTab("native")}
									className={`w-full text-left font-['DM_Sans',sans-serif] font-bold text-[18px] sm:text-[21px] lg:text-[24px] rounded-xl transition-all duration-200 cursor-pointer ${
										activeTab === "native"
											? "bg-[#765DFB] text-white py-3.5 px-6 shadow-md"
											: "text-[#0B1015] py-3.5 px-4 hover:bg-black/[0.04]"
									}`}
								>
									{t.paradigm.problem3Title}
								</button>
							</div>
						</div>
					</div>

					{/* Right Column: Dynamic Two-Piece Card */}
					<div className="lg:col-span-6 flex justify-center lg:justify-end">
						<div className="w-full max-w-[580px] rounded-[20px] overflow-hidden border border-black/10 shadow-xl bg-white flex flex-col transition-all duration-300">
							{/* Top Card: Purple Graphic Area */}
							<div className="w-full h-[320px] sm:h-[400px] lg:h-[440px] bg-[#765DFB] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden shrink-0">
								<img
									key={activeContent.id}
									src={activeContent.imageSrc}
									alt={activeContent.cardTitle}
									loading="lazy"
									decoding="async"
									width={420}
									height={380}
									className="w-full max-w-[420px] max-h-[380px] h-auto object-contain select-none drop-shadow-2xl transition-all duration-300 animate-fadeIn hover:scale-105"
								/>
							</div>

							{/* Bottom Card: Description Area */}
							<div className="bg-white p-6 sm:p-8 border-t border-black/10 flex-1 flex flex-col justify-center min-h-[150px]">
								{/* Card Title */}
								<h3 className="text-[24px] sm:text-[30px] lg:text-[34px] leading-[1.2] font-bold text-[#0B1015] tracking-tight max-w-[383px] font-['DM_Sans',sans-serif]">
									{activeContent.cardTitle}
								</h3>

								{/* Card Description */}
								<p className="text-[15px] sm:text-[17px] lg:text-[18px] font-medium text-[#0B1015] leading-[1.35] mt-2 max-w-[500px] font-['DM_Sans',sans-serif]">
									{activeContent.cardDescription}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
