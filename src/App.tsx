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
const ResearchPage = lazy(() =>
	import("./components/ResearchPage")
)
const IndustryPage = lazy(() =>
	import("./components/IndustryPage").then((m) => ({
		default: m.IndustryPage,
	})),
)
const CompanyPage = lazy(() =>
	import("./components/CompanyPage").then((m) => ({
		default: m.CompanyPage,
	})),
)

const getTabFromUrl = () => {
	const path = window.location.pathname.replace(/^\//, '');
	if (!path) return 'overview';
	if (path.startsWith('industry/')) return `industry:${path.replace('industry/', '')}`;
	if (path.startsWith('blog/')) return `blog-article:${path.replace('blog/', '')}`;
	return path;
};

const getUrlFromTab = (tab: string) => {
	if (tab === 'overview') return '/';
	if (tab.startsWith('industry:')) return `/industry/${tab.replace('industry:', '')}`;
	if (tab.startsWith('blog-article:')) return `/blog/${tab.replace('blog-article:', '')}`;
	return `/${tab}`;
};

const Loader = () => (
	<div className="flex min-h-[50vh] flex-1 items-center justify-center">
		<div className="h-8 w-8 animate-spin rounded-full border-2 border-[#765dfb] border-t-transparent" />
	</div>
);

export function App() {
	const [activeTab, setActiveTabState] = useState<string>(getTabFromUrl)
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
	
	const lenisRef = useRef<Lenis | null>(null)

	useEffect(() => {
		const handlePopState = () => {
			setActiveTabState(getTabFromUrl());
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const setActiveTab = (tab: string) => {
		if (tab !== activeTab) {
			window.history.pushState({}, "", getUrlFromTab(tab));
			setActiveTabState(tab);
		}
	};

	const isAdminRoute = window.location.pathname.replace(/\/+$/, "") === "/admin"
	const isOverview = activeTab === "overview"
	const isPricing = activeTab === "pricing"
	const isResearch = activeTab === "research"
	const isUseCases = activeTab === "use-cases"
	const isBlog = activeTab === "blog"
	const isCompany = activeTab === "company"
	const blogArticleId = activeTab.startsWith("blog-article:") ? activeTab.slice("blog-article:".length) : ""
	const industrySlug = activeTab.startsWith("industry:") ? activeTab.slice("industry:".length) : ""

	useEffect(() => {
		const lenis = new Lenis({
			autoRaf: true,
			anchors: true,
		})
		lenisRef.current = lenis

		return () => {
			lenis.destroy()
			lenisRef.current = null
		}
	}, [])

	useEffect(() => {
		if (lenisRef.current) {
			lenisRef.current.scrollTo(0, { immediate: true })
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" })
		}
	}, [activeTab])

	return (
		<LanguageProvider>
			{isAdminRoute ? (
				<Suspense fallback={<Loader />}>
					<AdminCMSPage />
				</Suspense>
			) : (
				<div className={`relative min-h-screen flex flex-col font-sans antialiased ${
					isOverview ? "bg-[#04050c] selection:bg-[#6320EE] selection:text-white" : 
					blogArticleId ? "bg-[#f8fafc] text-neutral-900 selection:bg-neutral-900 selection:text-white" : 
					"bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white"
				}`}>
					
					{/* Persistent Navbar */}
					<Navbar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						onTryPiyApi={() => setIsConsoleOpen(true)}
					/>

					{isOverview ? (
						<>
							<section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden">
								<FluidBackground />
								<main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 my-auto">
									<Hero onOpenConsole={() => setIsConsoleOpen(true)} />
								</main>
							</section>

							<section className="w-full bg-white pt-6 pb-12 sm:pb-16 lg:pb-20 relative z-20 border-t border-neutral-100/80">
								<PartnerLogos />
							</section>

							<Suspense fallback={null}>
								<MemoryParadigmSection onOpenConsole={() => setIsConsoleOpen(true)} />
								<DifferentApproachSection />
								<WorkflowsSection />
								<CodeIntegrationSection />
								<SecurityComplianceSection />
								<ResearchPapersSection />
								<CtaSection onOpenConsole={() => setIsConsoleOpen(true)} />
								<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
							</Suspense>
						</>
					) : (
						<>
							<main className="flex-1 flex flex-col">
								<Suspense fallback={<Loader />}>
									{isPricing ? <PricingPage onOpenConsole={() => setIsConsoleOpen(true)} /> :
									isResearch ? <ResearchPage /> :
									isUseCases ? <UseCasesPage /> :
									isBlog ? <BlogPage onNavigate={setActiveTab} /> :
									blogArticleId ? <BlogArticlePage articleId={blogArticleId} onNavigate={setActiveTab} /> :
									industrySlug ? <IndustryPage industrySlug={industrySlug} onNavigate={(slug) => setActiveTab(`industry:${slug}`)} /> :
									isCompany ? <CompanyPage /> :
									<div className="flex-1 flex flex-col items-center justify-center">
										<WaitPage pageName={activeTab} />
									</div>}
								</Suspense>
							</main>
							<Suspense fallback={null}>
								<Footer onOpenConsole={() => setIsConsoleOpen(true)} />
							</Suspense>
						</>
					)}
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
