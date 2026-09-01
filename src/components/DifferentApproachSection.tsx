import type React from "react"
import {
	RefreshCw,
	Target,
	Link,
	Clock,
	Shield,
	Box,
	ChevronRight,
} from "lucide-react"
import WavyBackground from "@/components/ui/blue-meshy-background"

export const DifferentApproachSection: React.FC = () => {
	const comparisonRows = [
		{
			feature: "Exact Preservation",
			contextStuffing: false,
			memoryWrapper: "partial",
			nativeMemory: false,
		},
		{
			feature: "Model Independence",
			contextStuffing: true,
			memoryWrapper: true,
			nativeMemory: false,
		},
		{
			feature: "Verifiable Provenance",
			contextStuffing: false,
			memoryWrapper: true,
			nativeMemory: false,
		},
		{
			feature: "Enterprise Governance",
			contextStuffing: false,
			memoryWrapper: "partial",
			nativeMemory: false,
		},
	]

	const features = [
		{
			icon: <RefreshCw className="w-5 h-5" />,
			title: "Determinism",
			desc: "Predictable and repeatable memory retrieval for reliable AI systems.",
		},
		{
			icon: <Target className="w-5 h-5" />,
			title: "Fidelity",
			desc: "Preserve the full context and nuance of data without loss or compression.",
		},
		{
			icon: <Link className="w-5 h-5" />,
			title: "Provenance",
			desc: "Complete traceability for every piece of retrieved knowledge.",
		},
		{
			icon: <Clock className="w-5 h-5" />,
			title: "Persistence",
			desc: "Long-term historical continuity across sessions and models.",
		},
		{
			icon: <Shield className="w-5 h-5" />,
			title: "Ownership",
			desc: "Full user control and sovereignty over private memory data.",
		},
		{
			icon: <Box className="w-5 h-5" />,
			title: "Portability",
			desc: "Model agnostic interoperability for seamless infrastructure migration.",
		},
	]

	const metrics = [
		{
			value: "#1",
			line1: "SUPERIOR AI",
			line2: "EXPERIENCE",
			sublabel: "ON MEMBENCH",
		},
		{
			value: "<500ms",
			line1: "REAL-TIME",
			line2: "MEMORY",
			sublabel: "RECALL LATENCY",
		},
		{
			value: "50-90%",
			line1: "ENTERPRISE",
			line2: "SCALE AI",
			sublabel: "FEWER TOKENS USED",
		},
	]

	return (
		<section className="w-full bg-white pt-8 sm:pt-10 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 font-['DM_Sans',sans-serif]">
			<div className="container-universal space-y-12 sm:space-y-16">
				{/* Top-Left Category Tag: > SOLUTION */}
				<div className="w-full flex items-center justify-start">
					<div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.08em] text-[#888E94] uppercase select-none">
						<ChevronRight className="w-3.5 h-3.5 text-[#0562EF] stroke-[3]" />
						<span>SOLUTION</span>
					</div>
				</div>

				{/* Section Header */}
				<div className="text-center max-w-5xl lg:max-w-6xl mx-auto space-y-4 sm:space-y-6">
					<h2 className="text-[32px] sm:text-[44px] lg:text-[56px] font-semibold text-[#0F1123] tracking-[-0.03em] leading-[1.12] font-['DM_Sans',sans-serif]">
						A Different Approach to AI{" "}
						<span className="text-[#765DFB]">Memory.</span>
					</h2>

					<p className="text-[18px] sm:text-[28px] lg:text-[40px] font-normal text-[#0F1123] leading-[1.25] tracking-[-0.02em] font-['DM_Sans',sans-serif]">
						Purpose built for production AI,{" "}
						<span className="font-semibold text-[#765DFB]">Piyapi</span>{" "}
						preserves exact knowledge with
						<br className="hidden md:inline" /> predictable retrieval and
						verifiable provenance.
					</p>
				</div>

				{/* Interactive Cosmic Nebula Banner */}
				<div className="mx-auto w-full max-w-[1257.5px] h-[180px] sm:h-[220px] md:h-[256.73px] aspect-[1257.5/256.73] rounded-[16px] overflow-hidden shadow-2xl relative border border-[#4846AC]/40 group">
					<WavyBackground className="w-full h-full flex items-center justify-center bg-[#0e0728]">
						<div className="relative z-10 flex items-center justify-center w-full h-full px-4">
							<img
								src="/assets/piyapi-logo-exact.svg"
								alt="PiyAPI"
								className="w-[24%] min-w-[170px] max-w-[300px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] select-none"
							/>
						</div>
					</WavyBackground>
				</div>

				{/* Key Architecture Features */}
				<div className="w-full max-w-[1258px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="relative overflow-hidden min-h-[220px] p-6 sm:p-8 pl-7 sm:pl-9 rounded-lg bg-white border border-[#C9C3F4] shadow-[0_2px_12px_rgba(35,25,105,0.06)] transition-all duration-300 hover:shadow-lg hover:border-[#765DFB]/60 hover:-translate-y-1 group flex flex-col justify-center"
						>
							<div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#F2EFFE] to-transparent pointer-events-none" />

							{/* Left indicator pill */}
							<div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-12 group-hover:h-16 rounded-r-[4px] bg-neutral-300 group-hover:bg-[#5146B8] transition-all duration-200 origin-center" />

							<div className="relative z-10 w-9 h-9 rounded-md bg-[#5146B8] text-white flex items-center justify-center mb-4 transition-all duration-200 group-hover:bg-[#6320EE] group-hover:text-[#F0D7FF] group-hover:scale-105">
								<div className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[2.2]">
									{feature.icon}
								</div>
							</div>
							<h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#0F1123] mb-2 tracking-tight relative z-10 font-['DM_Sans',sans-serif]">
								<span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
									{feature.title}
								</span>
							</h3>
							<p className="text-[13.5px] sm:text-[14.5px] text-[#0F1123] leading-[1.38] font-normal max-w-[310px] relative z-10 font-['DM_Sans',sans-serif]">
								{feature.desc}
							</p>
						</div>
					))}
				</div>

				{/* Highlight Quote */}
				<div className="w-full max-w-[1140px] mx-auto text-center pt-8 sm:pt-10 pb-8 sm:pb-10 px-4">
					<p className="text-[20px] sm:text-[25px] md:text-[28px] lg:text-[30px] font-normal text-[#000410] tracking-[-0.02em] leading-[1.35] lg:leading-[40px] font-['DM_Sans',sans-serif]">
						<span className="block">
							"Retrieval is only half the problem. Production AI needs{" "}
							<span className="text-[#765DFB]">memory</span> that can preserve and
						</span>
						<span className="block">verify what it knows."</span>
					</p>
				</div>

				{/* Performance Snapshot */}
				<div className="w-full max-w-[1140px] mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-14 pt-2 sm:pt-4 px-4">
					{/* SOTA Overview */}
					<div className="flex flex-col justify-between min-h-[170px] shrink-0 w-full lg:w-[320px]">
						<div>
							<h3 className="text-[30px] sm:text-[34px] lg:text-[36px] font-medium text-[#000410] tracking-[-0.03em] leading-[1.08] lg:leading-[40px] font-['DM_Sans',sans-serif]">
								<span className="text-[#765DFB]">SOTA</span> memory,
								<br />
								Measured.
							</h3>
						</div>
						<p className="text-[13px] text-[#000410] leading-[1.46] font-['DM_Sans',sans-serif] font-normal pt-4 sm:pt-6">
							<span className="block whitespace-nowrap">
								Leading performance across{" "}
								<span className="text-[#765DFB]">LongMemEval</span>,
							</span>
							<span className="block whitespace-nowrap">
								<span className="text-[#765DFB]">LoCoMo</span>,{" "}
								<span className="text-[#765DFB]">ConvoMem</span> with fast recall and
							</span>
							<span className="block whitespace-nowrap">
								dramatically lower token usage.
							</span>
						</p>
					</div>

					{/* Benchmark Metrics */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 flex-1 justify-between">
						{metrics.slice(0, 3).map((metric) => (
							<div
								key={metric.value}
								className="flex flex-col justify-between min-h-[170px]"
							>
								<div>
									<div className="text-[36px] sm:text-[42px] lg:text-[44px] font-medium text-[#765DFB] tracking-[-0.03em] leading-none font-['DM_Sans',sans-serif]">
										{metric.value}
									</div>
									<div className="mt-2 text-[10.5px] uppercase tracking-[0.14em] font-medium text-[#765DFB] font-['DM_Sans',sans-serif]">
										{metric.sublabel}
									</div>
								</div>
								<div className="text-[14.5px] sm:text-[15px] font-medium uppercase text-[#000410] tracking-[-0.01em] leading-[1.2] font-['DM_Sans',sans-serif] pt-4 sm:pt-6">
									<div>{metric.line1}</div>
									<div>{metric.line2}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Architectural Comparison Table */}
				<div className="w-full max-w-[1258px] mx-auto pt-10 sm:pt-14">
					<div className="w-full overflow-x-auto">
						<table className="w-full text-left border-collapse min-w-[680px]">
							<thead>
								<tr className="border-t border-[#E0DCEF]">
									<th className="py-5 sm:py-6 px-4 sm:px-6 w-[34%]" />
									<th className="py-5 sm:py-6 px-3 w-[16%] text-center font-normal text-[13px] sm:text-[14px] text-[#5146B8] font-['DM_Sans',sans-serif]">
										Context Stuffing
									</th>
									<th className="py-5 sm:py-6 px-3 w-[16%] text-center font-normal text-[13px] sm:text-[14px] text-[#5146B8] font-['DM_Sans',sans-serif]">
										Memory Wrapper
									</th>
									<th className="py-5 sm:py-6 px-3 w-[16%] text-center font-normal text-[13px] sm:text-[14px] text-[#5146B8] font-['DM_Sans',sans-serif]">
										Native Memory
									</th>
									<th className="py-4 sm:py-5 px-4 w-[18%] text-center align-middle bg-[#7B6EF6] rounded-t-[14px]">
										<img
											src="/assets/piyapi-logo-exact.svg"
											alt="Piya.pi"
											className="h-[25px] sm:h-[28px] md:h-[30px] w-auto mx-auto object-contain select-none"
										/>
									</th>
								</tr>
							</thead>

							<tbody>
								{comparisonRows.map((row, idx) => {
									const isLast = idx === comparisonRows.length - 1
									return (
										<tr
											key={row.feature}
											className="border-t border-[#E0DCEF]"
										>
											<td className="py-5 sm:py-6 px-4 sm:px-6">
												<span className="font-normal text-[14px] sm:text-[15px] text-[#1A1935] font-['DM_Sans',sans-serif]">
													{row.feature}
												</span>
											</td>

											<td className="py-5 sm:py-6 px-3 text-center align-middle">
												{row.contextStuffing === true ? (
													<span className="inline-block text-[#5146B8] text-[16px] font-light leading-none select-none">✓</span>
												) : (
													<span className="inline-block text-[#5146B8] text-[18px] font-normal leading-none select-none">—</span>
												)}
											</td>

											<td className="py-5 sm:py-6 px-3 text-center align-middle">
												{row.memoryWrapper === true ? (
													<span className="inline-block text-[#5146B8] text-[16px] font-light leading-none select-none">✓</span>
												) : row.memoryWrapper === "partial" ? (
													<div className="w-[22px] h-[22px] rounded-full overflow-hidden flex mx-auto border border-[#5146B8]/25">
														<div className="w-1/2 h-full bg-[#5146B8]" />
														<div className="w-1/2 h-full bg-[#DDD9EE]" />
													</div>
												) : (
													<span className="inline-block text-[#5146B8] text-[18px] font-normal leading-none select-none">—</span>
												)}
											</td>

											<td className="py-5 sm:py-6 px-3 text-center align-middle">
												{row.nativeMemory === true ? (
													<span className="inline-block text-[#5146B8] text-[16px] font-light leading-none select-none">✓</span>
												) : (
													<span className="inline-block text-[#5146B8] text-[18px] font-normal leading-none select-none">—</span>
												)}
											</td>

											<td
												className={`py-3.5 sm:py-4 px-3 text-center align-middle bg-[#7B6EF6] ${isLast
														? "rounded-b-[14px]"
														: "border-b border-white/20"
													}`}
											>
												<img
													src="/assets/piyapi-check-badge.svg"
													alt="Checked"
													className="w-[36px] h-[36px] mx-auto select-none object-contain"
												/>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	)
}

