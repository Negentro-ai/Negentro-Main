import { useState } from "react"
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react"
import type { IndustryPageData } from "@/data/industryPages"
import { industryPages } from "@/data/industryPages"

interface IndustryPageProps {
	industry: IndustryPageData
	onNavigate: (slug: string) => void
}

interface SectionHeaderProps {
	number: string
	label: string
	title: string
	dark?: boolean
}

const SectionHeader = ({ number, label, title, dark = false }: SectionHeaderProps) => (
	<div className={`grid gap-6 border-t pt-6 sm:grid-cols-[180px_1fr] sm:gap-10 ${dark ? "border-white/15" : "border-[#00050e]/10"}`}>
		<div className="flex flex-col gap-1.5">
			<span className={`text-xs font-medium tracking-wider ${dark ? "text-[#eccde5]" : "text-[#765dfb]"}`}>
				{number}
			</span>
			<span className={`text-[11px] tracking-wider ${dark ? "text-[#8c8c99]" : "text-[#52525e]"}`}>
				{label}
			</span>
		</div>
		<h2 className={`max-w-225 text-[28px] font-medium leading-[1.12] sm:text-[36px] ${dark ? "text-[#f9f8ff]" : "text-[#00050e]"}`}>
			{title}
		</h2>
	</div>
)

const ContextDiagram = ({ industry }: { industry: IndustryPageData }) => (
	<div className="grid gap-4 rounded-[10px] border border-[#00050e]/10 bg-white p-4 sm:p-6 lg:grid-cols-[150px_1fr_220px] lg:gap-6">
		<div className="space-y-3 border-b border-[#00050e]/10 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
			<p className="font-mono text-[10px] tracking-[0.15em] text-[#8c8c99]">SESSION</p>
			{["question", "interaction", "progress"].map((item, index) => (
				<div key={item} className="flex items-center gap-3 text-sm text-[#52525e]">
					<span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#765dfb]/20 text-xs text-[#765dfb]">
						{String(index + 1).padStart(2, "0")}
					</span>
					{item}
				</div>
			))}
		</div>
		<div className="flex flex-col justify-center rounded-lg border border-[#765dfb]/20 bg-[#faf9ff] p-5 sm:p-8">
			<p className="font-mono text-[10px] tracking-[0.18em] text-[#765dfb]">MEMORY / 01</p>
			<h3 className="mt-2 text-xl font-medium text-[#00050e] sm:text-2xl">Persistent Memory</h3>
			<div className="mt-5 grid gap-3 sm:grid-cols-2">
				{industry.facts.slice(0, 4).map((fact) => (
					<div key={fact.label} className="rounded-md border border-[#00050e]/10 bg-white p-3">
						<p className="font-mono text-[9px] tracking-[0.12em] text-[#765dfb]">{fact.label}</p>
						<p className="mt-1 text-xs leading-relaxed text-[#52525e]">{fact.value}</p>
					</div>
				))}
			</div>
		</div>
		<div className="space-y-3 border-t border-[#00050e]/10 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
			<p className="font-mono text-[10px] tracking-[0.15em] text-[#8c8c99]">RETRIEVAL</p>
			<p className="text-sm text-[#00050e]">Relevant context</p>
			{industry.capabilities.slice(0, 3).map((item, index) => (
				<div key={item.title} className="rounded-md border border-[#00050e]/10 p-3">
					<p className="font-mono text-[9px] text-[#765dfb]">0{index + 1} RELEVANT</p>
					<p className="mt-1 text-xs font-medium text-[#00050e]">{item.title}</p>
				</div>
			))}
		</div>
		<div className="flex flex-col gap-2 rounded-lg bg-[#00050e] p-4 text-white sm:flex-row sm:items-center sm:justify-between lg:col-span-3">
			<div>
				<p className="font-mono text-[10px] tracking-[0.15em] text-[#a99aff]">COPILOT CONTEXT</p>
				<p className="mt-1 text-base font-medium">A more relevant next interaction</p>
			</div>
			<p className="text-xs text-white/65">Relevant context assembled from persistent memory.</p>
		</div>
	</div>
)

const ArchitectureDiagram = ({ industry }: { industry: IndustryPageData }) => (
	<div className="rounded-lg border border-[#00050e]/10 bg-white p-5 sm:p-8">
		<div className="mx-auto mb-8 max-w-107.5 rounded-lg border border-[#765dfb]/25 bg-[#faf9ff] px-5 py-6 text-center shadow-[0_8px_30px_rgba(72,70,172,0.08)]">
			<p className="font-mono text-[10px] tracking-[0.2em] text-[#765dfb]">CONTEXT ENGINE</p>
			<p className="mt-2 text-2xl font-medium text-[#00050e] sm:text-3xl">Persistent Memory</p>
			<p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-[#8c8c99]">STORE · RETRIEVE · RECALL</p>
		</div>
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{industry.capabilities.map((item, index) => (
				<div key={item.title} className="min-h-32.5 rounded-lg border border-[#765dfb]/15 bg-white p-4">
					<p className="font-mono text-[10px] tracking-widest text-[#765dfb]">0{index + 1}</p>
					<p className="mt-3 text-sm font-medium text-[#00050e]">{item.title}</p>
					<p className="mt-1 text-xs leading-relaxed text-[#52525e]">{item.description}</p>
				</div>
			))}
		</div>
	</div>
)

export const IndustryPage = ({ industry, onNavigate }: IndustryPageProps) => {
	const [openFaq, setOpenFaq] = useState(0)
	const otherIndustries = industryPages.filter((item) => item.slug !== industry.slug)

	return (
		<div className="w-full bg-white text-[#00050e] font-sans antialiased">
			<section className="container-universal mx-auto max-w-360 px-5 pt-14 sm:px-8 sm:pt-18 lg:px-20">
				<div className="mx-auto max-w-300">
					<div className="flex items-center gap-3 text-[11px] tracking-wider">
						<span className="font-medium text-[#765dfb]">INDUSTRIES</span>
						<span className="text-[#8c8c99]">/</span>
						<span className="font-medium text-[#00050e]">{industry.name.toUpperCase()}</span>
					</div>
					<h1 className="mt-7 max-w-250 text-[42px] font-medium leading-[1.02] text-[#00050e] sm:text-[60px] lg:text-[80px]">
						{industry.heroTitle}
					</h1>
					<div className="grid gap-8 pb-10 pt-8 sm:pb-14 lg:grid-cols-[460px_420px] lg:gap-20">
						<p className="max-w-115 text-[16px] leading-[1.6] text-[#52525e] sm:text-[17px]">
							{industry.heroDescription}
						</p>
						<div className="border-t border-[#00050e]/10">
							{industry.facts.map((fact, index) => (
								<div key={fact.label} className={`grid grid-cols-[110px_1fr] gap-4 py-3.5 ${index > 0 ? "border-t border-[#00050e]/6" : ""}`}>
									<span className="text-[11px] font-medium tracking-[0.03em] text-[#765dfb]">{fact.label}</span>
									<span className="text-[13px] leading-[1.4] text-[#52525e]">{fact.value}</span>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-wrap gap-3 pb-16">
						<a href="https://piyapi.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-3 bg-[#00050e] px-6 text-xs font-medium text-[#f9f8ff] transition-colors hover:bg-[#262435]">
							Start building <ArrowUpRight className="h-3.5 w-3.5" />
						</a>
						<a href="https://docs.piyapi.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center border border-[#00050e]/20 px-6 text-xs font-medium text-[#00050e] transition-colors hover:border-[#765dfb] hover:text-[#765dfb]">
							Read the docs
						</a>
					</div>
				</div>
			</section>

			<section className="page-gutter bg-[#f9f8ff] py-14 sm:py-20">
				<div className="mx-auto flex max-w-300 flex-col gap-8">
					<div className="flex items-center justify-between gap-4 text-[10px] tracking-[0.15em] text-[#00050e]/55">
						<span>{industry.name.toUpperCase()} MEMORY</span>
						<span>01 — 05</span>
					</div>
					<div className="max-w-160">
						<h2 className="text-[28px] font-medium leading-tight text-[#00050e] sm:text-[34px]">{industry.contextTitle}</h2>
						<p className="mt-4 text-sm leading-[1.6] text-[#4846ac]">{industry.contextDescription}</p>
					</div>
					{industry.contextImage ? (
						<img
							src={industry.contextImage}
							alt={industry.contextImageAlt}
							width={902}
							height={522}
							loading="lazy"
							decoding="async"
							className="mx-auto block h-auto w-full max-w-225.5 rounded-[10px] border border-[#00050e]/10 object-contain"
						/>
					) : (
						<ContextDiagram industry={industry} />
					)}
				</div>
			</section>

			<section className="container-universal mx-auto max-w-360 py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-12">
					<SectionHeader number="01" label={`WHY ${industry.name.toUpperCase()} NEEDS MEMORY`} title={industry.introTitle} />
					<div className="grid gap-6 pl-0 text-[15px] leading-[1.65] text-[#52525e] sm:grid-cols-2 sm:gap-10 sm:pl-55">
						{industry.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
					</div>
				</div>
			</section>

			<section className="container-universal mx-auto max-w-360 py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-12">
					<SectionHeader number="02" label="WHAT YOU CAN BUILD" title={industry.capabilitiesTitle} />
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{industry.capabilities.map((item, index) => (
							<article key={item.title} className={`${index > 0 ? "border-t border-[#00050e]/10 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0" : ""}`}>
								<p className="text-[48px] font-medium leading-none text-[#00050e]/10">0{index + 1}</p>
								<div className="mt-8">
									<h3 className="text-[18px] font-medium leading-[1.2] text-[#00050e]">{item.title}</h3>
									<p className="mt-2.5 text-[13px] leading-[1.55] text-[#52525e]">{item.description}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="page-gutter bg-[#00050e] py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-10">
					<SectionHeader number="03" label="PRODUCT ARCHITECTURE" title={industry.infrastructureTitle} dark />
					<div className="grid gap-10 lg:grid-cols-[1fr_300px]">
						<div>
							{industry.problems.map((item, index) => (
								<div key={item.title} className={`grid gap-3 py-5 sm:grid-cols-[24px_1fr] sm:gap-7 ${index > 0 ? "border-t border-white/10" : ""}`}>
									<span className="text-xs text-[#eccde5]">0{index + 1}</span>
									<div>
										<h3 className="text-[17px] font-medium text-[#f9f8ff]">{item.title}</h3>
										<p className="mt-2 text-[13px] leading-[1.55] text-[#adadbd]">{item.description}</p>
									</div>
								</div>
							))}
						</div>
						<div className="border-l border-white/15 pl-6 pt-1">
							<p className="font-mono text-[10px] tracking-wider text-[#8c8c99]">SESSION TO NEXT SESSION</p>
							<ol className="mt-6 space-y-5">
								{industry.flowSteps.map((step, index) => (
									<li key={step} className={`flex items-center gap-3 text-[13px] tracking-[0.04em] ${index === 2 ? "text-[#eccde5]" : "text-[#f9f8ff]"}`}>
										<span className="font-mono text-[11px] text-[#8c8c99]">0{index + 1}</span>{step}
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</section>

			<section className="page-gutter bg-[#f9f8ff] py-16 sm:py-20">
				<div className="mx-auto flex max-w-312 flex-col gap-12">
					<div className="grid gap-6 border-t border-[#00050e]/10 pt-6 sm:grid-cols-[160px_1fr] sm:gap-8">
						<div>
							<p className="text-xs font-bold tracking-wider text-[#765dfb]">04</p>
							<p className="mt-1 text-[10px] tracking-widest text-[#00050e]/50">ARCHITECTURE</p>
						</div>
						<h2 className="max-w-130 text-[38px] font-bold leading-[1.1] text-[#00050e] sm:text-[46px]">{industry.architectureTitle}</h2>
					</div>
					<div className="overflow-hidden rounded-lg border border-[#00050e]/10 bg-white p-2 sm:p-5">
						{industry.architectureImage ? (
							<img
								src={industry.architectureImage}
								alt={`Persistent memory architecture for ${industry.name.toLowerCase()}`}
								width={1536}
								height={1024}
								loading="lazy"
								decoding="async"
								className="block h-auto w-full rounded-md object-contain"
							/>
						) : (
							<ArchitectureDiagram industry={industry} />
						)}
					</div>
				</div>
			</section>

			<section className="container-universal mx-auto max-w-360 py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-12">
					<SectionHeader number="05" label="PERSISTENT MEMORY" title={industry.memoryTitle} />
					<div className="grid gap-10 sm:grid-cols-2 sm:pl-55">
						<p className="text-[15px] leading-[1.65] text-[#52525e]">{industry.memoryDescription}</p>
						<ol className="border-l border-[#00050e]/10 pl-6">
							{industry.memorySteps.map((step, index) => (
								<li key={step} className={`border-b border-[#00050e]/6 py-3 text-[15px] ${index === industry.memorySteps.length - 1 ? "font-medium text-[#00050e]" : "text-[#52525e]"}`}>
									<span className={`mr-4 text-xs ${index === industry.memorySteps.length - 1 ? "text-[#765dfb]" : "text-[#8c8c99]"}`}>{String(index + 1).padStart(2, "0")}</span>
									{step}
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>

			<section className="container-universal mx-auto max-w-360 py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-10">
					<SectionHeader number="06" label="GET STARTED" title={industry.getStartedTitle} />
					<div className="flex flex-col gap-6 sm:ml-55 sm:flex-row sm:items-center sm:justify-between">
						<p className="max-w-140 text-[15px] leading-[1.6] text-[#52525e]">{industry.getStartedDescription}</p>
						<a href="https://piyapi.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-md bg-[#00050e] px-6 text-xs font-medium text-white transition-colors hover:bg-[#262435]">
							Start building <ArrowRight className="h-3.5 w-3.5" />
						</a>
					</div>
				</div>
			</section>

			<section id="industry-faq" className="container-universal mx-auto max-w-360 py-16 sm:py-24">
				<div className="mx-auto flex max-w-300 flex-col gap-12">
					<SectionHeader number="07" label="QUESTIONS" title={`Frequently asked about ${industry.name.toLowerCase()} memory.`} />
					<div className="sm:ml-55">
						{industry.faqs.map((faq, index) => {
							const isOpen = openFaq === index
							return (
								<div key={faq.question} className="border-b border-[#00050e]/10 first:border-t">
									<button
										type="button"
										onClick={() => setOpenFaq(isOpen ? -1 : index)}
										aria-expanded={isOpen}
										className="flex min-h-17 w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-[#00050e]"
									>
										{faq.question}
										{isOpen ? <Minus className="h-4 w-4 shrink-0 text-[#765dfb]" /> : <Plus className="h-4 w-4 shrink-0 text-[#765dfb]" />}
									</button>
									{isOpen && <p className="max-w-210 pb-5 text-sm leading-[1.6] text-[#52525e]">{faq.answer}</p>}
								</div>
							)
						})}
					</div>
				</div>
			</section>

			<section className="page-gutter bg-white py-16 sm:py-20">
				<div className="mx-auto max-w-300">
					<div className="grid gap-6 sm:grid-cols-[210px_1fr] sm:gap-10">
						<div className="pt-1">
							<p className="text-xs font-medium text-[#765dfb]">08</p>
							<p className="mt-2 text-[11px] tracking-widest text-[#4846ac]">MORE SOLUTIONS</p>
						</div>
						<h2 className="max-w-125 text-[38px] font-bold leading-[1.05] text-[#00050e] sm:text-[44px]">Explore other industries.</h2>
					</div>
					<div className="mt-12 sm:ml-52.5">
						<div className="flex justify-end pb-4 font-mono text-[10px] tracking-[0.12em] text-[#4846ac]">{industryPages.length} INDUSTRIES</div>
						<div className="grid border-l border-t border-[#00050e]/10 sm:grid-cols-2 lg:grid-cols-3">
							{otherIndustries.map((item, index) => (
								<button key={item.slug} type="button" onClick={() => onNavigate(item.slug)} className="group flex min-h-28 items-center justify-between border-b border-r border-[#00050e]/10 px-5 py-6 text-left transition-colors hover:bg-[#f1eeff] sm:px-7 sm:py-8">
									<span>
										<span className="block text-[10px] text-[#4846ac]">{String(index + 1).padStart(2, "0")}</span>
										<span className="mt-2 block text-[17px] font-bold text-[#00050e] transition-colors group-hover:text-[#765dfb]">{item.name}</span>
									</span>
									<ArrowRight className="h-4 w-4 shrink-0 text-[#765dfb] transition-transform group-hover:translate-x-1" />
								</button>
							))}
						</div>
						<p className="pt-4 font-mono text-[10px] tracking-[0.12em] text-[#4846ac]">EXPLORE BY DOMAIN</p>
					</div>
				</div>
			</section>

			<section className="page-gutter bg-[#00050e] py-20 sm:py-30">
				<div className="mx-auto max-w-300">
					<p className="text-xs font-medium tracking-wider text-[#765dfb]">START BUILDING</p>
					<h2 className="mt-6 max-w-190 text-[36px] font-medium leading-[1.12] text-[#f9f8ff] sm:text-[48px]">{industry.finalCtaTitle}</h2>
					<p className="mt-5 max-w-125 text-base leading-[1.55] text-[#adadbd]">{industry.finalCtaDescription}</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<a href="https://piyapi.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center bg-[#f9f8ff] px-6 text-xs font-medium text-[#00050e] transition-colors hover:bg-white">Start building</a>
						<a href="https://docs.piyapi.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center border border-white/25 px-6 text-xs font-medium text-[#f9f8ff] transition-colors hover:border-white/60">Explore the docs</a>
					</div>
				</div>
			</section>
		</div>
	)
}