import { useState, Fragment } from "react"
import type React from "react"
import { Check, X, ArrowRight, ArrowDown, Database, Search, Server, Headphones, Shield, LineChart, Users } from "lucide-react"
import { Footer } from "./Footer"
import { useLanguage } from "@/lib/i18n"

/* ─────────────────────── types ─────────────────────── */
type BillingCycle = "monthly" | "annual"

/* ─────────────────────── data builders (use t) ─────────────────────── */
function buildPlans(t: ReturnType<typeof useLanguage>["t"]) {
	return [
		{
			name: t.pricing.planExploreName,
			badge: null,
			monthlyPrice: "Free",
			annualPrice: "Free",
			unit: "",
			description: t.pricing.planExploreDesc,
			billingText: t.pricing.planExploreBillingText,
			cta: t.pricing.planExploreCta,
			ctaStyle: "outline" as const,
			capacityLevel: 1,
			contextCapacity: "10K memories",
			retrievals: "5K",
			projects: "1",
			features: [t.pricing.planExploreF1, t.pricing.planExploreF2, t.pricing.planExploreF3, t.pricing.planExploreF4, t.pricing.planExploreF5],
		},
		{
			name: t.pricing.planBuildName,
			badge: t.pricing.planBuildBadge,
			monthlyPrice: "19",
			annualPrice: "15",
			unit: "/month",
			description: t.pricing.planBuildDesc,
			billingText: t.pricing.planBuildBillingText,
			cta: t.pricing.planBuildCta,
			ctaStyle: "filled" as const,
			capacityLevel: 2,
			contextCapacity: "100K memories",
			retrievals: "250K",
			projects: "5",
			features: [t.pricing.planBuildF1, t.pricing.planBuildF2, t.pricing.planBuildF3, t.pricing.planBuildF4, t.pricing.planBuildF5, t.pricing.planBuildF6, t.pricing.planBuildF7],
		},
		{
			name: t.pricing.planScaleName,
			badge: null,
			monthlyPrice: "99",
			annualPrice: "79",
			unit: "/month",
			description: t.pricing.planScaleDesc,
			billingText: t.pricing.planScaleBillingText,
			cta: t.pricing.planScaleCta,
			ctaStyle: "dark" as const,
			capacityLevel: 3,
			contextCapacity: "1M+ memories",
			retrievals: "5M",
			projects: "25",
			features: [t.pricing.planScaleF1, t.pricing.planScaleF2, t.pricing.planScaleF3, t.pricing.planScaleF4, t.pricing.planScaleF5, t.pricing.planScaleF6, t.pricing.planScaleF7, t.pricing.planScaleF8],
		},
		{
			name: t.pricing.planEnterpriseName,
			badge: null,
			monthlyPrice: "Custom",
			annualPrice: "Custom",
			unit: "",
			description: t.pricing.planEnterpriseDesc,
			billingText: t.pricing.planEnterpriseBillingText,
			cta: t.pricing.planEnterpriseCta,
			ctaStyle: "outline" as const,
			capacityLevel: 4,
			contextCapacity: t.pricing.planEnterpriseContextCapacity,
			retrievals: "Custom",
			projects: t.pricing.planEnterpriseProjects,
			features: [t.pricing.planEnterpriseF1, t.pricing.planEnterpriseF2, t.pricing.planEnterpriseF3, t.pricing.planEnterpriseF4, t.pricing.planEnterpriseF5, t.pricing.planEnterpriseF6, t.pricing.planEnterpriseF7, t.pricing.planEnterpriseF8, t.pricing.planEnterpriseF9],
		},
	]
}



function buildCoverageFeatures(t: ReturnType<typeof useLanguage>["t"]) {
	return [
		{ icon: Database, title: t.pricing.coverage1Title, description: t.pricing.coverage1Desc, example: t.pricing.coverage1Example },
		{ icon: Search,   title: t.pricing.coverage2Title, description: t.pricing.coverage2Desc, example: t.pricing.coverage2Example },
		{ icon: Server,   title: t.pricing.coverage3Title, description: t.pricing.coverage3Desc, example: t.pricing.coverage3Example },
		{ icon: Headphones, title: t.pricing.coverage4Title, description: t.pricing.coverage4Desc, example: t.pricing.coverage4Example },
	]
}




function buildComparisonData(t: ReturnType<typeof useLanguage>["t"]) {
	return [
		{
			category: t.pricing.catMemory,
			rows: [
				{ name: t.pricing.rowMemoryStorage,    starter: "10K",     pro: "100K",     scale: "1M+",      enterprise: "Custom" },
				{ name: t.pricing.rowMemoryRetrieval,  starter: "5K/mo",   pro: "250K/mo",  scale: "5M/mo",    enterprise: "Custom" },
				{ name: t.pricing.rowMemoryRetention,  starter: "30 days", pro: "180 days", scale: "365 days", enterprise: "Custom" },
				{ name: t.pricing.rowMemoryExport,     starter: false,     pro: true,       scale: true,       enterprise: true },
				{ name: t.pricing.rowMetadataFiltering,starter: false,     pro: true,       scale: true,       enterprise: true },
				{ name: t.pricing.rowMemoryHistory,    starter: "—",       pro: "Basic",    scale: "Advanced", enterprise: "Full" },
			],
		},
		{
			category: t.pricing.catRetrieval,
			rows: [
				{ name: t.pricing.rowSemanticSearch,        starter: true,  pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowHybridRetrieval,       starter: false, pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowReranking,             starter: false, pro: false, scale: true,  enterprise: true },
				{ name: t.pricing.rowSearchFilters,         starter: true,  pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowCustomRetrievalConfig, starter: false, pro: false, scale: true,  enterprise: true },
			],
		},
		{
			category: t.pricing.catPlatform,
			rows: [
				{ name: t.pricing.rowApiAccess,      starter: true,     pro: true,      scale: true,      enterprise: true },
				{ name: t.pricing.rowProjects,       starter: "1",      pro: "5",       scale: "25",      enterprise: "Unlimited" },
				{ name: t.pricing.rowEnvironments,   starter: "1",      pro: "2",       scale: "5",       enterprise: "Custom" },
				{ name: t.pricing.rowUsageAnalytics, starter: "Basic",  pro: "Standard",scale: "Advanced",enterprise: "Advanced" },
				{ name: t.pricing.rowWebhooks,       starter: false,    pro: true,      scale: true,      enterprise: true },
			],
		},
		{
			category: t.pricing.catInfrastructure,
			rows: [
				{ name: t.pricing.rowManagedInfra,       starter: true,  pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowSelfHosted,          starter: false, pro: false, scale: true,  enterprise: true },
				{ name: t.pricing.rowCustomStorage,       starter: false, pro: false, scale: false, enterprise: true },
				{ name: t.pricing.rowDedicatedResources,  starter: false, pro: false, scale: false, enterprise: true },
				{ name: t.pricing.rowDeploymentControls,  starter: false, pro: false, scale: true,  enterprise: true },
			],
		},
		{
			category: t.pricing.catSecurity,
			rows: [
				{ name: t.pricing.rowApiKeys,          starter: true,  pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowRbac,             starter: false, pro: false, scale: true,  enterprise: true },
				{ name: t.pricing.rowSsoSaml,          starter: false, pro: false, scale: false, enterprise: true },
				{ name: t.pricing.rowAuditLogs,        starter: false, pro: false, scale: false, enterprise: true },
				{ name: t.pricing.rowSecurityControls, starter: false, pro: false, scale: "Standard", enterprise: "Advanced" },
			],
		},
		{
			category: t.pricing.catSupport,
			rows: [
				{ name: t.pricing.rowCommunitySupport, starter: true,  pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowEmailSupport,     starter: false, pro: true,  scale: true,  enterprise: true },
				{ name: t.pricing.rowPrioritySupport,  starter: false, pro: false, scale: true,  enterprise: true },
				{ name: t.pricing.rowDedicatedSupport, starter: false, pro: false, scale: false, enterprise: true },
				{ name: t.pricing.rowSla,              starter: false, pro: false, scale: false, enterprise: true },
			],
		},
	]
}





function buildFaqs(t: ReturnType<typeof useLanguage>["t"]) {
	return [
		{ q: t.pricing.faq1Q,  a: t.pricing.faq1A  },
		{ q: t.pricing.faq2Q,  a: t.pricing.faq2A  },
		{ q: t.pricing.faq3Q,  a: t.pricing.faq3A  },
		{ q: t.pricing.faq4Q,  a: t.pricing.faq4A  },
		{ q: t.pricing.faq5Q,  a: t.pricing.faq5A  },
		{ q: t.pricing.faq6Q,  a: t.pricing.faq6A  },
		{ q: t.pricing.faq7Q,  a: t.pricing.faq7A  },
		{ q: t.pricing.faq8Q,  a: t.pricing.faq8A  },
		{ q: t.pricing.faq9Q,  a: t.pricing.faq9A  },
		{ q: t.pricing.faq10Q, a: t.pricing.faq10A },
		{ q: t.pricing.faq11Q, a: t.pricing.faq11A },
	]
}

const CriticalSystemsSection: React.FC<{ onOpenConsole?: () => void }> = ({ onOpenConsole }) => {
	const { t } = useLanguage()
	const cards = [
		{
			icon: Shield,
			title: t.pricing.criticalCard1Title,
			description: t.pricing.criticalCard1Desc,
		},
		{
			icon: LineChart,
			title: t.pricing.criticalCard2Title,
			description: t.pricing.criticalCard2Desc,
		},
		{
			icon: Users,
			title: t.pricing.criticalCard3Title,
			description: t.pricing.criticalCard3Desc,
		},
	]

	return (
		<section className="py-16 sm:py-20 lg:py-24 border-t border-neutral-100 bg-white">
			<div className="container-universal max-w-270 mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-neutral-950 mb-3">
						{t.pricing.criticalHeadline}
					</h2>
					<p className="text-[14px] sm:text-[15px] text-neutral-500 max-w-2xl mx-auto font-normal">
						{t.pricing.criticalSubline}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{cards.map((card) => {
						const Icon = card.icon
						return (
							<div
								key={card.title}
								className="rounded-xl border border-neutral-200 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-300 transition-all bg-white flex flex-col items-start text-left"
							>
								<Icon className="w-5 h-5 text-[#765DFB] mb-5" />
								<h3 className="text-[16px] font-semibold text-neutral-950 mb-2">
									{card.title}
								</h3>
								<p className="text-[13px] text-neutral-500 leading-[1.6]">
									{card.description}
								</p>
							</div>
						)
					})}
				</div>

				<div className="flex justify-center">
					<button
						type="button"
						onClick={onOpenConsole}
						className="bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-[13px] px-8 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
					>
						{t.pricing.criticalCta}
					</button>
				</div>
			</div>
		</section>
	)
}

const SelfHostSection: React.FC = () => {
	const { t } = useLanguage()
	const features = [
		"Full deployment control",
		"Custom infrastructure",
		"Bring your own providers",
		"Data control",
		"Custom scaling",
	]

	return (
		<section className="py-16 sm:py-20 lg:py-24 border-t border-neutral-100">
			<div className="container-universal max-w-270 mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-neutral-950 mb-3">
						{t.pricing.selfHostHeadline}
					</h2>
					<p className="text-[14px] sm:text-[15px] text-neutral-500 max-w-2xl mx-auto font-normal">
						{t.pricing.selfHostSubline}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-4xl mx-auto">
					{/* Left Column: Stack */}
					<div className="flex flex-col items-center justify-center space-y-3">
						<div className="w-full max-w-70 rounded-[10px] border border-neutral-200 py-4 text-center bg-white shadow-sm">
							<span className="text-[14px] font-semibold text-neutral-950">{t.pricing.selfHostYourApp}</span>
						</div>
						
						<ArrowDown className="w-5 h-5 text-neutral-300" strokeWidth={2} />

						<div className="w-full max-w-70 rounded-[10px] border border-[#efeafc] py-4 text-center bg-[#f5f3ff] shadow-sm">
							<span className="text-[14px] font-semibold text-[#765DFB]">Negentro</span>
						</div>

						<ArrowDown className="w-5 h-5 text-neutral-300" strokeWidth={2} />

						<div className="w-full max-w-70 rounded-[10px] border border-neutral-200 py-4 text-center bg-white shadow-sm">
							<span className="text-[14px] font-semibold text-neutral-950">{t.pricing.selfHostYourInfra}</span>
						</div>
					</div>

					{/* Right Column: Features */}
					<div className="flex flex-col justify-center max-w-xs mx-auto md:mx-0">
						<ul className="space-y-4 mb-8">
							{features.map((feat) => (
								<li key={feat} className="flex items-center gap-3">
									<Check className="w-4 h-4 text-[#765DFB]" strokeWidth={2.5} />
									<span className="text-[14px] text-neutral-600">{feat}</span>
								</li>
							))}
						</ul>
						<div>
							<a
								href="https://github.com/negentro"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#765DFB] hover:text-[#6348e8] transition-colors group"
							>
								{t.pricing.selfHostExplore}
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const PricingCalculator: React.FC = () => {
	const { t } = useLanguage()
	const [mau, setMau] = useState(2500)
	const [memoriesPerUser, setMemoriesPerUser] = useState(40)
	const [retrievals, setRetrievals] = useState(180000)
	const [projects, setProjects] = useState(3)

	const formatNumber = (num: number) => {
		if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
		return num.toString()
	}

	const handleProjectChange = (delta: number) => {
		setProjects((prev) => Math.max(1, Math.min(50, prev + delta)))
	}

	// Simplistic formula for memory operations for UI demonstration
	const memoryOps = mau * memoriesPerUser + retrievals

	let suggestedPlan = "Explore"
	let estPrice = "Free"

	if (memoryOps <= 10000) {
		suggestedPlan = "Explore"
		estPrice = "Free"
	} else if (memoryOps <= 500000) {
		suggestedPlan = "Build"
		estPrice = "$19/mo"
	} else if (memoryOps <= 5000000) {
		suggestedPlan = "Scale"
		estPrice = "$99/mo"
	} else {
		suggestedPlan = "Enterprise"
		estPrice = "Custom"
	}

	return (
		<section className="py-16 sm:py-20 lg:py-24 border-t border-neutral-100">
			<div className="container-universal max-w-270 mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-neutral-950 mb-3">
						{t.pricing.calculatorHeadline}
					</h2>
					<p className="text-[14px] sm:text-[15px] text-neutral-500 max-w-2xl mx-auto font-normal">
						{t.pricing.calculatorSubline}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
					{/* Sliders */}
					<div className="space-y-10">
						{/* MAU */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
									{t.pricing.mauLabel}
								</span>
								<span className="text-[13px] font-semibold text-[#765DFB]">
									{mau.toLocaleString()}
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="10000"
								step="100"
								value={mau}
								onChange={(e) => setMau(Number(e.target.value))}
								className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#765DFB]"
								style={{
									background: `linear-gradient(to right, #765DFB ${(mau / 10000) * 100}%, #e5e5e5 ${(mau / 10000) * 100}%)`,
								}}
							/>
						</div>

						{/* Memories per user */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
									{t.pricing.memoriesPerUserLabel}
								</span>
								<span className="text-[13px] font-semibold text-[#765DFB]">
									{memoriesPerUser}
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								step="1"
								value={memoriesPerUser}
								onChange={(e) => setMemoriesPerUser(Number(e.target.value))}
								className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#765DFB]"
								style={{
									background: `linear-gradient(to right, #765DFB ${(memoriesPerUser / 100) * 100}%, #e5e5e5 ${(memoriesPerUser / 100) * 100}%)`,
								}}
							/>
						</div>

						{/* Monthly Retrieval */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
									{t.pricing.retrievalRequestsLabel}
								</span>
								<span className="text-[13px] font-semibold text-[#765DFB]">
									{formatNumber(retrievals)}
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="500000"
								step="10000"
								value={retrievals}
								onChange={(e) => setRetrievals(Number(e.target.value))}
								className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#765DFB]"
								style={{
									background: `linear-gradient(to right, #765DFB ${(retrievals / 500000) * 100}%, #e5e5e5 ${(retrievals / 500000) * 100}%)`,
								}}
							/>
						</div>

						{/* Projects */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
									{t.pricing.projectsCountLabel}
								</span>
							</div>
							<div className="inline-flex items-center border border-neutral-200 rounded-lg bg-white h-9 w-25 overflow-hidden">
								<button
									type="button"
									onClick={() => handleProjectChange(-1)}
									className="flex-1 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors h-full cursor-pointer text-lg font-light pb-0.5"
								>
									-
								</button>
								<span className="text-[13px] font-medium text-neutral-950 w-8 text-center h-full flex items-center justify-center">
									{projects}
								</span>
								<button
									type="button"
									onClick={() => handleProjectChange(1)}
									className="flex-1 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors h-full cursor-pointer text-lg font-light pb-0.5"
								>
									+
								</button>
							</div>
						</div>
					</div>

					{/* Right Card */}
					<div className="rounded-2xl border border-neutral-200 p-8 shadow-sm bg-white">
						<div className="mb-10">
							<p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">
								{t.pricing.estimatedUsageLabel}
							</p>
							<div className="flex items-baseline gap-2">
								<span className="text-[28px] sm:text-[34px] font-bold text-neutral-950 tracking-tight leading-none">
									~{formatNumber(memoryOps)}
								</span>
								<span className="text-[14px] text-neutral-500">
									{t.pricing.memoryOpsUnit}
								</span>
							</div>
						</div>

						<div className="border-t border-neutral-100 pt-6 mb-8 flex justify-between items-end">
							<div>
								<p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">
									{t.pricing.suggestedPlanLabel}
								</p>
								<p className="text-[18px] font-bold text-[#765DFB]">
									{suggestedPlan}
								</p>
							</div>
							<div className="text-right">
								<p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">
									{t.pricing.estimatedPriceLabel}
								</p>
								<p className="text-[18px] font-bold text-neutral-950">
									{estPrice}
								</p>
							</div>
						</div>

						<button className="w-full bg-[#765DFB] hover:bg-[#6348e8] text-white font-semibold text-[13px] py-3 rounded-lg transition-colors mb-5 shadow-sm cursor-pointer">
							{t.pricing.calculatorCta}
						</button>

						<p className="text-[11px] text-neutral-400 leading-[1.6]">
							{t.pricing.calculatorDisclaimer}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

/* ─────────────────────── component ─────────────────────── */
export const PricingPage: React.FC<{ onOpenConsole?: () => void }> = ({
	onOpenConsole,
}) => {
	const { t } = useLanguage()
	
	const plans = buildPlans(t)
	const coverageFeatures = buildCoverageFeatures(t)
	const comparisonData = buildComparisonData(t)
	const faqs = buildFaqs(t)

	const [billing, setBilling] = useState<BillingCycle>("monthly")
	const [openFaq, setOpenFaq] = useState<number | null>(null)

	return (
		<div className="w-full bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
			{/* ────────── Section 1: Hero + Pricing Cards ────────── */}
			<section className="pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
				<div className="container-universal text-center">
					<p className="text-[11px] sm:text-xs font-semibold tracking-[0.08em] text-[#765DFB] uppercase mb-4 sm:mb-5 select-none">
						{t.pricing.tag}
					</p>
					<h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold tracking-[-0.035em] leading-[1.08] text-neutral-950 mb-5">
						{t.pricing.heroHeadline}
					</h1>
					<p className="text-[15px] sm:text-base lg:text-lg text-neutral-500 max-w-175 mx-auto leading-relaxed mb-10 sm:mb-12 font-normal">
						{t.pricing.heroSubline}
					</p>

					{/* Billing toggle */}
					<div className="flex flex-col items-center mb-12 sm:mb-14">
						<p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase mb-3 select-none">
							{t.pricing.billingLabel}
						</p>
						<div className="inline-flex items-center rounded-[10px] bg-white ring-1 ring-neutral-200 p-1 shadow-sm">
							<button
								type="button"
								onClick={() => setBilling("monthly")}
								className={`px-5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${billing === "monthly"
									? "bg-neutral-950 text-white shadow-sm"
									: "bg-transparent text-neutral-500 hover:text-neutral-700"
									}`}
							>
								{t.pricing.billingMonthly}
							</button>
							<button
								type="button"
								onClick={() => setBilling("annual")}
								className={`pl-5 pr-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${billing === "annual"
									? "bg-neutral-950 text-white shadow-sm"
									: "bg-transparent text-neutral-500 hover:text-neutral-700"
									}`}
							>
								{t.pricing.billingYearly}
								<span className="text-[10px] font-bold text-[#be185d] bg-[#fce7f3] px-2 py-1 rounded-md leading-none whitespace-nowrap">
									{t.pricing.billingSave}
								</span>
							</button>
						</div>
					</div>

					{/* Pricing cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full mt-4">
						{plans.map((plan) => {
							const isHighlighted = !!plan.badge
							return (
								<div
									key={plan.name}
									className={`relative bg-white rounded-2xl p-6 sm:p-7 text-left flex flex-col transition-all duration-300 ring-1 ${isHighlighted
										? "ring-2 ring-[#765DFB] shadow-xl shadow-[#765DFB]/10 z-10"
										: "ring-neutral-200 hover:ring-[#765DFB] shadow-sm hover:shadow-md"
										}`}
								>
									{/* Badge */}
									{plan.badge && (
										<span className="absolute -top-2.75 left-8 bg-[#765DFB] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap tracking-wide uppercase z-20">
											{plan.badge}
										</span>
									)}

									{/* Plan name */}
									<h3 className="text-[20px] font-bold text-neutral-950 mb-1">
										{plan.name}
									</h3>
									<p className="text-[12px] text-neutral-500 mb-5 min-h-9">
										{plan.description}
									</p>

									{/* Price */}
									<div className="flex items-baseline gap-1 mb-1">
										{plan.monthlyPrice !== "Custom" && plan.monthlyPrice !== "Free" ? (
											<>
												<span className="text-[32px] sm:text-[38px] font-bold text-neutral-950 tracking-tight leading-none">
													${billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}
												</span>
												<span className="text-[13px] text-neutral-500 font-medium ml-1">
													{plan.unit}
												</span>
											</>
										) : (
											<span className="text-[32px] sm:text-[38px] font-bold text-neutral-950 tracking-tight leading-none">
												{plan.monthlyPrice}
											</span>
										)}
									</div>
									<p className="text-[11.5px] text-neutral-400 mb-6 h-4.5">
										{plan.billingText}
									</p>

									{/* CTA */}
									<button
										type="button"
										onClick={plan.ctaStyle === "filled" ? onOpenConsole : undefined}
										className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 cursor-pointer mb-8 ${plan.ctaStyle === "filled"
											? "bg-[#765DFB] text-white hover:bg-[#6348e8] shadow-sm"
											: plan.ctaStyle === "dark"
												? "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm"
												: "bg-white text-neutral-950 ring-1 ring-neutral-200 hover:bg-neutral-50 shadow-sm"
											}`}
									>
										{plan.cta}
									</button>

									{/* Context Capacity */}
									<div className="mb-6">
										<p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
											{t.pricing.contextCapacityLabel}
										</p>
										{/* Capacity Bars */}
										<div className="flex gap-1 mb-3">
											{[1, 2, 3, 4].map((level) => (
												<div
													key={level}
													className={`h-1 flex-1 rounded-full ${level <= (plan.capacityLevel as number) ? "bg-[#765DFB]" : "bg-neutral-200"}`}
												/>
											))}
										</div>
										<p className="text-[13px] font-semibold text-neutral-950 mb-3 border-b border-neutral-100 pb-3">
											{plan.contextCapacity}
										</p>
										<div className="flex justify-between items-center text-[12px] text-neutral-500 mb-2">
											<span>{t.pricing.retrievalsLabel}</span>
											<span className="text-neutral-950">{plan.retrievals}</span>
										</div>
										<div className="flex justify-between items-center text-[12px] text-neutral-500 mb-1 border-b border-neutral-100 pb-3">
											<span>{t.pricing.projectsLabel}</span>
											<span className="text-neutral-950">{plan.projects}</span>
										</div>
									</div>

									{/* Features */}
									<p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
										{t.pricing.includedLabel}
									</p>
									<ul className="space-y-3.5 flex-1">
										{plan.features.map((feature, idx) => (
											<li
												key={idx}
												className="flex items-start gap-2.5 text-[12.5px] text-neutral-600"
											>
												<Check
													className="w-3.5 h-3.5 mt-0.75 shrink-0 text-[#765DFB]"
													strokeWidth={2.5}
												/>
												<span className="leading-snug">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* ────────── Section 1.5: What your plan actually covers ────────── */}
			<section className="py-16 sm:py-20 lg:py-24 border-t border-neutral-100">
				<div className="container-universal">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-neutral-950 mb-4">
							{t.pricing.coverageHeadline}
						</h2>
						<p className="text-[15px] sm:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-normal">
							{t.pricing.coverageSubline}
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-270 mx-auto">
						{coverageFeatures.map((feat) => {
							const Icon = feat.icon
							return (
								<div
									key={feat.title}
									className="rounded-xl border border-neutral-150 p-6 text-left hover:border-neutral-300 transition-colors flex flex-col"
									style={{
										borderColor: "#e8e8ec",
									}}
								>
									<div className="w-9 h-9 rounded-lg bg-[#765DFB]/10 flex items-center justify-center mb-4">
										<Icon
											className="w-4 h-4 text-[#765DFB]"
											strokeWidth={2.5}
										/>
									</div>
									<h3 className="text-[15px] font-semibold text-neutral-950 mb-1.5">
										{feat.title}
									</h3>
									<p className="text-[13px] text-neutral-500 leading-relaxed mb-4 grow">
										{feat.description}
									</p>
									<p className="text-[11px] text-neutral-400 mt-auto">
										{feat.example}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>


			{/* ────────── Section 3: Feature comparison table ────────── */}
			<section className="py-16 sm:py-20 lg:py-24 border-t border-neutral-100">
				<div className="container-universal">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-neutral-950 mb-3">
							{t.pricing.compareHeadline}
						</h2>
						<p className="text-[14px] sm:text-[15px] text-neutral-500 max-w-lg mx-auto font-normal">
							{t.pricing.compareSubline}
						</p>
					</div>

					<div className="max-w-270 mx-auto overflow-x-auto rounded-xl border border-neutral-200">
						<table className="w-full text-sm border-collapse">
							<thead>
								<tr className="border-b border-neutral-200">
									<th className="text-left py-5 px-6 font-semibold text-neutral-400 text-[10px] uppercase tracking-wider w-[28%] bg-white">
										{t.pricing.capabilityLabel}
									</th>
									<th className="text-left py-5 px-6 font-semibold text-neutral-950 text-[14px] w-[18%] bg-white">
										{t.pricing.planExploreName}
									</th>
									<th className="text-left py-3 px-6 text-[14px] w-[18%] bg-[#f5f3ff] relative">
										<div className="text-[#765DFB] text-[8px] font-bold uppercase tracking-wider mb-1">{t.pricing.recommendedLabel}</div>
										<div className="font-semibold text-neutral-950">{t.pricing.planBuildName}</div>
									</th>
									<th className="text-left py-5 px-6 font-semibold text-neutral-950 text-[14px] w-[18%] bg-white">
										{t.pricing.planScaleName}
									</th>
									<th className="text-left py-5 px-6 font-semibold text-neutral-950 text-[14px] w-[18%] bg-white">
										{t.pricing.planEnterpriseName}
									</th>
								</tr>
							</thead>
							<tbody>
								{comparisonData.map((cat) => (
									<Fragment key={`cat-${cat.category}`}>
										<tr>
											<td
												colSpan={5}
												className="pt-8 pb-3 px-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-white"
											>
												{cat.category}
											</td>
										</tr>
										{cat.rows.map((row) => (
											<tr
												key={`row-${row.name}`}
												className="border-b border-neutral-100 last:border-0 transition-colors"
											>
												<td className="py-4 px-6 text-neutral-600 font-normal text-[13px] bg-white">
													{row.name}
												</td>
												<td className="py-4 px-6 text-left bg-white">
													{typeof row.starter === "boolean" ? (
														row.starter ? (
															<Check className="w-4.5 h-4.5 text-[#765DFB]" />
														) : (
															<X className="w-4 h-4 text-neutral-300" />
														)
													) : (
														<span className="text-neutral-600 text-[13px]">{row.starter}</span>
													)}
												</td>
												<td className="py-4 px-6 text-left bg-[#f5f3ff]">
													{typeof row.pro === "boolean" ? (
														row.pro ? (
															<Check className="w-4.5 h-4.5 text-[#765DFB]" />
														) : (
															<X className="w-4 h-4 text-neutral-300" />
														)
													) : (
														<span className="text-neutral-600 text-[13px]">{row.pro}</span>
													)}
												</td>
												<td className="py-4 px-6 text-left bg-white">
													{typeof row.scale === "boolean" ? (
														row.scale ? (
															<Check className="w-4.5 h-4.5 text-[#765DFB]" />
														) : (
															<X className="w-4 h-4 text-neutral-300" />
														)
													) : (
														<span className="text-neutral-600 text-[13px]">{row.scale}</span>
													)}
												</td>
												<td className="py-4 px-6 text-left bg-white">
													{typeof row.enterprise === "boolean" ? (
														row.enterprise ? (
															<Check className="w-4.5 h-4.5 text-[#765DFB]" />
														) : (
															<X className="w-4 h-4 text-neutral-300" />
														)
													) : (
														<span className="text-neutral-600 text-[13px]">{row.enterprise}</span>
													)}
												</td>
											</tr>
										))}
									</Fragment>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* ────────── Section 3.5: Pricing Calculator ────────── */}
			<PricingCalculator />

			{/* ────────── Section 3.6: Self Host ────────── */}
			<SelfHostSection />

			{/* ────────── Section 3.7: Critical Systems ────────── */}
			<CriticalSystemsSection onOpenConsole={onOpenConsole} />



			{/* ────────── Section 8: FAQ ────────── */}
			<section className="py-16 sm:py-20 lg:py-24">
				<div className="container-universal max-w-270 mx-auto">
					<div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
						{/* Left Column: Title */}
						<div className="lg:w-[40%] shrink-0">
							<h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight leading-tight text-neutral-950 sticky top-24">
								{t.pricing.faqHeadline}
							</h2>
						</div>

						{/* Right Column: Accordion */}
						<div className="lg:w-[60%] divide-y divide-neutral-100 border-t border-b border-neutral-100">
							{faqs.map((faq, idx) => {
								const isOpen = openFaq === idx
								return (
									<div key={faq.q}>
										<button
											type="button"
											onClick={() =>
												setOpenFaq(
													isOpen ? null : idx,
												)
											}
											className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
										>
											<span className={`text-[15px] font-medium pr-6 transition-colors ${isOpen ? "text-[#765DFB]" : "text-neutral-900 group-hover:text-neutral-600"}`}>
												{faq.q}
											</span>
											<span className={`text-[20px] font-light transition-colors ${isOpen ? "text-[#765DFB]" : "text-neutral-400"}`}>
												{isOpen ? "-" : "+"}
											</span>
										</button>
										<div
											className={`overflow-hidden transition-all duration-300 ease-out ${isOpen
												? "max-h-60 pb-6 opacity-100"
												: "max-h-0 opacity-0"
												}`}
										>
											<p className="text-[14px] text-neutral-500 leading-[1.6] pr-12">
												{faq.a}
											</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>

			{/* ────────── Section 9: Final CTA ────────── */}
			<section className="py-20 sm:py-24 lg:py-32 bg-white">
				<div className="container-universal text-center">
					<h2 className="text-[32px] sm:text-[38px] md:text-[44px] font-bold tracking-[-0.02em] leading-tight text-neutral-950 mb-5">
						{t.pricing.finalCtaHeadline}
					</h2>
					<p className="text-[15px] sm:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-normal mb-8">
						{t.pricing.finalCtaSubline}
					</p>
					<div className="flex items-center justify-center gap-4 flex-wrap">
						<a
							href="https://piyapi.cloud"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center bg-[#765DFB] text-white px-8 py-3.5 rounded-lg text-[14px] font-semibold hover:bg-[#6348e8] transition-all duration-200 shadow-sm cursor-pointer"
						>
							{t.pricing.finalCtaStart}
						</a>
						<a
							href="https://docs.piyapi.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center bg-white text-neutral-900 border border-neutral-200 px-8 py-3.5 rounded-lg text-[14px] font-semibold hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200 cursor-pointer shadow-sm"
						>
							{t.pricing.finalCtaDocs}
						</a>
					</div>
				</div>
			</section>

			{/* ────────── Footer ────────── */}
			<Footer onOpenConsole={onOpenConsole} />
		</div>
	)
}
