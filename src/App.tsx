import { useState, lazy, Suspense, useEffect, useRef } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { LanguageProvider } from "./lib/i18n"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { FluidBackground } from "./components/FluidBackground"
import { PartnerLogos } from "./components/PartnerLogos"
// Lazy loaded non-initial routes, below-the-fold sections and interactive modals
const WaitPage = lazy(() =>
	import("./components/WaitPage").then((m) => ({ default: m.WaitPage })),
)
const AdminCMSPage = lazy(() =>
	import("./components/AdminCMSPage").then((m) => ({
		default: m.AdminCMSPage,
	})),
)
const TryPiyApiModal = lazy(() =>
	import("./components/TryPiyApiModal").then((m) => ({
		default: m.TryPiyApiModal,
	})),
)
const MemoryParadigmSection = lazy(() =>
	import("./components/MemoryParadigmSection").then((m) => ({
		default: m.MemoryParadigmSection,
	})),
)
const DifferentApproachSection = lazy(() =>
	import("./components/DifferentApproachSection").then((m) => ({
		default: m.DifferentApproachSection,
	})),
)
const WorkflowsSection = lazy(() =>
	import("./components/WorkflowsSection").then((m) => ({
		default: m.WorkflowsSection,
	})),
)
const CodeIntegrationSection = lazy(() =>
	import("./components/CodeIntegrationSection").then((m) => ({
		default: m.CodeIntegrationSection,
	})),
)
const SecurityComplianceSection = lazy(() =>
	import("./components/SecurityComplianceSection").then((m) => ({
		default: m.SecurityComplianceSection,
	})),
)
const ResearchPapersSection = lazy(() =>
	import("./components/ResearchPapersSection").then((m) => ({
		default: m.ResearchPapersSection,
	})),
)
const CtaSection = lazy(() =>
	import("./components/CtaSection").then((m) => ({
		default: m.CtaSection,
	})),
)
const Footer = lazy(() =>
	import("./components/Footer").then((m) => ({
		default: m.Footer,
	})),
)
const PricingPage = lazy(() =>
	import("./components/PricingPage").then((m) => ({
		default: m.PricingPage,
	})),
)
const UseCasesPage = lazy(() =>
	import("./components/UseCasesPage").then((m) => ({
		default: m.UseCasesPage,
	})),
)
const BlogPage = lazy(() =>
	import("./components/BlogPage").then((m) => ({
		default: m.BlogPage,
	})),
)
const BlogArticlePage = lazy(() =>
	import("./components/BlogArticlePage").then((m) => ({
		default: m.BlogArticlePage,
	})),
)
const ResearchArticlePage = lazy(() =>
	import("./components/ResearchArticlePage").then((m) => ({
		default: m.ResearchArticlePage,
	})),
)
const IndustryPage = lazy(() =>
	import("./components/IndustryPage").then((m) => ({
		default: m.IndustryPage,
	})),
)

export function App() {
	const [activeTab, setActiveTab] = useState<string>("overview")
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
	const isAdminRoute = window.location.pathname.replace(/\/+$/, "") === "/admin"
	const isOverview = activeTab === "overview"
	const isPricing = activeTab === "pricing"
	const isResearch = activeTab === "research"
	const isUseCases = activeTab === "use-cases"
	const isBlog = activeTab === "blog"
	const blogArticleId = activeTab.startsWith("blog-article:")
		? activeTab.slice("blog-article:".length)
		: ""
	const industrySlug = activeTab.startsWith("industry:")
		? activeTab.slice("industry:".length)
		: ""

	const lenisRef = useRef<Lenis | null>(null)

	useEffect(() => {
		const lenis = new Lenis({
			autoRaf: true,
		})
		lenisRef.current = lenis

		return () => {
			lenis.destroy()
			lenisRef.current = null
		}
	}, [])

	useEffect(() => {
		// On tab/route change, instantly scroll to top without animation
		if (lenisRef.current) {
			lenisRef.current.scrollTo(0, { immediate: true })
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" })
		}
	}, [activeTab])

	return (
		<LanguageProvider>
			{isAdminRoute ? (
				<Suspense
					fallback={
						<div className="flex min-h-screen items-center justify-center bg-[#f6f6f8]">
							<div className="h-8 w-8 animate-spin rounded-full border-2 border-[#765dfb] border-t-transparent" />
						</div>
					}
				>
					<AdminCMSPage />
				</Suspense>
			) : isOverview ? (
				<div className="w-full bg-[#04050c] font-sans antialiased selection:bg-[#6320EE] selection:text-white">
					{/* Hero Section with Interactive Fluid Simulation */}
					<section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden">
						<FluidBackground />

						<div className="relative z-20 w-full">
							<Navbar
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								onTryPiyApi={() => setIsConsoleOpen(true)}
							/>
						</div>

						<main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 my-auto">
							<Hero onOpenConsole={() => setIsConsoleOpen(true)} />
						</main>
					</section>

					{/* Partner Logos */}
					<section className="w-full bg-white pt-6 pb-12 sm:pb-16 lg:pb-20 relative z-20 border-t border-neutral-100/80">
						<PartnerLogos />
					</section>

					{/* Landing Page Content Sections */}
					<Suspense fallback={null}>
						<MemoryParadigmSection
							onOpenConsole={() => setIsConsoleOpen(true)}
						/>
						<DifferentApproachSection />
						<WorkflowsSection />
						<CodeIntegrationSection />
						<SecurityComplianceSection />
						<ResearchPapersSection />
						<CtaSection onOpenConsole={() => setIsConsoleOpen(true)} />
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			) : isPricing ? (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<PricingPage onOpenConsole={() => setIsConsoleOpen(true)} />
						</Suspense>
					</main>
				</div>
			) : isResearch ? (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<ResearchArticlePage
								onNavigateBlog={() => setActiveTab("blog")}
							/>
						</Suspense>
					</main>
					<Suspense fallback={null}>
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			) : isUseCases ? (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<UseCasesPage />
						</Suspense>
					</main>
				</div>
			) : isBlog ? (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<BlogPage onNavigate={(route) => setActiveTab(route)} />
						</Suspense>
					</main>
					<Suspense fallback={null}>
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			) : blogArticleId ? (
				<div className="min-h-screen bg-[#f8fafc] text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<BlogArticlePage
								articleId={blogArticleId}
								onNavigate={(route) => setActiveTab(route)}
							/>
						</Suspense>
					</main>
					<Suspense fallback={null}>
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			) : industrySlug ? (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<IndustryPage
								industrySlug={industrySlug}
								onNavigate={(slug) => setActiveTab(`industry:${slug}`)}
							/>
						</Suspense>
					</main>
					<Suspense fallback={null}>
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			) : (
				<div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white font-sans antialiased">
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					<main className="flex-1 flex flex-col items-center justify-center">
						<Suspense
							fallback={
								<div className="flex items-center justify-center min-h-[50vh]">
									<div className="w-8 h-8 rounded-full border-2 border-[#765DFB] border-t-transparent animate-spin" />
								</div>
							}
						>
							<WaitPage pageName={activeTab} />
						</Suspense>
					</main>
					<Suspense fallback={null}>
						<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
					</Suspense>
				</div>
			)}

			{/* Interactive Live Console Modal */}
			{isConsoleOpen && (
				<Suspense fallback={null}>
					<TryPiyApiModal
						isOpen={isConsoleOpen}
						onClose={() => setIsConsoleOpen(false)}
					/>
				</Suspense>
			)}
		</LanguageProvider>
	)
}

export default App
