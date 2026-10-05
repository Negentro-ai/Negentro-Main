import { useEffect, useState } from "react"
import { ArrowUpRight, Check, Copy, Pause, Play, Share2 } from "lucide-react"
import { researchArticle } from "@/data/researchArticle"

interface ResearchArticlePageProps {
	onNavigateBlog: () => void
}

const tableOfContents = [
	{ id: "architecture", label: "Why memory architecture matters" },
	{ id: "performance", label: "Measuring performance at scale" },
	{ id: "results", label: "What the results reveal" },
	{ id: "limits", label: "Limits of memory benchmarks" },
	{ id: "availability", label: "Research & availability" },
]

const ScaleIllustration = ({
	isSpeaking,
	onToggleListen,
}: {
	isSpeaking: boolean
	onToggleListen: () => void
}) => (
	<div className="relative mx-auto aspect-video w-full max-w-250 overflow-hidden rounded-2xl bg-[#00050e] text-white">
		<div
			className="absolute inset-0 opacity-35"
			style={{
				background:
					"radial-gradient(circle at 50% 50%, rgba(118,93,251,0.24), transparent 36%)",
			}}
		/>
		<div className="absolute inset-x-10 top-10 flex justify-center gap-3 opacity-30 sm:inset-x-12">
			{["w-[14%]", "w-[21%]", "w-[7%]", "w-[28%]", "w-[14%]"].map(
				(width, index) => (
					<div key={index} className={`h-0.5 ${width} bg-[#9ca3af]`} />
				),
			)}
		</div>
		<div className="absolute left-5 top-5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 sm:left-10 sm:top-8 sm:px-4">
			<p className="text-[10px] text-[#9ca3af] sm:text-xs">Scale</p>
			<p className="mt-1 text-base font-bold sm:text-lg">100K</p>
		</div>
		<div className="absolute right-5 top-[22%] rounded-lg border border-white/15 bg-white/5 px-3 py-2 sm:right-14 sm:px-4">
			<p className="text-[10px] text-[#9ca3af] sm:text-xs">Scale</p>
			<p className="mt-1 text-base font-bold sm:text-lg">1M</p>
		</div>
		<div className="absolute bottom-[22%] left-6 rounded-lg border border-white/15 bg-white/5 px-3 py-2 sm:bottom-[24%] sm:left-16 sm:px-4">
			<p className="text-[10px] text-[#9ca3af] sm:text-xs">Scale</p>
			<p className="mt-1 text-base font-bold sm:text-lg">10M</p>
		</div>
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="relative flex h-26 w-42.5 items-center justify-center sm:h-37.5 sm:w-60">
				<div className="absolute inset-[14%] rotate-45 rounded-[10px] border border-[#765dfb]/50 bg-[#765dfb]/10 shadow-[0_0_70px_rgba(118,93,251,0.2)]" />
				<div className="relative flex w-[48%] flex-col gap-1.5 sm:gap-2">
					<div className="h-2 rounded-full bg-[#765dfb] sm:h-3" />
					<div className="h-2 w-4/5 self-center rounded-full bg-[#eccde5] sm:h-3" />
					<div className="h-2 w-[90%] self-center rounded-full bg-[#765dfb] sm:h-3" />
				</div>
			</div>
		</div>
		<div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 border-t border-white/10 bg-black/20 px-4 py-3 sm:gap-4 sm:px-8">
			<button
				type="button"
				onClick={onToggleListen}
				aria-label={
					isSpeaking ? "Pause article narration" : "Listen to article"
				}
				className="text-[#765dfb] transition-colors hover:text-[#eccde5]"
			>
				{isSpeaking ? (
					<Pause className="h-4 w-4" />
				) : (
					<Play className="h-4 w-4" />
				)}
			</button>
			<span className="text-[11px] text-[#9ca3af]">00:42</span>
			<div className="h-px flex-1 bg-[#374151]">
				<div
					className={`h-px bg-[#765dfb] transition-all duration-500 ${isSpeaking ? "w-2/3" : "w-1/4"}`}
				/>
			</div>
			<span className="text-[11px] text-[#9ca3af]">03:10</span>
		</div>
	</div>
)

const ComparisonPanel = () => {
	const [approach, setApproach] = useState<"full" | "selective">("selective")
	const isSelective = approach === "selective"

	return (
		<div className="overflow-hidden rounded-2xl border border-[#00050e]/10">
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00050e]/10 px-4 py-4 sm:px-8">
				<div className="flex items-center gap-2 sm:gap-4">
					{(["full", "selective"] as const).map((item) => (
						<button
							key={item}
							type="button"
							onClick={() => setApproach(item)}
							aria-pressed={approach === item}
							className={`relative rounded-full px-3 py-2 text-[13px] transition-colors sm:px-4 ${approach === item ? "text-[#765dfb]" : "text-[#00050e]/55 hover:text-[#00050e]"}`}
						>
							{item === "full" ? "Full context" : "Selective retrieval"}
							{approach === item && (
								<span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#765dfb] sm:left-4 sm:right-4" />
							)}
						</button>
					))}
				</div>
				<p className="text-[11px] text-[#00050e]/60">
					{isSelective ? "5-10K tokens" : "Full history"}
				</p>
			</div>
			<div className="grid sm:grid-cols-2">
				<div className="space-y-3 p-5 sm:p-8">
					<div
						className="space-y-2.5"
						aria-label={
							isSelective
								? "Relevant memory fragments"
								: "Full context memory fragments"
						}
					>
						{Array.from({ length: 10 }, (_, index) => {
							const widths = [
								"w-full",
								"w-[78%]",
								"w-[92%]",
								"w-[72%]",
								"w-full",
								"w-[64%]",
								"w-[86%]",
								"w-[72%]",
								"w-[58%]",
								"w-[92%]",
							]
							const selected = [2, 5, 9].includes(index)
							return (
								<div
									key={index}
									className={`h-1.5 rounded-full ${widths[index]} ${selected && isSelective ? "bg-[#765dfb]" : "bg-[#e5e7eb]"}`}
								/>
							)
						})}
					</div>
					<p className="text-xs text-[#00050e]/50">
						{isSelective ? "Relevant evidence" : "Signal + noise"}
					</p>
				</div>
				<div className="flex min-h-55 flex-col justify-center gap-4 bg-[#00050e] p-6 text-white sm:p-8">
					<p className="text-xs text-[#9ca3af]">Context sent to model</p>
					<h3 className="text-[26px] font-bold sm:text-[30px]">
						{isSelective ? "Precise signal" : "Full history"}
					</h3>
					<div className="space-y-2 pt-2">
						{["w-full", "w-[82%]", "w-[68%]", "w-[76%]"].map((width, index) => (
							<div
								key={index}
								className={`h-0.5 rounded-full ${width} ${index === 1 && isSelective ? "bg-[#765dfb]" : "bg-[#374151]"}`}
							/>
						))}
					</div>
				</div>
			</div>
			<p className="border-t border-[#00050e]/10 px-5 py-4 text-[13px] leading-[1.6] text-[#00050e]/70 sm:px-8">
				{researchArticle.comparison.caption}
			</p>
		</div>
	)
}

const RelatedIllustration = ({ style }: { style: string }) => (
	<div
		className={`flex h-46.25 items-center justify-center gap-3 overflow-hidden rounded-xl p-8 ${style === "violet" ? "bg-[#4846ac]" : style === "lilac" ? "bg-[#eccde5]" : "bg-[#00050e]"}`}
	>
		{style === "lilac" ? (
			<div className="flex items-center gap-6 opacity-70">
				<div className="h-10 w-10 rounded-full border-2 border-[#765dfb]" />
				<div className="h-0.5 w-24 bg-[#4846ac]" />
				<div className="h-6 w-6 rounded-full border-2 border-[#4846ac]" />
			</div>
		) : (
			<div className="flex w-full items-center justify-center gap-2 opacity-50">
				{Array.from({ length: 4 }, (_, index) => (
					<div
						key={index}
						className={`h-0.5 rounded-full ${index % 2 ? "w-16 bg-[#4846ac]" : "w-14 bg-[#765dfb]"}`}
					/>
				))}
			</div>
		)}
	</div>
)

export const ResearchArticlePage = ({
	onNavigateBlog,
}: ResearchArticlePageProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [hasCopied, setHasCopied] = useState(false)
	const articleText = `${researchArticle.title}. ${researchArticle.subtitle} ${researchArticle.intro.paragraphs.join(" ")}`

	useEffect(() => () => window.speechSynthesis?.cancel(), [])

	const toggleListen = () => {
		if (!("speechSynthesis" in window)) return
		if (isSpeaking) {
			window.speechSynthesis.cancel()
			setIsSpeaking(false)
			return
		}
		const utterance = new SpeechSynthesisUtterance(articleText)
		utterance.onend = () => setIsSpeaking(false)
		utterance.onerror = () => setIsSpeaking(false)
		setIsSpeaking(true)
		window.speechSynthesis.speak(utterance)
	}

	const shareArticle = async () => {
		const shareData = {
			title: researchArticle.title,
			text: researchArticle.subtitle,
			url: window.location.href,
		}
		if (navigator.share) {
			await navigator.share(shareData)
			return
		}
		await navigator.clipboard?.writeText(window.location.href)
	}

	const copyCode = async () => {
		await navigator.clipboard?.writeText(researchArticle.research.code)
		setHasCopied(true)
		window.setTimeout(() => setHasCopied(false), 1800)
	}

	return (
		<div className="w-full bg-white font-sans text-[#00050e] antialiased">
			<header className="px-5 pb-12 pt-14 text-center sm:px-8 sm:pb-16 sm:pt-20 lg:pt-24">
				<p className="text-xs text-[#00050e]/60">
					{researchArticle.date} · {researchArticle.category} ·{" "}
					{researchArticle.category}
				</p>
				<h1 className="mx-auto mt-6 max-w-225 text-[38px] font-bold leading-[1.12] sm:text-[50px] lg:text-[60px]">
					{researchArticle.title}
				</h1>
				<p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.6] text-[#00050e]/60 sm:text-[18px]">
					{researchArticle.subtitle}
				</p>
			</header>

			<section className="px-5 sm:px-8">
				<ScaleIllustration
					isSpeaking={isSpeaking}
					onToggleListen={toggleListen}
				/>
			</section>

			<div className="page-gutter pb-20 pt-20 lg:pt-32">
				<div className="mx-auto grid max-w-275 gap-10 lg:grid-cols-[220px_minmax(0,800px)] lg:gap-16">
					<aside className="self-start lg:sticky lg:top-8">
						<nav
							aria-label="Article contents"
							className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1 lg:gap-4"
						>
							{tableOfContents.map((item, index) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									className={`border-l-2 py-1 pl-3 text-[12px] leading-[1.45] transition-colors sm:text-[14px] ${index === 0 ? "border-[#765dfb] text-[#765dfb]" : "border-transparent text-[#00050e]/55 hover:text-[#765dfb]"}`}
								>
									{item.label}
								</a>
							))}
						</nav>
					</aside>

					<article className="min-w-0">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[#00050e]/10 pb-6">
							<button
								type="button"
								onClick={toggleListen}
								aria-pressed={isSpeaking}
								className="inline-flex items-center gap-2 text-sm text-[#00050e]/70 hover:text-[#765dfb]"
							>
								{isSpeaking ? (
									<Pause className="h-3.5 w-3.5" />
								) : (
									<Play className="h-3.5 w-3.5" />
								)}{" "}
								{isSpeaking ? "Pause" : "Listen"}
							</button>
							<button
								type="button"
								onClick={shareArticle}
								className="inline-flex items-center gap-2 text-sm text-[#00050e]/70 hover:text-[#765dfb]"
							>
								<Share2 className="h-3.5 w-3.5" /> Share
							</button>
						</div>

						<div className="space-y-5 py-7 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
							<p className="text-[18px] font-medium leading-[1.6] text-[#00050e] sm:text-[20px]">
								{researchArticle.intro.lead}
							</p>
							{researchArticle.intro.paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>

						<section
							id="architecture"
							className="scroll-mt-8 border-t border-[#00050e]/10 py-16 sm:py-24"
						>
							<h2 className="text-[32px] font-bold leading-[1.1] sm:text-[48px]">
								{researchArticle.architecture.heading}
							</h2>
							<div className="mt-8 max-w-170 space-y-5 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
								{researchArticle.architecture.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<div className="mt-10">
								<ComparisonPanel />
							</div>
							<blockquote className="mt-10 grid gap-6 rounded-2xl bg-[#eccde5] p-7 sm:grid-cols-[140px_1fr] sm:gap-10 sm:p-12">
								<p className="text-xs font-medium uppercase tracking-[0.06em] text-[#00050e]/60">
									Negentro Research
								</p>
								<p className="text-[24px] font-bold leading-[1.35] sm:text-[30px]">
									{researchArticle.comparison.callout}
								</p>
							</blockquote>
						</section>

						<section
							id="performance"
							className="scroll-mt-8 border-t border-[#00050e]/10 py-16 sm:py-24"
						>
							<h2 className="text-[32px] font-bold leading-[1.1] sm:text-[48px]">
								{researchArticle.performance.heading}
							</h2>
							<div className="mt-8 max-w-170 space-y-5 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
								{researchArticle.performance.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<figure className="mt-10 overflow-hidden rounded-2xl border border-[#00050e]/10">
								<img
									src={researchArticle.performance.chartImage}
									alt={researchArticle.performance.chartAlt}
									width={800}
									height={649}
									loading="lazy"
									decoding="async"
									className="block h-auto w-full"
								/>
							</figure>
							<p className="mt-5 max-w-170 text-[15px] leading-[1.65] text-[#00050e]/80">
								{researchArticle.performance.tokenEfficiency}
							</p>
							<div className="mt-8 grid gap-0 border-y border-[#00050e]/10 sm:grid-cols-3">
								{researchArticle.performance.metrics.map((metric, index) => (
									<div
										key={metric.label}
										className={`py-6 ${index > 0 ? "border-t border-[#00050e]/10 sm:border-l sm:border-t-0 sm:pl-7" : "sm:pr-7"}`}
									>
										<p className="text-[42px] font-bold leading-none sm:text-[48px]">
											{metric.value}
										</p>
										<p className="mt-3 text-xs text-[#00050e]/55">
											{metric.label}
										</p>
									</div>
								))}
							</div>
							<div className="mt-10 rounded-2xl border border-[#00050e]/10 p-6 sm:p-8">
								<h3 className="text-xl font-bold">
									Memory capability across categories
								</h3>
								<div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
									{researchArticle.performance.categories.map((item) => (
										<div key={item.name}>
											<div className="mb-2 flex items-center justify-between gap-4 text-sm">
												<span>{item.name}</span>
												<span className="text-[#00050e]/60">
													{item.value.toFixed(1)}%
												</span>
											</div>
											<div className="h-2 overflow-hidden rounded-full bg-[#f3f4f6]">
												<div
													className="h-full rounded-full bg-[#765dfb]"
													style={{ width: `${item.value}%` }}
												/>
											</div>
										</div>
									))}
								</div>
								<p className="mt-7 text-sm leading-[1.6] text-[#00050e]/70">
									{researchArticle.performance.categorySummary}
								</p>
							</div>
						</section>

						<section
							id="results"
							className="scroll-mt-8 border-t border-[#00050e]/10 py-16 sm:py-24"
						>
							<h2 className="text-[32px] font-bold leading-[1.1] sm:text-[48px]">
								{researchArticle.results.heading}
							</h2>
							<div className="mt-8 max-w-170 space-y-5 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
								{researchArticle.results.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</section>

						<section
							id="limits"
							className="scroll-mt-8 border-t border-[#00050e]/10 py-16 sm:py-24"
						>
							<h2 className="text-[32px] font-bold leading-[1.1] sm:text-[48px]">
								{researchArticle.limitations.heading}
							</h2>
							<div className="mt-8 max-w-170 space-y-5 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
								{researchArticle.limitations.intro.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<div className="mt-10 grid border-t border-[#00050e]/10 sm:grid-cols-2">
								{researchArticle.limitations.items.map((item, index) => (
									<div
										key={item.title}
										className={`border-b border-[#00050e]/10 py-7 ${index % 2 === 0 ? "sm:pr-8 sm:border-r" : "sm:pl-8"} ${index < 2 ? "" : "sm:pt-8"}`}
									>
										<p className="text-xs text-[#00050e]/40">0{index + 1}</p>
										<h3 className="mt-3 text-lg font-bold">{item.title}</h3>
										<p className="mt-3 text-sm leading-[1.6] text-[#00050e]/70">
											{item.description}
										</p>
									</div>
								))}
							</div>
						</section>

						<section
							id="availability"
							className="scroll-mt-8 border-t border-[#00050e]/10 py-16 sm:py-24"
						>
							<h2 className="text-[32px] font-bold leading-[1.1] sm:text-[48px]">
								{researchArticle.research.heading}
							</h2>
							<div className="mt-8 max-w-170 space-y-5 text-[15px] leading-[1.65] text-[#00050e]/80 sm:text-base">
								{researchArticle.research.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<div className="mt-10 overflow-hidden rounded-xl bg-[#00050e] text-white">
								<div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
									<p className="text-xs text-[#d1d5db]">
										{researchArticle.research.codeTitle}
									</p>
									<button
										type="button"
										onClick={copyCode}
										className="inline-flex items-center gap-2 text-xs text-[#9ca3af] transition-colors hover:text-white"
									>
										{hasCopied ? (
											<Check className="h-3.5 w-3.5" />
										) : (
											<Copy className="h-3.5 w-3.5" />
										)}
										{hasCopied ? "Copied" : "Copy"}
									</button>
								</div>
								<pre className="overflow-x-auto p-5 text-[13px] leading-[1.8] text-[#c4b5fd] sm:p-6">
									<code>{researchArticle.research.code}</code>
								</pre>
							</div>
							<p className="mt-4 max-w-170 text-sm leading-[1.6] text-[#00050e]/55">
								{researchArticle.research.codeCaption}
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
								<a
									href="#results"
									className="inline-flex items-center gap-2 text-sm text-[#765dfb] hover:underline"
								>
									Explore the full research results{" "}
									<ArrowUpRight className="h-3.5 w-3.5" />
								</a>
								<a
									href="#limits"
									className="inline-flex items-center gap-2 text-sm text-[#765dfb] hover:underline"
								>
									Read the methodology <ArrowUpRight className="h-3.5 w-3.5" />
								</a>
							</div>
							<div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-[#00050e]/10 py-7">
								<div className="flex items-center gap-3">
									<span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs">
										Research
									</span>
									<span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs">
										2026
									</span>
								</div>
								<p className="text-sm">
									<span className="mr-3 text-[#00050e]/45">Author</span>Negentro
									Research
								</p>
							</div>
						</section>
					</article>
				</div>
			</div>

			<section className="page-gutter pb-20 sm:pb-28">
				<div className="mx-auto max-w-275">
					<div className="flex items-center justify-between gap-4">
						<h2 className="text-[28px] font-bold sm:text-[36px]">
							Keep reading
						</h2>
						<button
							type="button"
							onClick={onNavigateBlog}
							className="text-sm text-[#765dfb] hover:underline"
						>
							View all
						</button>
					</div>
					<div className="mt-8 grid gap-7 md:grid-cols-3">
						{researchArticle.related.map((item) => (
							<button
								key={item.title}
								type="button"
								onClick={onNavigateBlog}
								className="group text-left"
							>
								<RelatedIllustration style={item.style} />
								<h3 className="mt-4 text-[17px] font-bold leading-[1.4] group-hover:text-[#765dfb]">
									{item.title}
								</h3>
								<p className="mt-2 text-xs text-[#00050e]/50">
									{item.category}
								</p>
							</button>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
